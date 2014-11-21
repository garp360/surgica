angular.module('hb.smartcard.factory.SmartCard', [])

.factory('SmartCardFactory', function ( $firebase , $q , $log, $timeout )
{
	var factory = {};
	
	var smartcards = [
          { category: "CNS", procedure: "Decompressive Craniectomy", surgeon: { firstName: "Jeffery", lastName: "Thompson", middleInitial: "M", pid: "18a7f5d9-0ad5-4649-8a5f-fa2da825c00b" } },
          { category: "CNS", procedure: "Decompressive Craniectomy", surgeon: { firstName: "Leona", lastName: "Simmons", middleInitial: "P", pid: "cc8a1a00-3d07-43ba-811e-57d38cdb8321"} },
          { category: "CNS", procedure: "Decompressive Craniectomy", surgeon: { firstName: "Lowell", lastName: "Whitmore", middleInitial: "E", pid: "4c5c749e-814c-4c02-a1e6-8a7532e8f31b"} },
          { category: "CNS", procedure: "Hemispherectomy", surgeon: { firstName: "Jeffery", lastName: "Thompson", middleInitial: "M", pid: "18a7f5d9-0ad5-4649-8a5f-fa2da825c00b" } },
          { category: "CNS", procedure: "Anterior Temporal Lobectomy", surgeon: { firstName: "Jeffery", lastName: "Thompson", middleInitial: "M", pid: "18a7f5d9-0ad5-4649-8a5f-fa2da825c00b" } },
          { category: "CNS", procedure: "Hypophysectomy", surgeon: { firstName: "Jeffery", lastName: "Thompson", middleInitial: "M", pid: "18a7f5d9-0ad5-4649-8a5f-fa2da825c00b" } },
          { category: "CNS", procedure: "Amygdalohippocampectomy" },
          { category: "CNS", procedure: "Ventriculostomy" },
          { category: "CNS", procedure: "Craniotomy", surgeon: { firstName: "Jeffery", lastName: "Thompson", middleInitial: "M", pid: "18a7f5d9-0ad5-4649-8a5f-fa2da825c00b" } },
          { category: "CNS", procedure: "Pallidotomy" },
          { category: "CNS", procedure: "Thalamotomy" },
          { category: "CNS", procedure: "Lobotomy" },
          { category: "CNS", procedure: "Bilateral Cingulotomy" },
          { category: "CNS", procedure: "Cordotomy", surgeon: { firstName: "Jeffery", lastName: "Thompson", middleInitial: "M", pid: "18a7f5d9-0ad5-4649-8a5f-fa2da825c00b" } },
          { category: "CNS", procedure: "Rhizotomyneurosurgery" },
          { category: "CNS", procedure: "Psychosurgery" },
          { category: "CNS", procedure: "Brain Biopsy", surgeon: { firstName: "Jeffery", lastName: "Thompson", middleInitial: "M", pid: "18a7f5d9-0ad5-4649-8a5f-fa2da825c00b" } },
          { category: "PNS", procedure: "Ganglionectomy", surgeon: { firstName: "Jeffery", lastName: "Thompson", middleInitial: "M", pid: "18a7f5d9-0ad5-4649-8a5f-fa2da825c00b" } },
          { category: "PNS", procedure: "Sympathectomy/Endoscopic Thoracic Sympathectomy" },
          { category: "PNS", procedure: "Neurectomy", surgeon: { firstName: "Jeffery", lastName: "Thompson", middleInitial: "M", pid: "18a7f5d9-0ad5-4649-8a5f-fa2da825c00b" } },
          { category: "PNS", procedure: "Axotomy" },
          { category: "PNS", procedure: "Vagotomy" },
          { category: "PNS", procedure: "Nerve Biopsy", surgeon: { firstName: "Jeffery", lastName: "Thompson", middleInitial: "M", pid: "18a7f5d9-0ad5-4649-8a5f-fa2da825c00b" } },
          { category: "ENDOCRINE", procedure: "Hypophysectomy" },
          { category: "ENDOCRINE", procedure: "Thyroidectomy" },
          { category: "ENDOCRINE", procedure: "Parathyroidectomy" },
          { category: "ENDOCRINE", procedure: "Adrenalectomy" },
          { category: "ENDOCRINE", procedure: "Pinealectomy" },
          { category: "EYE", procedure: "Punctoplasty" },
          { category: "EYE", procedure: "Trabeculoplasty" },
          { category: "EYE", procedure: "Photorefractive Keratectomy" },
          { category: "EYE", procedure: "Trabeculectomy" },
          { category: "EYE", procedure: "Iridectomy" },
          { category: "EYE", procedure: "Vitrectomy" },
          { category: "EYE", procedure: "Dacryocystorhinostomy" },
          { category: "EYE", procedure: "Radial Keratotomy " },
          { category: "EYE", procedure: "Mini Asymmetric Radial Keratotomy (M.A.R.K.)" },
          { category: "EYE", procedure: "Corneal Transplantation" },
          { category: "EARS", procedure: "Otoplasty" },
          { category: "EARS", procedure: "Stapedectomy" },
          { category: "EARS", procedure: "Mastoidectomy" },
          { category: "EARS", procedure: "Auriculectomy" },
          { category: "EARS", procedure: "Myringotomy" },
          { category: "RESPIRATORY", procedure: "Rhinoplasty" },
          { category: "RESPIRATORY", procedure: "Septoplasty" },
          { category: "RESPIRATORY", procedure: "Rhinectomy" },
          { category: "RESPIRATORY", procedure: "Laryngectomy" },
          { category: "RESPIRATORY", procedure: "Pneumonectomy" },
          { category: "RESPIRATORY", procedure: "Tracheostomy" },
          { category: "RESPIRATORY", procedure: "Sinusotomy" },
          { category: "RESPIRATORY", procedure: "Pneumotomy" },
          { category: "RESPIRATORY", procedure: "Cricothyroidotomy" },
          { category: "RESPIRATORY", procedure: "Cricothyrotomy" },
          { category: "RESPIRATORY", procedure: "Bronchotomy" },
          { category: "RESPIRATORY", procedure: "Thoracotomy" },
          { category: "RESPIRATORY", procedure: "Thyrotomy" },
          { category: "RESPIRATORY", procedure: "Tracheotomy" },
          { category: "RESPIRATORY", procedure: "Pleurodesis" },
          { category: "RESPIRATORY", procedure: "Lung Transplantation" },
          { category: "CV", procedure: "Angioplasty" },
          { category: "CV", procedure: "Pericardiectomy" },
          { category: "CV", procedure: "Endarterectomy" },
          { category: "CV", procedure: "Cardiotomy" },
          { category: "CV", procedure: "Pericardiotomy" },
          { category: "CV", procedure: "Heart Transplantation" },
          { category: "LYMPHATIC", procedure: "Tonsillectomy" },
          { category: "LYMPHATIC", procedure: "Adenoidectomy" },
          { category: "LYMPHATIC", procedure: "Thymectomy" },
          { category: "LYMPHATIC", procedure: "Splenectomy" },
          { category: "LYMPHATIC", procedure: "Lymphadenectomy" },
          { category: "LYMPHATIC", procedure: "Thymus Transplantation" },
          { category: "LYMPHATIC", procedure: "Spleen Transplantation" },
          { category: "LYMPHATIC", procedure: "Splenopexy" },
          { category: "LYMPHATIC", procedure: "Lymph Node Biopsy" },
          { category: "GI/MOUTH", procedure: "Uvulopalatoplasty" },
          { category: "GI/MOUTH", procedure: "Palatoplasty" },
          { category: "GI/MOUTH", procedure: "Gingivectomy" },
          { category: "GI/MOUTH", procedure: "Glossectomy" },
          { category: "GI/MOUTH", procedure: "Esophagectomy" },
          { category: "GI/MOUTH", procedure: "Gastrectomy" },
          { category: "GI/MOUTH", procedure: "Appendectomy " },
          { category: "GI/MOUTH", procedure: "Proctocolectomy" },
          { category: "GI/MOUTH", procedure: "Colectomy" },
          { category: "GI/MOUTH", procedure: "Hepatectomy" },
          { category: "GI/MOUTH", procedure: "Cholecystectomy" },
          { category: "GI/MOUTH", procedure: "Pancreatectomy/Pancreaticoduodenectomy" },
          { category: "GI/MOUTH", procedure: "Gastrostomy:Percutaneous Endoscopic Gastrostomy" },
          { category: "GI/MOUTH", procedure: "Gastroduodenostomy" },
          { category: "GI/MOUTH", procedure: "Gastroenterostomy" },
          { category: "GI/MOUTH", procedure: "Ileostomy" },
          { category: "GI/MOUTH", procedure: "Jejunostomy" },
          { category: "GI/MOUTH", procedure: "Colostomy" },
          { category: "GI/MOUTH", procedure: "Cholecystostomy" },
          { category: "GI/MOUTH", procedure: "Hepatoportoenterostomy" },
          { category: "GI/MOUTH", procedure: "Sigmoidostomy" },
          { category: "GI/MOUTH", procedure: "Uvulotomy" },
          { category: "GI/MOUTH", procedure: "Myotomy:Heller Myotomy" },
          { category: "GI/MOUTH", procedure: "Myotomy:Pyloromyotomy" },
          { category: "GI/MOUTH", procedure: "Anal Sphincterotomy" },
          { category: "GI/MOUTH", procedure: "Lateral Internal Sphincterotomy" },
          { category: "GI/MOUTH", procedure: "Vertical Banded Gastroplasty" },
          { category: "GI/MOUTH", procedure: "Gastropexy" },
          { category: "GI/MOUTH", procedure: "Colon Resection" },
          { category: "GI/MOUTH", procedure: "Nissen Fundoplication" },
          { category: "GI/MOUTH", procedure: "Hernia Repair" },
          { category: "GI/MOUTH", procedure: "Omentopexy" },
          { category: "GI/MOUTH", procedure: "Liver Biopsy" },
          { category: "URINARY", procedure: "Urethroplasty" },
          { category: "URINARY", procedure: "Pyeloplasty" },
          { category: "URINARY", procedure: "Nephrectomy" },
          { category: "URINARY", procedure: "Cystectomy" },
          { category: "URINARY", procedure: "Nephrostomy" },
          { category: "URINARY", procedure: "Ureterostomy" },
          { category: "URINARY", procedure: "Cystostomy (Suprapubic Cystostomy)" },
          { category: "URINARY", procedure: "Urostomy" },
          { category: "URINARY", procedure: "Nephrotomy" },
          { category: "URINARY", procedure: "Nephropexy" },
          { category: "URINARY", procedure: "Urethropexy" },
          { category: "URINARY", procedure: "Lithotripsy" },
          { category: "URINARY", procedure: "Kidney Transplantation" },
          { category: "URINARY", procedure: "Renal Biopsy" },
          { category: "MALE REPRODUCTIVE", procedure: "Phalloplasty" },
          { category: "MALE REPRODUCTIVE", procedure: "Scrotoplasty" },
          { category: "MALE REPRODUCTIVE", procedure: "Vasectomy" },
          { category: "MALE REPRODUCTIVE", procedure: "Penectomy" },
          { category: "MALE REPRODUCTIVE", procedure: "Orchidectomy" },
          { category: "MALE REPRODUCTIVE", procedure: "Prostatectomy" },
          { category: "MALE REPRODUCTIVE", procedure: "Posthectomy" },
          { category: "MALE REPRODUCTIVE", procedure: "Gonadectomy" },
          { category: "MALE REPRODUCTIVE", procedure: "Vasovasostomy " },
          { category: "MALE REPRODUCTIVE", procedure: "Vasoepididymostomy" },
          { category: "MALE REPRODUCTIVE", procedure: "Meatotomy" },
          { category: "MALE REPRODUCTIVE", procedure: "Circumcision" },
          { category: "MALE REPRODUCTIVE", procedure: "Foreskin Restoration" },
          { category: "MALE REPRODUCTIVE", procedure: "Orchiopexy" },
          { category: "MALE REPRODUCTIVE", procedure: "Prostate Biopsy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Vaginoplasty" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Clitoroplasty" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Labiaplasty" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Tuboplasty" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Fimbrioplasty" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Cervicectomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Clitoridectomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Oophorectomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Salpingoophorectomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Salpingectomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Hysterectomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Vaginectomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Vulvectomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Salpingostomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Amniotomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Clitoridotomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Hysterotomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Hymenotomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Episiotomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Symphysiotomy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Tubal Ligation" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Tubal Reversal" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Colporrhaphy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Cesarean Section" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Hymenorrhaphy" },
          { category: "FEMALE REPRODUCTIVE", procedure: "Endometrial Biopsy" },
          { category: "BONE", procedure: "Acromioplasty" },
          { category: "BONE", procedure: "Khyphoplasty" },
          { category: "BONE", procedure: "Mentoplasty" },
          { category: "BONE", procedure: "Acromioplasty" },
          { category: "BONE", procedure: "Ostectomy:Femoral Head Ostectomy" },
          { category: "BONE", procedure: "Ostectomy:Vertebrectomy" },
          { category: "BONE", procedure: "Ostectomy:Coccygectomy" },
          { category: "BONE", procedure: "Ostectomy:Astragalectomy" },
          { category: "BONE", procedure: "Corpectomy" },
          { category: "BONE", procedure: "Facetectomy" },
          { category: "BONE", procedure: "Laminectomy" },
          { category: "BONE", procedure: "Hemilaminectomy" },
          { category: "BONE", procedure: "Osteotomy" },
          { category: "BONE", procedure: "Epiphysiodesis" },
          { category: "JOINT", procedure: "Arthroplasty" },
          { category: "JOINT", procedure: "Rotationplasty" },
          { category: "JOINT", procedure: "Synovectomy" },
          { category: "JOINT", procedure: "Discectomy" },
          { category: "JOINT", procedure: "Arthrotomy" },
          { category: "JOINT", procedure: "Laminotomy" },
          { category: "JOINT", procedure: "Foraminotomy" },
          { category: "JOINT", procedure: "Arthrodesis" },
          { category: "JOINT", procedure: "Arthroscopy" },
          { category: "JOINT", procedure: "Ulnar Collateral Ligament Reconstruction" },
          { category: "MUSCLE", procedure: "Bursectomy" },
          { category: "MUSCLE", procedure: " Amputation:Hemicorporectomy" },
          { category: "MUSCLE", procedure: " Amputation:Hemipelvectomy" },
          { category: "MUSCLE", procedure: "Myotomy" },
          { category: "MUSCLE", procedure: "Tenotomy" },
          { category: "MUSCLE", procedure: "Fasciotomy" },
          { category: "MUSCLE", procedure: "Muscle Biopsy" },
          { category: "MUSCLE", procedure: "Amputation" },
          { category: "MUSCLE", procedure: "Tendon Transfer" },
          { category: "BREAST", procedure: "Mammoplasty" },
          { category: "BREAST", procedure: "Lumpectomy" },
          { category: "BREAST", procedure: "Mastectomy" },
          { category: "BREAST", procedure: "Breast Implant" },
          { category: "BREAST", procedure: "Mastopexy" },
          { category: "BREAST", procedure: "Breast Reconstruction" },
          { category: "BREAST", procedure: "Breast Reduction Plasty" },
          { category: "SKIN", procedure: "Escharotomy" },
          { category: "SKIN", procedure: "Skin Biopsy" },
          { category: "OTHER", procedure: "Abdominoplasty" },
          { category: "OTHER", procedure: "Hernioplasty" },
          { category: "OTHER", procedure: "Frenuloplasty" },
          { category: "OTHER", procedure: "Z-Plasty" },
          { category: "OTHER", procedure: "Diverticulectomy" },
          { category: "OTHER", procedure: "Frenectomy" },
          { category: "OTHER", procedure: "Hemorrhoidectomy" },
          { category: "OTHER", procedure: "Mastoidectomy" },
          { category: "OTHER", procedure: "Thrombectomy" },
          { category: "OTHER", procedure: "Embolectomy" } ];
	
	factory.findAll = function findAll() 
	{
		return smartcards;
	};
	
	return factory;
});