/*  
   settings.js  
   Saves and loads aircraft settings for:
   - Cessna 172
   - Learjet 45
*/

// -------------------------------
// CESSNA 172 SETTINGS
// -------------------------------
function saveC172Settings() {
    const data = {
        fuelDensity: document.getElementById("fuelDensity").value,
        taxiFuel: document.getElementById("taxiFuel").value,
        maxTOW: document.getElementById("maxTOW").value,
        defaultPilot: document.getElementById("defaultPilot").value,
        defaultPassenger: document.getElementById("defaultPassenger").value
    };

    localStorage.setItem("c172_settings", JSON.stringify(data));
    document.getElementById("savedMsg").style.display = "block";
}

function loadC172Settings() {
    const saved = JSON.parse(localStorage.getItem("c172_settings"));
    if (!saved) return;

    document.getElementById("fuelDensity").value = saved.fuelDensity || "";
    document.getElementById("taxiFuel").value = saved.taxiFuel || "";
    document.getElementById("maxTOW").value = saved.maxTOW || "";
    document.getElementById("defaultPilot").value = saved.defaultPilot || "";
    document.getElementById("defaultPassenger").value = saved.defaultPassenger || "";
}

// -------------------------------
// LEARJET 45 SETTINGS
// -------------------------------
function saveLJ45Settings() {
    const data = {
        fuelDensity: document.getElementById("fuelDensity").value,
        taxiFuel: document.getElementById("taxiFuel").value,
        maxTOW: document.getElementById("maxTOW").value,
        maxLW: document.getElementById("maxLW").value,
        defaultCrew: document.getElementById("defaultCrew").value,
        defaultPassenger: document.getElementById("defaultPassenger").value
    };

    localStorage.setItem("lj45_settings", JSON.stringify(data));
    document.getElementById("savedMsg").style.display = "block";
}

function loadLJ45Settings() {
    const saved = JSON.parse(localStorage.getItem("lj45_settings"));
    if (!saved) return;

    document.getElementById("fuelDensity").value = saved.fuelDensity || "";
    document.getElementById("taxiFuel").value = saved.taxiFuel || "";
    document.getElementById("maxTOW").value = saved.maxTOW || "";
    document.getElementById("maxLW").value = saved.maxLW || "";
    document.getElementById("defaultCrew").value = saved.defaultCrew || "";
    document.getElementById("defaultPassenger").value = saved.defaultPassenger || "";
}

// -------------------------------
// AUTO-LOAD ON PAGE OPEN
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("cessna172")) loadC172Settings();
    if (window.location.pathname.includes("learjet45")) loadLJ45Settings();
});
