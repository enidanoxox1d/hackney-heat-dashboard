// =======================================
// Hackney School Heat Vulnerability Dashboard
// All 20 schools version
// Keep your existing index.html and style.css.
// Replace only script.js with this file.
// =======================================

// Create the map and centre it on Hackney
const map = L.map("map").setView([51.548, -0.060], 13);

// Add the background map tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Add an approximate Hackney focus circle
const hackneyCircle = L.circle([51.548, -0.060], {
  radius: 4500,
  color: "#1f5c50",
  weight: 2,
  dashArray: "8, 8",
  fillColor: "#1f5c50",
  fillOpacity: 0.07
}).addTo(map);

hackneyCircle.bindPopup("Approximate Hackney focus area");

// Marker layer lets us redraw markers whenever filters/sliders change
const markerLayer = L.layerGroup().addTo(map);

// School data
// IMPORTANT:
// Latitude/longitude are currently approximate postcode/location coordinates for dashboard prototyping.
// Factor scores are placeholders until your team enters the real index values.
// 0 = low problem
// 0.5 = medium problem
// 1 = serious problem
const schools = [
  {
    school_name: "Daubeney Primary School",
    address: "Daubeney Road, Clapton, London, E5 0EG",
    latitude: 51.5583,
    longitude: -0.0370,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0.5,
    priority_action: "Complete heat audit and prioritise shaded outdoor areas and water access."
  },
  {
    school_name: "Lauriston School",
    address: "Rutland Road, London, E9 7JS",
    latitude: 51.53688,
    longitude: -0.046848,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Maintain hydration protocol and review outdoor activity scheduling."
  },
  {
    school_name: "Sebright School",
    address: "Audrey Street, Goldsmiths Row, London, E2 8QH",
    latitude: 51.533367,
    longitude: -0.065455,
    overheating: 1,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Prioritise classroom cooling checks and shaded break areas."
  },
  {
    school_name: "Gainsborough Primary School",
    address: "Berkshire Road, London, E9 5ND",
    latitude: 51.5435,
    longitude: -0.0318,
    overheating: 1,
    canopy: 1,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0.5,
    priority_action: "Prioritise external shading, cool-room planning, and heatwave communication."
  },
  {
    school_name: "Morningside Primary School",
    address: "Chatham Place, Hackney, London, E9 6LL",
    latitude: 51.5460,
    longitude: -0.0535,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 1,
    travel: 0.5,
    priority_action: "Introduce staff heat-risk training and pupil heat-awareness sessions."
  },
  {
    school_name: "Holy Trinity Church of England Primary School",
    address: "Beechwood Road, London, E8 3DY",
    latitude: 51.5451,
    longitude: -0.0634,
    overheating: 0.5,
    canopy: 0.5,
    road: 1,
    water: 0.5,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Review road-side exposure and strengthen indoor cooling refuge planning."
  },
  {
    school_name: "St John the Baptist Voluntary Aided Church of England Primary School",
    address: "Crondall Street, London, N1 6JG",
    latitude: 51.5355,
    longitude: -0.0858,
    overheating: 1,
    canopy: 1,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Prioritise shade provision and identify cooled indoor refuge spaces."
  },
  {
    school_name: "St Matthias Church of England Primary School",
    address: "Wordsworth Road, London, N16 8DD",
    latitude: 51.5625,
    longitude: -0.0784,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0.5,
    priority_action: "Review water-break policy and shaded movement routes."
  },
  {
    school_name: "Springfield Community Primary School",
    address: "Castlewood Road, Hackney, London, N16 6DH",
    latitude: 51.5592,
    longitude: -0.0737,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 1,
    preparedness: 0.5,
    travel: 0.5,
    priority_action: "Prioritise water refill access and scheduled water breaks."
  },
  {
    school_name: "St John and St James CofE Primary School",
    address: "Isabella Road, Hackney, London, E9 6DX",
    latitude: 51.5433,
    longitude: -0.0498,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Maintain core heat response and review classroom ventilation."
  },
  {
    school_name: "Kingsmead Primary School",
    address: "Kingsmead Way, London, E9 5PP",
    latitude: 51.5469,
    longitude: -0.0348,
    overheating: 1,
    canopy: 1,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0.5,
    priority_action: "Prioritise tree canopy, temporary shade, and cool-room access."
  },
  {
    school_name: "Mandeville Primary School",
    address: "Oswald Street, Hackney, London, E5 0BT",
    latitude: 51.5521,
    longitude: -0.0421,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Review outdoor shade and hydration access before heatwave periods."
  },
  {
    school_name: "Gayhurst Community School",
    address: "Gayhurst Road, Hackney, London, E8 3EN",
    latitude: 51.5403,
    longitude: -0.0594,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Maintain baseline heat response and improve pupil heat-risk communication."
  },
  {
    school_name: "Shacklewell Primary School",
    address: "Shacklewell Row, Hackney, London, E8 2EA",
    latitude: 51.5522,
    longitude: -0.0736,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 1,
    travel: 0.5,
    priority_action: "Prioritise staff preparedness and formalise response triggers."
  },
  {
    school_name: "Woodberry Down Community Primary School",
    address: "Woodberry Grove, Finsbury Park, London, N4 1SY",
    latitude: 51.5714,
    longitude: -0.0950,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0.5,
    priority_action: "Review travel heat exposure and shaded waiting areas."
  },
  {
    school_name: "Grazebrook Primary School",
    address: "Lordship Road, Stoke Newington, London, N16 0QP",
    latitude: 51.5629,
    longitude: -0.0875,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Maintain baseline protocol and check classroom ventilation."
  },
  {
    school_name: "Thomas Fairchild Community Primary School",
    address: "Forston Street, London, N1 7HA",
    latitude: 51.5357,
    longitude: -0.0840,
    overheating: 1,
    canopy: 1,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Prioritise shade, heat-risk communication, and cooled refuge spaces."
  },
  {
    school_name: "Orchard Primary School",
    address: "Holcroft Road, Hackney, London, E9 7BB",
    latitude: 51.5389,
    longitude: -0.0455,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Review outdoor activity timing and hydration reminders."
  },
  {
    school_name: "Southwold Primary School",
    address: "Detmold Road, Clapton, Hackney, E5 9NL",
    latitude: 51.5616,
    longitude: -0.0529,
    overheating: 0.5,
    canopy: 0.5,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0.5,
    priority_action: "Review heatwave travel exposure and shaded arrival/departure areas."
  },
  {
    school_name: "Hoxton Garden Primary",
    address: "Ivy Street, Hackney, London, N1 5JD",
    latitude: 51.5332,
    longitude: -0.0830,
    overheating: 1,
    canopy: 1,
    road: 0.5,
    water: 0.5,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Prioritise shade, cooling refuge rooms, and pupil heat-risk communication."
  }
];

