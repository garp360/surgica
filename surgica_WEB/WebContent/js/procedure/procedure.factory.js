angular.module('hb.smartcard.factory.Procedure', [])

.factory('ProcedureFactory', function ( $firebase , $q , $log, $timeout )
{
	var factory = {};
	var ref = new Firebase("https://surgica.firebaseio.com/procedure/");
		
		
	var procedures = [
      { category: "CNS", name: "Decompressive Craniectomy" },
      { category: "CNS", name: "Hemispherectomy" },
      { category: "CNS", name: "Anterior Temporal Lobectomy" },
      { category: "CNS", name: "Hypophysectomy" },
      { category: "CNS", name: "Amygdalohippocampectomy" },
      { category: "CNS", name: "Ventriculostomy" },
      { category: "CNS", name: "Craniotomy" },
      { category: "CNS", name: "Pallidotomy" },
      { category: "CNS", name: "Thalamotomy" },
      { category: "CNS", name: "Lobotomy" },
      { category: "CNS", name: "Bilateral Cingulotomy" },
      { category: "CNS", name: "Cordotomy" },
      { category: "CNS", name: "Rhizotomyneurosurgery" },
      { category: "CNS", name: "Psychosurgery" },
      { category: "CNS", name: "Brain Biopsy" },
      { category: "PNS", name: "Ganglionectomy" },
      { category: "PNS", name: "Sympathectomy: Endoscopic Thoracic Sympathectomy" },
      { category: "PNS", name: "Neurectomy" },
      { category: "PNS", name: "Axotomy" },
      { category: "PNS", name: "Vagotomy" },
      { category: "PNS", name: "Nerve Biopsy" },
      { category: "ENDOCRINE", name: "Hypophysectomy" },
      { category: "ENDOCRINE", name: "Thyroidectomy" },
      { category: "ENDOCRINE", name: "Parathyroidectomy" },
      { category: "ENDOCRINE", name: "Adrenalectomy" },
      { category: "ENDOCRINE", name: "Pinealectomy" },
      { category: "EYE", name: "Punctoplasty" },
      { category: "EYE", name: "Trabeculoplasty" },
      { category: "EYE", name: "Photorefractive Keratectomy" },
      { category: "EYE", name: "Trabeculectomy" },
      { category: "EYE", name: "Iridectomy" },
      { category: "EYE", name: "Vitrectomy" },
      { category: "EYE", name: "Dacryocystorhinostomy" },
      { category: "EYE", name: "Radial Keratotomy " },
      { category: "EYE", name: "Mini Asymmetric Radial Keratotomy (M.A.R.K.)" },
      { category: "EYE", name: "Corneal Transplantation" },
      { category: "EARS", name: "Otoplasty" },
      { category: "EARS", name: "Stapedectomy" },
      { category: "EARS", name: "Mastoidectomy" },
      { category: "EARS", name: "Auriculectomy" },
      { category: "EARS", name: "Myringotomy" },
      { category: "RESPIRATORY", name: "Rhinoplasty" },
      { category: "RESPIRATORY", name: "Septoplasty" },
      { category: "RESPIRATORY", name: "Rhinectomy" },
      { category: "RESPIRATORY", name: "Laryngectomy" },
      { category: "RESPIRATORY", name: "Pneumonectomy" },
      { category: "RESPIRATORY", name: "Tracheostomy" },
      { category: "RESPIRATORY", name: "Sinusotomy" },
      { category: "RESPIRATORY", name: "Pneumotomy" },
      { category: "RESPIRATORY", name: "Cricothyroidotomy" },
      { category: "RESPIRATORY", name: "Cricothyrotomy" },
      { category: "RESPIRATORY", name: "Bronchotomy" },
      { category: "RESPIRATORY", name: "Thoracotomy" },
      { category: "RESPIRATORY", name: "Thyrotomy" },
      { category: "RESPIRATORY", name: "Tracheotomy" },
      { category: "RESPIRATORY", name: "Pleurodesis" },
      { category: "RESPIRATORY", name: "Lung Transplantation" },
      { category: "CV", name: "Angioplasty" },
      { category: "CV", name: "Pericardiectomy" },
      { category: "CV", name: "Endarterectomy" },
      { category: "CV", name: "Cardiotomy" },
      { category: "CV", name: "Pericardiotomy" },
      { category: "CV", name: "Heart Transplantation" },
      { category: "LYMPHATIC", name: "Tonsillectomy" },
      { category: "LYMPHATIC", name: "Adenoidectomy" },
      { category: "LYMPHATIC", name: "Thymectomy" },
      { category: "LYMPHATIC", name: "Splenectomy" },
      { category: "LYMPHATIC", name: "Lymphadenectomy" },
      { category: "LYMPHATIC", name: "Thymus Transplantation" },
      { category: "LYMPHATIC", name: "Spleen Transplantation" },
      { category: "LYMPHATIC", name: "Splenopexy" },
      { category: "LYMPHATIC", name: "Lymph Node Biopsy" },
      { category: "GI/MOUTH", name: "Uvulopalatoplasty" },
      { category: "GI/MOUTH", name: "Palatoplasty" },
      { category: "GI/MOUTH", name: "Gingivectomy" },
      { category: "GI/MOUTH", name: "Glossectomy" },
      { category: "GI/MOUTH", name: "Esophagectomy" },
      { category: "GI/MOUTH", name: "Gastrectomy" },
      { category: "GI/MOUTH", name: "Appendectomy " },
      { category: "GI/MOUTH", name: "Proctocolectomy" },
      { category: "GI/MOUTH", name: "Colectomy" },
      { category: "GI/MOUTH", name: "Hepatectomy" },
      { category: "GI/MOUTH", name: "Cholecystectomy" },
      { category: "GI/MOUTH", name: "Pancreatectomy: Pancreaticoduodenectomy" },
      { category: "GI/MOUTH", name: "Gastrostomy: Percutaneous Endoscopic Gastrostomy" },
      { category: "GI/MOUTH", name: "Gastroduodenostomy" },
      { category: "GI/MOUTH", name: "Gastroenterostomy" },
      { category: "GI/MOUTH", name: "Ileostomy" },
      { category: "GI/MOUTH", name: "Jejunostomy" },
      { category: "GI/MOUTH", name: "Colostomy" },
      { category: "GI/MOUTH", name: "Cholecystostomy" },
      { category: "GI/MOUTH", name: "Hepatoportoenterostomy" },
      { category: "GI/MOUTH", name: "Sigmoidostomy" },
      { category: "GI/MOUTH", name: "Uvulotomy" },
      { category: "GI/MOUTH", name: "Myotomy" },
      { category: "GI/MOUTH", name: "Myotomy: Heller Myotomy" },
      { category: "GI/MOUTH", name: "Myotomy: Pyloromyotomy" },
      { category: "GI/MOUTH", name: "Anal Sphincterotomy" },
      { category: "GI/MOUTH", name: "Lateral Internal Sphincterotomy" },
      { category: "GI/MOUTH", name: "Vertical Banded Gastroplasty" },
      { category: "GI/MOUTH", name: "Gastropexy" },
      { category: "GI/MOUTH", name: "Colon Resection" },
      { category: "GI/MOUTH", name: "Nissen Fundoplication" },
      { category: "GI/MOUTH", name: "Hernia Repair" },
      { category: "GI/MOUTH", name: "Omentopexy" },
      { category: "GI/MOUTH", name: "Liver Biopsy" },
      { category: "URINARY", name: "Urethroplasty" },
      { category: "URINARY", name: "Pyeloplasty" },
      { category: "URINARY", name: "Nephrectomy" },
      { category: "URINARY", name: "Cystectomy" },
      { category: "URINARY", name: "Nephrostomy" },
      { category: "URINARY", name: "Ureterostomy" },
      { category: "URINARY", name: "Cystostomy (Suprapubic Cystostomy)" },
      { category: "URINARY", name: "Urostomy" },
      { category: "URINARY", name: "Nephrotomy" },
      { category: "URINARY", name: "Nephropexy" },
      { category: "URINARY", name: "Urethropexy" },
      { category: "URINARY", name: "Lithotripsy" },
      { category: "URINARY", name: "Kidney Transplantation" },
      { category: "URINARY", name: "Renal Biopsy" },
      { category: "MALE REPRODUCTIVE", name: "Phalloplasty" },
      { category: "MALE REPRODUCTIVE", name: "Scrotoplasty" },
      { category: "MALE REPRODUCTIVE", name: "Vasectomy" },
      { category: "MALE REPRODUCTIVE", name: "Penectomy" },
      { category: "MALE REPRODUCTIVE", name: "Orchidectomy" },
      { category: "MALE REPRODUCTIVE", name: "Prostatectomy" },
      { category: "MALE REPRODUCTIVE", name: "Posthectomy" },
      { category: "MALE REPRODUCTIVE", name: "Gonadectomy" },
      { category: "MALE REPRODUCTIVE", name: "Vasovasostomy " },
      { category: "MALE REPRODUCTIVE", name: "Vasoepididymostomy" },
      { category: "MALE REPRODUCTIVE", name: "Meatotomy" },
      { category: "MALE REPRODUCTIVE", name: "Circumcision" },
      { category: "MALE REPRODUCTIVE", name: "Foreskin Restoration" },
      { category: "MALE REPRODUCTIVE", name: "Orchiopexy" },
      { category: "MALE REPRODUCTIVE", name: "Prostate Biopsy" },
      { category: "FEMALE REPRODUCTIVE", name: "Vaginoplasty" },
      { category: "FEMALE REPRODUCTIVE", name: "Clitoroplasty" },
      { category: "FEMALE REPRODUCTIVE", name: "Labiaplasty" },
      { category: "FEMALE REPRODUCTIVE", name: "Tuboplasty" },
      { category: "FEMALE REPRODUCTIVE", name: "Fimbrioplasty" },
      { category: "FEMALE REPRODUCTIVE", name: "Cervicectomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Clitoridectomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Oophorectomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Salpingoophorectomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Salpingectomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Hysterectomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Vaginectomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Vulvectomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Salpingostomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Amniotomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Clitoridotomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Hysterotomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Hymenotomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Episiotomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Symphysiotomy" },
      { category: "FEMALE REPRODUCTIVE", name: "Tubal Ligation" },
      { category: "FEMALE REPRODUCTIVE", name: "Tubal Reversal" },
      { category: "FEMALE REPRODUCTIVE", name: "Colporrhaphy" },
      { category: "FEMALE REPRODUCTIVE", name: "Cesarean Section" },
      { category: "FEMALE REPRODUCTIVE", name: "Hymenorrhaphy" },
      { category: "FEMALE REPRODUCTIVE", name: "Endometrial Biopsy" },
      { category: "BONE", name: "Acromioplasty" },
      { category: "BONE", name: "Khyphoplasty" },
      { category: "BONE", name: "Mentoplasty" },
      { category: "BONE", name: "Ostectomy" },
      { category: "BONE", name: "Ostectomy: Femoral Head Ostectomy" },
      { category: "BONE", name: "Ostectomy: Vertebrectomy" },
      { category: "BONE", name: "Ostectomy: Coccygectomy" },
      { category: "BONE", name: "Ostectomy: Astragalectomy" },
      { category: "BONE", name: "Corpectomy" },
      { category: "BONE", name: "Facetectomy" },
      { category: "BONE", name: "Laminectomy" },
      { category: "BONE", name: "Hemilaminectomy" },
      { category: "BONE", name: "Osteotomy" },
      { category: "BONE", name: "Epiphysiodesis" },
      { category: "JOINT", name: "Arthroplasty" },
      { category: "JOINT", name: "Rotationplasty" },
      { category: "JOINT", name: "Synovectomy" },
      { category: "JOINT", name: "Discectomy" },
      { category: "JOINT", name: "Arthrotomy" },
      { category: "JOINT", name: "Laminotomy" },
      { category: "JOINT", name: "Foraminotomy" },
      { category: "JOINT", name: "Arthrodesis" },
      { category: "JOINT", name: "Arthroscopy" },
      { category: "JOINT", name: "Ulnar Collateral Ligament Reconstruction" },
      { category: "MUSCLE", name: "Bursectomy" },
      { category: "MUSCLE", name: "Amputation" },
      { category: "MUSCLE", name: "Amputation: Hemicorporectomy" },
      { category: "MUSCLE", name: "Amputation: Hemipelvectomy" },
      { category: "MUSCLE", name: "Myotomy" },
      { category: "MUSCLE", name: "Tenotomy" },
      { category: "MUSCLE", name: "Fasciotomy" },
      { category: "MUSCLE", name: "Muscle Biopsy" },
      { category: "MUSCLE", name: "Amputation" },
      { category: "MUSCLE", name: "Tendon Transfer" },
      { category: "BREAST", name: "Mammoplasty" },
      { category: "BREAST", name: "Lumpectomy" },
      { category: "BREAST", name: "Mastectomy" },
      { category: "BREAST", name: "Breast Implant" },
      { category: "BREAST", name: "Mastopexy" },
      { category: "BREAST", name: "Breast Reconstruction" },
      { category: "BREAST", name: "Breast Reduction Plasty" },
      { category: "SKIN", name: "Escharotomy" },
      { category: "SKIN", name: "Skin Biopsy" },
      { category: "OTHER", name: "Abdominoplasty" },
      { category: "OTHER", name: "Hernioplasty" },
      { category: "OTHER", name: "Frenuloplasty" },
      { category: "OTHER", name: "Z-Plasty" },
      { category: "OTHER", name: "Diverticulectomy" },
      { category: "OTHER", name: "Frenectomy" },
      { category: "OTHER", name: "Hemorrhoidectomy" },
      { category: "OTHER", name: "Mastoidectomy" },
      { category: "OTHER", name: "Thrombectomy" },
      { category: "OTHER", name: "Embolectomy" } ];

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