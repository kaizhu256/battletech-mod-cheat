# BattletechModCheat

# changelog 2020.7.18
- add cheat_armorinstall_free
- rename project from MyMod to BattletechModCheat
- none

#### todo
- none

#### install instruction
1.  install BattleTech and ModTek
2.  copy this mod into directory BATTLETECH\Mods\
3.  when first run, this mod will automatically create a file `settings.json`
    in its own directory with all-cheats disabled
4.  to enable cheats, edit `settings.json`
    by replacing each cheat's flag from empty-string "" to "1":
```javascript
{
    // cheat - ammobox has unlimited ammo-capacity
    "cheat_ammoboxcapacity_unlimited": "",

    // cheat - armor-install is free in mechbay
    "cheat_armorinstall_free": "",

    // cheat - combat-turns always-on during engagement
    "cheat_combatturn_alwayson": "",

    // cheat - contracts locked by lack-of-reputation are now available
    "cheat_contractlockbyreputation_off": "",

    // cheat - contract-reputation-loss is -25% (instead of -80%) against target
    "cheat_contractreputationlosspercent_25": "",

    // cheat - contract-salvage is unlimited
    "cheat_contractsalvage_unlimited": "",

    // cheat - contracts sorted by difficulty
    "cheat_contractsort_bydifficulty": "",

    // cheat - heatsinks weigh 0.25 tons
    "cheat_heatsinkweight_low": "",

    // cheat - skip intro
    "cheat_introskip_on": "",

    // cheat - jumpjets weigh 0.25 tons
    "cheat_jumpjetweight_low": "",

    // cheat - mechbay2 and mechbay3 can repair 2nd and 3rd mech simultaneously
    "cheat_mechbayrepair_multi": "",

    // cheat - mechs have unlimited jumpjet slots
    "cheat_mechjumpjet_unlimited": "",

    // cheat - pilot-ability-cooldowns are disabled
    "cheat_pilotabilitycooldown_off": "",

    // cheat - pilot-skills can be reset by shift-clicking skills-tab in barracks
    "cheat_pilotskill_reset": "",

    // cheat - pilot-skills cost less
    "cheat_pilotskillcost_low": "",

    // cheat - unused pilot-xp is no longer nagged by darius if pilot-skills are maxed
    "cheat_pilotxpnag_off": "",

    // cheat - mech can sensorlock-and-fire
    "cheat_sensorlockfire_on": "",

    // cheat - sell items to shop for 50% (instead of 10%)
    "cheat_shopsellprice_high": "",

    // cheat - mech can sprint-and-melee
    "cheat_sprintmelee_on": "",

    // cheat - mech can sprint-and-shoot
    "cheat_sprintshoot_on": "",
}
```

#### build instruction (steam and gog window versions)
1.  install BattleTech and ModTek
2.  git clone https://github.com/kaizhu256/battletech-mod-cheat
3.  to link references, copy installed BattleTech game
    directory `BATTLETECH\BattleTech_Data\Managed\`
    to parent-directory of `BattletechModCheat\`
    e.g.:
        `C:\development\BattletechModCheat\`
        `C:\development\Managed\`
4.  build this project in Visual Studio
    output-file:
        `C:\development\BattletechModCheat\bin\Debug\BattletechModCheat.dll`
