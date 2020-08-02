using BattleTech;
using BattleTech.Framework;
using BattleTech.UI;
using Harmony;
using HBS;
using HBS.Data;
using HBS.Util;
using Localize;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Reflection.Emit;
using System.Text.RegularExpressions;
using UnityEngine;

namespace BattletechModCheat
{
    public class
    Dict2 : SortedList<string, string>
    {
        public string
        getItem(string key)
        {
            TryGetValue(key, out string val);
            return val ?? "";
        }

        public void
        setItem(string key, object val)
        {
            var val2 = (
                val == null
                ? ""
                : val is string tstring
                ? (string)val
                : val is bool tbool
                ? (
                    (bool)val
                    ? "1"
                    : ""
                )
                : val.ToString()
            ).Trim().ToLower();
            val2 = Regex.Replace(val2, "^true$", "1");
            val2 = Regex.Replace(val2, "^false$", "");
            this[key.ToLower()] = val2;
        }
    }

    public class
    Local
    {
        public static bool
        cheat_mechcomponentsize_1 = false;

        public static int
        countJsonParse = 0;

        public static JsonSerializerSettings
        jsonSerializerSettings;

        public static Dict2
        state;

        public static SelectionStateSensorLock
        stateSelectionStateSensorLock;

        public static object
        debugInline(string name, object obj)
        {
            /*
             * this function will inline-debug <obj> to file ./debug.log
             */
            return debugLog(name, obj);
        }

        public static object
        debugLog(string name, object obj)
        {
            /*
             * this function will inline-debug <obj> to file ./debug.log
             * example usage
             * Local.debugLog("trace", System.Environment.StackTrace);
             */
            FileLog.Log("\ndebugLog " + name + " " + (
                obj is string tt
                ? (string)obj
                : Local.jsonStringify(obj)
            ));
            return obj;
        }

        public static void
        debugStack(string name)
        {
            /*
             * this function will log stack-trace
             */
            Local.debugLog(name, System.Environment.StackTrace);
        }

        public static Dict2
        jsonParseDict2(string json)
        {
            /*
             * this function will parse json into List<Dict2>
             */
            return JsonConvert.DeserializeObject<Dict2>(
                json,
                Local.jsonSerializerSettings
            );
        }

        public static string
        jsonStringify(object obj)
        {
            /*
             * this function will stringify val
             */
            return JsonConvert.SerializeObject(
                obj,
                Local.jsonSerializerSettings
            );
        }

        public static void
        stateChangedAfter()
        {
            /*
             * this function will run after state has changed
             */
            Local.debugLog("stateChangedAfter", Local.state);
        }

        public static void
        Init(string cwd, string settingsJson)
        {
            FileLog.logPath = Path.Combine(cwd, "debug.log");
            File.Delete(FileLog.logPath);
            Local.jsonSerializerSettings = new JsonSerializerSettings
            {
                DateParseHandling = DateParseHandling.None,
                Formatting = Formatting.Indented
            };
            Local.state = Local.jsonParseDict2(
                new Regex(
                    @"```\w*?\n([\S\s]*?)\n```"
                ).Match(
                    File.ReadAllText(Path.Combine(cwd, "README.md"))
                ).Groups[1].ToString()
            );
            Local.cheat_mechcomponentsize_1 = (
                state["cheat_mechcomponentsize_1"] != ""
            );
            try
            {
                foreach (var item in Local.jsonParseDict2(
                    File.ReadAllText(Path.Combine(cwd, "settings.json"))
                ))
                {
                    Local.state.setItem(item.Key, item.Value);
                }
            }
            catch (Exception err)
            {
                Local.debugLog("settings.json", err);
            }
            File.WriteAllText(
                Path.Combine(cwd, "settings.json"),
                Local.jsonStringify(Local.state)
            );
            Local.stateChangedAfter();
            var harmony = HarmonyInstance.Create("com.github.kaizhu256.BattletechModCheat");
            harmony.PatchAll(Assembly.GetExecutingAssembly());
        }
    }

