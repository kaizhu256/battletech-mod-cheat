# BattletechModCheat

#### changelog 2020.8.29
- update roguetech dll dependencies
- update cheat_salvagefullmech_on to improve repair salvage
- none

#### todo
- none

#### install instruction
1.  install BattleTech and ModTek
2.  copy this mod into directory BATTLETECH\Mods\
3.  when first run, this mod will automatically create a file `settings.json`
    in its own directory with below cheat-settings
4.  to enable/disable cheats, edit file
    `BATTLETECH\Mods\BattletechModCheat\settings.json`
    by replacing each cheat's value with either "1" or empty-string "",
    respectively
5.  if you are updating roguetech, repeat steps 2 to 4
    each time roguetech is updated
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

    // cheat - salvage full-mech from one mech-part
    // (roguetech-compatible)
    "cheat_salvagefullmech_on": "1",

    // cheat - 300 salvage in contracts
    // (roguetech-compatible)
    "cheat_salvagetotal_300": "1",

    // cheat - sort contracts by difficulty
    "cheat_contractsort_bydifficulty": "",

    // cheat - skip intro
    // (roguetech-compatible)
    "cheat_introskip_on": "1",

    // cheat - in roguetech, disable engine-limits on heatsinks
    // (roguetech-compatible)
    "cheat_enginevalidation_off": "1",

    // cheat - mechbay2 and mechbay3 can repair 2nd and 3rd mech simultaneously
    "cheat_mechbayrepair_multi": "",

    // cheat - mech-components take up only 1 slot
    // (roguetech-compatible)
    "cheat_mechcomponentsize_1": "1",

    // cheat - can add weapon/equipment/armor to mech over its weight-limit
    // (roguetech-compatible)
    "cheat_mechweightlimit_off": "1",

    // cheat - pilot-abilities have have 0 cooldown
    // (roguetech-compatible)
    "cheat_pilotabilitycooldown_0": "1",

    // cheat - reset pilot-skills by shift-clicking skills-tab in barracks
    "cheat_pilotskill_reset": "",

    // cheat - pilot-skills cost less
    // (roguetech-compatible)
    "cheat_pilotskillcost_low": "1",

    // cheat - unused pilot-xp is no longer nagged by darius if pilot-skills are maxed
    // (roguetech-compatible)
    "cheat_pilotxpnag_off": "1",

    // cheat - mech can sensorlock-and-fire
    "cheat_sensorlockfire_on": "",

    // cheat - sell items to shop for 50% (instead of 10%)
    // (roguetech-compatible)
    "cheat_shopsellprice_high": "0",

    // cheat - mech can sprint-and-melee
    "cheat_sprintmelee_on": "",

    // cheat - mech can sprint-and-shoot
    "cheat_sprintshoot_on": "",
}
```


# misc faq on battletech

#### shot modifier
- https://gameplay.tips/guides/2419-battletech.html
- a shot modifier of +6 reduces your hit chance by 30%, a shot modifier of +10 does so by 50% and a shot modifier of +14 does so by 60% (10x5 + 4x2.5).

#### start battletech with mods reset
```shell
(cd ~/Documents/"My Games"/BattleTech/mods && rm -rf HBS/Cache && rm -rf HBS/Database) && start /g/Games/BATTLETECH/BattleTech.exe
(cd /g/Games/BATTLETECH/Mods && rm -rf .modtek/Cache && rm -rf .modtek/Database) && start /g/Games/BATTLETECH/BattleTech.exe
```

#### dir
```shell
# dir - game
cd /g/Games/BATTLETECH
cd /g/Games/BATTLETECH/BattleTech_Data/StreamingAssets/data
cd /g/Games/BATTLETECH/BattleTech_Data/Managed

# dir - mods
cd ~/Documents/"My Games"/BattleTech/mods
cd /g/Games/BATTLETECH/Mods

