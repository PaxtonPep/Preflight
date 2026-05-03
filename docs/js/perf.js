/*  
   perf.js  
   Performance calculations for:
   - Cessna 172
   - Learjet 45
*/

// Detect aircraft
function isC172() {
    return window.location.pathname.includes("cessna172");
}

function isLJ45() {
    return window.location.pathname.includes("learjet45");
}

// -------------------------------
// CESSNA 172 PERFORMANCE
// -------------------------------
function calculateC172Perf() {
    const pressureAlt = Number(document.getElementById("pressureAlt").value) || 0;
    const oat = Number(document.getElementById("oat").value) || 0;
    const ias = Number(document.getElementById("ias").value) || 0;
    const fuelBurn = Number(document.getElementById("fuelBurn").value) || 0;
    const flightTime = Number(document.getElementById("flightTime").value) || 0;

    // Density altitude formula (simplified)
    const isaTemp = 15 - (2 * (pressureAlt / 1000));
    const densityAlt = pressureAlt + (120 * (oat - isaTemp));

    // TAS approximation
    const tas = ias + (ias * (densityAlt / 10000) * 0.02);

    const fuelUsed = fuelBurn * flightTime;
    const range = tas * flightTime;

    document.getElementById("perfResults").innerHTML = `
        <p><b>Density Altitude:</b> ${densityAlt.toFixed(0)} ft</p>
        <p><b>TAS:</b> ${tas.toFixed(1)} kts</p>
        <p><b>Fuel Used:</b> ${fuelUsed.toFixed(1)} gal</p>
        <p><b>Range:</b> ${range.toFixed(1)} NM</p>
    `;
}

// -------------------------------
// LEARJET 45 PERFORMANCE
// -------------------------------
function calculateLJ45Perf() {
    const mach = Number(document.getElementById("mach").value) || 0;
    const altitude = Number(document.getElementById("altitude").value) || 0;
    const oat = Number(document.getElementById("oat").value) || 0;
    const fuelBurn = Number(document.getElementById("fuelBurnLbs").value) || 0;
    const flightTime = Number(document.getElementById("flightTime").value) || 0;

    // Speed of sound (approx)
    const speedOfSound = 661 - (0.003 * altitude);
    const tas = mach * speedOfSound;

    const fuelUsed = fuelBurn * flightTime;
    const range = tas * flightTime;

    document.getElementById("ljPerfResults").innerHTML = `
        <p><b>TAS:</b> ${tas.toFixed(1)} kts</p>
        <p><b>Fuel Used:</b> ${fuelUsed.toFixed(0)} lbs</p>
        <p><b>Range:</b> ${range.toFixed(1)} NM</p>
    `;
}

// Auto-update
document.addEventListener("input", () => {
    if (isC172()) calculateC172Perf();
    if (isLJ45()) calculateLJ45Perf();
});
