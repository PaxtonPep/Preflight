/* perf.js
   Performance for C172 and LJ45
*/

document.addEventListener("DOMContentLoaded", () => {
    if (isC172()) initC172PerfUI();
});

document.addEventListener("input", () => {
    if (isC172()) calculateC172Perf();
    if (isLJ45()) calculateLJ45Perf();
});

// ---------- C172 ----------

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
    const pressureAlt = num("pressureAlt");
    const oat = num("oat");
    const ias = num("ias");
    const fuelBurn = num("fuelBurn");

    const modeEl = document.getElementById("flightMode");
    const mode = modeEl ? modeEl.value : "time";

    let flightTime = 0;
    let distance = 0;

    const isaTemp = 15 - (2 * (pressureAlt / 1000));
    const densityAlt = pressureAlt + (120 * (oat - isaTemp));

    const tas = ias + (ias * (densityAlt / 10000) * 0.02);

    if (mode === "time") {
        flightTime = num("flightTime");
        distance = tas * flightTime;
    } else if (mode === "distance") {
        distance = num("distance");
        flightTime = tas > 0 ? distance / tas : 0;
    } else if (mode === "block") {
        const blockTime = num("blockTime");
        flightTime = Math.max(blockTime - 0.2, 0);
        distance = tas * flightTime;
    }

    const fuelUsed = fuelBurn * flightTime;

    const box = document.getElementById("perfResults");
    if (!box || tas <= 0) return;

    box.innerHTML = `
        <p><b>Density Altitude:</b> ${densityAlt.toFixed(0)} ft</p>
        <p><b>TAS:</b> ${tas.toFixed(1)} kts</p>
        <p><b>Flight Time:</b> ${flightTime.toFixed(2)} hr</p>
        <p><b>Distance:</b> ${distance.toFixed(1)} NM</p>
        <p><b>Fuel Used:</b> ${fuelUsed.toFixed(1)} gal</p>
    `;
}

// ---------- LJ45 ----------

function calculateLJ45Perf() {
    const mach = num("mach");
    const altitude = num("altitude");
    const oat = num("oat");
    const fuelBurn = num("fuelBurnLbs");
    const flightTime = num("flightTime");

    if (mach <= 0 || flightTime <= 0) return;

    const speedOfSound = 661 - (0.003 * altitude);
    const tas = mach * speedOfSound;

    const fuelUsed = fuelBurn * flightTime;
    const distance = tas * flightTime;

    const box = document.getElementById("ljPerfResults");
    if (!box) return;

    box.innerHTML = `
        <p><b>TAS:</b> ${tas.toFixed(1)} kts</p>
        <p><b>Flight Time:</b> ${flightTime.toFixed(2)} hr</p>
        <p><b>Distance:</b> ${distance.toFixed(1)} NM</p>
        <p><b>Fuel Used:</b> ${fuelUsed.toFixed(0)} lbs</p>
    `;
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