# dir - saved games
cd ~/AppData/Local/GOG.com/Galaxy/Applications/50593543263669699/Storage/Shared/Files/C0/SGS1
```

#### [Bug Workaround] Assassination Mission Uncompleteable.
This is a known scripting bug that the dev's haven't fixed yet.
If you kill the target of an assassination mission before you get a message saying the target is fleeing, then the mission bugs out and you cannot complete the mission.

The work around is to enable the debug mode by exiting the game opening regedit and adding the line
"last_debug_state_h176629417"=dword:1
to the [HKEY_CURRENT_USER\Software\Harebrained Schemes\BATTLETECH]

Then get back into BATTLETECH, load the save, then press CTRL+SHIFT+-
This will pop up a box in the upper left with console command buttons.
Make sure you press the minus key between 0 and =. The numpad minus won't do it.

One of the command buttons is a 'Complete Mission' button. Pressing it will complete the mission for you. So far this is the only solution I have found to this bug.

Then, save the game again exit the game, either delete the added registry key or change the dword value to 0 to disable the debug mode. Load the game and your save and continue as if nothing ever happened. :)

# json-parse-stack-trace
```csharp
debugLog cheat_componentsize_1   at System.Environment.get_StackTrace () [0x00000] in <d7ac571ca2d04b2f981d0d886fa067cf>:0

  at BattletechModCheat.Patch_JSONSerializationUtility_RehydrateObjectFromDictionary.Prefix (System.Collections.Generic.Dictionary`2[TKey,TValue] values) [0x00000] in <03a507d7e2ff4278943321530082f36d>:0

  at HBS.Util.JSONSerializationUtility.RehydrateObjectFromDictionary_Patch1 (System.Object , System.Collections.Generic.Dictionary`2[TKey,TValue] , System.String , HBS.Stopwatch , HBS.Stopwatch , HBS.Util.JSONSerializationUtility+RehydrationFilteringMode , System.Func`2[System.String,System.Boolean][] ) [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0

  at HBS.Util.JSONSerializationUtility.FromJSON[T] (T target, System.String json, HBS.Util.JSONSerializationUtility+RehydrationFilteringMode filteringMode, System.Func`2[System.String,System.Boolean][] memberNamePredicates) [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0
	public static class JSONSerializationUtility
		public static string FromJSON<T>(T target, string json, JSONSerializationUtility.RehydrationFilteringMode filteringMode = JSONSerializationUtility.RehydrationFilteringMode.Any, params Func<string, bool>[] memberNamePredicates)
		{
			Dictionary<string, object> values;
			try
			{
				values = (Dictionary<string, object>)JSON.ToObject(json, true);
			}
			catch
			{
				values = (Dictionary<string, object>)JSON.ToObject(JSONSerializationUtility.StripHBSCommentsFromJSON(json), true);
			}
			Stopwatch convertTime = null;
			Stopwatch reflectTime = null;
			return JSONSerializationUtility.RehydrateObjectFromDictionary(target, values, "", convertTime, reflectTime, filteringMode, memberNamePredicates);
		}

  at HBS.Util.JSONSerializationUtility.FromJSON[T] (T target, System.String json) [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0
	public static class JSONSerializationUtility
		public static string FromJSON<T>(T target, string json)
		{
			return JSONSerializationUtility.FromJSON<T>(target, json, JSONSerializationUtility.RehydrationFilteringMode.Any, null);
		}

  at BattleTech.WeaponDef.FromJSON (System.String json) [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0
	public class WeaponDef : MechComponentDef, IJsonTemplated, DataManager.ILoadDependencies
  		public new void FromJSON(string json)
		{
			JSONSerializationUtility.FromJSON<WeaponDef>(this, json);
			base.ComponentSubType = MechComponentType.Weapon;
			if (base.statusEffects == null)
			{
				base.statusEffects = new EffectData[0];
			}
			this.UpgradeToDataDrivenEnums();
			if (base.additionalData == null)
			{
				base.additionalData = new SerializableVariant[0];
			}
		}

  at BattleTech.Data.DataManager+JsonLoadRequest`1[T].OnLoadedWithJSON (System.String json) [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0
		public abstract class JsonLoadRequest<T> : DataManager.StringDataLoadRequest<T> where T : class, IJsonTemplated, new()
			protected virtual void OnLoadedWithJSON(string json)
			{
				if (string.IsNullOrEmpty(json))
				{
					base.NotifyLoadFailed();
					return;
				}
				this.resource = Activator.CreateInstance<T>();
				this.resource.FromJSON(json);
				base.TryLoadDependencies(this.resource as DataManager.ILoadDependencies);
			}
			protected JsonLoadRequest(DataManager dataManager, BattleTechResourceType resourceType, string resourceId, uint requestWeight, PrewarmRequest prewarm) : base(dataManager, resourceType, resourceId, requestWeight, prewarm)
			{
				this.onTextLoaded = (Action<string>)Delegate.Combine(this.onTextLoaded, new Action<string>(this.OnLoadedWithJSON));
			}

  at BattleTech.Data.DataManager+StringDataLoadRequest`1[T].OnLoadedWithText (System.String text) [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0
		public abstract class StringDataLoadRequest<T> : DataManager.ResourceLoadRequest<T> where T : class
			protected void OnLoadedWithText(string text)
			{
				if (string.IsNullOrEmpty(text))
				{
					base.NotifyLoadFailed();
					return;
				}
				if (this.onTextLoaded != null)
				{
					this.onTextLoaded(text);
				}
			}
			protected void OnLoadedWithTextAsset(TextAsset asset)
			{
				if (asset == null)
				{
					base.NotifyLoadFailed();
					return;
				}
				this.OnLoadedWithText(asset.text);
			}

  at BattleTech.Data.DataManager+StringDataLoadRequest`1[T].OnLoadedWithTextAsset (UnityEngine.TextAsset asset) [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0
		public abstract class StringDataLoadRequest<T> : DataManager.ResourceLoadRequest<T> where T : class
			protected void OnLoadedWithTextAsset(TextAsset asset)
			{
				if (asset == null)
				{
					base.NotifyLoadFailed();
					return;
				}
				this.OnLoadedWithText(asset.text);
			}
			public override void Load()
			{
				try
				{
					base.Load();
					if (base.State == DataManager.FileLoadRequest.RequestState.Requested)
					{
						base.State = DataManager.FileLoadRequest.RequestState.Processing;
						base.StartTimeoutTracking(0f);
						if (this.manifestEntry.IsFileAsset)
						{
							this.dataManager.dataLoader.LoadResource(this.manifestEntry.FilePath, new Action<string>(this.OnLoadedWithText));
						}
						else if (this.manifestEntry.IsResourcesAsset)
						{
							this.dataManager.RequestResourcesLoad<TextAsset>(this.manifestEntry.ResourcesLoadPath, new Action<TextAsset>(this.OnLoadedWithTextAsset));
						}
						else if (this.manifestEntry.IsAssetBundled)
						{
							this.dataManager.AssetBundleManager.RequestAsset<TextAsset>(this.resourceType, this.resourceId, new Action<TextAsset>(this.OnLoadedWithTextAsset));
						}
						else
						{
							DataManager.FileLoadRequest.logger.Log(string.Format("Text file {0} Request package type not supported", this.manifestEntry.Id));
							base.NotifyLoadFailed();
						}
					}
				}
				catch (Exception ex)
				{
					base.NotifyLoadFailed();
					string message = string.Format("Exception caught while loading manifest entry Name:[{0}] FileName:[{1}] AssetBundleName:[{2}]", this.manifestEntry.Name, this.manifestEntry.FileName, this.manifestEntry.AssetBundleName);
					DataManager.FileLoadRequest.logger.LogError(message, ex);
					throw new Exception(message, ex);
				}
			}

  at BattleTech.Assetbundles.AssetBundleManager.RequestAsset[T] (BattleTech.BattleTechResourceType type, System.String id, System.Action`1[T] loadedCallback) [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0
		public abstract class ResourceLoadRequest<T> : DataManager.FileLoadRequest where T : class
			public override void OnLoaded()
			{
				this.StoreData();
				this.SetLoadComplete();
			}
			protected void TryLoadDependencies(DataManager.ILoadDependencies dependencyLoader)
			{
				this.DependencyLoader = dependencyLoader;
				if (this.DependencyLoader != null)
				{
					this.State = DataManager.FileLoadRequest.RequestState.AwaitingDependencies;
					this.dataManager.RequestDependencies(this);
					return;
				}
				this.OnLoaded();
			}
					this.loadOverride(this.resourceId, delegate(object item)
					{
						if (item == null)
						{
							base.NotifyLoadFailed();
							return;
						}
						this.resource = (item as T);
						base.TryLoadDependencies(this.resource as DataManager.ILoadDependencies);
					});

  at BattleTech.Data.DataManager+StringDataLoadRequest`1[T].Load () [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0
			public override void Load()
			{
				if (this.AlreadyLoaded)
				{
					base.State = DataManager.FileLoadRequest.RequestState.Processing;
					this.resource = this.GetResource();
					base.TryLoadDependencies(this.resource as DataManager.ILoadDependencies);
					return;
				}
				if (this.loadOverride != null)
				{
					base.State = DataManager.FileLoadRequest.RequestState.Processing;
					base.StartTimeoutTracking(0f);
					this.loadOverride(this.resourceId, delegate(object item)
					{
						if (item == null)
						{
							base.NotifyLoadFailed();
							return;
						}
						this.resource = (item as T);
						base.TryLoadDependencies(this.resource as DataManager.ILoadDependencies);
					});
				}
			}

  at BattleTech.Data.DataManager.UpdateRequests () [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0
	public class DataManager
		private void UpdateRequests()
		{
			int num = 0;
			int num2 = 0;
			for (int i = 0; i < this.activeLoadBatches.Count; i++)
			{
				LoadRequest loadRequest = this.activeLoadBatches[i];
				if (loadRequest.CurrentState == LoadRequest.State.Processing)
				{
					num += loadRequest.GetActiveLightRequestCount();
					num2 += loadRequest.GetActiveHeavyRequestCount();
					bool flag = DataManager.MaxConcurrentLoadsLight > 0 && num >= DataManager.MaxConcurrentLoadsLight;
					bool flag2 = DataManager.MaxConcurrentLoadsHeavy > 0 && num2 >= DataManager.MaxConcurrentLoadsHeavy;
					if (flag || flag2)
					{
						return;
					}
					for (DataManager.FileLoadRequest fileLoadRequest = loadRequest.PopPendingRequest(); fileLoadRequest != null; fileLoadRequest = loadRequest.PopPendingRequest())
					{
						if (!fileLoadRequest.ManifestEntryValid)
						{
							this.logger.LogError(string.Format("LoadRequest for {0} of type {1} has an invalid manifest entry. Any requests for this object will fail.", fileLoadRequest.ResourceId, fileLoadRequest.ResourceType));
							fileLoadRequest.NotifyLoadFailed();
						}
						else if (!fileLoadRequest.RequestWeight.RequestAllowed)
						{
							this.logger.LogWarning(string.Format("LoadRequest for {0} of type {1} not allowed due to current request weight.", fileLoadRequest.ResourceId, fileLoadRequest.ResourceType));
							fileLoadRequest.SetLoadComplete();
						}
						else
						{
							if (fileLoadRequest.IsMemoryRequest)
							{
								this.RemoveObjectOfType(fileLoadRequest.ResourceId, fileLoadRequest.ResourceType);
							}
							if (fileLoadRequest.RequestWeight.AllowedWeight == 10U)
							{
								num++;
							}
							else
							{
								num2++;
							}
							fileLoadRequest.Load();
						}
					}
				}
			}
		}

  at BattleTech.Data.DataManager.Update (System.Single deltaTime) [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0

  at BattleTech.GameInstance.Update (System.Single deltaTime) [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0

  at BattleTech.UnityGameInstance.Update () [0x00000] in <029bfe22d2d74c8e8c8ded1619022103>:0
```

# harmony documentation wiki
1. [Introduction](#Introduction)
1. [Basics](#Basics)
1. [Patching](#Patching)
1. [Prefix](#Prefix)
1. [Postfix](#Postfix)
1. [Transpiler](#Transpiler)
1. [Injections](#Common-injected-values)
1. [Auxilary methods](#Auxilary-patch-methods)
1. [Annotations](#Annotations)
1. [Execution Flow](#Execution-Flow)
1. [Priorities](#Priorities)
1. [Utilities](#Utilities)



To instantiate Harmony, you simply call

```csharp
var harmony = HarmonyInstance.Create("com.company.project.product");
```

The id should be in reverse domain notation and must be unique. In order to understand and react on existing patches of others, all patches in Harmony are bound to that id.

This allows other authors to execute their patches before or after a specific patch by using the `HarmonyBefore` and `HarmonyAfter` annotations.

Once you have a Harmony instance, you can delegate the search for patch methods to Harmony by calling

```csharp
harmony.PatchAll(Assembly.GetExecutingAssembly());
```

which will search the give assembly for all classes that are annotated with Harmony annotations. All patches are registered automatically and you're done.

### Manual patching

For more control, you can patch like this:

```csharp
var harmony = HarmonyInstance.Create("com.company.project.product");
var original = typeof(TheClass).GetMethod("TheMethod");
var prefix = typeof(MyPatchClass1).GetMethod("SomeMethod");
var postfix = typeof(MyPatchClass2).GetMethod("SomeMethod");
harmony.Patch(original, new HarmonyMethod(prefix), new HarmonyMethod(postfix));
```

### Checking for existing patches

To get a list of already patched methods, you call

```csharp
var harmony = HarmonyInstance.Create("com.company.project.product"); 
var methods = harmony.GetPatchedMethods();
foreach (var method in methods)
{
	//...
}
```

If you want to know if a specific method is already patched, you can call `HarmonyInstance.GetPatchInfo(MethodInfo)`:

```csharp
var harmony = HarmonyInstance.Create("com.company.project.product"); 
var original = typeof(TheClass).GetMethod("TheMethod");
var info = harmony.GetPatchInfo(original);
if (info == null) return; // not patched
foreach (var patch in info.Prefixes)
{
	Console.WriteLine("index: " + patch.index);
	Console.WriteLine("index: " + patch.owner);
	Console.WriteLine("index: " + patch.patch);
	Console.WriteLine("index: " + patch.priority);
	Console.WriteLine("index: " + patch.before);
	Console.WriteLine("index: " + patch.after);
}
foreach (var patch in info.Postfixes)
{
	//...
}
foreach (var patch in info.Transpilers)
{
	//...
}
// all owners shortcut
Console.WriteLine("all owners: " + info.Owners);
```

Next: [[Patching | Patching]]



### Patch methods

Inside the class Harmony searches for methods with the specific names `TargetMethod()`, `Prepare()`, `Prefix()`, `Postfix()` or `Transpiler()`. Instead of relying on those names, you can also use the method annoations `[HarmonyTargetMethod]`, `[HarmonyPrepare]`, `[HarmonyPrefix]`, `[HarmonyPostfix]` or `[HarmonyTranspiler]`.

**TargetMethod** (Optional)

Most of the times, you will use a combination of `HarmonyPatch()` annotations on the class to define the method you want to patch. Sometimes though, it is necessary to calculate the method with code. For this, Harmony searches for a method called

```csharp
static MethodBase TargetMethod()
static MethodBase TargetMethod(HarmonyInstance instance)
// or
[HarmonyTargetMethod]
// NOTE: not passing harmony instance with attributes is broken in 1.2.0.1
static MethodBase CalculateMethod(HarmonyInstance instance)
```

That method, if it exists, is expected to return a `MethodInfo` of the method to be patched. You can optionally receive the harmony instance if you want to run other Harmony methods inside your code.

**Prepare** (Optional)

Before the patching, Harmony gives you a chance to prepare your state. For this, Harmony searches for a method called

```csharp
static bool Prepare()
static bool Prepare(MethodBase original)
// or
[HarmonyPrepare]
static bool MyInitializer(...)
```

That method, if it exists, is expected to return a boolean that controls if patching will happen. You can optionally receive the original method.

**Prefix** (Optional)

```csharp
static bool Prefix(...)
// or
[HarmonyPrefix]
static bool MyPrefix(...)
```

This method defines the code that is executed before the original method. Execution will be skipped if an earlier prefix indicates it wants to skip the original method. It follows the guidelines defined in [[Patching|Patching]].

**Postfix** (Optional)

```csharp
static void Postfix(...)
// or
[HarmonyPostfix]
static void MyPostfix(...)
```

This method defines the code that is executed after the original method. This is a good place to execute code that always needs execution. It follows the guidelines defined in [[Patching|Patching]].

**Transpiler** (Optional)

```csharp
static IEnumerable<CodeInstruction> Transpiler(IEnumerable<CodeInstruction> instr, ...)
// or
[HarmonyTranspiler]
static IEnumerable<CodeInstruction> MyTranspiler(IEnumerable<CodeInstruction> instr, ...)
```

This method defines the transpiler that modifies the code of the original method. Use this in the advanced case where you want to modify the original methods IL codes. It follows the guidelines defined in [[Patching|Patching]].

**Cleanup** (Optional)

After patching, Harmony can call this cleanup method. It searches for a method called

```csharp
static bool Cleanup()
static bool Cleanup(MethodBase original)
// or
[HarmonyCleanup]
static bool MyInitializer(...)
```

### Patch parameters

Each prefix and postfix can get all the parameters of the original method as well as the instance (if original method is not static) and the return value. In order to patch a method your patches need to follow the following principles when defining them:

* A patch must be a **static** method
* A prefix patch has a return type of **void** or **bool**
* A postfix patch has a return type of **void** or the return signature must match the type of the **first** parameter (passthrough mode)
* Patches can use a parameter named **__instance** to access the instance value if original method is not static
* Patches can use a parameter named **__result** to access the returned value (prefixes get default value)
* Patches can use a parameter named **__state** to store information in the prefix method that can be accessed again in the postfix method. Think of it as a local variable. It can be any type and you are responsible to initialize its value in the prefix
* Parameter names starting with three underscores, for example **___someField**, can be used to read and write (with 'ref') private fields on the instance that has the same name (minus the underscores)
* Patches can define only those parameters they want to access (no need to define all)
* Patch parameters must use the **exact** same name and type as the original method (*object* is ok too)
* Patches can either get parameters normally or by declaring any parameter **ref** (for manipulation)
* To allow patch reusing, one can inject the original method by using a parameter named **__originalMethod**

Transpilers have some other optional parameters:

* A parameter of type `ILGenerator` that will be set to the current IL code generator
* A parameter of type `MethodBase` that will be set to the current original method being patched
* They must contain one parameter of type `IEnumerable<CodeInstruction>` that will be used to pass the IL codes to it

Example:

```csharp
// original method in class Customer
private List<string> getNames(int count, out Error error)

// prefix
// - wants instance, result and count
// - wants to change count
// - returns a boolean that controls if original is executed (true) or not (false)
static bool Prefix(Customer __instance, List<string> __result, ref int count)

// postfix
// - wants result and error
// - does not change any of those
static void Postfix(List<string> __result, Error error)

// transpiler
// - wants to use original method
static IEnumerable<CodeInstruction> Transpiler(MethodBase original, IEnumerable<CodeInstruction> instructions)
```

Next: [[Target method annotations | Target-Method-Annotations]]



When you use the **PatchAll(Assembly assembly)** call, Harmony will search through all classes and methods inside the given **assembly** looking for specific Harmony annotations.

### Example

A typical patch consists of a class with annotations that looks like this:

```csharp
[HarmonyPatch(typeof(SomeTypeHere))]
[HarmonyPatch("SomeMethodName")]
class MyPatchClass
{
	static void Postfix(...)
	{
		//...
	}
}
```

This will annotate the class with enough information to identify the method to patch. Usually, you will have one class for each method that you want to patch. Inside that class, you define a combination of **Prefix**, **Postfix** or **Transpiler** methods. Harmony will find them by their name. If you annotate those methods you can even have different names.

### Annotation types

To indicate that a class contains patch methods it needs to be annotated with at lease one of the following class annotations:

* **[HarmonyPatch(Type, Type[])]**
	Defines the type that contains the method to be patched (optional Type[] for generics)

* **[HarmonyPatch(String)]**
	Defines the method to be patched by name

* **[HarmonyPatch(String, PropertyMethod)]**
	Defines the property to be patched by name

* **[HarmonyPatch(Type[])]**
	Defines the parameters of the method to be patched (only necessary if multiple methods with the same name exist)

Additionally to repeating the basic annotations, the following shortcut can be used:

* **[HarmonyPatch(Type, String, Type[])]**
	Defines the type and method to be patched in a single annotation

### Combining annotations

The combination of those annotations defines the target method. Examples:

To patch method **String.ToUpper()** :

```csharp
[HarmonyPatch(typeof(String))]
[HarmonyPatch("ToUpper")]
```

To patch the setter for a property **Account** in class **MyClass** :

```csharp
[HarmonyPatch(typeof(MyClass))]
[HarmonyPatch("Account", PropertyMethod.Setter)]
```

To patch method **String.IndexOf(char, int)** :

```csharp
[HarmonyPatch(typeof(String))]
[HarmonyPatch("IndexOf")]
[HarmonyPatch(new Type[] { typeof(char), typeof(int) })]

//or

[HarmonyPatch(typeof(String), "IndexOf", new Type[] { typeof(char), typeof(int) })]
```

Patch classes can be public or private, static or not. Patch methods can be public or private but must be static since the patched original method does not have any reference to an instance of your patch class. If you use the manual way to specify the patch methods, your patch methods can even be DynamicMethod's.

### Constructors

To patch constructors, do not use the method name ".ctor". Instead, omit the method name completely and only specify the argument types. Example:

```cshapr
[HarmonyPatch(typeof(TestClass))]
[HarmonyPatch(new Type[] { })]

public HarmonyPatch(Type declaringType, MethodType methodType)
public HarmonyPatch(Type declaringType, MethodType methodType, params Type[] argumentTypes)
//
// example:
//
[HarmonyPatch(typeof(RoomProber), MethodType.Constructor)]
internal class RoomSizeMod_RoomProber
{
   private static void Postfix(RoomProber __instance)
   {
      RoomProber.MaxRoomSize = 1024;
   }
}
```

### Generic Methods

To patch methods with generic signatures, you need to patch specific versions of the method. It is not possible to patch an open generic method. Example: AddItem(**T** item) cannot be patched directly but you can define one patch for i.e. AddItem(**string** item) and one for AddItem(**int** item). Pro tip: to patch a large number of variations, create your patches dynamically.

Next: [[Execution flow | Execution-Flow]]



Patching a method does not override any previous patches that other users of Harmony apply to the same method. Instead, prefix and postfix patches are executed in a prioritised way. Prefix patches can return a boolean that, if false, terminates prefixes and skips the execution of the original method. In contrast, all postfixes are executed all the time.

Execution of prefixes and postfixes can explained best with the following pseudo code:

	run = true
	result = null;

	if (run) run = Prefix1(...)
	if (run) run = Prefix2(...)
	// ...

	if (run) result = Original(...)

	Postfix1(...)
	Postfix2(...)
	// ...

	return result

Next: [[Priority annotations | Prioritiy-annotations]]



With Harmony, the order of patches is not linear. A plugin/mod that comes last can still execute first if necessary. For this to work, patches can be annotated with method annotations:

* **[HarmonyPriority(int)]**
	Sets the priority of this Prefix/Postfix. Defaults to Priority.Normal (400)

* **[HarmonyBefore(string[])]**
	Indicates that this Prefix/Postfix should be executed before any of the ID's given

* **[HarmonyAfter(string[])]**
	Indicates that this Prefix/Postfix should be executed after any of the ID's given

Example:

Given the following method:

```csharp
class Foo
{
	static string Bar()
	{
		return "secret";
	}
}
```

and **Plugin 1**

```csharp
var harmony = HarmonyInstance.Create("net.example.plugin1");
harmony.PatchAll(Assembly.GetExecutingAssembly());

[HarmonyPatch(typeof(Foo))]
[HarmonyPatch("Bar")]
class MyPatch
{
	static void Postfix(ref result)
	{
		result = "new secret 1";
	}
}
```

and **Plugin 2**

```csharp
var harmony = HarmonyInstance.Create("net.example.plugin2");
harmony.PatchAll(Assembly.GetExecutingAssembly());

[HarmonyPatch(typeof(Foo))]
[HarmonyPatch("Bar")]
class MyPatch
{
	static void Postfix(ref result)
	{
		result = "new secret 2";
	}
}
```

a call to `Foo.Bar()` would return "new secret 2" because both plugins register their Postfix with the same priority and so the second Postfix overrides the result of the first one. As an author of Plugin 1, you could rewrite your code to

```csharp
var harmony = HarmonyInstance.Create("net.example.plugin1");
harmony.PatchAll(Assembly.GetExecutingAssembly());

[HarmonyPatch(typeof(Foo))]
[HarmonyPatch("Bar")]
class MyPatch
{
	[HarmonyAfter(new string[] { "net.example.plugin2" })]
	static void Postfix(ref result)
	{
		result = "new secret 1";
	}
}
```

and would be executed after net.example.plugin2 which gives you (for a Postfix) the chance to change the result last. Alternatively, you could annotate with [HarmonyPriority(Priority.Low)] to come after plugin1.

All priority annotations are also valid on the class. This will define the priorities for all contained patch methods at the same time.

Next: [[Utilities | Utilities]]



### AccessTools

To simplify reflections, Harmony has a helper class called AccessTools. Here are the most commonly used methods:

```csharp
public static BindingFlags all = ....
public static Type TypeByName(string name)
public static FieldInfo Field(Type type, string name)
public static PropertyInfo Property(Type type, string name)
public static MethodInfo Method(Type type, string name, Type[] parameters = null, Type[] generics = null)
public static ConstructorInfo Constructor(Type type, Type[] parameters = null)
public static Type Inner(Type type, string name)
public static Type FirstInner(Type type, Func<Type, bool> predicate)
```

Any of these methods use the **all** BindingFlags definition and thus work on anything regardless if it is public, private, static or else.

### Traverse

In order to access fields, properties and methods from classes via reflection, Harmony contains a utility called Traverse. Think of it as LINQ for classes. Here are the main methods:

```csharp
// starting from a type or instance
public static Traverse Create(Type type)
public static Traverse Create<T>()
public static Traverse CreateWithType(string name)

// digging deeper
public Traverse Type(string name)
public Traverse Field(string name)
public Traverse Property(string name, object[] index = null)
public Traverse Method(string name, params object[] arguments)
public Traverse Method(string name, Type[] paramTypes, object[] arguments = null)

// calling getter or method
public object GetValue()
public T GetValue<T>()
public object GetValue(params object[] arguments)
public T GetValue<T>(params object[] arguments)
public override string ToString()

// calling setter
public Traverse SetValue(object value)

// iterating
public static void IterateFields(object source, Action<Traverse> action)
public static void IterateFields(object source, object target, Action<Traverse, Traverse> action)
public static void IterateProperties(object source, Action<Traverse> action)
public static void IterateProperties(object source, object target, Action<Traverse, Traverse> action)
```

Example:

```csharp
class Foo
{
	struct Bar
	{
		static string secret = "hello";

		public string ModifiedSecret()
		{
			return secret.ToUpper();
		}
	}

	Bar myBar
	{
		get
		{
			return new Bar();
		}
	}

	public string GetSecret()
	{
		return myBar.ModifiedSecret();
	}

	Foo()
	{
	}

	static Foo MakeFoo()
	{
		return new Foo();
	}
}

var foo = Traverse.Create<Foo>().Method("MakeFoo").GetValue<Foo>();
Traverse.Create(foo).Property("myBar").Field("secret").SetValue("world");
Console.WriteLine(foo.GetSecret()); // outputs WORLD
```

Although most fields, properties and methods in that class hierarchy are private, Traverse can easily access anything. It has build-in null protection and propagates null as a result if any of the intermediates would encounter null. It works with static types and caches lookups which makes it pretty fast.

### FileLog

For simple and quick logging, Harmony uses a tool class FileLog. It has three methods:

```csharp
public static void Log(string str)
// Creates a new log file called "harmony.log.txt" on the computers Desktop (if it not already exists) and appends *str* to it.

public static void Reset()
// Deletes the log file.

public static unsafe void LogBytes(long ptr, int len)
// Same as Log(string str) but logs a hex dump and md5 hash.
```



# Introduction

*Harmony - a library for patching, replacing and decorating .NET methods during runtime.*

## Prerequisites

Harmony works with all languages that compile to [CIL](https://wikipedia.org/wiki/Common_Intermediate_Language), Microsofts intermediate byte code language. This is foremost the [.NET Framework](https://wikipedia.org/wiki/Portal:.NET_Framework) and of course [Mono](https://wikipedia.org/wiki/Mono_(software)) - used by the game engine Unity.

The exception is [.NET Core](https://wikipedia.org/wiki/.NET_Core), which does not provide the functionality to fully create methods on the fly at runtime. Chances are that .NET Core v3 might include everything to support Harmony [[See this Issue](https://github.com/dotnet/corefx/issues/29715)]

### Bootstrapping and Injection

Harmony does not provide you with a way to run your own code within an application that is not designed to execute foreign code. You need a way to inject at least the few lines that start the Harmony patching and this is usually done with a loader. Here are some common examples of loaders (incomplete):

- [Unity Doorstep](https://github.com/NeighTools/UnityDoorstop)
- [BepInEx](https://github.com/BepInEx/BepInEx)
- [UnityAssemblyInjector](https://github.com/avail/UnityAssemblyInjector)
- [MonoJunkie](https://github.com/wledfor2/MonoJunkie)
- [MInjector](https://github.com/EquiFox/MInjector)
- and more...

You need to find your own injection method or choose a game that supports user dll loading (usually called Mods) like for example RimWorld ([Wiki](https://rimworldwiki.com/wiki/Modding_Tutorials/)).

### Dependencies

It has no other dependencies and will most likely work in other environments too. Harmony was tested on PC, Mac and Linux and support 32- and 64-bit. For a typical Unity target, simply set your project to .Net 3.5 or Mono 2.x and include the Harmony dll.

## Altering functionality (Patching)

If you want to change how an exising C# application like a game works and you don't have the source code for that application, you have basically two options to do that:

1) Alter dll files on disk
2) Re-point method implementations (hooking)

Depending on the needs and situation, altering dll files is not always a desirable solution. For example

- it has legal implications
- it might be blocked by an anti-cheat system
- it does not coordinate nicely with multiple concurrent changes
- it has to be done before and outside the original application

Harmony focuces only on runtime changes that don't affect files on disk:

- less conflicts with multiple mods
- supports existing mod loaders
- changes can be made dynamically/conditionally
- the patch order can be flexible
- other mods can be patched too
- less legal issues

## How Harmony works

Where other patch libraries simply allow you to replace the original method, Harmony goes one step further and gives you:

* A way to keep the original method intact
* Execute your code before and/or after the original method
* Modify the original with IL code processors
* Multiple Harmony patches co-exist and don't conflict with each other

![](https://raw.githubusercontent.com/pardeike/Harmony/master/Harmony/Documentation/images/patch-logic.svg?sanitize=true)

## Limits of runtime patching

![note] Harmony can't do everything. Make sure you understand the following:

- With Harmony, you only manipulate **methods**. This includes constructors and getters/setters.

- You can only work with methods that have an actual IL code body, which means that they appear in a dissassembler like [dnSpy](https://github.com/0xd4d/dnSpy).

- Methods that are too small might get [inlined](https://wikipedia.org/wiki/Inline_expansion) and your patches will not run.

- You cannot add fields to classes and you cannot extend enums (they get compiled into ints).

## Hello World Example

Original game code:

```cs
public class SomeGameClass
{
	private bool isRunning;
	private int counter;

	private int DoSomething()
	{
		if (isRunning)
		{
			counter++;
			return counter * 10;
		}
	}
}
```

Patching with Harmony annotations:

```cs
// your code, most likely in your own dll

using SomeGame;
using Harmony;

public class MyPatcher
{
	// make sure DoPatching() is called at start either by
	// the mod loader or by your injector

	public static void DoPatching()
	{
		var harmony = HarmonyInstance.Create("com.example.patch");
		harmony.PatchAll();
	}
}

[HarmonyPatch(typeof(SomeGameClass))]
[HarmonyPatch("DoSomething")]
class Patch01
{
	static FieldRef<SomeGameClass,bool> isRunningRef =
		AccessTools.FieldRefAccess<SomeGameClass, bool>("isRunning");

	static bool Prefix(SomeGameClass __instance, ref int ___counter)
	{
		isRunningRef(__instance) = true;
		if (___counter > 100)
			return false;
		___counter = 0;
		return true;
	}

	static void Postfix(ref int __result)
	{
		__result *= 2;
	}
}
```

Alternatively, manual patching with reflection:

```cs
// your code, most likely in your own dll

using SomeGame;
using Harmony;

public class MyPatcher
{
	// make sure DoPatching() is called at start either by
	// the mod loader or by your injector

	public static void DoPatching()
	{
		var harmony = HarmonyInstance.Create("com.example.patch");

		var mOriginal = typeof(SomeGameClass).GetMethod("DoSomething", BindingFlags.Instance | BindingFlags.NonPublic);
		var mPrefix = typeof(MyPatcher).GetMethod("MyPrefix", BindingFlags.Static | BindingFlags.Public);
		var mPostfix = typeof(MyPatcher).GetMethod("MyPostfix", BindingFlags.Static | BindingFlags.Public);
		// add null checks here

		harmony.Patch(mOriginal, new HarmonyMethod(mPrefix), new HarmonyMethod(mPostfix));
	}

	public static void MyPrefix()
	{
		// ...
	}

	public static void MyPostfix()
	{
		// ...
	}
}
```

[note]: https://raw.githubusercontent.com/pardeike/Harmony/master/Harmony/Documentation/images/note.png



# Basics

In order to use Harmony to change the original applications functionality, you need to

1) find a way to excute code inside the application or game (Injection or Mod support)
2) have the 0Harmony.dll file on disk
3) reference the 0Harmony.dll from your project to use the API
4) write patches in your code
5) create a Harmony instance early in your code
6) use it to apply the patches you wrote
7) compile your code and make sure 0Harmony.dll is available at runtime (package with your release)

## Runtime dependency

Some games or applications already supply Harmony from either a loader or another mod. While this seems easier, it requires that the version of Harmony you compile against is the same as the one available at runtime or else your code will not run (missing dependency). It also ties the release cycle of that solution to your. Harmony can co-exist in multiple versions with itself so it is totally fine that each user packs their own 0Harmony.dll with their mod.

*Note for application/game makers: it seems you can embed multiple versions of Harmony at once which will avoid the issue described above.*

### Manual dll adding

To add Harmony manually to your Visual Studio project, you right-click on `References` in your solution explorer and choose `Add Reference` to open the Reference Manager. There, browse for 0Harmony.dll and select add it.

### Adding using nuget

To add Harmony manually to your Visual Studio project, you right-click on `References` in your solution explorer and choose `Manage NuGet Packages`, then search for "Harmony Library" and install it.

### Import

Once you reference Harmony correctly, you should be able to import it by adding Harmony to your imports. That gives you code completion so you can discover the API:

```csharp
using Harmony;
```

## Creating a Harmony instance

Most patch operations require a Harmony instance. To instantiate Harmony, you simply call

```csharp
var harmony = HarmonyInstance.Create("com.company.project.product");
```

The id should be in reverse domain notation and must be unique. In order to understand and react on existing patches of others, all patches in Harmony are bound to that id. This allows other authors to execute their patches before or after a specific patch by referring to this id.

### Debug Log

If you want to know more about the patching or the IL code Harmony produces, you can enable the debug log. Harmony offers and uses a class called `FileLog` that will create a log file on your systems Desktop called "harmony.log.txt".

You can set Harmony's global DEBUG flag to true, which will make Harmony log out many details that can help you while debugging your usage of Harmony:

```csharp
HarmonyInstance.DEBUG = true;
```

You can also use Harmony's file logger in your own code:

```csharp
FileLog.Log("something");
// or buffered:
FileLog.LogBuffered("A");
FileLog.LogBuffered("B");
FileLog.FlushBuffer(); // don't forget to flush
```

### Patching using annotations

If you prefer annotations to organize your patches, you instruct Harmony to search for them by using `PatchAll()`:

```csharp
var assembly = Assembly.GetExecutingAssembly();
harmony.PatchAll(assembly);
```

or

```csharp
harmony.PatchAll(); // implies current assembly
```

which will search the given assembly for all classes that are decorated with Harmony annotations. All patches are registered automatically and Harmony will do the rest.

### Manual patching

For more control, you use `Patch()`. It takes an original and a combination of Prefix, Postfix or Transpiler methods, which are optional HarmonyMethod objects (pass null to `Patch()` to skip one type of patch):

```csharp
// add null checks to the following lines, they are omitted for clarity
var original = typeof(TheClass).GetMethod("TheMethod");
var prefix = typeof(MyPatchClass1).GetMethod("SomeMethod");
var postfix = typeof(MyPatchClass2).GetMethod("SomeMethod");

harmony.Patch(original, new HarmonyMethod(prefix), new HarmonyMethod(postfix));
```

The use of an extra HarmonyMethod is to allow for you to define extra properties like priority and such together with the method pointer. HarmonyMethod is the common class shared by manual and annotation patching.

A common mistake here is to fail to retrieve a valid reference for original or your patches resulting in a `null` value which when passed to HarmonyMethod will throw an error. You can use standard `System.Reflection` to get the MethodInfo of the original and your HarmonyMethods. See the Utilities section for the various ways Harmony can make Reflection easier.

### Checking for existing patches

To get a list of all patched methods in the current appdomain (yours and others), call GetAllPatchedMethods:

```csharp
var originalMethods = HarmonyInstance.GetAllPatchedMethods();
foreach (var method in originalMethods)
{
	//...
}
```

If you are only interested in your own patched methods, use GetPatchedMethods:

```csharp
var myOriginalMethods = harmony.GetPatchedMethods();
foreach (var method in myOriginalMethods)
{
	//...
}
```

If you want to know more about all existing patches (yours or others) on a specific original method, you can call GetPatchInfo:

```csharp
// get the MethodBase of the original
var original = typeof(TheClass).GetMethod("TheMethod");

// retrieve all patches
var patches = HarmonyInstance.GetPatchInfo(original);
if (patches == null) return; // not patched

// get a summary of all different Harmony ids involved
FileLog.Log("all owners: " + patches.Owners);

// get info about all Prefixes/Postfixes/Transpilers
foreach (var patch in patches.Prefixes)
{
	FileLog.Log("index: " + patch.index);
	FileLog.Log("owner: " + patch.owner);
	FileLog.Log("patch method: " + patch.patch);
	FileLog.Log("priority: " + patch.priority);
	FileLog.Log("before: " + patch.before);
	FileLog.Log("after: " + patch.after);
}
```

Sometimes it is necessary to test if another mod is loaded. This is best done by resolving one of their types by name. However, if you want to know if a specific Harmony has applied any patches so far, you can use HasAnyPatches:

```csharp
if(HarmonyInstance.HasAnyPatches("com.some.product"))
{
	//...
}
```

Finally, to retrieve an overview of which assemblies use which version of Harmony you can use (based on actice patches only)

```csharp
var dict = HarmonyInstance.VersionInfo(out var myVersion);
FileLog.Log("My version: " + myVersion);
foreach (var entry in dict)
{
	var id = entry.Key;
	var version = entry.Value;
	FileLog.Log("Mod " + id + " uses Harmony version " + version);
}
```



# Patching

## Concept

In order to provide your own code to Harmony, you need to define methods that run in the context of the original method. Harmony provides three types of methods that each offer different possibilities.

#### Main types of patches

Two of them, **Prefix** and **Postfix** are high level and you can write them as simple static methods. The third, called **Transpiler**, is not a method that is executed together with the original but called in an earlier stage where the instructions of the original are fed into the transpiler so it can process and change them, to finally output the instructions that will build the new original.

#### Patches need to be static

Patch methods need to be static because Harmony works with multiple users in different assemblies in mind. In order to guarantee the correct patching order, patches are always re-applied as soon as someone wants to change the original. Since it is hard to serialize data in a generic way across assemblies in .NET, Harmony only stores a method pointer to your patch methods so it can use and apply them at a later point again.

If you need custom state in your patches, it is recommended to use a static variable and store all your patch state in there. Keep in mind that Transpilers are only executed to generate the method so they don't "run" when the original is executed.

## Patch Class

With manual patching, you can put your patches anywhere you like. Patching by annotations simplifies patching by assuming you create one class for each patched original and define your patch methods inside it. The name of the class can be arbitrary but a common way to name them is `OriginalClass_OriginalMethodName_Patch`.

The class can be static or not, public or private, it doesn't matter. However, in order to make Harmony find it, it must have at least one `[HarmonyPatch]` attribute. Inside the class you can define as many methods as you want and some of them should be (static) patch methods.

The attributes of the methods in the class inherit the attributes of the class.

## Patch methods

Harmony identifies your patch methods and their helper methods **by name**. If you prefer to name your methods differently, you can use attributes to tell Harmony what your methods are.

```csharp
[HarmonyPatch(...)]
class Patch
{
    static void Prefix()
    {
        // this method uses the name "Prefix", no annotation necessary
    }

    [HarmonyPostfix]
    static void MyOwnName()
    {
        // this method is a Postfix as defined by the attribute
    }
}
```

If you prefer manual patching, you can use any method name or class structure you want. You are responsible to retrieve the MethodInfo for the different patch methods and supply them to the Patch() method by wrapping them into HarmonyMethod objects.

![note] Patch methods *must* be static but you can define them public or private. They cannot be dynamic methods but you can write static patch factory methods that return dynamic methods.

### Method names

Manual patching knows only three main patch types: **Prefix**, **Postfix** and **Transpiler**. If you use attributes for patching, you can also use the helper methods: **Prepare**, **TargetMethod**, **TargetMethods** and **Cleanup** as explained below.

Each of those names has a corresponding attribute starting with [Harmony...]. So instead of calling one of your methods "Prepare", you can call it anything and decorate it with a `[HarmonyPrepare]` attribute.

## Patch method types

Both prefix and postfix have specific semantics that are unique to them. They do however share the ability to use a range of injected values as arguments.

### Prefix

A prefix is a method that is executed before the original method. It is commonly used to:

- access and edit the arguments of the original method
- set the result of the original method
- skip the original method
- set custom state that can be recalled in the postfix

### Postfix

A postfix is a method that is executed after the original method. It is commonly used to:

- read or change the result of the original method
- access the arguments of the original method
- make sure your code is always executed
- read custom state from the prefix

### Transpiler

This method defines the transpiler that modifies the code of the original method. Use this in the advanced case where you want to modify the original methods IL codes.

[note]: https://raw.githubusercontent.com/pardeike/Harmony/master/Harmony/Documentation/images/note.png



# Patching

## Prefix

A prefix is a method that is executed before the original method. It is commonly used to:

- access and edit the arguments of the original method
- set the result of the original method
- skip the original method
- set custom state that can be recalled in the postfix

![note] The first prefix that skips the original will skip all remaining prefixes too. Postfixes are not affected.

### Reading and changing arguments

```csharp
public class OriginalCode
{
    public void Test(int counter, string name)
    {
        // ...
    }
}

[HarmonyPatch(typeof(OriginalCode), "Test")]
class Patch
{
    static void Prefix(int counter, ref string name)
    {
        FileLog.Log("counter = " + counter); // read
        name = "test"; // write with ref keyword
    }
}
```

### Changing the result and skipping the original

To change the result of the original, use `__result` as an argument of your prefix. It must match the return type or be assignable from it. Changing the result of the original does not make sense if you let the original run so skipping the original is necessary too.

To skip the original, let the prefix return a `bool` and return `true` to let the original run after all prefixes or `false` to stop executing prefixes and skip the original. Postfixes will always be executed.

![note] It is not recommended to skip the original unless you want to completely change the way it works. If you only want a small change or a side effect, using a postfix or a transpiler is always preferred since it allows for multiple users changing the original without each implementation fighting over how the original should behave.

```csharp
public class OriginalCode
{
    public string GetName()
    {
        // ...
    }
}

[HarmonyPatch(typeof(OriginalCode), "GetName")]
class Patch
{
    static bool Prefix(ref string __result)
    {
        __result = "test";
        return true; // make sure you only skip if really necessary
    }
}
```

Some users have trouble understanding the disconnect between altering what the original method returns and what the Prefix returns. The following example is meant to illustrate that the boolean return value of the Prefix only determines if the original gets run or not.

```csharp
public class OriginalCode
{
    public bool IsFullAfterTakingIn(int i)
    {
        // do expensive calculations
    }
}

[HarmonyPatch(typeof(OriginalCode), "IsFullAfterTakingIn")]
class Patch
{
    static bool Prefix(ref bool __result, int i)
    {
        if (i > 5)
        {
            __result = true; // any call to IsFullAfterTakingIn(i) where i > 5 now immediately returns true
           return false; // skips the original and its expensive calculations
        }
        return true; // make sure you only skip if really necessary
    }
}
```

### Passing state between prefix and postfix

If you want to share state between your prefix and the corresponding postfix, you can use `__state` (with the `ref` or `out` keyword). If you need more than one value you can create your own type and pass it instead.

```cs
public class OriginalCode
{
    public void Test(int counter, string name)
    {
        // ...
    }
}

[HarmonyPatch(typeof(OriginalCode), "Test")]
class Patch
{
    // this example uses a Stopwatch type to measure
    // and share state between prefix and postfix

    static void Prefix(out Stopwatch __state)
    {
        __state = new Stopwatch(); // assign your own state
        __state.Start();
    }

    static void Postfix(Stopwatch __state)
    {
        __state.Stop();
        FileLog.Log(__state.Elapsed);
    }
}
```

[note]: https://raw.githubusercontent.com/pardeike/Harmony/master/Harmony/Documentation/images/note.png



# Patching

## Postfix

A postfix is a method that is executed after the original method. It is commonly used to:

- read or change the result of the original method
- access the arguments of the original method
- make sure your code is always executed
- read custom state from the prefix

### Reading or changing the result

Since the postfix has access to the result of the original (or a prefix that has skipped the original), it can read or alter the result by using the argument `__result`. It must match the return type of the original or be assignable from it.

```csharp
public class OriginalCode
{
    public string GetName()
    {
        // ...
    }
}

[HarmonyPatch(typeof(OriginalCode), "GetName")]
class Patch
{
    static void Postfix(ref string __result)
    {
        if (__result == "foo")
            __result = "bar";
    }
}
```

### Pass through postfixes

An alternative way to change the result of an original method is to use a **pass through** postfix. A pass through postfix has a non-void return type that matches the type of the first argument.

Harmony will call the postfix with the result of the original and will use the result of the postfix to continue. Since this works for all types, it is especially useful for types like `IEnumerable<T>` that cannot be combined with `ref`. This allows for changing the result with `yield` operations.

```csharp
public class OriginalCode
{
    public string GetName()
    {
        return "David";
    }

    public IEnumerable<int> GetNumbers()
    {
        yield return 1;
        yield return 2;
    }
}

[HarmonyPatch(typeof(OriginalCode), "GetName")]
class Patch1
{
    static string Postfix(string name)
    {
        return "Hello " + name;
    }
}

[HarmonyPatch(typeof(OriginalCode), "GetNumbers")]
class Patch2
{
    static IEnumerable<int> Postfix(IEnumerable<int> values)
    {
        yield return 0;
        foreach (var value in values)
            yield return value;
        yield return 99;
    }
}
```

### Reading original arguments

```csharp
public class OriginalCode
{
    public void Test(int counter)
    {
        // ...
    }
}

[HarmonyPatch(typeof(OriginalCode), "Test")]
class Patch
{
    static void Prefix(int counter)
    {
        FileLog.Log("counter = " + counter);
    }
}
```

### Postfixes always run

Harmony will not skip any postfix regardless of what any prefix or the original method do. It is good style to use postfixes as much as possible since they lead to more compatible code.

### Passing state between prefix and postfix

See prefix



# Patching

## Transpiler

This method defines the transpiler that modifies the code of the original method. Use this in the advanced case where you want to modify the original methods IL codes.

```csharp
static IEnumerable<CodeInstruction> Transpiler(IEnumerable<CodeInstruction> instr, ...)
// or
[HarmonyTranspiler]
static IEnumerable<CodeInstruction> MyTranspiler(IEnumerable<CodeInstruction> instr, ...)
```



# Patching

## Common injected values

Each prefix and postfix can get all the arguments of the original method as well as the instance (if original method is not static) and the return value. Patches can define only those parameters they want to access.

### Instance

Patches can use an argument named `__instance` to access the instance value if original method is not static. This is similar to the C# keyword `this` where used in the original method.

### Result

Patches can use an argument named `__result` to access the returned value. The type `T` of argument must match the return type of the original or be assignable from it. For prefixes, as the original method hasn't run yet, the value of `__result` is default(T). For most reference types, that would be `null`. If you wish to alter the `__result`, you need to pass it by `ref`.

### State

Patches can use an argument named `__state` to store information in the prefix method that can be accessed again in the postfix method. Think of it as a local variable. It can be any type and you are responsible to initialize its value in the prefix.

### (Private) Fields

Argument names starting with three underscores, for example `___someField`, can be used to read and (with `ref`) write private fields on the instance that has the corresponding name (minus the underscores).

### Argument types

Arguments from the original must use the exact same name and type as the original method but using `object` is ok too.

### The original

To allow patch reusing, one can inject the original method by using an argument named `__originalMethod`.

### Special arguments

In transpilers, arguments are only matched by their type so you can choose any argument name you like.

An argument of type `IEnumerable<CodeInstruction>` is required and will be used to pass the IL codes to the transpiler
An argument of type `ILGenerator` will be set to the current IL code generator
An argument of type `MethodBase` will be set to the current original method being patched



# Patching

## Auxilary patch methods

### Prepare

Before the patching, Harmony gives you a chance to prepare your state. For this, Harmony searches for a method called

```csharp
static bool Prepare()
static bool Prepare(HarmonyInstance instance)
// or
[HarmonyPrepare]
static bool MyInitializer(...)
```

That method, if it exists, is expected to return a boolean that controls if patching will happen. You can optionally receive the harmony instance if you want to run other Harmony methods inside your code.

### TargetMethod

Most of the times, you will use a combination of `HarmonyPatch()` annotations on the class to define the method you want to patch. Sometimes though, it is necessary to calculate the method with code. For this, Harmony searches for a method called

```csharp
static MethodBase TargetMethod()
static MethodBase TargetMethod(HarmonyInstance instance)
// or
[HarmonyTargetMethod]
// NOTE: not passing harmony instance with attributes is broken in 1.2.0.1
static MethodBase CalculateMethod(HarmonyInstance instance)
```

That method, if it exists, is expected to return a `MethodInfo` of the method to be patched. You can optionally receive the harmony instance if you want to run other Harmony methods inside your code.

### TargetMethods

+++

### Cleanup

+++



# Annotations

When you use the **PatchAll(Assembly assembly)** call, Harmony will search through all classes and methods inside the given **assembly** looking for specific Harmony annotations.

### Example

A typical patch consists of a class with annotations that looks like this:

```csharp
[HarmonyPatch(typeof(SomeTypeHere))]
[HarmonyPatch("SomeMethodName")]
class MyPatchClass
{
	static void Postfix(...)
	{
		//...
	}
}
```

This will annotate the class with enough information to identify the method to patch. Usually, you will have one class for each method that you want to patch. Inside that class, you define a combination of **Prefix**, **Postfix** or **Transpiler** methods. Harmony will find them by their name. If you annotate those methods you can even have different names.

### Annotation types

To indicate that a class contains patch methods it needs to be annotated with at lease one of the following class annotations:

* **[HarmonyPatch(Type, Type[])]**
	Defines the type that contains the method to be patched (optional Type[] for generics)

* **[HarmonyPatch(String)]**
	Defines the method to be patched by name

* **[HarmonyPatch(String, PropertyMethod)]**
	Defines the property to be patched by name

* **[HarmonyPatch(Type[])]**
	Defines the parameters of the method to be patched (only necessary if multiple methods with the same name exist)

Additionally to repeating the basic annotations, the following shortcut can be used:

* **[HarmonyPatch(Type, String, Type[])]**
	Defines the type and method to be patched in a single annotation

### Combining annotations

The combination of those annotations defines the target method. Examples:

To patch method **String.ToUpper()** :

```csharp
[HarmonyPatch(typeof(String))]
[HarmonyPatch("ToUpper")]
```

To patch the setter for a property **Account** in class **MyClass** :

```csharp
[HarmonyPatch(typeof(MyClass))]
[HarmonyPatch("Account", PropertyMethod.Setter)]
```

To patch method **String.IndexOf(char, int)** :

```csharp
[HarmonyPatch(typeof(String))]
[HarmonyPatch("IndexOf")]
[HarmonyPatch(new Type[] { typeof(char), typeof(int) })]

//or

[HarmonyPatch(typeof(String), "IndexOf", new Type[] { typeof(char), typeof(int) })]
```

Patch classes can be public or private, static or not. Patch methods can be public or private but must be static since the patched original method does not have any reference to an instance of your patch class. If you use the manual way to specify the patch methods, your patch methods can even be DynamicMethod's.

### Constructors

To patch constructors, do not use the method name ".ctor". Instead, omit the method name completely and only specify the argument types. Example:

```csharp
[HarmonyPatch(typeof(TestClass))]
[HarmonyPatch(new Type[] { })]

public HarmonyPatch(Type declaringType, MethodType methodType)
public HarmonyPatch(Type declaringType, MethodType methodType, params Type[] argumentTypes)
//
// example:
//
[HarmonyPatch(typeof(RoomProber), MethodType.Constructor)]
internal class RoomSizeMod_RoomProber
{
   private static void Postfix(RoomProber __instance)
   {
      RoomProber.MaxRoomSize = 1024;
   }
}
```

### Generic Methods

To patch methods with generic signatures, you need to patch specific versions of the method. It is not possible to patch an open generic method. Example: AddItem(**T** item) cannot be patched directly but you can define one patch for i.e. AddItem(**string** item) and one for AddItem(**int** item). Pro tip: to patch a large number of variations, create your patches dynamically.



# Execution Flow

Patching a method does not override any previous patches that other users of Harmony apply to the same method. Instead, prefix and postfix patches are executed in a prioritised way. Prefix patches can return a boolean that, if false, terminates prefixes and skips the execution of the original method. In contrast, all postfixes are executed all the time.

Execution of prefixes and postfixes can explained best with the following pseudo code:

	run = true
	result = null;

	if (run) run = Prefix1(...)
	if (run) run = Prefix2(...)
	// ...

	if (run) result = Original(...)

	Postfix1(...)
	Postfix2(...)
	// ...

	return result



# Priorities

With Harmony, the order of patches is not linear. A plugin/mod that comes last can still execute first if necessary. For this to work, patches can be annotated with method annotations:

* **[HarmonyPriority(int)]**
	Sets the priority of this Prefix/Postfix. Defaults to Priority.Normal (400)

* **[HarmonyBefore(string[])]**
	Indicates that this Prefix/Postfix should be executed before any of the ID's given

* **[HarmonyAfter(string[])]**
	Indicates that this Prefix/Postfix should be executed after any of the ID's given

Example:

Given the following method:

```csharp
class Foo
{
	static string Bar()
	{
		return "secret";
	}
}
```

and **Plugin 1**

```csharp
var harmony = HarmonyInstance.Create("net.example.plugin1");
harmony.PatchAll(Assembly.GetExecutingAssembly());

[HarmonyPatch(typeof(Foo))]
[HarmonyPatch("Bar")]
class MyPatch
{
	static void Postfix(ref result)
	{
		result = "new secret 1";
	}
}
```

and **Plugin 2**

```csharp
var harmony = HarmonyInstance.Create("net.example.plugin2");
harmony.PatchAll(Assembly.GetExecutingAssembly());

[HarmonyPatch(typeof(Foo))]
[HarmonyPatch("Bar")]
class MyPatch
{
	static void Postfix(ref result)
	{
		result = "new secret 2";
	}
}
```

a call to `Foo.Bar()` would return "new secret 2" because both plugins register their Postfix with the same priority and so the second Postfix overrides the result of the first one. As an author of Plugin 1, you could rewrite your code to

```csharp
var harmony = HarmonyInstance.Create("net.example.plugin1");
harmony.PatchAll(Assembly.GetExecutingAssembly());

[HarmonyPatch(typeof(Foo))]
[HarmonyPatch("Bar")]
class MyPatch
{
	[HarmonyAfter(new string[] { "net.example.plugin2" })]
	static void Postfix(ref result)
	{
		result = "new secret 1";
	}
}
```

and would be executed after net.example.plugin2 which gives you (for a Postfix) the chance to change the result last. Alternatively, you could annotate with [HarmonyPriority(Priority.Low)] to come after plugin1.

All priority annotations are also valid on the class. This will define the priorities for all contained patch methods at the same time.



# Utilities

### AccessTools

To simplify reflections, Harmony has a helper class called AccessTools. Here are the most commonly used methods:

```csharp
public static BindingFlags all = ....
public static Type TypeByName(string name)
public static FieldInfo Field(Type type, string name)
public static PropertyInfo Property(Type type, string name)
public static MethodInfo Method(Type type, string name, Type[] parameters = null, Type[] generics = null)
public static ConstructorInfo Constructor(Type type, Type[] parameters = null)
public static Type Inner(Type type, string name)
public static Type FirstInner(Type type, Func<Type, bool> predicate)
```

Any of these methods use the **all** BindingFlags definition and thus work on anything regardless if it is public, private, static or else.

### Traverse

In order to access fields, properties and methods from classes via reflection, Harmony contains a utility called Traverse. Think of it as LINQ for classes. Here are the main methods:

```csharp
// starting from a type or instance
public static Traverse Create(Type type)
public static Traverse Create<T>()
public static Traverse CreateWithType(string name)

// digging deeper
public Traverse Type(string name)
public Traverse Field(string name)
public Traverse Property(string name, object[] index = null)
public Traverse Method(string name, params object[] arguments)
public Traverse Method(string name, Type[] paramTypes, object[] arguments = null)

// calling getter or method
public object GetValue()
public T GetValue<T>()
public object GetValue(params object[] arguments)
public T GetValue<T>(params object[] arguments)
public override string ToString()

// calling setter
public Traverse SetValue(object value)

// iterating
public static void IterateFields(object source, Action<Traverse> action)
public static void IterateFields(object source, object target, Action<Traverse, Traverse> action)
public static void IterateProperties(object source, Action<Traverse> action)
public static void IterateProperties(object source, object target, Action<Traverse, Traverse> action)
```

Example:

```csharp
class Foo
{
	struct Bar
	{
		static string secret = "hello";

		public string ModifiedSecret()
		{
			return secret.ToUpper();
		}
	}

	Bar myBar
	{
		get
		{
			return new Bar();
		}
	}

	public string GetSecret()
	{
		return myBar.ModifiedSecret();
	}

	Foo()
	{
	}

	static Foo MakeFoo()
	{
		return new Foo();
	}
}

var foo = Traverse.Create<Foo>().Method("MakeFoo").GetValue<Foo>();
Traverse.Create(foo).Property("myBar").Field("secret").SetValue("world");
Console.WriteLine(foo.GetSecret()); // outputs WORLD
```

Although most fields, properties and methods in that class hierarchy are private, Traverse can easily access anything. It has build-in null protection and propagates null as a result if any of the intermediates would encounter null. It works with static types and caches lookups which makes it pretty fast.

### FileLog

For simple and quick logging, Harmony uses a tool class FileLog. It has three methods:

```csharp
public static void Log(string str)
// Creates a new log file called "harmony.log.txt" on the computers Desktop (if it not already exists) and appends *str* to it.

public static void Reset()
// Deletes the log file.

public static unsafe void LogBytes(long ptr, int len)
// Same as Log(string str) but logs a hex dump and md5 hash.
```
