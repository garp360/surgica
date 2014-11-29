angular.module('hb.smartcard.factory.Inventory', [])

.factory('InventoryFactory', function ( $firebase , $q , $log, $timeout )
{
	var factory = {};
	var ref = new Firebase("https://surgica.firebaseio.com/inventory/");
	
	var inventoryTypes = [
		{ id: "xx", name : "Adapters", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Amnio Hooks", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Applicators", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Approximators", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Aspirators", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Bite Blocks", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Bone Drills", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Bougie A Boules", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Calipers", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Cast Cutters", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Chisels", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Choppers", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Clamps", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Curettes", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Diagnostics", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Dilators", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Dissectors", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Distraction Scews", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Ear Syringes", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Elevators", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Endoscopic Devices", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Endoscopic Sheaths", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Endoscopy Needles", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "ENT", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "ENT Cutting Blocks", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Extractors", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Forceps", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Gags", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Gouges", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Graspers", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Guides", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Hooks", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Impactors", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Intracorneal Rings", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Irrigation", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Knives", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Laryngeal Mirrors", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Lead Hands", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Levers", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Ligation", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Ligators", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Mallets", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Measuring Instruments", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Nail Nippers & Splitters", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Obturators", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Ocular Markers", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Orthopedic Osteotomes", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Pin & Wire Cutters", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Probes", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Punches", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Puncture/Special Needles", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Pushers", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Rasps", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Retractor Hooks", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Retractors", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Ring Cutters", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Rongeurs", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Rotators", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Saws", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Scissors", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Separators", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Snares", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Spatulas", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Specula", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Spreaders", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Staple Removers", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Stapling", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Strippers", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Suction Devices", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Tenacula", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Traction", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Trocars", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Tuning Forks", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Urethral Bougies", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Uterine Sounds", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Cath Lab", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Chest Drains", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Clean-Up Kits", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Closed Wound Drainage", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "DVT Therapy", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Eye Protection", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Face Protection", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Floor Mats", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Footwear", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Hand Hygiene", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Headwear", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Lap Sponges", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Needle & Sponge Counters", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "OR Basics", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "OR Sheets", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Orthopedic Implants and Instruments", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "OR Towels", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Positioners", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Prep Packs", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Prep Trays", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Radiology Trays", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Skin Prep", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Skin Scrub Solutions", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Specimen Vials", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Sponges", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Sterile Procedure Packs", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Sterile Procedure Trays", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Stockinettes", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Surgical Drapes", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Surgical Gloves", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Surgical Gowns", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Surgical Mesh", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Surgical Pads", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Tissue Adhesive", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Umbilical Cord Clamps", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Wound Care", description : "description", ordinal : -1, code : "XXX"},
		{ id: "xx", name : "Wrappers", description : "description", ordinal : -1, code : "XXX"}];
	
	var inventoryItems = [];

	factory.findAll = function findAll() 
	{
		var comparator = function(a,b) {
			var x = a.name.toLowerCase(), y = b.name.toLowerCase();
		    
		    return x < y ? -1 : x > y ? 1 : 0;
		};
		
		
		var proceduresRef = ref.child('procedures');
		var sync = $firebase(proceduresRef);
		var pxArray = sync.$asArray();
		pxArray.sort(comparator);

		return pxArray;
	};

	factory.findAllCategories = function findAllCategories() 
	{
		var comparator = function(a,b) {
			var x = a.name.toLowerCase(), y = b.name.toLowerCase();
			
			return x < y ? -1 : x > y ? 1 : 0;
		};
		
		var categoriesRef = ref.child('categories');
		var sync = $firebase(categoriesRef);
		var catArray = sync.$asArray();
		catArray.sort(comparator);

		return catArray;
	};
	
//	factory.initialize = function initialize() {
//		var comparator = function(a,b) {
//			var x = a.name.toLowerCase(), y = b.name.toLowerCase();
//		    
//		    return x < y ? -1 : x > y ? 1 : 0;
//		};
//		procedures.sort(comparator);
//		var sorted = procedures.slice(0);
//		
//		for(var i=0; i<sorted.length; i++) {
//			var id = "px:" + i;
//			px = {
//				id : id,
//				name : sorted[i].name,
//				description : "description",
//				code : "XXX",
//				abbr : "XXX",
//				modified : moment().toJSON(),
//				modifiedBy : "APP",
//				category: {
//					name: sorted[i].category,
//					id: "pc:"
//				}
//			};
//			ref.child('procedures').child(id).set(angular.fromJson(px));
//		}
//	};
	
//	factory.initialize = function initialize() {
//		var categories = [];
//		
//		var comparator = function(a,b) {
//			var x = a.category.toLowerCase(), y = b.category.toLowerCase();
//			
//			return x < y ? -1 : x > y ? 1 : 0;
//		};
//		
//		procedures.sort(comparator);
//		var sorted = procedures.slice(0);
//		var category = null;
//		for(var i=0; i<sorted.length; i++) {
//			if(sorted[i].category != category) {
//				category = sorted[i].category;
//				categories.push({name: category});
//			}
//		}
//		
//		for(var i=0; i<categories.length; i++) {
//			var id = "cat:" + i;
//			px = {
//				id : id,
//				name : categories[i].name,
//				description : "description",
//				ordinal : -1,
//				code : "XXX",
//				abbr : "XXX",
//				modified : moment().toJSON(),
//				modifiedBy : "APP",
//			};
//			ref.child('categories').child(id).set(angular.fromJson(px));
//		}
//	};
	
	return factory;
});