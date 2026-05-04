/* settings.js — per‑page slide‑in settings */

document.addEventListener("DOMContentLoaded", () => {
    const saveBtn = document.getElementById("saveSettingsBtn");
    const resetBtn = document.getElementById("resetSettingsBtn");

    if (saveBtn) saveBtn.addEventListener("click", saveSettings);
    if (resetBtn) resetBtn.addEventListener("click", resetSettings);
});

function loadSettingsPanel() {
    const s = getCurrentSettings();
    const panel = document.getElementById("settingsContent");
    if (!panel) return;

    const path = window.location.pathname;

    // SPECS pages
    if (path.includes("specs.html")) {
        if (isC172()) {
            panel.innerHTML = `
                <label>Max Takeoff Weight</label>
                <input id="setMaxTOW" type="number" value="${s.maxTOW}">
                <label>Empty Weight</label>
                <input id="setEmptyWeight" type="number" value="${s.emptyWeight}">
                <label>Fuel Capacity (gal)</label>
                <input id="setFuelCapacity" type="number" value="${s.fuelCapacity}">
                <label>Baggage Capacity</label>
                <input id="setBaggageCapacity" type="number" value="${s.baggageCapacity}">
            `;
        }
        if (isLJ45()) {
            panel.innerHTML = `
                <label>Max Takeoff Weight</label>
                <input id="setMaxTOW" type="number" value="${s.maxTOW}">
                <label>Max Landing Weight</label>
                <input id="setMaxLW" type="number" value="${s.maxLW}">
                <label>Empty Weight</label>
                <input id="setEmptyWeight" type="number" value="${s.emptyWeight}">
                <label>Fuel Capacity (lbs)</label>
                <input id="setFuelCapacity" type="number" value="${s.fuelCapacity}">
            `;
        }
        return;
    }

    // W&B pages
    if (path.includes("wb.html")) {
        panel.innerHTML = `
            <label>Fuel Density (lbs/gal)</label>
            <input id="setFuelDensity" type="number" value="${s.fuelDensity}">
        `;
        return;
    }

    // PERF pages
    if (path.includes("perf.html")) {
        panel.innerHTML = `
            <label>Cruise Speed (default)</label>
            <input id="setCruise" type="number" value="${s.cruise}">
        `;
        return;
    }

    // Aircraft home
    panel.innerHTML = `
        <label>Crew Count</label>
        <input id="setCrew" type="number" value="${s.crew}">
        <label>Passenger Capacity</label>
        <input id="setPassengers" type="number" value="${s.passengers}">
        <label>Total Seats</label>
        <input id="setTotalSeats" type="number" value="${s.totalSeats}">
    `;
}

function saveSettings() {
    const key = getSettingsKey();
    if (!key) return;

    const s = getCurrentSettings();
    const data = {};
    const path = window.location.pathname;

    const get = id => {
        const el = document.getElementById(id);
        return el ? Number(el.value) : undefined;
    };

    if (path.includes("specs.html")) {
        if (isC172()) {
            data.maxTOW = get("setMaxTOW") ?? s.maxTOW;
            data.emptyWeight = get("setEmptyWeight") ?? s.emptyWeight;
            data.fuelCapacity = get("setFuelCapacity") ?? s.fuelCapacity;
            data.baggageCapacity = get("setBaggageCapacity") ?? s.baggageCapacity;
        }
        if (isLJ45()) {
            data.maxTOW = get("setMaxTOW") ?? s.maxTOW;
            data.maxLW = get("setMaxLW") ?? s.maxLW;
            data.emptyWeight = get("setEmptyWeight") ?? s.emptyWeight;
            data.fuelCapacity = get("setFuelCapacity") ?? s.fuelCapacity;
        }
    } else if (path.includes("wb.html")) {
        data.fuelDensity = get("setFuelDensity") ?? s.fuelDensity;
    } else if (path.includes("perf.html")) {
        data.cruise = get("setCruise") ?? s.cruise;
    } else {
        data.crew = get("setCrew") ?? s.crew;
        data.passengers = get("setPassengers") ?? s.passengers;
        data.totalSeats = get("setTotalSeats") ?? s.totalSeats;
    }

    localStorage.setItem(key, JSON.stringify({ ...s, ...data }));
    closeSettings();
}

function resetSettings() {
    const key = getSettingsKey();
    if (!key) return;
    localStorage.removeItem(key);
    loadSettingsPanel();
}
