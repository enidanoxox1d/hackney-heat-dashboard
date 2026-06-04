
const criteria = [{"key": "treeCanopy", "category": "Environment", "type": "Negative", "label": "Low tree canopy", "weight": 0.06, "measured": "% tree canopy cover within 250m of school", "rule": "-1 if <10%; -0.5 if 10–20%; 0 if >20%"}, {"key": "greenSpace", "category": "Environment", "type": "Negative", "label": "Limited green space access", "weight": 0.05, "measured": "Distance to nearest park/green space (m)", "rule": "-1 if >500m; -0.5 if 250–500m; 0 if <250m"}, {"key": "surfaceTemp", "category": "Environment", "type": "Negative", "label": "High local surface temperature", "weight": 0.06, "measured": "Summer land surface temperature or GLA overheating risk", "rule": "-1 if >35°C or High/Very High; -0.5 if 30–35°C or Medium; 0 if <30°C or Low"}, {"key": "treePlanting", "category": "Environment", "type": "Positive", "label": "Tree planting", "weight": 0.06, "measured": "Number of trees planted per 100m² of outdoor space", "rule": "1 if ≥2 trees; 0.5 if 1 tree; 0 if none"}, {"key": "outdoorShade", "category": "Environment", "type": "Positive", "label": "Outdoor shade provision", "weight": 0.05, "measured": "% outdoor play/seating area shaded", "rule": "1 if ≥30%; 0.5 if 10–29%; 0 if <10%"}, {"key": "playgroundGreening", "category": "Environment", "type": "Positive", "label": "Playground greening", "weight": 0.06, "measured": "% hard surface converted to planting/soft/permeable surface", "rule": "1 if ≥30%; 0.5 if 10–29%; 0 if <10%"}, {"key": "ventilationPotential", "category": "Built Environment", "type": "Negative", "label": "Poor ventilation potential", "weight": 0.05, "measured": "Openable window area as % of classroom floor area", "rule": "-1 if <2%; -0.5 if 2–4.9%; 0 if ≥5%"}, {"key": "roadProximity", "category": "Built Environment", "type": "Negative", "label": "Poor air quality / major road proximity", "weight": 0.05, "measured": "Distance to nearest major road (m)", "rule": "-1 if <100m; -0.5 if 100–250m; 0 if >250m"}, {"key": "indoorOverheating", "category": "Built Environment", "type": "Negative", "label": "Indoor overheating risk", "weight": 0.07, "measured": "% priority classrooms exceeding 26°C for 2+ hours", "rule": "-1 if >50%; -0.5 if 20–50%; 0 if <20%"}, {"key": "crossVentilation", "category": "Built Environment", "type": "Positive", "label": "Window opening / cross-ventilation", "weight": 0.05, "measured": "Number of opposing openable windows per classroom", "rule": "1 if ≥2 in most classrooms; 0.5 if some classrooms; 0 if unavailable"}, {"key": "coolingRefuge", "category": "Built Environment", "type": "Positive", "label": "Cooling units / cooled refuge rooms", "weight": 0.07, "measured": "Cooling provision in priority classrooms", "rule": "1 if 1 unit per priority classroom or 1 per 50–70m²; 0.5 if limited refuge rooms; 0 if none"}, {"key": "roofShadeRetrofit", "category": "Built Environment", "type": "Positive", "label": "External shading / roof retrofit", "weight": 0.05, "measured": "% windows shaded or % exposed roof retrofitted", "rule": "1 if ≥75% windows shaded or ≥50% roof retrofitted; 0.5 if partial; 0 if not met"}, {"key": "pupilVulnerability", "category": "Socio-economic / Preparedness", "type": "Negative", "label": "Higher pupil vulnerability", "weight": 0.05, "measured": "% pupils who are early-years/primary/SEND/EHCP", "rule": "-1 if high vulnerability; -0.5 if medium; 0 if low"}, {"key": "fsmVulnerability", "category": "Socio-economic / Preparedness", "type": "Negative", "label": "Deprivation / FSM vulnerability", "weight": 0.05, "measured": "% pupils eligible for free school meals", "rule": "-1 if >50%; -0.5 if 30–50%; 0 if <30%"}, {"key": "travelExposure", "category": "Socio-economic / Preparedness", "type": "Negative", "label": "Long heat-exposed travel", "weight": 0.06, "measured": "Distance to nearest public transport stop (m)", "rule": "-1 if >500m; -0.5 if 250–500m; 0 if <250m"}, {"key": "hydrationSupport", "category": "Socio-economic / Preparedness", "type": "Positive", "label": "Water access / hydration support", "weight": 0.06, "measured": "Water points per floor/pupil and distance from classrooms", "rule": "1 if ≥1 refill station per floor or per 100 pupils and classrooms within 30m; 0.5 if partial; 0 if not met"}, {"key": "teacherTraining", "category": "Socio-economic / Preparedness", "type": "Positive", "label": "Teacher heat-risk training", "weight": 0.05, "measured": "Number of annual staff training sessions", "rule": "1 if ≥1 annual training for all staff; 0.5 if partial/optional; 0 if none"}, {"key": "studentEducation", "category": "Socio-economic / Preparedness", "type": "Positive", "label": "Student climate-risk education / communication", "weight": 0.05, "measured": "Lessons, workshops, or messages during summer term", "rule": "1 if ≥1 lesson per term and regular May–July messages; 0.5 if partial; 0 if none"}];
const schools = [{"school_name": "Daubeney Primary School", "address": "Daubeney Road, Clapton, London, E5 0EG", "latitude": 51.5583, "longitude": -0.037}, {"school_name": "Lauriston School", "address": "Rutland Road, London, E9 7JS", "latitude": 51.53688, "longitude": -0.046848}, {"school_name": "Sebright School", "address": "Audrey Street, Goldsmiths Row, London, E2 8QH", "latitude": 51.533367, "longitude": -0.065455}, {"school_name": "Gainsborough Primary School", "address": "Berkshire Road, London, E9 5ND", "latitude": 51.5435, "longitude": -0.0318}, {"school_name": "Morningside Primary School", "address": "Chatham Place, Hackney, London, E9 6LL", "latitude": 51.546, "longitude": -0.0535}, {"school_name": "Holy Trinity Church of England Primary School", "address": "Beechwood Road, London, E8 3DY", "latitude": 51.5451, "longitude": -0.0634}, {"school_name": "St John the Baptist Voluntary Aided Church of England Primary School", "address": "Crondall Street, London, N1 6JG", "latitude": 51.5355, "longitude": -0.0858}, {"school_name": "St Matthias Church of England Primary School", "address": "Wordsworth Road, London, N16 8DD", "latitude": 51.5625, "longitude": -0.0784}, {"school_name": "Springfield Community Primary School", "address": "Castlewood Road, Hackney, London, N16 6DH", "latitude": 51.5592, "longitude": -0.0737}, {"school_name": "St John and St James CofE Primary School", "address": "Isabella Road, Hackney, London, E9 6DX", "latitude": 51.5433, "longitude": -0.0498}, {"school_name": "Kingsmead Primary School", "address": "Kingsmead Way, London, E9 5PP", "latitude": 51.5469, "longitude": -0.0348}, {"school_name": "Mandeville Primary School", "address": "Oswald Street, Hackney, London, E5 0BT", "latitude": 51.5521, "longitude": -0.0421}, {"school_name": "Gayhurst Community School", "address": "Gayhurst Road, Hackney, London, E8 3EN", "latitude": 51.5403, "longitude": -0.0594}, {"school_name": "Shacklewell Primary School", "address": "Shacklewell Row, Hackney, London, E8 2EA", "latitude": 51.5522, "longitude": -0.0736}, {"school_name": "Woodberry Down Community Primary School", "address": "Woodberry Grove, Finsbury Park, London, N4 1SY", "latitude": 51.5714, "longitude": -0.095}, {"school_name": "Grazebrook Primary School", "address": "Lordship Road, Stoke Newington, London, N16 0QP", "latitude": 51.5629, "longitude": -0.0875}, {"school_name": "Thomas Fairchild Community Primary School", "address": "Forston Street, London, N1 7HA", "latitude": 51.5357, "longitude": -0.084}, {"school_name": "Orchard Primary School", "address": "Holcroft Road, Hackney, London, E9 7BB", "latitude": 51.5389, "longitude": -0.0455}, {"school_name": "Southwold Primary School", "address": "Detmold Road, Clapton, Hackney, E5 9NL", "latitude": 51.5616, "longitude": -0.0529}, {"school_name": "Hoxton Garden Primary", "address": "Ivy Street, Hackney, London, N1 5JD", "latitude": 51.5332, "longitude": -0.083}];
const demoDefaults = {"Gainsborough Primary School": {"negative": {"treeCanopy": -1, "greenSpace": -1, "surfaceTemp": -1, "ventilationPotential": -1, "roadProximity": -0.5, "indoorOverheating": -1, "pupilVulnerability": -1, "fsmVulnerability": -1, "travelExposure": -0.5}, "positive": {"treePlanting": 0, "outdoorShade": 0, "playgroundGreening": 0, "crossVentilation": 0, "coolingRefuge": 0.5, "roofShadeRetrofit": 0, "hydrationSupport": 0, "teacherTraining": 0, "studentEducation": 0}}, "St John the Baptist Voluntary Aided Church of England Primary School": {"negative": {"treeCanopy": -1, "greenSpace": -1, "surfaceTemp": -1, "ventilationPotential": -1, "roadProximity": -0.5, "indoorOverheating": -1, "pupilVulnerability": -1, "fsmVulnerability": -1, "travelExposure": -0.5}, "positive": {"treePlanting": 0, "outdoorShade": 0, "playgroundGreening": 0, "crossVentilation": 0, "coolingRefuge": 0.5, "roofShadeRetrofit": 0, "hydrationSupport": 0, "teacherTraining": 0, "studentEducation": 0}}, "Kingsmead Primary School": {"negative": {"treeCanopy": -1, "greenSpace": -1, "surfaceTemp": -1, "ventilationPotential": -1, "roadProximity": -0.5, "indoorOverheating": -1, "pupilVulnerability": -1, "fsmVulnerability": -1, "travelExposure": -0.5}, "positive": {"treePlanting": 0, "outdoorShade": 0, "playgroundGreening": 0, "crossVentilation": 0, "coolingRefuge": 0.5, "roofShadeRetrofit": 0, "hydrationSupport": 0, "teacherTraining": 0, "studentEducation": 0}}, "Thomas Fairchild Community Primary School": {"negative": {"treeCanopy": -1, "greenSpace": -1, "surfaceTemp": -1, "ventilationPotential": -1, "roadProximity": -0.5, "indoorOverheating": -1, "pupilVulnerability": -1, "fsmVulnerability": -1, "travelExposure": -0.5}, "positive": {"treePlanting": 0, "outdoorShade": 0, "playgroundGreening": 0, "crossVentilation": 0, "coolingRefuge": 0.5, "roofShadeRetrofit": 0, "hydrationSupport": 0, "teacherTraining": 0, "studentEducation": 0}}, "Hoxton Garden Primary": {"negative": {"treeCanopy": -1, "greenSpace": -1, "surfaceTemp": -1, "ventilationPotential": -1, "roadProximity": -0.5, "indoorOverheating": -1, "pupilVulnerability": -1, "fsmVulnerability": -1, "travelExposure": -0.5}, "positive": {"treePlanting": 0, "outdoorShade": 0, "playgroundGreening": 0, "crossVentilation": 0, "coolingRefuge": 0.5, "roofShadeRetrofit": 0, "hydrationSupport": 0, "teacherTraining": 0, "studentEducation": 0}}, "Daubeney Primary School": {"negative": {"treeCanopy": -1, "greenSpace": -0.5, "surfaceTemp": -1, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -1, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": -0.5}, "positive": {"treePlanting": 0.5, "outdoorShade": 0, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0}}, "Sebright School": {"negative": {"treeCanopy": -1, "greenSpace": -0.5, "surfaceTemp": -1, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -1, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": -0.5}, "positive": {"treePlanting": 0.5, "outdoorShade": 0, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0}}, "Holy Trinity Church of England Primary School": {"negative": {"treeCanopy": -1, "greenSpace": -0.5, "surfaceTemp": -1, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -1, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": -0.5}, "positive": {"treePlanting": 0.5, "outdoorShade": 0, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0}}, "Springfield Community Primary School": {"negative": {"treeCanopy": -1, "greenSpace": -0.5, "surfaceTemp": -1, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -1, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": -0.5}, "positive": {"treePlanting": 0.5, "outdoorShade": 0, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0}}, "Southwold Primary School": {"negative": {"treeCanopy": -1, "greenSpace": -0.5, "surfaceTemp": -1, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -1, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": -0.5}, "positive": {"treePlanting": 0.5, "outdoorShade": 0, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0}}, "Lauriston School": {"negative": {"treeCanopy": -0.5, "greenSpace": -0.5, "surfaceTemp": -0.5, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -0.5, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": 0}, "positive": {"treePlanting": 0.5, "outdoorShade": 0.5, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0.5, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0.5}}, "Morningside Primary School": {"negative": {"treeCanopy": -0.5, "greenSpace": -0.5, "surfaceTemp": -0.5, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -0.5, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": 0}, "positive": {"treePlanting": 0.5, "outdoorShade": 0.5, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0.5, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0.5}}, "St Matthias Church of England Primary School": {"negative": {"treeCanopy": -0.5, "greenSpace": -0.5, "surfaceTemp": -0.5, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -0.5, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": 0}, "positive": {"treePlanting": 0.5, "outdoorShade": 0.5, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0.5, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0.5}}, "St John and St James CofE Primary School": {"negative": {"treeCanopy": -0.5, "greenSpace": -0.5, "surfaceTemp": -0.5, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -0.5, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": 0}, "positive": {"treePlanting": 0.5, "outdoorShade": 0.5, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0.5, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0.5}}, "Mandeville Primary School": {"negative": {"treeCanopy": -0.5, "greenSpace": -0.5, "surfaceTemp": -0.5, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -0.5, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": 0}, "positive": {"treePlanting": 0.5, "outdoorShade": 0.5, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0.5, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0.5}}, "Shacklewell Primary School": {"negative": {"treeCanopy": -0.5, "greenSpace": -0.5, "surfaceTemp": -0.5, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -0.5, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": 0}, "positive": {"treePlanting": 0.5, "outdoorShade": 0.5, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0.5, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0.5}}, "Woodberry Down Community Primary School": {"negative": {"treeCanopy": -0.5, "greenSpace": -0.5, "surfaceTemp": -0.5, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -0.5, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": 0}, "positive": {"treePlanting": 0.5, "outdoorShade": 0.5, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0.5, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0.5}}, "Orchard Primary School": {"negative": {"treeCanopy": -0.5, "greenSpace": -0.5, "surfaceTemp": -0.5, "ventilationPotential": -0.5, "roadProximity": -0.5, "indoorOverheating": -0.5, "pupilVulnerability": -0.5, "fsmVulnerability": -0.5, "travelExposure": 0}, "positive": {"treePlanting": 0.5, "outdoorShade": 0.5, "playgroundGreening": 0.5, "crossVentilation": 0.5, "coolingRefuge": 0.5, "roofShadeRetrofit": 0.5, "hydrationSupport": 0.5, "teacherTraining": 0.5, "studentEducation": 0.5}}, "Gayhurst Community School": {"negative": {"treeCanopy": 0, "greenSpace": -0.5, "surfaceTemp": 0, "ventilationPotential": 0, "roadProximity": 0, "indoorOverheating": 0, "pupilVulnerability": 0, "fsmVulnerability": -0.5, "travelExposure": 0}, "positive": {"treePlanting": 1, "outdoorShade": 0.5, "playgroundGreening": 1, "crossVentilation": 0.5, "coolingRefuge": 1, "roofShadeRetrofit": 0.5, "hydrationSupport": 1, "teacherTraining": 1, "studentEducation": 0.5}}, "Grazebrook Primary School": {"negative": {"treeCanopy": 0, "greenSpace": -0.5, "surfaceTemp": 0, "ventilationPotential": 0, "roadProximity": 0, "indoorOverheating": 0, "pupilVulnerability": 0, "fsmVulnerability": -0.5, "travelExposure": 0}, "positive": {"treePlanting": 1, "outdoorShade": 0.5, "playgroundGreening": 1, "crossVentilation": 0.5, "coolingRefuge": 1, "roofShadeRetrofit": 0.5, "hydrationSupport": 1, "teacherTraining": 1, "studentEducation": 0.5}}};
const storageKey = "hackneyThreeCategoryScoresV1";
let savedScores = JSON.parse(localStorage.getItem(storageKey) || "{}");
let currentSchools = [];
let markerBySchoolName = {};

