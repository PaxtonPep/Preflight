/* core.js
   Shared helpers and default settings for all aircraft
*/

function isC172() {
    return window.location.pathname.includes("cessna172");
}

function isLJ45() {
    return window.location.pathname.includes("learjet45");
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
        vx: 0,
        vy: 0,
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