    [HarmonyPatch(typeof(JSONSerializationUtility))]
    [HarmonyPatch("RehydrateObjectFromDictionary")]
    [HarmonyPatch(new Type[] {
        typeof(object),
        typeof(Dictionary<string, object>),
        typeof(string),
        typeof(Stopwatch),
        typeof(Stopwatch),
        typeof(JSONSerializationUtility.RehydrationFilteringMode),
        typeof(Func<string, bool>[])
    })]
    public class
    Patch_JSONSerializationUtility_RehydrateObjectFromDictionary
    {
        public static void
        Postfix(object target)
        {
            /*
            Local.countJsonParse += 1;
            if (Local.countJsonParse % 10000 == 0)
            {
                Local.debugLog("countJsonParse", Local.countJsonParse);
                Local.debugInline(
                    "countJsonParse",
                    System.Environment.StackTrace
                );
            }
            */
            // cheat_mechcomponentsize_1
            if (
                Local.cheat_mechcomponentsize_1
            )
            {
                var obj = target as MechComponentDef;
                if (obj != null)
                {
                    Traverse.Create(obj).Property("InventorySize").SetValue(1);
                }
            }
            if (
                Local.cheat_mechcomponentsize_1
            )
            {
                var obj = (
                    target as MechEngineer.Features.DynamicSlots.DynamicSlots
                );
                if (obj != null)
                {
                    obj.ReservedSlots = 0;
                }
            }
        }
        /*
        public static bool
        Prefix(object target, Dictionary<string, object> values)
        {
            return true;
        }
        */
    }

    // patch - cheat_ammoboxcapacity_infinite
    [HarmonyPatch(typeof(DictionaryStore<AmmunitionBoxDef>))]
    [HarmonyPatch("Add")]
    public class
    Patch_DictionaryStore_AmmunitionBoxDef_Add
    {
        public static bool
        Prefix(AmmunitionBoxDef item)
        {
            if (Local.state.getItem("cheat_ammoboxcapacity_infinite") != "")
            {
                Traverse.Create(item).Property(
                    "Capacity"
                ).SetValue(5000);
            }
            return true;
        }
    }

    // patch - cheat_armorinstall_free

    // patch - cheat_contractban_off

    // patch - cheat_contractreputationloss_cheap

    // patch - cheat_contractsalvage_300

    // patch - cheat_contractsort_bydifficulty
    [HarmonyPatch(typeof(SGContractsWidget))]
    [HarmonyPatch("GetContractComparePriority")]
    public class
    Patch_SGContractsWidget_GetContractComparePriority
    {
        public static bool
        Prefix(ref int __result, Contract contract)
        {
            if (Local.state.getItem("cheat_contractsort_bydifficulty") == "")
            {
                return true;
            }
            __result = contract.Override.GetUIDifficulty();
            var Sim = UnityGameInstance.BattleTechGame.Simulation;
            if (!Sim.ContractUserMeetsReputation(contract))
            {
                __result += 100;
                return false;
            }
            if (
                contract.Override.contractDisplayStyle ==
                ContractDisplayStyle.BaseCampaignRestoration
            )
            {
                __result -= 80;
                return false;
            }
            if (
                contract.Override.contractDisplayStyle ==
                ContractDisplayStyle.BaseCampaignStory
            )
            {
                __result -= 60;
                return false;
            }
            if (contract.IsFlashpointCampaignContract)
            {
                __result -= 40;
                return false;
            }
            if (contract.IsFlashpointContract)
            {
                __result -= 20;
                return false;
            }
            if (contract.TargetSystem == "starsystemdef_" + Sim.CurSystem.Name)
            {
                return false;
            }
            __result += 20;
            return false;
        }
    }

    // patch - cheat_introskip_on
    [HarmonyPatch(typeof(IntroCinematicLauncher))]
    [HarmonyPatch("Init")]
    public class
    Patch_IntroCinematicLauncher_Init
    {
        public static void
        Postfix(IntroCinematicLauncher __instance)
        {
            if (Local.state.getItem("cheat_introskip_on") == "")
            {
                return;
            }
            Traverse.Create(__instance).Field("state").SetValue(3);
        }
    }
    [HarmonyPatch(typeof(SplashLauncher))]
    [HarmonyPatch("OnStart")]
    public class
    Patch_SplashLauncher_OnStart
    {
        public static bool
        Prefix()
        {
            if (Local.state.getItem("cheat_introskip_on") == "")
            {
                return true;
            }
            return false;
        }
    }
    [HarmonyPatch(typeof(SplashLauncher))]
    [HarmonyPatch("OnStep")]
    public class
    Patch_SplashLauncher_OnStep
    {
        public static bool
        Prefix()
        {
            if (Local.state.getItem("cheat_introskip_on") == "")
            {
                return true;
            }
            return false;
        }
    }
    [HarmonyPatch(typeof(SplashLauncher))]
    [HarmonyPatch("Start")]
    public class
    Patch_SplashLauncher_Start
    {
        public static bool
        Prefix(SplashLauncher __instance)
        {
            if (Local.state.getItem("cheat_introskip_on") == "")
            {
                return true;
            }
            Traverse.Create(__instance).Field("currentState").SetValue(3);
            Traverse.Create(__instance)
                .Field("activate")
                .GetValue<ActivateAfterInit>()
                .enabled = true;
            return false;
        }
    }
    [HarmonyPatch(typeof(SplashLauncher))]
    [HarmonyPatch("Update")]
    public class
    Patch_SplashLauncher_Update
    {
        public static bool
        Prefix()
        {
            if (Local.state.getItem("cheat_introskip_on") == "")
            {
                return true;
            }
            return false;
        }
    }