const map = L.map("map").setView([51.548, -0.060], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors"
}).addTo(map);
L.circle([51.548, -0.060], {
  radius: 4500,
  color: "#1f5c50",
  weight: 2,
  dashArray: "8, 8",
  fillColor: "#1f5c50",
  fillOpacity: 0.07
}).addTo(map);
const markerLayer = L.layerGroup().addTo(map);

function defaultScoreObject() {
  const negative = {};
  const positive = {};
  criteria.forEach(c => {
    if (c.type === "Negative") negative[c.key] = 0;
    else positive[c.key] = 0;
  });
  return { negative, positive };
}

function getSchoolScoreData(name) {
  return savedScores[name] || demoDefaults[name] || defaultScoreObject();
}

function calculateSchoolResult(data) {
  let negativeTotal = 0;
  let positiveTotal = 0;
  const categoryTotals = {
    "Environment": 0,
    "Built Environment": 0,
    "Socio-economic / Preparedness": 0
  };

  criteria.forEach(c => {
    const score = c.type === "Negative" ? Number(data.negative[c.key] || 0) : Number(data.positive[c.key] || 0);
    const contribution = c.weight * score;
    if (c.type === "Negative") negativeTotal += contribution;
    else positiveTotal += contribution;
    categoryTotals[c.category] += contribution;
  });

  const rawScore = negativeTotal + positiveTotal;
  const resilienceScore = Math.max(0, Math.min(100, Math.round((rawScore + 0.5) * 100)));
  return {
    negativeTotal,
    positiveTotal,
    rawScore,
    resilienceScore,
    interpretation: getInterpretation(resilienceScore),
    categoryTotals
  };
}

