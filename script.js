// 1. Create the map and centre it on Hackney
const map = L.map("map").setView([51.545, -0.055], 13);

// 2. Add the background map tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// 3. Example school data.
// Later, replace these with your real Hackney school data and index scores.
const schools = [
  {
    school_name: "Example Primary School A",
    latitude: 51.548,
    longitude: -0.060,
    final_score: 82,
    risk_level: "Very High",
    main_issue: "High overheating risk and low tree canopy",
    priority_action: "Create cooled refuge room and add shaded outdoor areas"
  },
  {
    school_name: "Example Secondary School B",
    latitude: 51.540,
    longitude: -0.045,
    final_score: 67,
    risk_level: "High",
    main_issue: "Close to major road and limited water access",
    priority_action: "Install refill stations and adjust outdoor activities"
  },
  {
    school_name: "Example Primary School C",
    latitude: 51.552,
    longitude: -0.075,
    final_score: 48,
    risk_level: "Moderate",
    main_issue: "Limited heat-risk training",
    priority_action: "Introduce annual staff training and pupil heat awareness sessions"
  },
  {
    school_name: "Example Academy D",
    latitude: 51.535,
    longitude: -0.070,
    final_score: 23,
    risk_level: "Low",
    main_issue: "Relatively good canopy and cooling access",
    priority_action: "Maintain existing heat response plan"
  },
  {
    school_name: "Example School E",
    latitude: 51.558,
    longitude: -0.050,
    final_score: 76,
    risk_level: "Very High",
    main_issue: "Poor shading and high land surface temperature",
    priority_action: "Prioritise external shading and cooling audit"
  }
];

// 4. Decide marker color based on risk level
function getColor(riskLevel) {
  if (riskLevel === "Very High") return "#c62828";
  if (riskLevel === "High") return "#ef6c00";
  if (riskLevel === "Moderate") return "#f9a825";
  return "#2e7d32";
}

// 5. Convert risk level text into a CSS class
function getBadgeClass(riskLevel) {
  return riskLevel.toLowerCase().replace(" ", "-");
}

// 6. Show selected school details in the side panel
function showSchoolDetails(school) {
  const details = document.getElementById("school-details");

  details.innerHTML = `
    <h3 class="school-name">${school.school_name}</h3>
    <span class="badge ${getBadgeClass(school.risk_level)}">${school.risk_level}</span>
    <div class="score">${school.final_score}/100</div>
    <p><strong>Main issue:</strong> ${school.main_issue}</p>
    <p><strong>Priority action:</strong> ${school.priority_action}</p>
  `;
}

// 7. Add school markers to the map
schools.forEach((school) => {
  const marker = L.circleMarker([school.latitude, school.longitude], {
    radius: 10,
    color: "#333",
    weight: 1,
    fillColor: getColor(school.risk_level),
    fillOpacity: 0.85
  }).addTo(map);

  marker.bindPopup(`
    <strong>${school.school_name}</strong><br>
    Score: ${school.final_score}/100<br>
    Risk level: ${school.risk_level}<br>
    Main issue: ${school.main_issue}
  `);

  marker.on("click", () => {
    showSchoolDetails(school);
  });
});

// 8. Fill in the summary cards
const schoolCount = schools.length;
const veryHighCount = schools.filter(s => s.risk_level === "Very High").length;
const averageScore = Math.round(
  schools.reduce((sum, s) => sum + s.final_score, 0) / schoolCount
);
const priorityCount = schools.filter(s => s.final_score >= 51).length;

document.getElementById("school-count").textContent = schoolCount;
document.getElementById("very-high-count").textContent = veryHighCount;
document.getElementById("average-score").textContent = averageScore;
document.getElementById("priority-count").textContent = priorityCount;

// 9. Create the ranking table
const rankingTableBody = document.querySelector("#ranking-table tbody");

const rankedSchools = [...schools].sort((a, b) => b.final_score - a.final_score);

rankedSchools.forEach((school, index) => {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${school.school_name}</td>
    <td>${school.final_score}</td>
    <td>${school.risk_level}</td>
    <td>${school.main_issue}</td>
    <td>${school.priority_action}</td>
  `;

  rankingTableBody.appendChild(row);
});