    // patch - cheat_mechbayrepair_multi
    [HarmonyPatch(typeof(SimGameState))]
    [HarmonyPatch("UpdateMechLabWorkQueue")]
    public class
    Patch_SimGameState_UpdateMechLabWorkQueue
    {
        public static bool
        Prefix(SimGameState __instance, bool passDay)
        {
            /*
             * this function will patch UpdateMechLabWorkQueue
             * to simultaneously repair additional mechs in available mechbays
             */
            if (Local.state.getItem("cheat_mechbayrepair_multi") == "")
            {
                return true;
            }
            var sim = __instance;
            // number of available mechbays
            var nn = Math.Min(
                sim.MechLabQueue.Count(),
                sim.CompanyStats.GetValue<int>(
                    sim.Constants.Story.MechBayPodsID
                )
            );
            for (var ii = 1; ii < nn && passDay; ii += 1)
            {
                // simultaneously repair additional mechs in available mechbays
                sim.MechLabQueue[ii].PayCost(sim.MechTechSkill);
            }
            return true;
        }
    }
    [HarmonyPatch(typeof(TaskTimelineWidget))]
    [HarmonyPatch("RefreshEntries")]
    public class
    Patch_TaskTimelineWidget_RefreshEntries
    {
        public static void
        Postfix(
            TaskTimelineWidget __instance,
            SimGameState ___Sim,
            Dictionary<WorkOrderEntry, TaskManagementElement> ___ActiveItems
        )
        {
            /*
             * this function will patch TaskTimelineWidget
             * to update ui's repair-time estimate
             */
            if (Local.state.getItem("cheat_mechbayrepair_multi") == "")
            {
                return;
            }
            var sim = ___Sim;
            // number of available mechbays
            var nn = Math.Min(
                sim.MechLabQueue.Count(),
                sim.CompanyStats.GetValue<int>(
                    sim.Constants.Story.MechBayPodsID
                )
            );
            var cumulativeDays = 0;
            for (var ii = 1; ii < sim.MechLabQueue.Count; ii += 1)
            {
                if (!___ActiveItems.TryGetValue(
                    sim.MechLabQueue[ii],
                    out TaskManagementElement elem
                ))
                {
                    continue;
                }
                if (!___Sim.WorkOrderIsMechTech(sim.MechLabQueue[ii].Type))
                {
                    elem.UpdateItem(0);
                    continue;
                }
                // simultaneously repair additional mechs in available mechbays
                if (1 <= ii && ii + 1 < nn)
                {
                    elem.UpdateItem(0);
                    continue;
                }
                // default workqueue
                cumulativeDays = elem.UpdateItem(cumulativeDays);
            }
            __instance.SortEntries();
        }
    }

    // patch - cheat_enginehscap_infinite
    /*
    [HarmonyPatch(typeof(MechEngineer.Features.Engines.Engine))]
    [HarmonyPatch("HeatSinksInternalMaxCount")]
    public class
    Patch_Engine_HeatSinksInternalMaxCount
    {
        public static void
        Postfix(ref int __result)
        {
            if (Local.state.getItem("cheat_enginehscap_infinite") != "")
            {
                __result = 100;
            }
        }
    }
    */

