# MyMod

#### install instruction
1.  install BattleTech and ModTek
2.  copy this mod into directory BATTLETECH\Mods\
3.  when first run, this mod will automatically create a file `settings.json`
    in its own directory with all-cheats enabled
4.  to enable cheats, edit `settings.json`
    by replacing "1" with empty-string "":
```javascript
{
    // cheat - ammobox has unlimited ammo-capacity
    "cheat_ammoboxcapacity_unlimited": "1",

    // cheat - combat-turns always-on during engagement
    "cheat_combatturn_alwayson": "1",

    // cheat - contracts locked by lack-of-reputation are now available
    "cheat_contractlockbyreputation_off": "1",

    // cheat - contract-reputation-loss is -25% (instead of -80%) against target
    "cheat_contractreputationlosspercent_25": "1",

    // cheat - contract-salvage is unlimited
    "cheat_contractsalvage_unlimited": "1",

    // cheat - contracts sorted by difficulty
    "cheat_contractsort_bydifficulty": "1",

    // cheat - heatsinks weigh 0.25 tons
    "cheat_heatsinkweight_low": "1",

    // cheat - skip intro
    "cheat_introskip_on": "1",

    // cheat - jumpjets weigh 0.25 tons
    "cheat_jumpjetweight_low": "1",

    // cheat - mechbay2 and mechbay3 can repair 2nd and 3rd mech simultaneously
    "cheat_mechbayrepair_multi": "1",

    // cheat - mechs have unlimited jumpjet slots
    "cheat_mechjumpjet_unlimited": "1",

    // cheat - pilot-ability-cooldowns are disabled
    "cheat_pilotabilitycooldown_off": "1",

    // cheat - pilot-skills can be reset by shift-clicking skills-tab in barracks
    "cheat_pilotskill_reset": "1",

    // cheat - pilot-skills cost less
    "cheat_pilotskillcost_low": "1",

    // cheat - unused pilot-xp is no longer nagged by darius if pilot-skills are maxed
    "cheat_pilotxpnag_off": "1",

    // cheat - mech can sensorlock-and-fire
    "cheat_sensorlockfire_on": "1",

    // cheat - sell items to shop for 50% (instead of 10%)
    "cheat_shopsellprice_high": "1",

    // cheat - mech can sprint-and-melee
    "cheat_sprintmelee_on": "1",

    // cheat - mech can sprint-and-shoot
    "cheat_sprintshoot_on": "1",
}
```

#### build instruction (steam and gog window versions)
1.  install BattleTech and ModTek
2.  git clone https://github.com/kaizhu256/MyMod
3.  to link references, copy installed BattleTech game
    directory `BATTLETECH\BattleTech_Data\Managed\`
    to parent-directory of `MyMod\`
    e.g.:
        `C:\development\MyMod\`
        `C:\development\Managed\`
4.  build this project in Visual Studio
    output-file:
        `C:\development\MyMod\bin\Debug\MyMod.dll`
