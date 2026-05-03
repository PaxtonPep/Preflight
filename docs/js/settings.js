/* settings.js
   Handles saving, loading, and resetting aircraft settings
*/

function saveSettings() {
    const key = getSettingsKey();
    if (!key) return;

    const data = {};

    // C172 fields
    if (isC172()) {
        data.fuelDensity = num("setFuelDensity");
        data.maxTOW = num("setMaxTOW");
        data.emptyWeight = num("setEmptyWeight");
        data.fuelCapacity = num("setFuelCapacity");
        data.baggageCapacity = num("setBaggageCapacity");
        data.crew = num("setCrew");
        data.passengers = num("setPassengers");
        data.totalSeats = num("setTotalSeats");
        data.cruise = num("setCruise");
        data.range = num("setRange");
        data.ceiling = num("setCeiling");
        data.vr = num("setVr");
        data.vx = num("setVx");
        data.vy = num("setVy");
        data.vfe = num("setVfe");
        data.vne = num("setVne");
    }

    // LJ45 fields (when you build its settings page)
    if (isLJ45()) {
        data.fuelDensity = num("setFuelDensity");
        data.maxTOW = num("setMaxTOW");
        data.maxLW = num("setMaxLW");
        data.emptyWeight = num("setEmptyWeight");
        data.fuelCapacity = num("setFuelCapacity");
        data.baggageCapacity = num("setBaggageCapacity");
        data.crew = num("setCrew");
        data.passengers = num("setPassengers");
        data.totalSeats = num("setTotalSeats");
        data.cruise = num("setCruise");
        data.range = num("setRange");
        data.ceiling = num("setCeiling");
        data.vr = num("setVr");
        data.vfe = num("setVfe");
        data.vne = num("setVne");
    }

    localStorage.setItem(key, JSON.stringify(data));
    const status = document.getElementById("settingsStatus");
    if (status) status.innerHTML = "<p class='safe'>Settings saved.</p>";
}

function loadSettingsIntoForm() {
    const s = getCurrentSettings();

    function set(id, val) {
        const el = document.getElementById(id);
        if (el && val !== undefined && val !== null) el.value = val;
    }

    if (isC172()) {
        set("setFuelDensity", s.fuelDensity);
        set("setMaxTOW", s.maxTOW);
        set("setEmptyWeight", s.emptyWeight);
        set("setFuelCapacity", s.fuelCapacity);
        set("setBaggageCapacity", s.baggageCapacity);
        set("setCrew", s.crew);
        set("setPassengers", s.passengers);
        set("setTotalSeats", s.totalSeats);
        set("setCruise", s.cruise);
        set("setRange", s.range);
        set("setCeiling", s.ceiling);
        set("setVr", s.vr);
        set("setVx", s.vx);
        set("setVy", s.vy);
        set("setVfe", s.vfe);
        set("setVne", s.vne);
    }

    if (isLJ45()) {
        set("setFuelDensity", s.fuelDensity);
        set("setMaxTOW", s.maxTOW);
        set("setMaxLW", s.maxLW);
        set("setEmptyWeight", s.emptyWeight);
        set("setFuelCapacity", s.fuelCapacity);
        set("setBaggageCapacity", s.baggageCapacity);
        set("setCrew", s.crew);
        set("setPassengers", s.passengers);
        set("setTotalSeats", s.totalSeats);
        set("setCruise", s.cruise);
        set("setRange", s.range);
        set("setCeiling", s.ceiling);
        set("setVr", s.vr);
        set("setVfe", s.vfe);
        set("setVne", s.vne);
    }
}

function resetSettings() {
    const key = getSettingsKey();
    if (!key) return;
    localStorage.removeItem(key);
    loadSettingsIntoForm();
    const status = document.getElementById("settingsStatus");
    if (status) status.innerHTML = "<p class='warn'>Settings reset to defaults.</p>";
}

// helper
function num(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    const v = Number(el.value);
    return isNaN(v) ? null : v;
}

document.addEventListener("DOMContentLoaded", () => {
    // Only run on settings pages
    if (document.getElementById("settingsStatus")) {
        loadSettingsIntoForm();

        const saveBtn = document.getElementById("saveC172SettingsBtn") || document.getElementById("saveLJ45SettingsBtn");
        const resetBtn = document.getElementById("resetC172SettingsBtn") || document.getElementById("resetLJ45SettingsBtn");

        if (saveBtn) saveBtn.addEventListener("click", saveSettings);
        if (resetBtn) resetBtn.addEventListener("click", resetSettings);
    }
});