function getWeights() {
  return {
    overheating: Number(document.getElementById("overheatingWeight").value),
    canopy: Number(document.getElementById("canopyWeight").value),
    road: Number(document.getElementById("roadWeight").value),
    water: Number(document.getElementById("waterWeight").value),
    preparedness: Number(document.getElementById("preparednessWeight").value),
    travel: Number(document.getElementById("travelWeight").value)
  };
}

function calculateScore(school, weights) {
  const totalWeight =
    weights.overheating +
    weights.canopy +
    weights.road +
    weights.water +
    weights.preparedness +
    weights.travel;

  if (totalWeight === 0) return 0;

  const weightedScore =
    school.overheating * weights.overheating +
    school.canopy * weights.canopy +
    school.road * weights.road +
    school.water * weights.water +
    school.preparedness * weights.preparedness +
    school.travel * weights.travel;

  return Math.round((weightedScore / totalWeight) * 100);
}

function getRiskLevel(score) {
  if (score >= 76) return "Very High";
  if (score >= 51) return "High";
  if (score >= 26) return "Moderate";
  return "Low";
}

function getTopDriver(school, weights) {
  const drivers = [
    { name: "Overheating risk", value: school.overheating * weights.overheating },
    { name: "Low tree canopy / shade", value: school.canopy * weights.canopy },
    { name: "Major road exposure", value: school.road * weights.road },
    { name: "Poor water access", value: school.water * weights.water },
    { name: "Low preparedness", value: school.preparedness * weights.preparedness },
    { name: "Travel heat exposure", value: school.travel * weights.travel }
  ];

  drivers.sort((a, b) => b.value - a.value);
  return drivers[0].value === 0 ? "No major driver" : drivers[0].name;
}

function getColor(riskLevel) {
  if (riskLevel === "Very High") return "#b83232";
  if (riskLevel === "High") return "#d86f27";
  if (riskLevel === "Moderate") return "#c99a3d";
  return "#2f7d57";
}

function getBadgeClass(riskLevel) {
  return riskLevel.toLowerCase().replace(" ", "-");
}