    // patch - cheat_mechcomponentsize_1
    /*
    [HarmonyPatch(typeof(MechComponentDef), MethodType.Constructor)]
    [HarmonyPatch(new Type[] {
        typeof(ComponentType),
        typeof(MechComponentType),
        typeof(EffectData[]),
        typeof(TagSet),
        typeof(DescriptionDef),
        typeof(string),
        typeof(string),
        typeof(string),
        typeof(int),
        typeof(float),
        typeof(ChassisLocations),
        typeof(ChassisLocations),
        typeof(bool)
    })]
    public class
    Patch_MechComponentDef_constructor
    {
        public static bool
        Prefix(ref int InventorySize)
        {
            InventorySize = 1;
            return true;
        }
        public static void
        Postfix(MechComponentDef __instance)
        {
            Traverse.Create(__instance).Property(
                "InventorySize"
            ).SetValue(1);
        }
    }
    [HarmonyPatch(typeof(MechComponentDef), MethodType.Constructor)]
    [HarmonyPatch(new Type[] {
        typeof(MechComponentDef)
    })]
    public class
    Patch_MechComponentDef_constructor2
    {
        public static void
        Postfix(MechComponentDef __instance)
        {
            Traverse.Create(__instance).Property(
                "InventorySize"
            ).SetValue(1);
        }
    }
    */

    // patch - cheat_mechweightlimit_off
    [HarmonyPatch(typeof(MechValidationRules))]
    [HarmonyPatch("ValidateMechTonnage")]
    public class
    Patch_MechValidationRules_ValidateMechTonnage
    {
        public static void
        Postfix(ref Dictionary<MechValidationType, List<Text>> errorMessages)
        {
            if (
                Local.state.getItem("cheat_mechweightlimit_off") == ""
            )
            {
                return;
            }
            errorMessages[MechValidationType.Overweight].Clear();
        }
    }

    // patch - cheat_pilotabilitycooldown_0
    [HarmonyPatch(typeof(DictionaryStore<AbilityDef>))]
    [HarmonyPatch("Add")]
    public class
    Patch_DictionaryStore_AbilityDef_Add
    {
        public static bool
        Prefix(AbilityDef item)
        {
            if (Local.state.getItem("cheat_pilotabilitycooldown_0") != "")
            {
                Traverse.Create(item).Property(
                    "ActivationCooldown"
                ).SetValue(0);
            }
            return true;
        }
    }

    // patch - cheat_pilotskill_reset
    [HarmonyPatch(typeof(SGBarracksMWDetailPanel))]
    [HarmonyPatch("OnSkillsSectionClicked")]
    public class
    Patch_SGBarracksMWDetailPanel_OnSkillsSectionClicked
    {
        public static bool
        Prefix(SGBarracksMWDetailPanel __instance, Pilot ___curPilot)
        {
            if (
                Local.state.getItem("cheat_pilotskill_reset") == ""
                || !(
                    Input.GetKey(KeyCode.LeftShift)
                    || Input.GetKey(KeyCode.RightShift)
                )
            )
            {
                return true;
            }
            GenericPopupBuilder
                .Create(
                    "Pilot Reskill",
                    "This will set skills to 1 and refund all XP."
                )
                .AddButton("Cancel")
                .AddButton("Pilot Reskill", () =>
                {
                    PilotReskill(__instance, ___curPilot);
                })
                .CancelOnEscape()
                .AddFader(
                    LazySingletonBehavior<UIManager>
                        .Instance
                        .UILookAndColorConstants
                        .PopupBackfill
                )
                .Render();
            return false;
        }

        public static void
        PilotReskill(SGBarracksMWDetailPanel __instance, Pilot ___curPilot)
        {
            var sim = UnityGameInstance.BattleTechGame.Simulation;
            var pilotDef = ___curPilot.pilotDef.CopyToSim();
            foreach (var val in sim.Constants.Story.CampaignCommanderUpdateTags)
            {
                if (!sim.CompanyTags.Contains(val))
                {
                    sim.CompanyTags.Add(val);
                }
            }
            // save xpUsed
            var xpUsed = (
                sim.GetLevelRangeCost(1, pilotDef.SkillPiloting - 1)
                + sim.GetLevelRangeCost(1, pilotDef.SkillGunnery - 1)
                + sim.GetLevelRangeCost(1, pilotDef.SkillGuts - 1)
                + sim.GetLevelRangeCost(1, pilotDef.SkillTactics - 1)
            );
            // reset ___curPilot
            Traverse.Create(pilotDef).Property("BasePiloting").SetValue(1);
            Traverse.Create(pilotDef).Property("BaseGunnery").SetValue(1);
            Traverse.Create(pilotDef).Property("BaseGuts").SetValue(1);
            Traverse.Create(pilotDef).Property("BaseTactics").SetValue(1);
            Traverse.Create(pilotDef).Property("BonusPiloting").SetValue(1);
            Traverse.Create(pilotDef).Property("BonusGunnery").SetValue(1);
            Traverse.Create(pilotDef).Property("BonusGuts").SetValue(1);
            Traverse.Create(pilotDef).Property("BonusTactics").SetValue(1);
            pilotDef.abilityDefNames.Clear();
            pilotDef.SetSpentExperience(0);
            pilotDef.ForceRefreshAbilityDefs();
            pilotDef.ResetBonusStats();
            ___curPilot.FromPilotDef(pilotDef);
            // reset xpUsed
            ___curPilot.AddExperience(0, "reset", xpUsed);
            // ___curPilot.AddExperience(0, "reset", 1234567);
            __instance.DisplayPilot(___curPilot);
        }
    }

