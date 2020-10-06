#!/usr/bin/env node
/*
 * scriptData.js
 * example usage:
node ../BattletechModCheat/scriptData.js taskFileFlatten
node ../scriptData.js taskSqliteExportAll
node ../scriptData.js taskSqliteExport ammotype
node ../scriptData.js taskSqliteExport chassisdef
node ../scriptData.js taskSqliteExport gear
node ../scriptData.js taskSqliteExport mechdef
node ../scriptData.js taskSqliteJoin
node ../scriptData.js taskSqliteJoin patch
 */


/* jslint utility2:true */
(function () {
    "use strict";
    // bug-workaround - throw unhandledRejections in node-process
    if (
        typeof process === "object" && process
        && typeof process.on === "function"
        && process.unhandledRejections !== "strict"
    ) {
        process.unhandledRejections = "strict";
        process.on("unhandledRejection", function (err) {
            throw err;
        });
    }
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
    function jsonRowListNormalize(rowList, header, headerOrder) {
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
        // order header
        if (headerOrder) {
            headerOrder = headerOrder.filter(function (elem) {
                return header.indexOf(elem) >= 0;
            }).concat(header.filter(function (elem) {
                return headerOrder.indexOf(elem) < 0;
            })).map(function (elem) {
                return header.indexOf(elem);
            });
            header = headerOrder.map(function (ii) {
                return header[ii];
            });
            rowList = rowList.map(function (row) {
                return headerOrder.map(function (ii) {
                    return row[ii];
                });
            });
        }
        return [
            rowList, header
        ];
    }
    function csvFromJson(rowList, header, headerOrder) {
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
        ] = jsonRowListNormalize(rowList, header, headerOrder);
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
    function fsWriteFileJson(file, data, onError) {
        fs.writeFile(file, (
            JSON.stringify(objectDeepCopyWithKeysSorted(data), undefined, 1)
            + "\n"
        ), onError || onErrorThrow);
    }
    // init builtin
    fs = require("fs");
    // init taskDict
    taskDict = {};
    taskDict.taskFileFlatten = function () {
    /*
     * this function will flatten csv and json pathnames into dir .csv and .json
     */
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
                fsWriteFileJson(".json/" + file.slice(2).replace((
                    /\//g
                ), ".").replace((
                    /[^0-9A-Za-z\-._]/g
                ), "_").toLowerCase().trim(), data, onError);
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
    taskDict.taskSqliteExport = function (dbName, onError) {
        let dict;
        let fileList;
        let rgx;
        let rowList;
        function sqliteExport() {
            let db;
            let header;
            let sqlite3;
            // custom row
            switch (dbName) {
            case "chassisdef":
                dict = {};
                rowList.forEach(function (row) {
                    let engine;
                    let tonnage;
                    let val;
                    tonnage = Number(row.Tonnage);
                    engine = Math.min(400, 10 * tonnage) || 0;
                    val = row.Description.Id;
                    Array.from(
                        row.FixedEquipment || []
                    ).forEach(function (key) {
                        key = key.ComponentDefID;
                        dict[key] = dict[key] || {};
                        dict[key][val] = true;
                        // fixed_engine
                        if (key.indexOf("emod_engine_") === 0) {
                            engine = Number(key.replace("emod_engine_", ""));
                            row.fixed_engine = engine;
                        }
                    });
                    // max_movement
                    if (tonnage >= 20) {
                        row.max_movement = Math.floor(25 * engine / tonnage);
                    }
                });
                Object.entries(dict).forEach(function ([
                    key, val
                ]) {
                    dict[key] = Object.keys(val).sort();
                });
                fsWriteFileJson(
                    ".data.chassisdef.fixedequipment.json",
                    dict,
                    onErrorThrow
                );
                break;
            case "mechdef":
                dict = {};
                rowList.forEach(function (row) {
                    let val;
                    val = row.Description.Id;
                    Array.from(
                        row.inventory || []
                    ).forEach(function (key) {
                        key = key.ComponentDefID;
                        dict[key] = dict[key] || {};
                        dict[key][val] = true;
                    });
                });
                Object.entries(dict).forEach(function ([
                    key, val
                ]) {
                    dict[key] = Object.keys(val).sort();
                });
                fsWriteFileJson(
                    ".data.mechdef.inventory.json",
                    dict,
                    onErrorThrow
                );
                break;
            }
            // init header
            header = {};
            rowList.forEach(function (row) {
                let aura2;
                let hardpoint2;
                // init aura2
                Array.from(row.Auras || []).forEach(function (aura) {
                    aura2 = aura2 || {};
                    aura2[aura.Name] = {
                        rng: Number(aura.Range)
                    };
                    Array.from(
                        aura.statusEffects || []
                    ).forEach(function (statusEffect) {
                        aura2[aura.Name].val = (
                            aura2[aura.Name].val || Number(
                                statusEffect.statisticData
                                && statusEffect.statisticData.modValue
                            )
                        );
                    });
                });
                if (aura2) {
                    row.aura2 = aura2;
                    header.aura2 = header.aura2 || 0;
                    header.aura2 += 1;
                }
                // init damage2
                if (row.Damage) {
                    row.damage2 = (
                        row.Damage * row.ShotsWhenFired * row.ProjectilesPerShot
                    );
                }
                // init hardpoint2
                Array.from(row.Locations || []).forEach(function (elem) {
                    Array.from(elem.Hardpoints || []).forEach(function (elem) {
                        hardpoint2 = hardpoint2 || {
                            _bal_mis: 0,
                            all: 0,
                            ene: 0,
                            ant: 0,
                            bal: 0,
                            mis: 0
                        };
                        switch (elem.Omni || elem.WeaponMount) {
                        case "AntiPersonnel":
                            hardpoint2.all += 1;
                            hardpoint2.ant += 1;
                            break;
                        case "Ballistic":
                            hardpoint2._bal_mis += 1;
                            hardpoint2.all += 1;
                            hardpoint2.bal += 1;
                            break;
                        case "Energy":
                            hardpoint2.all += 1;
                            hardpoint2.ene += 1;
                            break;
                        case "Missile":
                            hardpoint2._bal_mis += 1;
                            hardpoint2.all += 1;
                            hardpoint2.mis += 1;
                            break;
                        case true:
                            hardpoint2._bal_mis += 1;
                            hardpoint2.all += 1;
                            hardpoint2.bal += 1;
                            hardpoint2.ene += 1;
                            hardpoint2.mis += 1;
                            hardpoint2.ant += 1;
                            break;
                        }
                    });
                });
                if (hardpoint2) {
                    Object.entries(hardpoint2).forEach(function ([
                        key, val
                    ]) {
                        hardpoint2[key] = String(val).padStart(2, "0");
                    });
                    row.hardpoint2 = hardpoint2;
                    header.hardpoint2 = header.hardpoint2 || 0;
                    header.hardpoint2 += 1;
                }
                // convert list-of-object to list-of-list
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
            // sort header
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
            // normalize rowList and header
            [
                rowList,
                header
            ] = jsonRowListNormalize(rowList, header, Array.from([
                "ammocategory",
                "battlevalue",
                "category",
                "componentsubtype",
                "componenttype",
                "damage",
                "damage2",
                "description_cost",
                "description_id",
                "fixed_engine",
                "hardpoint2",
                "heatdamage",
                "heatgenerated",
                "instability",
                "inventorysize",
                "max_movement",
                "prefabidentifier",
                "rangesplit",
                "tonnage"
            ]).concat(
                header.filter(function (elem) {
                    return elem.indexOf("aura2_") === 0;
                })
            ).concat([
                "description_details"
            ]));
            // console.error("header - " + JSON.stringify(header));
            // db - reset
            try {
                fs.unlinkSync(".data." + dbName + ".sqlite3");
            } catch (ignore) {}
            // insert rowList
            sqlite3 = require("./lib.sqlite3.js");
            db = new sqlite3.Database(".data." + dbName + ".sqlite3");
            db.serialize(function () {
                let stmt;
                db.run("CREATE TEMP TABLE tmp1 (" + header.map(function (key) {
                    return key + " REAL";
                }).join(",") + ");\n");
                stmt = db.prepare(
                    "INSERT INTO tmp1 VALUES("
                    + ",?".repeat(header.length).slice(1)
                    + ");\n"
                );
                rowList.forEach(function (row) {
                    stmt.run(row.map(function (val) {
                        val = (
                            (typeof val === "object" && val)
                            ? JSON.stringify(val)
                            : val
                        );
                        return (
                            typeof val === "string"
                            ? val.replace((
                                /[\r\n]/g
                            ), " ").trim()
                            : val
                        );
                    }));
                });
                stmt.finalize();
                db.run(
                    "CREATE TABLE data1 AS SELECT * FROM tmp1 ORDER BY\n"
                    + Array.from([
                        // weapondef
                        "category ASC",
                        // chassisdef
                        "prefabidentifier ASC",
                        "hardpoint2 DESC",
                        // gear
                        "componentsubtype ASC",
                        "componenttype ASC",
                        // all
                        "description_cost DESC",
                        "battlevalue DESC",
                        "description_id DESC"
                    ]).filter(function (elem) {
                        return header.indexOf(elem.split(" ")[0]) >= 0;
                    }).join(",")
                );
                db.all("SELECT * FROM data1;\n", function (err, data) {
                    onErrorThrow(err);
                    fs.writeFile((
                        ".data." + dbName + ".csv"
                    ), csvFromJson(data, header).replace((
                        /\r/g
                    ), ""), function (err) {
                        onError = onError || onErrorThrow;
                        onError(err);
                        console.error("wrote " + ".data." + dbName + ".csv");
                    });
                });
            });
            db.close();
        }
        // init rgx
        rgx = {
            "ammotype": "^  \"Id\": \"Ammunition_",
            "chassisdef": "^  \"Id\": \"chassisdef_",
            "gear": "^ \"ComponentType\": \"",
            "mechdef": "^  \"Id\": \"mechdef_\\|^  \"Id\": \"vehicledef_"
        };
        // init fileList
        rgx = rgx[dbName];
        fileList = {};
        require("child_process").spawnSync("git", [
            "grep", rgx
        ], {
            encoding: "utf8",
            stdio: [
                "ignore", "pipe", 2
            ]
        }).stdout.trim().replace((
            /^[^:]*?:/gm
        ), function (match) {
            fileList[match.slice(0, -1)] = true;
            return "";
        });
        fileList = Object.keys(fileList).sort();
        // export file to db
        rowList = [];
        fileListProcess(fileList, function (file, onError) {
            fs.readFile(file, "utf8", function (err, data) {
                onErrorThrow(err);
                rowList.push(JSON.parse(data));
                onError();
            });
        }, function (err) {
            onErrorThrow(err);
            sqliteExport(onError);
        });
    };
    taskDict.taskSqliteExportAll = function () {
        Promise.all([
            "ammotype",
            "chassisdef",
            "gear",
            "mechdef"
        ].map(function (file) {
            return new Promise(function (resolve) {
                taskDict.taskSqliteExport(file, function (err) {
                    onErrorThrow(err);
                    resolve();
                });
            });
        })).then(function () {
            taskDict.taskSqliteJoin();
        });
    };
    taskDict.taskSqliteJoin = function (mode) {
        let db;
        let dict;
        let file;
        let sqlite3;
        // copy file
        [
            "ammotype"
        ].forEach(function (file) {
            fs.copyFile(
                ".data." + file + ".csv",
                "data." + file + ".csv",
                onErrorThrow
            );
        });
        file = "mech";
        // db - reset
        try {
            fs.unlinkSync(".data." + file + ".sqlite3");
        } catch (ignore) {}
        sqlite3 = require("./lib.sqlite3.js");
        db = new sqlite3.Database(".data." + file + ".sqlite3");
        // db - attach
        db.serialize(function () {
            let stmt;
            [
                "ammotype",
                "chassisdef",
                "gear",
                "mechdef"
            ].forEach(function (file) {
                db.run(
                    "ATTACH DATABASE '.data." + file + ".sqlite3"
                    + "' AS db_" + file + ";\n"
                );
            });
            db.run(`
CREATE TABLE data1 AS
SELECT * FROM (
    SELECT chassisid FROM db_mechdef.data1
) AS id1
LEFT JOIN db_chassisdef.data1 AS chassis1 ON
    chassis1.description_id = id1.chassisid
LEFT JOIN db_mechdef.data1 AS mech1 ON
    mech1.chassisid = id1.chassisid
ORDER BY COALESCE(chassis1.rowid, 9999), mech1.rowid;
            `);
            // export csv data.gear.csv
            dict = {};
            [
                ".data.chassisdef.fixedequipment.json",
                ".data.mechdef.inventory.json"
            ].forEach(function (file) {
                Object.entries(JSON.parse(
                    fs.readFileSync(file, "utf8")
                )).forEach(function ([
                    key, val
                ]) {
                    dict[key] = dict[key] || {};
                    val.forEach(function (val) {
                        dict[key][val] = true;
                    });
                });
            });
            Object.entries(dict).forEach(function ([
                key, val
            ]) {
                dict[key] = JSON.stringify(
                    Object.keys(val).sort().slice(0, 100)
                );
            });
            db.run("CREATE TEMP TABLE tmp1 (component TEXT, chassis TEXT);\n");
            stmt = db.prepare("INSERT INTO tmp1 VALUES(?, ?);\n");
            Object.entries(dict).forEach(function ([
                key, val
            ]) {
                stmt.run([
                    key, val
                ]);
            });
            if (mode !== "patch") {
                db.all((
                    "SELECT * FROM db_gear.data1 AS data1\n"
                    + "LEFT JOIN tmp1 ON\n"
                    + "tmp1.component = data1.description_id;\n"
                ), function (err, data) {
                    onErrorThrow(err);
                    fs.writeFile((
                        "data.gear.csv"
                    ), csvFromJson(data).replace((
                        /\r/g
                    ), ""), onErrorThrow);
                });
                // export csv data.mech.csv
                db.all("SELECT * FROM data1;\n", function (err, data) {
                    onErrorThrow(err);
                    fs.writeFile((
                        "data." + file + ".csv"
                    ), csvFromJson(data).replace((
                        /\r/g
                    ), ""), onErrorThrow);
                });
            }
            // aggregate description
            let descriptionDict;
            descriptionDict = {};
            fileListProcess(
                require("child_process").spawnSync("find .json -type f", {
                    encoding: "utf8",
                    shell: true,
                    stdio: [
                        "ignore", "pipe", 2
                    ]
                }).stdout.trim().split("\n"),
                function (file, onError) {
                    fs.readFile(file, "utf8", function (err, data) {
                        onErrorThrow(err);
                        data = JSON.parse(data);
                        if (data.Description) {
                            descriptionDict[data.Description.Id] = (
                                data.Description.Details
                            );
                        }
                        onError();
                    });
                },
                function (err) {
                    onErrorThrow(err);
                    fsWriteFileJson(
                        "data.description.json",
                        descriptionDict,
                        onErrorThrow
                    );
                }
            );
            // export csv data.mech.bal_mis.csv
            db.all((`
SELECT * FROM (
SELECT
    ROW_NUMBER() OVER (
        PARTITION BY
            fixed_engine IS NULL,
            CAST(max_movement / 25 AS INT)
        ORDER BY
            hardpoint2 DESC,
            tonnage DESC,
            description_cost DESC,
            description_id DESC
    ) AS rank,
    *
FROM data1
WHERE
    6 <= hardpoint2__bal_mis
    AND 100 <= max_movement
    AND 35 <= tonnage
)
WHERE
    rank <= 10
ORDER BY
    fixed_engine IS NULL DESC,
    CAST(max_movement / 25 AS INT) DESC,
    rank
            `), function (err, data) {
                onErrorThrow(err);
                fs.writeFile((
                    "data." + file + ".bal_mis.csv"
                ), csvFromJson(data, undefined, [
                    "fixed_engine",
                    "max_movement",
                    "rank",
                    "hardpoint2",
                    "tonnage",
                    "chassisid"
                ]).replace((
                    /\r/g
                ), ""), onErrorThrow);
            });
        });
    };
    if (taskDict.hasOwnProperty(process.argv[2])) {
        taskDict[process.argv[2]](process.argv[3]);
    }
}());
