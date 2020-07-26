# BattletechModCheat

# changelog 2020.7.24
- merge cheats cheat_heatsinkweight_low, cheat_jumpjetweight_low to new cheat_mechweightlimit_off
- rename cheats
- remove cheat_combatturn_alwayson
- optimize cheats
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
    // cheat - ammoboxes have infinite ammo
    // (roguetech-compatible)
    "cheat_ammoboxcapacity_infinite": "1",

    // cheat - add/remove armor for free
    // (roguetech-compatible)
    "cheat_armorinstall_free": "1",

    // cheat - no longer banned from contract due to poor reputation
    // (roguetech-compatible)
    "cheat_contractban_off": "1",

    // cheat - lose -25% (instead of -80%) reputation from contract's opposing faction
    // (roguetech-compatible)
    "cheat_contractreputationloss_low": "1",

    // cheat - 300 salvage in contracts
    // (roguetech-compatible)
    "cheat_contractsalvage_300": "1",

    // cheat - sort contracts by difficulty
    "cheat_contractsort_bydifficulty": "",

    // cheat - skip intro
    "cheat_introskip_on": "",

    // cheat - mechbay2 and mechbay3 can repair 2nd and 3rd mech simultaneously
    "cheat_mechbayrepair_multi": "",

    // cheat - can add weapon/equipment/armor to mech over its weight-limit
    // (roguetech-compatible)
    "cheat_mechweightlimit_off": "1",

    // cheat - pilot-abilities have have 0 cooldown
    "cheat_pilotabilitycooldown_0": "",

    // cheat - reset pilot-skills by shift-clicking skills-tab in barracks
    "cheat_pilotskill_reset": "",

    // cheat - pilot-skills cost less
    // (roguetech-compatible)
    "cheat_pilotskillcost_low": "1",

    // cheat - unused pilot-xp is no longer nagged by darius if pilot-skills are maxed
    "cheat_pilotxpnag_off": "",

    // cheat - mech can sensorlock-and-fire
    "cheat_sensorlockfire_on": "",

    // cheat - sell items to shop for 50% (instead of 10%)
    // (roguetech-compatible)
    "cheat_shopsellprice_high": "1",

    // cheat - mech can sprint-and-melee
    "cheat_sprintmelee_on": "",

    // cheat - mech can sprint-and-shoot
    "cheat_sprintshoot_on": "",
}
```