function showSchoolDetails(school) {
  const details = document.getElementById("school-details");

  details.innerHTML = `
    <h3 class="school-name">${school.school_name}</h3>
    <p><strong>Address:</strong> ${school.address}</p>
    <span class="badge ${getBadgeClass(school.risk_level)}">${school.risk_level}</span>
    <div class="score">${school.final_score}/100</div>
    <p><strong>Top driver:</strong> ${school.top_driver}</p>
    <p><strong>Priority action:</strong> ${school.priority_action}</p>
    <hr>
    <p><strong>Factor profile:</strong></p>
    <ul>
      <li>Overheating: ${school.overheating}</li>
      <li>Tree canopy / shade: ${school.canopy}</li>
      <li>Major road exposure: ${school.road}</li>
      <li>Water access: ${school.water}</li>
      <li>Preparedness: ${school.preparedness}</li>
      <li>Travel exposure: ${school.travel}</li>
    </ul>
  `;
}

function updateDashboard() {
  const weights = getWeights();

  document.getElementById("overheatingWeightValue").textContent = weights.overheating;
  document.getElementById("canopyWeightValue").textContent = weights.canopy;
  document.getElementById("roadWeightValue").textContent = weights.road;
  document.getElementById("waterWeightValue").textContent = weights.water;
  document.getElementById("preparednessWeightValue").textContent = weights.preparedness;
  document.getElementById("travelWeightValue").textContent = weights.travel;

  const minScore = Number(document.getElementById("minScore").value);
  document.getElementById("minScoreValue").textContent = minScore;

  const showOnlyHighRisk = document.getElementById("showOnlyHighRisk").checked;

  let updatedSchools = schools.map(school => {
    const finalScore = calculateScore(school, weights);
    const riskLevel = getRiskLevel(finalScore);
    const topDriver = getTopDriver(school, weights);

    return {
      ...school,
      final_score: finalScore,
      risk_level: riskLevel,
      top_driver: topDriver
    };
  });

  updatedSchools = updatedSchools.filter(school => school.final_score >= minScore);

  if (showOnlyHighRisk) {
    updatedSchools = updatedSchools.filter(school =>
      school.risk_level === "High" || school.risk_level === "Very High"
    );
  }

  markerLayer.clearLayers();

  updatedSchools.forEach((school) => {
    const marker = L.circleMarker([school.latitude, school.longitude], {
      radius: 9,
      color: "#14231f",
      weight: 1,
      fillColor: getColor(school.risk_level),
      fillOpacity: 0.88
    }).addTo(markerLayer);

    marker.bindPopup(`
      <strong>${school.school_name}</strong><br>
      ${school.address}<br>
      Score: ${school.final_score}/100<br>
      Risk level: ${school.risk_level}<br>
      Top driver: ${school.top_driver}
    `);

    marker.on("click", () => {
      showSchoolDetails(school);
    });
  });

  const schoolCount = updatedSchools.length;
  const veryHighCount = updatedSchools.filter(s => s.risk_level === "Very High").length;
  const averageScore = schoolCount === 0 ? 0 : Math.round(
    updatedSchools.reduce((sum, s) => sum + s.final_score, 0) / schoolCount
  );
  const priorityCount = updatedSchools.filter(s => s.final_score >= 51).length;

  document.getElementById("school-count").textContent = schoolCount;
  document.getElementById("very-high-count").textContent = veryHighCount;
  document.getElementById("average-score").textContent = averageScore;
  document.getElementById("priority-count").textContent = priorityCount;

  const rankingTableBody = document.querySelector("#ranking-table tbody");
  rankingTableBody.innerHTML = "";

  const rankedSchools = [...updatedSchools].sort((a, b) => b.final_score - a.final_score);

  rankedSchools.forEach((school, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${school.school_name}</td>
      <td>${school.final_score}</td>
      <td>${school.risk_level}</td>
      <td>${school.top_driver}</td>
      <td>${school.priority_action}</td>
    `;

    row.addEventListener("click", () => {
      showSchoolDetails(school);
      map.setView([school.latitude, school.longitude], 15);
    });

    rankingTableBody.appendChild(row);
  });
}

const controls = [
  "overheatingWeight",
  "canopyWeight",
  "roadWeight",
  "waterWeight",
  "preparednessWeight",
  "travelWeight",
  "minScore",
  "showOnlyHighRisk"
];

controls.forEach(id => {
  document.getElementById(id).addEventListener("input", updateDashboard);
});

document.getElementById("resetButton").addEventListener("click", () => {
  document.getElementById("overheatingWeight").value = 25;
  document.getElementById("canopyWeight").value = 15;
  document.getElementById("roadWeight").value = 15;
  document.getElementById("waterWeight").value = 15;
  document.getElementById("preparednessWeight").value = 20;
  document.getElementById("travelWeight").value = 10;
  document.getElementById("minScore").value = 0;
  document.getElementById("showOnlyHighRisk").checked = false;
  updateDashboard();
});

updateDashboard();
