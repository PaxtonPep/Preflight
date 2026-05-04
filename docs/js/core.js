/* core.js — global helpers, defaults, navigation, auto settings panel */

function isC172() {
    return window.location.pathname.includes("cessna172");
}

function isLJ45() {
    return window.location.pathname.includes("learjet45");
}

function getAircraftHome() {
    if (isC172()) return "../cessna172/index.html";
    if (isLJ45()) return "../learjet45/index.html";
    return "../index.html";
}

function goBack() {
    window.location.href = getAircraftHome();
}

function openSettings() {
    const panel = document.getElementById("settingsPanel");
    if (!panel) return;
    panel.classList.add("open");
    loadSettingsPanel();
}

function closeSettings() {
    const panel = document.getElementById("settingsPanel");
    if (!panel) return;
    panel.classList.remove("open");
}

// numeric helper
function num(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    const v = Number(el.value);
    return isNaN(v) ? 0 : v;
}

// ---------- DEFAULT SETTINGS ----------

const DEFAULTS = {
    c172: {
        fuelDensity: 6.0,
        maxTOW: 2550,
        emptyWeight: 1660,
        fuelCapacity: 56,
        baggageCapacity: 120,
        crew: 1,
        passengers: 3,
        totalSeats: 4,
        cruise: 122,
        range: 640,
        ceiling: 14000,
        vr: 55,
        vx: 62,
        vy: 74,
        vfe: 110,
        vne: 163
    },
    lj45: {
        fuelDensity: 6.7,
        maxTOW: 21500,
        maxLW: 19200,
        emptyWeight: 12500,
        fuelCapacity: 6062,
        baggageCapacity: 500,
        crew: 2,
        passengers: 8,
        totalSeats: 10,
        cruise: 465,
        range: 1900,
        ceiling: 51000,
        vr: 130,
        vfe: 200,
        vne: 330
    }
};

function getSettingsKey() {
    if (isC172()) return "c172_settings";
    if (isLJ45()) return "lj45_settings";
    return null;
}

function getDefaultSettings() {
    if (isC172()) return DEFAULTS.c172;
    if (isLJ45()) return DEFAULTS.lj45;
    return {};
}

function getCurrentSettings() {
    const key = getSettingsKey();
    const defaults = getDefaultSettings();
    if (!key) return defaults;

    const saved = localStorage.getItem(key);
    if (!saved) return defaults;

    try {
        return { ...defaults, ...JSON.parse(saved) };
    } catch {
        return defaults;
    }
}

// ---------- AUTO‑INJECT SETTINGS PANEL ----------

document.addEventListener("DOMContentLoaded", () => {
    // only inject on aircraft pages
    if (!isC172() && !isLJ45()) return;

    // if panel already exists, skip
    if (document.getElementById("settingsPanel")) return;

    const panel = document.createElement("div");
    panel.id = "settingsPanel";
    panel.className = "settings-panel";
    panel.innerHTML = `
        <div class="settings-header">
            <h2>Settings</h2>
            <button id="closeSettings" class="close-btn">✕</button>
        </div>
        <div id="settingsContent"></div>
        <div class="settings-footer">
            <button id="saveSettingsBtn" class="button">Save</button>
            <button id="resetSettingsBtn" class="button" style="background:#e74c3c;">Reset</button>
        </div>
    `;
    document.body.appendChild(panel);

    const closeBtn = document.getElementById("closeSettings");
    if (closeBtn) closeBtn.addEventListener("click", closeSettings);
});
