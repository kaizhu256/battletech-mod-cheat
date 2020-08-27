#!/usr/bin/env node
/*
 * scriptData.js
 * example usage:
node ../BattletechModCheat/scriptData.js taskFileFlatten
node ../BattletechModCheat/scriptData.js taskSqliteExportAll
node ../scriptData.js taskSqliteExportAll
node ../scriptData.js taskSqliteExport data.ammo "\\.ammunition_"
node ../scriptData.js taskSqliteExport data.ammobox "ammunitionbox"
node ../scriptData.js taskSqliteExport data.gear "\\.armors\\.\\|\\.emod_\\|\\.gear_\\|slots_"
node ../scriptData.js taskSqliteExport data.chassis "chassisdef"
node ../scriptData.js taskSqliteExport data.weapon "\\.weapon_"
 */


/* jslint utility2:true */
(function () {
    "use strict";
    let fs;
    let taskDict;
    // init debugInline
    if (!globalThis.debugInline) {
        let consoleError;
        consoleError = console.error;
        globalThis.debugInline = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            consoleError("\n\ndebugInline");
            consoleError(...argList);
            consoleError("\n");
            return argList[0];
        };
    }
    function objectDeepCopyWithKeysSorted(obj) {
    /*
     * this function will recursively deep-copy <obj> with keys sorted
     */
        let sorted;
        if (typeof obj !== "object" || !obj) {
            return obj;
        }
        // recursively deep-copy list with child-keys sorted
        if (Array.isArray(obj)) {
            return obj.map(objectDeepCopyWithKeysSorted);
        }
        // recursively deep-copy obj with keys sorted
        sorted = {};
        Object.keys(obj).sort().forEach(function (key) {
            sorted[key] = objectDeepCopyWithKeysSorted(obj[key]);
        });
        return sorted;
    }
    function onErrorThrow(err) {
    /*
     * this function will throw <err> if exists
     */
        if (err) {
            throw err;
        }
    }
    function jsonRowListNormalize(rowList, header) {
    /*
     * this function will normalize <rowList> with given <header>
     */
        // convert list-of-dict to list-of-list
        if (!Array.isArray(rowList[0])) {
            header = header || Object.keys(rowList[0]);
            rowList = rowList.map(function (row) {
                return header.map(function (key) {
                    return row[key];
                });
            });
        }
        if (!header) {
            header = rowList[0];
            rowList = rowList.slice(1);
        }
        // normalize rowList
        rowList = rowList.map(function (row) {
            return (
                row.length === header.length
                ? row
                : header.map(function (ignore, ii) {
                    return row[ii];
                })
            );
        });
        return [
            rowList, header
        ];
    }
    function csvFromJson(rowList, header) {
    /*
     * this function will convert <rowList> to csv text
     */
/*
https://tools.ietf.org/html/rfc4180#section-2
Definition of the CSV Format
    While there are various specifications and implementations for the
    CSV format (for ex. [4], [5], [6] and [7]), there is no formal
    specification in existence, which allows for a wide variety of
    interpretations of CSV files.  This section documents the format that
    seems to be followed by most implementations:
1.  Each record is located on a separate line, delimited by a line
    break (CRLF).  For example:
    aaa,bbb,ccc CRLF
    zzz,yyy,xxx CRLF
2.  The last record in the file may or may not have an ending line
    break.  For example:
    aaa,bbb,ccc CRLF
    zzz,yyy,xxx
3.  There maybe an optional header line appearing as the first line
    of the file with the same format as normal record lines.  This
    header will contain names corresponding to the fields in the file
    and should contain the same number of fields as the records in
    the rest of the file (the presence or absence of the header line
    should be indicated via the optional "header" parameter of this
    MIME type).  For example:
    field_name,field_name,field_name CRLF
    aaa,bbb,ccc CRLF
    zzz,yyy,xxx CRLF
4.  Within the header and each record, there may be one or more
    fields, separated by commas.  Each line should contain the same
    number of fields throughout the file.  Spaces are considered part
    of a field and should not be ignored.  The last field in the
    record must not be followed by a comma.  For example:
    aaa,bbb,ccc
5.  Each field may or may not be enclosed in double quotes (however
    some programs, such as Microsoft Excel, do not use double quotes
    at all).  If fields are not enclosed with double quotes, then
    double quotes may not appear inside the fields.  For example:
    "aaa","bbb","ccc" CRLF
    zzz,yyy,xxx
6.  Fields containing line breaks (CRLF), double quotes, and commas
    should be enclosed in double-quotes.  For example:
    "aaa","b CRLF
    bb","ccc" CRLF
    zzz,yyy,xxx
7.  If double-quotes are used to enclose fields, then a double-quote
    appearing inside a field must be escaped by preceding it with
    another double quote.  For example:
    "aaa","b""bb","ccc"
*/
        // handle null-case
        if (!rowList.length) {
            return "";
        }
        // normalize rowList, header
        [
            rowList, header
        ] = jsonRowListNormalize(rowList, header);
        rowList.unshift(header);
        return rowList.map(function (row) {
            return row.map(function (val) {
                if (val === undefined || val === null) {
                    return "";
                }
                if (typeof val === "string") {
/*
    7.  If double-quotes are used to enclose fields, then a double-quote
    appearing inside a field must be escaped by preceding it with
    another double quote.  For example:
    "aaa","b""bb","ccc"
*/
                    val = val.replace((
                        /"/gu
                    ), "\"\"");
/*
6.  Fields containing line breaks (CRLF), double quotes, and commas
    should be enclosed in double-quotes.  For example:
    "aaa","b CRLF
    bb","ccc" CRLF
    zzz,yyy,xxx
*/
                    if ((
                        /[\r\n",]/
                    ).test(val)) {
                        val = "\"" + val + "\"";
                    }
                    return val;
                }
                return String(val);
/*
4.  Within the header and each record, there may be one or more
    fields, separated by commas.  Each line should contain the same
    number of fields throughout the file.  Spaces are considered part
    of a field and should not be ignored.  The last field in the
    record must not be followed by a comma.  For example:
    aaa,bbb,ccc
*/
/*
1.  Each record is located on a separate line, delimited by a line
    break (CRLF).  For example:
    aaa,bbb,ccc CRLF
    zzz,yyy,xxx CRLF
*/
/*
2.  The last record in the file may or may not have an ending line
    break.  For example:
    aaa,bbb,ccc CRLF
    zzz,yyy,xxx
*/
            }).join(",") + "\r\n";
        }).join("");
    }
    function fileListProcess(fileList, fileTask, onError) {
    /*
     * this function will async-process <fileList> with <fileTask>
     * with rate-limited queue
     */
        let cnt;
        let queue;
        let timerInterval;
        function fileTask2() {
            cnt += 1;
            fileTask(queue.shift(), function (err) {
                cnt -= 1;
                onErrorThrow(err);
            });
        }
        cnt = 0;
        queue = Array.from(fileList);
        timerInterval = setInterval(function () {
            if (!cnt && !queue.length) {
                clearInterval(timerInterval);
                onError(undefined, fileList);
            }
            while (queue.length && cnt < 8) {
                fileTask2();
            }
        });
    }
    fs = require("fs");
    taskDict = {};
    taskDict.taskFileFlatten = function () {
        function fileTask(file, onError) {
            fs.readFile(file, "utf8", function (err, data) {
                onErrorThrow(err);

                if ((
                    /\.csv$/
                ).test(file)) {
                    fs.writeFile(".csv/" + file.slice(2).replace((
                        /\//g
                    ), ".").replace((
                        /[^0-9A-Za-z\-._]/g
                    ), "_").toLowerCase().trim(), data, onError);
                    return;
                }
                // remove trailing-whitespace
                data = data.replace((
                    /\s+?$/gm
                ), "");
                // remove comment "/**/"
                data = data.replace((
                    /\s\/\*[\S\s]*?\*\//g
                ), "");
                // remove comment "//"
                data = data.replace((
                    /\s\/\/.*/g
                ), "");
                // remove trailing-comma
                data = data.replace((
                    /,\s*?([\]}])/g
                ), "$1");
                // insert missing-comma
                data = data.replace((
                    /([0-9"\]}])\n\s*?([^\s,\]}])/g
                ), "$1,\n$2").trim();
                try {
                    data = JSON.parse(data);
                } catch (errCaught) {
                    errCaught.message.replace((
                        /\d+/
                    ), function (match0) {
                        match0 = Number(match0);
                        data = data.slice(
                            Math.max(0, match0 - 100),
                            match0 + 100
                        );
                    });
                    console.error(file);
                    console.error(data);
                    onError(errCaught);
                    return;
                }
                fs.writeFile(".json/" + file.slice(2).replace((
                    /\//g
                ), ".").replace((
                    /[^0-9A-Za-z\-._]/g
                ), "_").toLowerCase().trim(), JSON.stringify(
                    objectDeepCopyWithKeysSorted(data),
                    undefined,
                    1
                ) + "\n", onError);
            });
        }
        // mkdirp .csv and .json
        Array.from([
            ".csv", ".json"
        ]).forEach(function (dir) {
            try {
                fs.mkdirSync(dir, {
                    recurse: true
                });
            } catch (ignore) {}
        });
        // flatten files
        fileListProcess(
            require("child_process").spawnSync((
                "find . -type f "
                + "| grep -v \"^\\./\\.csv\\|^\\./\\.json/\" "
                + "| grep -i \"\\.csv$\\|\\.json$\" "
                + "| sort"
            ), {
                encoding: "utf8",
                shell: true,
                stdio: [
                    "ignore", "pipe", 2
                ]
            }).stdout.trim().split("\n"),
            fileTask,
            onErrorThrow
        );
    };
    taskDict.taskSqliteExport = function (file, rgx) {
        let rowList;
        function sqliteExport(err) {
            let db;
            let header;
            let sqlite3;
            onErrorThrow(err);
            // init header
            header = {};
            rowList.forEach(function (row) {
                let hardpointDict;
                // init hardpointDict
                Array.from(row.Locations || []).forEach(function (elem) {
                    Array.from(elem.Hardpoints || []).forEach(function (elem) {
                        hardpointDict = hardpointDict || {
                            all: 0,
                            bal: 0,
                            ene: 0,
                            mis: 0,
                            ant: 0
                        };
                        switch (elem.Omni || elem.WeaponMount) {
                        case "AntiPersonnel":
                            hardpointDict.all += 1;
                            hardpointDict.ant += 1;
                            break;
                        case "Ballistic":
                            hardpointDict.all += 1;
                            hardpointDict.bal += 1;
                            break;
                        case "Energy":
                            hardpointDict.all += 1;
                            hardpointDict.ene += 1;
                            break;
                        case "Missile":
                            hardpointDict.all += 1;
                            hardpointDict.mis += 1;
                            break;
                        case true:
                            hardpointDict.all += 1;
                            hardpointDict.bal += 1;
                            hardpointDict.ene += 1;
                            hardpointDict.mis += 1;
                            hardpointDict.ant += 1;
                            break;
                        }
                    });
                });
                if (hardpointDict) {
                    Object.entries(hardpointDict).forEach(function ([
                        key, val
                    ]) {
                        hardpointDict[key] = String(val).padStart(2, "0");
                    });
                    row.hardpoint2 = hardpointDict;
                    header.hardpoint2 = header.hardpoint2 || 0;
                    header.hardpoint2 += 1;
                }
                Object.entries(row).forEach(function ([
                    key, val
                ]) {
                    key = key.toLowerCase().trim().replace((
                        /\W/g
                    ), "_");
                    row[key] = val;
                    if (!(val && typeof val === "object")) {
                        header[key] = header[key] || 0;
                        if (!(val === undefined || val === null)) {
                            header[key] += 1;
                        }
                        return;
                    }
                    if (Array.isArray(val)) {
                        header[key] = header[key] || 0;
                        header[key] += 1;
                        row[key] = val;
                        return;
                    }
                    Object.entries(val).forEach(function ([
                        key2, val2
                    ]) {
                        key2 = key2.toLowerCase().trim().replace((
                            /\W/g
                        ), "_");
                        key2 = key + "_" + key2;
                        header[key2] = header[key2] || 0;
                        if (!(val2 === undefined || val2 === null)) {
                            header[key2] += 1;
                        }
                        row[key2] = val2;
                    });
                });
            });
            header = Object.entries(header).map(function ([
                key, val
            ]) {
                return (
                    val >= 2
                    ? key
                    : undefined
                );
            }).filter(function (key) {
                return key;
            }).sort();
            [
                "description_details"
            ].concat(Array.from([
                "ammocategory",
                "battlevalue",
                "category",
                "componentsubtype",
                "componenttype",
                "damage",
                "description_cost",
                "description_id",
                "hardpoint2",
                "heatdamage",
                "heatgenerated",
                "instability",
                "inventorysize",
                "prefabidentifier",
                "rangesplit",
                "tonnage"
            ]).reverse()).forEach(function (col) {
                let ii;
                ii = header.indexOf(col);
                if (ii >= 0) {
                    header.splice(ii, 1);
                    header.unshift(col);
                }
            });
            // normalize rowList
            rowList = rowList.map(function (row) {
                return header.map(function (key) {
                    return row[key];
                });
            });
            // normalize header
            header = header.map(function (key) {
                return key.toLowerCase().trim().replace((
                    /\W/g
                ), "_");
            });
            console.error("header - " + JSON.stringify(header));
            // reset db
            try {
                fs.unlinkSync("." + file + ".sqlite3");
            } catch (ignore) {}
            // insert rowList
            sqlite3 = require("./lib.sqlite3.js");
            db = new sqlite3.Database("." + file + ".sqlite3");
            db.serialize(function () {
                let stmt;
                db.run("CREATE TEMP TABLE tmp1 (" + header.map(function (key) {
                    return key + " REAL";
                }).join(",") + ");");
                stmt = db.prepare(
                    "INSERT INTO tmp1 VALUES("
                    + ",JSON(?)".repeat(header.length).slice(1)
                    + ");"
                );
                rowList.forEach(function (row) {
                    stmt.run(row.map(function (val) {
                        return JSON.stringify(val);
                    }));
                });
                stmt.finalize();
                db.run(
                    "CREATE TABLE data1 AS SELECT * FROM tmp1 ORDER BY "
                    + Array.from([
                        // weapondef
                        "category ASC",
                        // chassisdef
                        "prefabidentifier ASC",
                        "hardpoint2 DESC",
                        // gear
                        "componenttype ASC",
                        // all
                        "description_cost DESC",
                        "battlevalue DESC",
                        "description_id ASC"
                        //!! "ammocategory",
                        //!! "damage",
                        //!! "heatdamage",
                        //!! "heatgenerated",
                        //!! "instability",
                        //!! "inventorysize",
                        //!! "rangesplit",
                        //!! "tonnage"
                    ]).filter(function (elem) {
                        return header.indexOf(elem.split(" ")[0]) >= 0;
                    }).join(",")
                );
                db.all("SELECT * FROM data1;", function (err, data) {
                    onErrorThrow(err);
                    fs.writeFileSync(
                        file + ".csv",
                        csvFromJson(data, header).replace((
                            /\r/g
                        ), "")
                    );
                });
            });
            db.close();
        }
        // export file to db
        rowList = [];
        fileListProcess(
            require("child_process").spawnSync((
                "find .json | grep \"" + rgx + "\" | sort"
            ), {
                encoding: "utf8",
                shell: true,
                stdio: [
                    "ignore", "pipe", 2
                ]
            }).stdout.trim().split("\n"),
            function (file, onError) {
                fs.readFile(file, "utf8", function (err, data) {
                    onErrorThrow(err);
                    rowList.push(JSON.parse(data));
                    onError();
                });
            },
            sqliteExport
        );
    };
    taskDict.taskSqliteExportAll = function () {
        [
            [
                "data.ammo", "\\\\.ammunition_"
            ], [
                "data.ammobox", "ammunitionbox"
            ], [
                "data.gear",
                "\\\\.armors\\\\.\\\\|\\\\.emod_\\\\|\\\\.gear_\\\\|slots_"
            ], [
                "data.chassis", "chassisdef"
            ], [
                "data.weapon", "\\\\.weapon_"
            ]
        ].forEach(function (argList) {
            taskDict.taskSqliteExport(...argList);
        });
    };
    if (taskDict.hasOwnProperty(process.argv[2])) {
        taskDict[process.argv[2]](...process.argv.slice(3));
    }
}());
