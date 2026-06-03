// ===============================
// Hackney School Heat Dashboard
// Slider version for beginners
// ===============================

// 1. Create the map and centre it on Hackney
const map = L.map("map").setView([51.545, -0.055], 13);

// 2. Add the background map tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// 3. Add an approximate Hackney focus circle
const hackneyCircle = L.circle([51.545, -0.055], {
  radius: 3500,
  color: "#2563eb",
  weight: 2,
  dashArray: "8, 8",
  fillColor: "#2563eb",
  fillOpacity: 0.08
}).addTo(map);

hackneyCircle.bindPopup("Approximate Hackney focus area");

// 3. Example school data.
// IMPORTANT:
// These factor scores are 0, 0.5, or 1.
// 0 = low problem
// 0.5 = medium problem
// 1 = serious problem
//
// Replace these example schools with real Hackney schools later.
const schools = [
  {
    school_name: "Example Primary School A",
    latitude: 51.548,
    longitude: -0.060,
    overheating: 1,
    canopy: 1,
    road: 0.5,
    water: 0.5,
    preparedness: 1,
    travel: 0.5,
    priority_action: "Create cooled refuge room and add shaded outdoor areas"
  },
  {
    school_name: "Example Secondary School B",
    latitude: 51.540,
    longitude: -0.045,
    overheating: 0.5,
    canopy: 0.5,
    road: 1,
    water: 1,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Install refill stations and adjust outdoor activities"
  },
  {
    school_name: "Example Primary School C",
    latitude: 51.552,
    longitude: -0.075,
    overheating: 0.5,
    canopy: 0.5,
    road: 0,
    water: 0,
    preparedness: 1,
    travel: 0.5,
    priority_action: "Introduce staff training and pupil heat awareness sessions"
  },
  {
    school_name: "Example Academy D",
    latitude: 51.535,
    longitude: -0.070,
    overheating: 0,
    canopy: 0,
    road: 0.5,
    water: 0,
    preparedness: 0.5,
    travel: 0,
    priority_action: "Maintain existing heat response plan"
  },
  {
    school_name: "Example School E",
    latitude: 51.558,
    longitude: -0.050,
    overheating: 1,
    canopy: 1,
    road: 0,
    water: 0.5,
    preparedness: 0.5,
    travel: 1,
    priority_action: "Prioritise external shading and cooling audit"
  }
];

// 4. Read slider values
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

// 5. Calculate the updated vulnerability score
function calculateScore(school, weights) {
  const totalWeight =
    weights.overheating +
    weights.canopy +
    weights.road +
    weights.water +
    weights.preparedness +
    weights.travel;

  const weightedScore =
    school.overheating * weights.overheating +
    school.canopy * weights.canopy +
    school.road * weights.road +
    school.water * weights.water +
    school.preparedness * weights.preparedness +
    school.travel * weights.travel;

  if (totalWeight === 0) return 0;

  // Convert into a 0-100 score
  return Math.round((weightedScore / totalWeight) * 100);
}

// 6. Convert score to risk level
function getRiskLevel(score) {
  if (score >= 76) return "Very High";
  if (score >= 51) return "High";
  if (score >= 26) return "Moderate";
  return "Low";
}

// 7. Find the main risk driver for each school
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

// 8. Marker colors
function getColor(riskLevel) {
  if (riskLevel === "Very High") return "#c62828";
  if (riskLevel === "High") return "#ef6c00";
  if (riskLevel === "Moderate") return "#f9a825";
  return "#2e7d32";
}

function getBadgeClass(riskLevel) {
  return riskLevel.toLowerCase().replace(" ", "-");
}

// 9. Show school details when a marker/table row is clicked
function showSchoolDetails(school) {
  const details = document.getElementById("school-details");

  details.innerHTML = `
    <h3 class="school-name">${school.school_name}</h3>
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

// 10. Main function to update the whole dashboard
function updateDashboard() {
  const weights = getWeights();

  // Update slider labels
  document.getElementById("overheatingWeightValue").textContent = weights.overheating;
  document.getElementById("canopyWeightValue").textContent = weights.canopy;
  document.getElementById("roadWeightValue").textContent = weights.road;
  document.getElementById("waterWeightValue").textContent = weights.water;
  document.getElementById("preparednessWeightValue").textContent = weights.preparedness;
  document.getElementById("travelWeightValue").textContent = weights.travel;

  const minScore = Number(document.getElementById("minScore").value);
  document.getElementById("minScoreValue").textContent = minScore;

  const showOnlyHighRisk = document.getElementById("showOnlyHighRisk").checked;

  // Calculate updated scores for every school
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

  // Apply filters
  updatedSchools = updatedSchools.filter(school => school.final_score >= minScore);

  if (showOnlyHighRisk) {
    updatedSchools = updatedSchools.filter(school =>
      school.risk_level === "High" || school.risk_level === "Very High"
    );
  }

  // Clear old markers
  markerLayer.clearLayers();

  // Draw new markers
  updatedSchools.forEach((school) => {
    const marker = L.circleMarker([school.latitude, school.longitude], {
      radius: 10,
      color: "#333",
      weight: 1,
      fillColor: getColor(school.risk_level),
      fillOpacity: 0.85
    }).addTo(markerLayer);

    marker.bindPopup(`
      <strong>${school.school_name}</strong><br>
      Score: ${school.final_score}/100<br>
      Risk level: ${school.risk_level}<br>
      Top driver: ${school.top_driver}
    `);

    marker.on("click", () => {
      showSchoolDetails(school);
    });
  });

  // Update summary cards
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

  // Update ranking table
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

// 11. Listen for slider/filter changes
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

// 12. Reset button
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

// 13. Load the dashboard for the first time
updateDashboard();