function getInterpretation(score) {
  if (score <= 25) return "Very High Concern";
  if (score <= 50) return "High Concern";
  if (score <= 75) return "Moderate / Improving";
  return "Strong Heat Resilience";
}

function getColor(interpretation) {
  if (interpretation === "Very High Concern") return "#b83232";
  if (interpretation === "High Concern") return "#d86f27";
  if (interpretation === "Moderate / Improving") return "#c99a3d";
  return "#2f7d57";
}

function getBadgeClass(interpretation) {
  if (interpretation === "Very High Concern") return "very-high";
  if (interpretation === "High Concern") return "high";
  if (interpretation === "Moderate / Improving") return "moderate";
  return "strong";
}

function getPriorityAction(interpretation) {
  if (interpretation === "Very High Concern") return "Immediate heat audit, shade/cooling support, hydration review, and urgent adaptation planning.";
  if (interpretation === "High Concern") return "Prioritise short-term heat response and targeted upgrades in the next planning cycle.";
  if (interpretation === "Moderate / Improving") return "Monitor remaining gaps and strengthen preparedness before summer.";
  return "Maintain current resilience measures and review annually.";
}

function enrichSchools() {
  return schools.map(school => {
    const result = calculateSchoolResult(getSchoolScoreData(school.school_name));
    return { ...school, ...result, priority_action: getPriorityAction(result.interpretation) };
  });
}