    // patch - cheat_pilotskillcost_low

    // patch - cheat_pilotxpnag_off
    [HarmonyPatch(typeof(SimGameState))]
    [HarmonyPatch("ShowMechWarriorTrainingNotif")]
    public class
    Patch_SimGameState_ShowMechWarriorTrainingNotif
    {
        public static bool
        Prefix(SimGameState __instance)
        {
            if (Local.state.getItem("cheat_pilotxpnag_off") == "")
            {
                return true;
            }
            return false;
        }
    }

    // patch - cheat_sensorlockfire_on
    [HarmonyPatch(typeof(OrderSequence))]
    [HarmonyPatch("ConsumesActivation", MethodType.Getter)]
    public class
    Patch_OrderSequence_ConsumesActivation
    {
        public static void
        Postfix(
            OrderSequence __instance,
            ref bool __result,
            AbstractActor ___owningActor
        )
        {
            if (Local.state.getItem("cheat_sensorlockfire_on") == "")
            {
                return;
            }
            if (__instance is SensorLockSequence)
            {
                __result = false;
            }
        }
    }
    [HarmonyPatch(typeof(SelectionStateSensorLock))]
    [HarmonyPatch("CanActorUseThisState")]
    public class
    Patch_SelectionStateSensorLock_CanActorUseThisState
    {
        public static void
        Postfix(
            AbstractActor actor,
            ref bool __result
        )
        {
            if (Local.state.getItem("cheat_sensorlockfire_on") == "")
            {
                return;
            }
            var flag = actor?.GetPilot().GetActiveAbility(
                ActiveAbilityID.SensorLock
            )?.IsAvailable;
            if (flag != null)
            {
                __result = (bool)flag;
            }
        }
    }
    [HarmonyPatch(typeof(SelectionStateSensorLock))]
    [HarmonyPatch("ConsumesFiring", MethodType.Getter)]
    public class
    Patch_SelectionStateSensorLock_ConsumesFiring
    {
        public static void
        Postfix(ref bool __result)
        {
            if (Local.state.getItem("cheat_sensorlockfire_on") == "")
            {
                return;
            }
            __result = false;
        }
    }
    [HarmonyPatch(typeof(SelectionStateSensorLock))]
    [HarmonyPatch("ConsumesMovement", MethodType.Getter)]
    public class
    Patch_SelectionStateSensorLock_ConsumesMovement
    {
        public static void
        Postfix(ref bool __result)
        {
            if (Local.state.getItem("cheat_sensorlockfire_on") == "")
            {
                return;
            }
            __result = false;
        }
    }
    [HarmonyPatch(typeof(SelectionStateSensorLock))]
    [HarmonyPatch("CreateFiringOrders")]
    public class
    Patch_SelectionStateSensorLock_CreateFiringOrders
    {
        public static void
        Postfix(
            SelectionStateSensorLock __instance,
            string button
        )
        {
            if (Local.state.getItem("cheat_sensorlockfire_on") == "")
            {
                return;
            }
            if (button == "BTN_FireConfirm" && __instance.HasTarget)
            {
                Local.stateSelectionStateSensorLock = __instance;
            }
        }
    }
    [HarmonyPatch(typeof(SensorLockSequence))]
    [HarmonyPatch("CompleteOrders")]
    public class
    Patch_SensorLockSequence_CompleteOrders
    {
        public static bool
        Prefix(
            AbstractActor ___owningActor
        )
        {
            if (Local.state.getItem("cheat_sensorlockfire_on") == "")
            {
                return true;
            }
            // Force the ability to be on cooldown
            var ability = ___owningActor?.GetPilot().GetActiveAbility(
                ActiveAbilityID.SensorLock
            );
            if (ability == null)
            {
                return false;
            }
            ability.ActivateMiniCooldown();
            if (Local.stateSelectionStateSensorLock != null)
            {
                Traverse.Create(
                    Local.stateSelectionStateSensorLock
                ).Method("ClearTargetedActor").GetValue();
                // Local.stateSelectionStateSensorLock.BackOut();
                Local.stateSelectionStateSensorLock = null;
            }
            return false;
        }
    }
    [HarmonyPatch(typeof(SensorLockSequence))]
    [HarmonyPatch("ConsumesFiring", MethodType.Getter)]
    public class
    Patch_SensorLockSequence_ConsumesFiring
    {
        public static void
        Postfix(ref bool __result)
        {
            if (Local.state.getItem("cheat_sensorlockfire_on") == "")
            {
                return;
            }
            __result = false;
        }
    }
    [HarmonyPatch(typeof(SensorLockSequence))]
    [HarmonyPatch("ConsumesMovement", MethodType.Getter)]
    public class
    Patch_SensorLockSequence_ConsumesMovement
    {
        public static void
        Postfix(ref bool __result)
        {
            if (Local.state.getItem("cheat_sensorlockfire_on") == "")
            {
                return;
            }
            __result = false;
        }
    }

