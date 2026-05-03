/* perf.js
   Performance for C172 (and later LJ45)
*/

document.addEventListener("DOMContentLoaded", () => {
    if (isC172()) initC172PerfUI();
});

document.addEventListener("input", () => {
    if (isC172()) calculateC172Perf();
    if (isLJ45()) calculateLJ45Perf();
});

function initC172PerfUI() {
    const modeSelect = document.getElementById("flightMode");
    if (!modeSelect) return;

    modeSelect.addEventListener("change", () => {
        const mode = modeSelect.value;

        const timeLabel = document.getElementById("flightTimeLabel");
        const timeInput = document.getElementById("flightTime");
        const distLabel = document.getElementById("distanceLabel");
        const distInput = document.getElementById("distance");
        const blockLabel = document.getElementById("blockTimeLabel");
        const blockInput = document.getElementById("blockTime");

        if (mode === "time") {
            show(timeLabel, timeInput);
            hide(distLabel, distInput);
            hide(blockLabel, blockInput);
        } else if (mode === "distance") {
            hide(timeLabel, timeInput);
            show(distLabel, distInput);
            hide(blockLabel, blockInput);
        } else if (mode === "block") {
            hide(timeLabel, timeInput);
            hide(distLabel, distInput);
            show(blockLabel, blockInput);
        }
    });
}

function calculateC172Perf() {
    const pressureAlt = num("pressureAlt") || 0;
    const oat = num("oat") || 0;
    const ias = num("ias") || 0;
    const fuelBurn = num("fuelBurn") || 0;

    const modeEl = document.getElementById("flightMode");
    const mode = modeEl ? modeEl.value : "time";

    let flightTime = 0;
    let distance = 0;

    // density altitude (simple)
    const isaTemp = 15 - (2 * (pressureAlt / 1000));
    const densityAlt = pressureAlt + (120 * (oat - isaTemp));

    // TAS approximation
    const tas = ias + (ias * (densityAlt / 10000) * 0.02);

    if (mode === "time") {
        flightTime = num("flightTime") || 0;
        distance = tas * flightTime;
    } else if (mode === "distance") {
        distance = num("distance") || 0;
        flightTime = tas > 0 ? distance / tas : 0;
    } else if (mode === "block") {
        const blockTime = num("blockTime") || 0;
        // assume 0.2 hr taxi, rest cruise
        flightTime = Math.max(blockTime - 0.2, 0);
        distance = tas * flightTime;
    }

    const fuelUsed = fuelBurn * flightTime;

    const box = document.getElementById("perfResults");
    if (!box) return;

    box.innerHTML = `
        <p><b>Density Altitude:</b> ${densityAlt.toFixed(0)} ft</p>
        <p><b>TAS:</b> ${tas.toFixed(1)} kts</p>
        <p><b>Flight Time:</b> ${flightTime.toFixed(2)} hr</p>
        <p><b>Distance:</b> ${distance.toFixed(1)} NM</p>
        <p><b>Fuel Used:</b> ${fuelUsed.toFixed(1)} gal</p>
    `;
}

// simple LJ45 placeholder
function calculateLJ45Perf() {
    // hook into your existing LJ45 perf page later
}

// helpers
function show(label, input) {
    if (label) label.style.display = "";
    if (input) input.style.display = "";
}
function hide(label, input) {
    if (label) label.style.display = "none";
    if (input) input.style.display = "none";
}
