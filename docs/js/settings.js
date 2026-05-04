/* settings.js
   Handles saving, loading, and resetting aircraft settings
*/

function saveSettings() {
    const key = getSettingsKey();
    if (!key) return;

    const data = {};
    const s = getCurrentSettings();

    if (isC172()) {
        data.fuelDensity = numOrNull("setFuelDensity", s.fuelDensity);
        data.maxTOW = numOrNull("setMaxTOW", s.maxTOW);
        data.emptyWeight = numOrNull("setEmptyWeight", s.emptyWeight);
        data.fuelCapacity = numOrNull("setFuelCapacity", s.fuelCapacity);
        data.baggageCapacity = numOrNull("setBaggageCapacity", s.baggageCapacity);
        data.crew = numOrNull("setCrew", s.crew);
        data.passengers = numOrNull("setPassengers", s.passengers);
        data.totalSeats = numOrNull("setTotalSeats", s.totalSeats);
        data.cruise = numOrNull("setCruise", s.cruise);
        data.range = numOrNull("setRange", s.range);
        data.ceiling = numOrNull("setCeiling", s.ceiling);
        data.vr = numOrNull("setVr", s.vr);
        data.vx = numOrNull("setVx", s.vx);
        data.vy = numOrNull("setVy", s.vy);
        data.vfe = numOrNull("setVfe", s.vfe);
        data.vne = numOrNull("setVne", s.vne);
    }

    if (isLJ45()) {
        data.fuelDensity = numOrNull("setFuelDensity", s.fuelDensity);
        data.maxTOW = numOrNull("setMaxTOW", s.maxTOW);
        data.maxLW = numOrNull("setMaxLW", s.maxLW);
        data.emptyWeight = numOrNull("setEmptyWeight", s.emptyWeight);
        data.fuelCapacity = numOrNull("setFuelCapacity", s.fuelCapacity);
        data.baggageCapacity = numOrNull("setBaggageCapacity", s.baggageCapacity);
        data.crew = numOrNull("setCrew", s.crew);
        data.passengers = numOrNull("setPassengers", s.passengers);
        data.totalSeats = numOrNull("setTotalSeats", s.totalSeats);
        data.cruise = numOrNull("setCruise", s.cruise);
        data.range = numOrNull("setRange", s.range);
        data.ceiling = numOrNull("setCeiling", s.ceiling);
        data.vr = numOrNull("setVr", s.vr);
        data.vfe = numOrNull("setVfe", s.vfe);
        data.vne = numOrNull("setVne", s.vne);
    }

    localStorage.setItem(key, JSON.stringify(data));
    setStatus("Settings saved.", "safe");
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
    setStatus("Settings reset to defaults.", "warn");
}

function numOrNull(id, fallback) {
    const el = document.getElementById(id);
    if (!el) return fallback;
    const v = Number(el.value);
    if (isNaN(v) || el.value === "") return fallback;
    return v;
}

function setStatus(msg, cls) {
    const box = document.getElementById("settingsStatus");
    if (!box) return;
    box.textContent = msg;
    box.className = cls;
}

// tabbed sections (optional if you add tabs in HTML)
document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("settingsStatus")) return;

    loadSettingsIntoForm();

    const saveBtn = document.getElementById("saveC172SettingsBtn") || document.getElementById("saveLJ45SettingsBtn");
    const resetBtn = document.getElementById("resetC172SettingsBtn") || document.getElementById("resetLJ45SettingsBtn");

    if (saveBtn) saveBtn.addEventListener("click", saveSettings);
    if (resetBtn) resetBtn.addEventListener("click", resetSettings);

    const tabs = document.querySelectorAll(".settings-tab");
    const sections = document.querySelectorAll(".settings-section");

    if (tabs.length && sections.length) {
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                sections.forEach(s => s.classList.remove("active"));
                tab.classList.add("active");
                document.getElementById(tab.dataset.target).classList.add("active");
            });
        });
        tabs[0].click();
    }
});