    // patch - cheat_shopsellprice_high

    // patch - cheat_sprintmelee_on
    [HarmonyPatch(typeof(Pathing))]
    [HarmonyPatch("GetMeleeDestsForTarget")]
    public class
    Patch_Pathing_GetMeleeDestsForTarget
    {
        public static IEnumerable<CodeInstruction>
        Transpiler(
            IEnumerable<CodeInstruction> instructions
        )
        {
            if (Local.state.getItem("cheat_sprintmelee_on") == "")
            {
                return instructions;
            }
            List<CodeInstruction> list = instructions.ToList();
            // transpile - replace - MeleeGrid and WalkingGrid to SprintingGrid
            list = list.MethodReplacer(
                AccessTools.Property(
                    typeof(Pathing),
                    "MeleeGrid"
                ).GetGetMethod(true),
                AccessTools.Property(
                    typeof(Pathing),
                    "SprintingGrid"
                ).GetGetMethod(true)
            ).MethodReplacer(
                AccessTools.Property(
                    typeof(Pathing),
                    "WalkingGrid"
                ).GetGetMethod(true),
                AccessTools.Property(
                    typeof(Pathing),
                    "SprintingGrid"
                ).GetGetMethod(true)
            ).ToList();
            // transpile - nop - if (vector.magnitude < 10f) { num = 1; }
            // IL_014C: ldloca.s  V_4
            // IL_014E: call      instance float32 [UnityEngine.CoreModule]UnityEngine.Vector3::get_magnitude()
            // IL_0153: ldc.r4    10
            // IL_0158: bge.un.s  IL_016C
            // IL_015A: ldc.i4.1
            // IL_015B: stloc.3
            MethodInfo mi = AccessTools.Property(
                typeof(Vector3),
                "magnitude"
            ).GetGetMethod();
            var ii = list.FindIndex((instruction) =>
            {
                return mi.Equals(instruction.operand);
            }) - 1;
            for (var jj = 0; jj < 6; jj += 1)
            {
                list[ii + jj].opcode = OpCodes.Nop;
            }
            return list;
        }
    }

    // patch - cheat_sprintshoot_on
    [HarmonyPatch(typeof(AbstractActor))]
    [HarmonyPatch("get_CanShootAfterSprinting")]
    public class
    Patch_AbstractActor_get_CanShootAfterSprinting
    {
        public static void
        Postfix(ref bool __result)
        {
            if (Local.state.getItem("cheat_sprintshoot_on") == "")
            {
                return;
            }
            __result = true;
        }

    }