function renderSchoolDropdown() {
  const select = document.getElementById("schoolSelect");
  schools.forEach(school => {
    const option = document.createElement("option");
    option.value = school.school_name;
    option.textContent = school.school_name;
    select.appendChild(option);
  });
}

function createScoreSelect(value, key, type) {
  const options = type === "Negative" ? [0, -0.5, -1] : [0, 0.5, 1];
  return `<select class="score-select" data-key="${key}" data-type="${type}">
    ${options.map(v => `<option value="${v}" ${Number(value) === v ? "selected" : ""}>${v}</option>`).join("")}
  </select>`;
}

function renderCategoryTables() {
  const schoolName = document.getElementById("schoolSelect").value;
  const data = getSchoolScoreData(schoolName);
  const container = document.getElementById("categoryTables");
  container.innerHTML = "";

  const categories = ["Environment", "Built Environment", "Socio-economic / Preparedness"];
  categories.forEach((category, index) => {
    const categoryCriteria = criteria.filter(c => c.category === category);
    const section = document.createElement("section");
    section.className = "score-table-section criteria-accordion-section";
    section.innerHTML = `
      <details class="criteria-accordion">
        <summary>
          <div class="criteria-summary-text">
            <div class="section-kicker">${category}</div>
            <h2>${category} Criteria</h2>
            <p>Click to expand and enter scores for this category.</p>
          </div>
          <div class="criteria-summary-meta">
            <span>${categoryCriteria.length} items</span>
          </div>
        </summary>
        <div class="criteria-accordion-content">
          <div class="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Factor / Action</th>
                  <th>Weight</th>
                  <th>Measured value / evidence</th>
                  <th>Scoring rule</th>
                  <th>Score</th>
                  <th>Contribution</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </details>
    `;
    const tbody = section.querySelector("tbody");
    categoryCriteria.forEach(c => {
      const score = c.type === "Negative" ? Number(data.negative[c.key] || 0) : Number(data.positive[c.key] || 0);
      const contribution = c.weight * score;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="${c.type === "Negative" ? "type-negative" : "type-positive"}">${c.type}</td>
        <td>${c.label}</td>
        <td>${c.weight.toFixed(2)}</td>
        <td>${c.measured}</td>
        <td>${c.rule}</td>
        <td>${createScoreSelect(score, c.key, c.type)}</td>
        <td class="contribution-cell">${contribution.toFixed(3)}</td>
      `;
      tbody.appendChild(row);
    });
    container.appendChild(section);
  });

  document.querySelectorAll(".score-select").forEach(select => select.addEventListener("change", handleScoreChange));
  updateInputSummary();
}

function handleScoreChange(event) {
  const schoolName = document.getElementById("schoolSelect").value;
  const type = event.target.dataset.type;
  const key = event.target.dataset.key;
  const value = Number(event.target.value);
  const current = JSON.parse(JSON.stringify(getSchoolScoreData(schoolName)));

  if (type === "Negative") current.negative[key] = value;
  else current.positive[key] = value;

  savedScores[schoolName] = current;
  renderCategoryTables();
}

function updateInputSummary() {
  const schoolName = document.getElementById("schoolSelect").value;
  const result = calculateSchoolResult(getSchoolScoreData(schoolName));

  document.getElementById("resilienceScoreDisplay").textContent = result.resilienceScore;

  document.getElementById("environmentContribution").textContent = result.categoryTotals["Environment"].toFixed(2);
  document.getElementById("builtContribution").textContent = result.categoryTotals["Built Environment"].toFixed(2);
  document.getElementById("socioContribution").textContent = result.categoryTotals["Socio-economic / Preparedness"].toFixed(2);

  const badge = document.getElementById("riskBadge");
  badge.className = `badge ${getBadgeClass(result.interpretation)}`;
  badge.textContent = result.interpretation;
  document.getElementById("riskExplanation").textContent =
    `This school currently has a heat resilience score of ${result.resilienceScore}/100.`;
}

function saveCurrentSchool() {
  localStorage.setItem(storageKey, JSON.stringify(savedScores));
  updateMapDashboard();
  alert("School score saved. The map and ranking have been updated.");
}

function resetCurrentSchool() {
  const schoolName = document.getElementById("schoolSelect").value;
  delete savedScores[schoolName];
  localStorage.setItem(storageKey, JSON.stringify(savedScores));
  renderCategoryTables();
  updateMapDashboard();
}


function getScoreNarrative(score) {
  if (score <= 25) {
    return "This school is currently in the highest-priority band. In simple terms, it may be more exposed to heat risk and may have fewer protective measures in place.";
  }
  if (score <= 50) {
    return "This school is in the high-concern band. It may need targeted support before or during hot periods, especially in the areas with the weakest category scores.";
  }
  if (score <= 75) {
    return "This school is in the moderate / improving band. Some resilience measures appear to be in place, but there are still gaps worth monitoring and improving.";
  }
  return "This school is in the stronger-resilience band. Based on the submitted data, it appears to be relatively better prepared for heat risk than other schools in the dashboard.";
}

function getCategoryStatus(value) {
  if (value <= -0.05) {
    return {
      label: "Needs attention",
      description: "This category is currently lowering the school's overall heat-resilience profile."
    };
  }
  if (value < 0.03) {
    return {
      label: "Mixed picture",
      description: "This category shows some strengths, but there are still important gaps to improve."
    };
  }
  return {
    label: "Relatively stronger",
    description: "This category is currently supporting the school's heat resilience."
  };
}

function getCategoryCardClass(category) {
  if (category === "Environment") return "environment-card";
  if (category === "Built Environment") return "built-card";
  return "socio-card";
}

function formatSignedValue(value) {
  return value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2);
}


function getPlainScoreMeaning(score) {
  if (score <= 25) return "This school should be treated as an urgent priority for heat-resilience support.";
  if (score <= 50) return "This school is a priority for targeted support before the next period of extreme heat.";
  if (score <= 75) return "This school has some useful resilience measures, but there are still gaps to monitor.";
  return "This school appears comparatively well prepared, based on the submitted inputs.";
}

function getCategoryDisplayName(category) {
  if (category === "Socio-economic / Preparedness") return "Socio-economic / Preparedness";
  return category;
}

function getCategoryPlainMeaning(category, value) {
  const direction = value >= 0.08 ? "strong" : value >= 0.03 ? "helpful" : value > -0.03 ? "mixed" : "weak";

  const categoryFocus = {
    "Environment": {
      strong: "The surrounding environment appears to reduce heat pressure, for example through shade, greening, or lower local exposure.",
      helpful: "The surrounding environment provides some protection, but there is still room to improve shade or greening.",
      mixed: "The environmental picture is mixed. Some conditions may help, while others may still increase heat exposure.",
      weak: "The surrounding environment may be increasing heat pressure, so shade, greening, or exposure reduction should be checked."
    },
    "Built Environment": {
      strong: "The building conditions appear to support heat resilience, such as ventilation, shade, cooling provision, or roof treatment.",
      helpful: "The building has some protective features, but further improvements may still be useful.",
      mixed: "The building picture is mixed. Some facilities may help, but classrooms or outdoor areas may still overheat.",
      weak: "Building conditions may be a key concern, so ventilation, cooling, shading, and roof treatment should be reviewed."
    },
    "Socio-economic / Preparedness": {
      strong: "Preparedness appears relatively strong, including planning, communication, training, or support for vulnerable pupils.",
      helpful: "The school has some preparedness measures, but routines and communication could still be strengthened.",
      mixed: "Preparedness is mixed. Some actions may be in place, but the school may need clearer routines during heat events.",
      weak: "Preparedness may be a concern, so staff training, pupil communication, water access, and heat-response plans should be reviewed."
    }
  };

  return categoryFocus[category][direction];
}

function getCategoryStatus(value) {
  if (value >= 0.08) return "Clear strength";
  if (value >= 0.03) return "Helpful factor";
  if (value > -0.03) return "Mixed / neutral";
  return "Needs attention";
}

function getMostPositiveCategory(categoryTotals) {
  return Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
}

function getWeakestCategory(categoryTotals) {
  return Object.entries(categoryTotals).sort((a, b) => a[1] - b[1])[0];
}

function formatSignedValue(value) {
  return value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2);
}

function getNextStepText(score, weakestCategoryName) {
  if (score <= 50) {
    return `Start by reviewing the ${weakestCategoryName} inputs, because this is the area most likely to explain why the school is appearing as a priority.`;
  }
  if (score <= 75) {
    return `Use the ${weakestCategoryName} category as the first area to monitor or improve before summer.`;
  }
  return `This school is not currently a priority, but the ${weakestCategoryName} category is still the best area to keep under review.`;
}



function getCategoryDetailedExplanation(category, value, score) {
  const status = getCategoryStatus(value);

  const explanations = {
    "Environment": {
      "Clear strength": "This suggests the school’s surrounding outdoor environment is helping reduce heat risk. Features such as tree canopy, green space, shade, or lower surface temperature may be supporting a cooler school setting.",
      "Helpful factor": "This suggests the outdoor environment is providing some heat protection, but not enough to fully remove concern. The school may still benefit from more shade, planting, or cooling landscape improvements.",
      "Mixed / neutral": "This means the environmental factors are not strongly helping or harming the school’s score. Some conditions may be protective, while others may still create heat exposure around the site.",
      "Needs attention": "This suggests the surrounding environment may be increasing heat exposure. The school may need closer review of tree canopy, nearby green space, shaded areas, and local surface temperature."
    },
    "Built Environment": {
      "Clear strength": "This suggests the school building itself is supporting heat resilience. Ventilation, shading, cooling spaces, roof treatment, or classroom design may be helping reduce overheating risk.",
      "Helpful factor": "This suggests the building has some useful heat-resilience features, but there may still be gaps. Further checks on ventilation, classroom overheating, roof treatment, and cooling spaces would be useful.",
      "Mixed / neutral": "This means the building-related picture is balanced. Some facilities may help during hot weather, but other spaces may still be vulnerable to overheating.",
      "Needs attention": "This suggests building conditions may be a major source of heat risk. Ventilation, shading, roof treatment, cooling provision, and overheated classrooms should be reviewed first."
    },
    "Socio-economic / Preparedness": {
      "Clear strength": "This suggests the school has stronger preparedness capacity. Staff training, communication, heat-response planning, water access, or support for vulnerable pupils may be helping the school respond to hot weather.",
      "Helpful factor": "This suggests the school has some preparedness measures in place, but routines may still need strengthening. Clearer heatwave procedures, communication, and staff guidance could improve resilience.",
      "Mixed / neutral": "This means preparedness is not clearly strong or weak. Some actions may already exist, but the school may still need more consistent planning for hot days.",
      "Needs attention": "This suggests preparedness may be a key gap. The school may need stronger staff training, pupil communication, water access planning, and procedures for vulnerable pupils during heat events."
    }
  };

  return explanations[category][status];
}

function showSchoolDetails(school) {
  const categories = ["Environment", "Built Environment", "Socio-economic / Preparedness"];

  document.getElementById("school-details").innerHTML = `
    <h3 class="school-name">${school.school_name}</h3>
    <p><strong>Address:</strong> ${school.address}</p>

    <div class="selected-school-hero">
      <span class="badge ${getBadgeClass(school.interpretation)}">${school.interpretation}</span>
      <div class="selected-school-score">${school.resilienceScore}<span>/100</span></div>
      <p class="selected-school-summary">${getPlainScoreMeaning(school.resilienceScore)}</p>
    </div>

    <div class="selected-school-block">
      <h4>What this means</h4>
      <p>
        This score gives a quick overall view of the school’s heat-resilience position.
        A lower score means the school may need more urgent support, while a higher score suggests stronger current preparedness.
        The three category cards below explain what may be driving the result.
      </p>
    </div>

    <div class="selected-school-block">
      <h4>Category snapshot</h4>
      <div class="category-insight-grid">
        ${categories.map(category => {
          const value = school.categoryTotals[category];
          return `
            <div class="category-insight-card ${getCategoryCardClass(category)}">
              <span class="insight-kicker">${getCategoryDisplayName(category)}</span>
              <strong>${getCategoryStatus(value)}</strong>
              <p>${getCategoryDetailedExplanation(category, value, school.resilienceScore)}</p>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <div class="technical-note">
      <strong>Technical note:</strong> Final raw score ${school.rawScore.toFixed(2)} · Derived from combined positive and negative weighted inputs.
    </div>
  `;
}

function updateMapDashboard() {
  currentSchools = enrichSchools();
  markerBySchoolName = {};
  markerLayer.clearLayers();

  currentSchools.forEach(school => {
    const marker = L.circleMarker([school.latitude, school.longitude], {
      radius: 9,
      color: "#14231f",
      weight: 1,
      fillColor: getColor(school.interpretation),
      fillOpacity: 0.88
    }).addTo(markerLayer);

    marker.bindPopup(`
      <strong>${school.school_name}</strong><br>
      ${school.address}<br>
      Heat resilience score: ${school.resilienceScore}/100<br>
      Interpretation: ${school.interpretation}
    `);

    marker.on("click", () => showSchoolDetails(school));
    markerBySchoolName[school.school_name] = marker;
  });


  const top3Body = document.querySelector("#ranking-table-top3 tbody");
  const restBody = document.querySelector("#ranking-table-rest tbody");
  top3Body.innerHTML = "";
  restBody.innerHTML = "";

  const sortedSchools = [...currentSchools].sort((a, b) => a.resilienceScore - b.resilienceScore);

  sortedSchools.forEach((school, index) => {
    const row = document.createElement("tr");
    if (index === 0) row.classList.add("top-rank-1");
    else if (index === 1) row.classList.add("top-rank-2");
    else if (index === 2) row.classList.add("top-rank-3");

    row.innerHTML = `
      <td><span class="rank-pill rank-${index + 1 <= 3 ? index + 1 : "default"}">${index + 1}</span></td>
      <td>${school.school_name}</td>
      <td>${school.resilienceScore}</td>
      <td>${school.interpretation}</td>
      <td>${school.priority_action}</td>
    `;

    row.addEventListener("click", () => {
      showSchoolDetails(school);
      showMapPage();
      map.setView([school.latitude, school.longitude], 15);
      const marker = markerBySchoolName[school.school_name];
      if (marker) marker.openPopup();
    });

    if (index < 3) top3Body.appendChild(row);
    else restBody.appendChild(row);
  });
}

function searchSchool() {
  const query = document.getElementById("schoolSearch").value.trim().toLowerCase();
  const message = document.getElementById("searchMessage");
  if (!query) {
    message.textContent = "Type a school name to search.";
    return;
  }
  const match = currentSchools.find(school => school.school_name.toLowerCase().includes(query));
  if (!match) {
    message.textContent = "No school matched your search. Try fewer words.";
    return;
  }
  message.textContent = `Showing ${match.school_name}`;
  showSchoolDetails(match);
  map.setView([match.latitude, match.longitude], 16);
  const marker = markerBySchoolName[match.school_name];
  if (marker) marker.openPopup();
}

function showInputPage() {
  document.getElementById("inputPage").classList.add("active-page");
  document.getElementById("mapPage").classList.remove("active-page");
  document.getElementById("guidePage").classList.remove("active-page");
  document.getElementById("perspectiveSelect").value = "input";
}

function showMapPage() {
  document.getElementById("mapPage").classList.add("active-page");
  document.getElementById("inputPage").classList.remove("active-page");
  document.getElementById("guidePage").classList.remove("active-page");
  document.getElementById("perspectiveSelect").value = "map";
  setTimeout(() => map.invalidateSize(), 100);
}

function showGuidePage() {
  document.getElementById("guidePage").classList.add("active-page");
  document.getElementById("inputPage").classList.remove("active-page");
  document.getElementById("mapPage").classList.remove("active-page");
  document.getElementById("perspectiveSelect").value = "guide";
}

document.getElementById("perspectiveSelect").addEventListener("change", e => {
  if (e.target.value === "input") showInputPage();
  else if (e.target.value === "map") showMapPage();
  else showGuidePage();
});
document.getElementById("schoolSelect").addEventListener("change", renderCategoryTables);
document.getElementById("saveSchoolButton").addEventListener("click", saveCurrentSchool);
document.getElementById("resetSchoolButton").addEventListener("click", resetCurrentSchool);
document.getElementById("searchButton").addEventListener("click", searchSchool);
document.getElementById("schoolSearch").addEventListener("keydown", e => {
  if (e.key === "Enter") searchSchool();
});

renderSchoolDropdown();
renderCategoryTables();
updateMapDashboard();
