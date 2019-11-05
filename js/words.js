var isTimed = false;
var checkTimesUp = true;

var hasLimit = true;
var gameTries = 3;

var hasClueLimit = true;
var clueLimit = 5;

var easyTimer = 45;
var moderateTimer = 60;
var hardTimer = 90;

var easyScore = 5;
var moderateScore = 10;
var hardScore = 15;

var easy = [
  "bribery",
  "trojan horse",
  "key control",
  "corruption",
  "authentication",
  "cybersecurity",
  "guidelines",
  "layering",
  "pharming",
  "phishing",
  "hazard",
  "prevention",
  "audit services",
  "confidential",
  "encryption",
  "archer",
  "fraud",
  "report"
];

var easyLetters = [
  "briberyingft",
  "trojanhorsevirus",
  "keycontrolisknga",
  "corruptionolica",
  "authenticationate",
  "cybersecuritynnts",
  "guidelinescompa",
  "layeringsian",
  "pharmingfast",
  "phishingfsin",
  "hazardouis",
  "preventionivect",
  "auditservicesing",
  "confidentialsecrs",
  "encryptionlocks",
  "archerysin",
  "fraudsakei",
  "reportcall"
];


var moderate = [
  "alert",
  "audit report",
  "fictitious",
  "hacking",
  "identity theft",
  "intermediary",
  "malware",
  "monitor",
  "piracy",
  "profile",
  "risk",
  "security",
  "source of fund",
  "suspicious",
  "terrorist",
  "audit rating",
  "key risk",
  "password",
  "security token",
  "shell company",
  "third party",
  "violation"
];

var moderateLetters = [
  "alertmsi",
  "audit reportmeeng",
  "fictitiousaenrs",
  "hackingyber",
  "identitytheftstela",
  "intermediarybggas",
  "malwarevsui",
  "monitoracea",
  "piracytesn",
  "profileogns",
  "riskcare",
  "securitygadkn",
  "sourceoffundmoneys",
  "suspiciousmfngr",
  "terroristmingw",
  "auditratingnk",
  "keyriskhigh",
  "passwordsecurity",
  "securitytokenbreach",
  "shellcompanycorporation",
  "thirdpartytries",
  "violationsanc"
];

var hard = [
  "unusual",
  "due diligence",
  "legitimate",
  "skimming",
  "know your customer",
  "social engineering",
  "authority",
  "spamming",
  "scamming",
  "spoofing",
  "ransomware",
  "conflict of interest",
  "investigation",
  "evil twins",
  "consulting",
  "contingency",
  "control self assessment",
  "high risk customer",
  "insurance risk",
  "network security",
  "politically exposed person",
  "relative and close associate",
  "sanction"
];

var hardLetters = [
  "unusualqiesn",
  "duediligencefitras",
  "legitimateornas",
  "skimmingteall",
  "knowyourcustomerlientcenr",
  "socialengineeringdiams",
  "authorityledng",
  "spammingeails",
  "scammingteall",
  "spoofinghacks",
  "ransomwarevusl",
  "conflictofinterestjulagus",
  "investigationdecis",
  "eviltwinsruaei",
  "consultingant",
  "contingencyt",
  "controlselfassessmentled",
  "highriskcustomerlow",
  "insurancerisktakers",
  "networksecurityissuebreach",
  "politicallyexposedpersonality",
  "relativeandcloseassociate",
  "sanctionauc"
];