    // patch - difficulty_settings
    [HarmonyPatch(typeof(SimGameDifficultySettingList))]
    [HarmonyPatch("FromJSON")]
    public class
    Patch_SimGameDifficultySettingList_FromJSON
    {
        public static bool
        Prefix(ref string json)
        {
            var ii = json.LastIndexOf("]");
            json = json.Substring(0, ii) + @",
{
    ""DefaultIndex"": 0,
    ""Enabled"": true,
    ""ID"": ""cheat_armorinstall_free"",
    ""Name"": ""cheat_armorinstall_free"",
    ""Options"": [
        {
            ""DifficultyConstants"": [
                {
                    ""ConstantName"": ""ArmorInstallCost"",
                    ""ConstantType"": ""MechLab"",
                    ""ConstantValue"": ""0""
                },
                {
                    ""ConstantName"": ""ArmorInstallTechPoints"",
                    ""ConstantType"": ""MechLab"",
                    ""ConstantValue"": ""0""
                }
            ],
            ""ID"": ""cheat_armorinstall_free_on"",
            ""Name"": ""On"",
            ""TelemetryEventDesc"": ""1""
        }
    ],
    ""StartOnly"": false,
    ""TelemetryEventName"": ""cheat_armorinstall_free"",
    ""Toggle"": false,
    ""Tooltip"": """",
    ""UIOrder"": 1000,
    ""Visible"": false
},
{
    ""DefaultIndex"": 0,
    ""Enabled"": true,
    ""ID"": ""cheat_contractreputationloss_low"",
    ""Name"": ""cheat_contractreputationloss_low"",
    ""Options"": [
        {
            ""DifficultyConstants"": [
                {
                    ""ConstantName"": ""TargetRepGoodFaithMod"",
                    ""ConstantType"": ""CareerMode"",
                    ""ConstantValue"": ""0""
                },
                {
                    ""ConstantName"": ""TargetRepSuccessMod"",
                    ""ConstantType"": ""CareerMode"",
                    ""ConstantValue"": ""-0.25""
                },
                {
                    ""ConstantName"": ""TargetRepGoodFaithMod"",
                    ""ConstantType"": ""Story"",
                    ""ConstantValue"": ""0""
                },
                {
                    ""ConstantName"": ""TargetRepSuccessMod"",
                    ""ConstantType"": ""Story"",
                    ""ConstantValue"": ""-0.25""
                }
            ],
            ""ID"": ""cheat_contractreputationloss_low_on"",
            ""Name"": ""On"",
            ""TelemetryEventDesc"": ""1""
        }
    ],
    ""StartOnly"": false,
    ""TelemetryEventName"": ""cheat_contractreputationloss_low"",
    ""Toggle"": false,
    ""Tooltip"": ""lose -25% (instead of -80%) reputation from contract-target"",
    ""UIOrder"": 1000,
    ""Visible"": false
},
{
    ""DefaultIndex"": 0,
    ""Enabled"": true,
    ""ID"": ""cheat_contractban_off"",
    ""Name"": ""cheat_contractban_off"",
    ""Options"": [
        {
            ""DifficultyConstants"": [
                {
                    ""ConstantName"": ""DislikedMaxContractDifficulty"",
                    ""ConstantType"": ""CareerMode"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""FriendlyMaxContractDifficulty"",
                    ""ConstantType"": ""CareerMode"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""HatedMaxContractDifficulty"",
                    ""ConstantType"": ""CareerMode"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""HonoredMaxContractDifficulty"",
                    ""ConstantType"": ""CareerMode"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""IndifferentMaxContractDifficulty"",
                    ""ConstantType"": ""CareerMode"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""LikedMaxContractDifficulty"",
                    ""ConstantType"": ""CareerMode"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""LoathedMaxContractDifficulty"",
                    ""ConstantType"": ""CareerMode"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""DislikedMaxContractDifficulty"",
                    ""ConstantType"": ""Story"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""FriendlyMaxContractDifficulty"",
                    ""ConstantType"": ""Story"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""HatedMaxContractDifficulty"",
                    ""ConstantType"": ""Story"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""HonoredMaxContractDifficulty"",
                    ""ConstantType"": ""Story"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""IndifferentMaxContractDifficulty"",
                    ""ConstantType"": ""Story"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""LikedMaxContractDifficulty"",
                    ""ConstantType"": ""Story"",
                    ""ConstantValue"": ""10""
                },
                {
                    ""ConstantName"": ""LoathedMaxContractDifficulty"",
                    ""ConstantType"": ""Story"",
                    ""ConstantValue"": ""10""
                }
            ],
            ""ID"": ""cheat_contractban_off_on"",
            ""Name"": ""On"",
            ""TelemetryEventDesc"": ""1""
        }
    ],
    ""StartOnly"": false,
    ""TelemetryEventName"": ""cheat_contractban_off"",
    ""Toggle"": false,
    ""Tooltip"": ""unlock all contract-difficulties"",
    ""UIOrder"": 1000,
    ""Visible"": false
},
{
    ""DefaultIndex"": 0,
    ""Enabled"": true,
    ""ID"": ""cheat_pilotskillcost_low"",
    ""Name"": ""cheat_pilotskillcost_low"",
    ""Options"": [
        {
            ""DifficultyConstants"": [
                {
                    ""ConstantName"": ""PilotLevelCostExponent"",
                    ""ConstantType"": ""Pilot"",
                    ""ConstantValue"": ""1.1""
                }
            ],
            ""ID"": ""cheat_pilotskillcost_low_on"",
            ""Name"": ""On"",
            ""TelemetryEventDesc"": ""1""
        }
    ],
    ""StartOnly"": false,
    ""TelemetryEventName"": ""cheat_pilotskillcost_low"",
    ""Toggle"": false,
    ""Tooltip"": ""cheap pilot-skills"",
    ""UIOrder"": 1000,
    ""Visible"": false
},
{
    ""DefaultIndex"": 0,
    ""Enabled"": true,
    ""ID"": ""cheat_contractsalvage_300"",
    ""Name"": ""cheat_contractsalvage_300"",
    ""Options"": [
        {
            ""DifficultyConstants"": [
                {
                    ""ConstantName"": ""ContractFloorSalvageBonus"",
                    ""ConstantType"": ""Finances"",
                    ""ConstantValue"": ""300""
                },
                {
                    ""ConstantName"": ""PrioritySalvageModifier"",
                    ""ConstantType"": ""Salvage"",
                    ""ConstantValue"": ""0""
                }
            ],
            ""ID"": ""cheat_contractsalvage_300_on"",
            ""Name"": ""On"",
            ""TelemetryEventDesc"": ""1""
        }
    ],
    ""StartOnly"": false,
    ""TelemetryEventName"": ""cheat_contractsalvage_300"",
    ""Toggle"": false,
    ""Tooltip"": """",
    ""UIOrder"": 1000,
    ""Visible"": false
},
{
    ""DefaultIndex"": 0,
    ""Enabled"": true,
    ""ID"": ""cheat_shopsellprice_high"",
    ""Name"": ""cheat_shopsellprice_high"",
    ""Options"": [
        {
            ""DifficultyConstants"": [
                {
                    ""ConstantName"": ""ShopSellModifier"",
                    ""ConstantType"": ""Finances"",
                    ""ConstantValue"": ""0.5""
                }
            ],
            ""ID"": ""cheat_shopsellprice_high_on"",
            ""Name"": ""On"",
            ""TelemetryEventDesc"": ""1""
        }
    ],
    ""StartOnly"": false,
    ""TelemetryEventName"": ""cheat_shopsellprice_high"",
    ""Toggle"": false,
    ""Tooltip"": """",
    ""UIOrder"": 1000,
    ""Visible"": false
}
            " + json.Substring(ii);
            return true;
        }
    }
    [HarmonyPatch(typeof(SimGameConstantOverride))]
    [HarmonyPatch("AddOverride")]
    [HarmonyPatch(new Type[] {
        typeof(SimGameDifficulty.DifficultySetting),
        typeof(int),
        typeof(bool)
    })]
    public class
    Patch_SimGameConstantOverride_AddOverride1
    {
        public static bool
        Prefix(SimGameDifficulty.DifficultySetting setting)
        {
            /*
             * this function will enable/disable difficulty-settings-cheats
             * based on settings.json
             */
            if (
                setting.ID.IndexOf("cheat_") == 0
                && Local.state.getItem(setting.ID) == ""
            )
            {
                return false;
            }
            return true;
        }
    }
    [HarmonyPatch(typeof(SimGameConstantOverride))]
    [HarmonyPatch("AddOverride")]
    [HarmonyPatch(new Type[] {
        typeof(string),
        typeof(string),
        typeof(object),
        typeof(bool)
    })]
    public class
    Patch_SimGameConstantOverride_AddOverride2
    {
        public static bool
        Prefix(string constantType, ref string key, object value)
        {
            /*
             * this function will save difficulty-settings to Local.state
             */
            Local.state.setItem(constantType + "_" + key, value);
            return true;
        }
    }
    [HarmonyPatch(typeof(SimGameDifficulty))]
    [HarmonyPatch("ApplyAllSettings")]
    public class
    Patch_SimGameDifficulty_ApplyAllSettings
    {
        public static void
        Postfix()
        {
            Local.stateChangedAfter();
        }
    }
    [HarmonyPatch(typeof(SimGameDifficultySettingsModule))]
    [HarmonyPatch("SaveSettings")]
    public class
    Patch_SimGameDifficultySettingsModule_SaveSettings
    {
        public static void
        Postfix()
        {
            Local.stateChangedAfter();
        }
    }
}
