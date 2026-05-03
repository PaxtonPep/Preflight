/* wb.js
   Weight & Balance for C172 (and later LJ45)
*/

document.addEventListener("input", () => {
    if (isC172()) calculateC172WB();
    if (isLJ45()) calculateLJ45WB();
});

function calculateC172WB() {
    const s = getCurrentSettings();
    const fuelDensity = s.fuelDensity || 6.0;

    const front = num("frontSeats") || 0;
    const rear = num("rearSeats") || 0;
    const bag = num("baggage") || 0;
    const fuelGal = num("fuel") || 0;
    const burnGal = num("fuelBurn") || 0;
    const taxiGal = num("taxiFuel") || 0;
    const reserveGal = num("reserveFuel") || 0;

    const fuelLbs = fuelGal * fuelDensity;
    const burnLbs = burnGal * fuelDensity;
    const taxiLbs = taxiGal * fuelDensity;
    const reserveLbs = reserveGal * fuelDensity;

    // Arms (inches)
    const ARM_FRONT = 37;
    const ARM_REAR = 73;
    const ARM_BAG = 95;
    const ARM_FUEL = 48;

    const EMPTY_WEIGHT = s.emptyWeight || 1660;
    const EMPTY_ARM = 39.5;

    const momentEmpty = EMPTY_WEIGHT * EMPTY_ARM;
    const momentFront = front * ARM_FRONT;
    const momentRear = rear * ARM_REAR;
    const momentBag = bag * ARM_BAG;
    const momentFuel = fuelLbs * ARM_FUEL;

    const rampWeight = EMPTY_WEIGHT + front + rear + bag + fuelLbs;
    const rampMoment = momentEmpty + momentFront + momentRear + momentBag + momentFuel;
    const rampCG = rampMoment / rampWeight;

    const taxiWeight = rampWeight - taxiLbs;
    const taxiMoment = rampMoment - (taxiLbs * ARM_FUEL);
    const taxiCG = taxiMoment / taxiWeight;

    const takeoffWeight = taxiWeight - burnLbs;
    const takeoffMoment = taxiMoment - (burnLbs * ARM_FUEL);
    const takeoffCG = takeoffMoment / takeoffWeight;

    const landingWeight = takeoffWeight - reserveLbs;
    const landingMoment = takeoffMoment - (reserveLbs * ARM_FUEL);
    const landingCG = landingMoment / landingWeight;

    const results = document.getElementById("results");
    if (results) {
        results.innerHTML = `
            <p><b>Ramp Weight:</b> ${rampWeight.toFixed(1)} lbs</p>
            <p><b>Ramp CG:</b> ${rampCG.toFixed(2)} in</p>
            <p><b>Taxi Weight:</b> ${taxiWeight.toFixed(1)} lbs</p>
            <p><b>Takeoff Weight:</b> ${takeoffWeight.toFixed(1)} lbs</p>
            <p><b>Takeoff CG:</b> ${takeoffCG.toFixed(2)} in</p>
            <p><b>Landing Weight:</b> ${landingWeight.toFixed(1)} lbs</p>
            <p><b>Landing CG:</b> ${landingCG.toFixed(2)} in</p>
        `;
    }

    updateSafeToFlyC172(takeoffWeight, landingWeight, s);
}

function updateSafeToFlyC172(tow, lw, s) {
    const maxTOW = s.maxTOW || 2550;
    const maxLW = maxTOW; // C172 often same; can customize later
    const box = document.getElementById("safeStatus");
    if (!box) return;

    let msg = "";
    let cls = "";

    const towMargin = maxTOW - tow;
    const lwMargin = maxLW - lw;

    if (tow <= maxTOW && lw <= maxLW) {
        if (towMargin < 100 || lwMargin < 100) {
            msg = "Caution: Within limits but close to maximum weight.";
            cls = "warn";
        } else {
            msg = "Safe to fly: All weights within limits.";
            cls = "safe";
        }
    } else {
        msg = "Not safe to fly: One or more weights exceed limits.";
        cls = "unsafe";
    }

    box.innerHTML = `<p class="${cls}">${msg}</p>`;
}

// placeholder for LJ45 until its new WB page is wired
function calculateLJ45WB() {
    // no-op for now or reuse your earlier logic later
}
