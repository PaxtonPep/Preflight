/* perf.js — Performance */

document.addEventListener("input", () => {
    if (isC172()) calculateC172Perf();
    if (isLJ45()) calculateLJ45Perf();
});

// ---------- C172 ----------

function calculateC172Perf() {
    const pressureAlt = num("pressureAlt");
    const oat = num("oat");
    const ias = num("ias");
    const fuelBurn = num("fuelBurn");
    const flightTime = num("flightTime");

    if (ias <= 0 || flightTime <= 0) return;

    const isaTemp = 15 - (2 * (pressureAlt / 1000));
    const densityAlt = pressureAlt + (120 * (oat - isaTemp));

    const tas = ias + (ias * (densityAlt / 10000) * 0.02);
    const distance = tas * flightTime;
    const fuelUsed = fuelBurn * flightTime;

    const box = document.getElementById("perfResults");
    if (!box) return;

    box.innerHTML = `
        <p><b>Density Altitude:</b> ${densityAlt.toFixed(0)} ft</p>
        <p><b>TAS:</b> ${tas.toFixed(1)} kts</p>
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

    const distance = tas * flightTime;
    const fuelUsed = fuelBurn * flightTime;

    const box = document.getElementById("ljPerfResults");
    if (!box) return;

    box.innerHTML = `
        <p><b>TAS:</b> ${tas.toFixed(1)} kts</p>
        <p><b>Distance:</b> ${distance.toFixed(1)} NM</p>
        <p><b>Fuel Used:</b> ${fuelUsed.toFixed(0)} lbs</p>
    `;
}
