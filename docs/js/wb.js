/* wb.js — Weight & Balance */

document.addEventListener("input", () => {
    if (isC172()) calculateC172WB();
    if (isLJ45()) calculateLJ45WB();
});

// ---------- C172 ----------

function calculateC172WB() {
    const s = getCurrentSettings();
    const fuelDensity = s.fuelDensity;

    const front = num("frontSeats");
    const rear = num("rearSeats");
    const bag = num("baggage");
    const fuelGal = num("fuel");
    const burnGal = num("fuelBurn");
    const taxiGal = num("taxiFuel");
    const reserveGal = num("reserveFuel");

    const fuelLbs = fuelGal * fuelDensity;
    const burnLbs = burnGal * fuelDensity;
    const taxiLbs = taxiGal * fuelDensity;
    const reserveLbs = reserveGal * fuelDensity;

    const ARM_FRONT = 37;
    const ARM_REAR = 73;
    const ARM_BAG = 95;
    const ARM_FUEL = 48;

    const EMPTY_WEIGHT = s.emptyWeight;
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

    const box = document.getElementById("results");
    if (box && rampWeight > 0) {
        box.innerHTML = `
            <p><b>Ramp Weight:</b> ${rampWeight.toFixed(1)} lbs</p>
            <p><b>Ramp CG:</b> ${rampCG.toFixed(2)} in</p>
            <p><b>Takeoff Weight:</b> ${takeoffWeight.toFixed(1)} lbs</p>
            <p><b>Takeoff CG:</b> ${takeoffCG.toFixed(2)} in</p>
            <p><b>Landing Weight:</b> ${landingWeight.toFixed(1)} lbs</p>
            <p><b>Landing CG:</b> ${landingCG.toFixed(2)} in</p>
        `;
    }

    updateSafeToFlyC172(takeoffWeight, landingWeight, s);
}

function updateSafeToFlyC172(tow, lw, s) {
    const maxTOW = s.maxTOW;
    const maxLW = s.maxTOW;

    const box = document.getElementById("safeStatus");
    if (!box) return;

    if (tow <= maxTOW && lw <= maxLW) {
        box.innerHTML = `<p class="safe">Safe to fly</p>`;
    } else {
        box.innerHTML = `<p class="unsafe">Not safe to fly</p>`;
    }
}

// ---------- LJ45 ----------

function calculateLJ45WB() {
    const s = getCurrentSettings();

    const crew = num("frontCrew");
    const pax = num("passengers");
    const aft = num("aftBaggage");
    const fuel = num("fuelLbs");
    const burn = num("fuelBurnLbs");
    const taxiFuel = num("taxiFuel");
    const reserveFuel = num("reserveFuel");

    const ARM_CREW = 130;
    const ARM_PAX = 200;
    const ARM_AFT = 300;
    const ARM_FUEL = 180;

    const EMPTY_WEIGHT = s.emptyWeight;
    const EMPTY_ARM = 180;

    const momentEmpty = EMPTY_WEIGHT * EMPTY_ARM;
    const momentCrew = crew * ARM_CREW;
    const momentPax = pax * ARM_PAX;
    const momentAft = aft * ARM_AFT;
    const momentFuel = fuel * ARM_FUEL;

    const rampWeight = EMPTY_WEIGHT + crew + pax + aft + fuel;
    const rampMoment = momentEmpty + momentCrew + momentPax + momentAft + momentFuel;
    const rampCG = rampMoment / rampWeight;

    const taxiWeight = rampWeight - taxiFuel;
    const taxiMoment = rampMoment - (taxiFuel * ARM_FUEL);
    const taxiCG = taxiMoment / taxiWeight;

    const takeoffWeight = taxiWeight - burn;
    const takeoffMoment = taxiMoment - (burn * ARM_FUEL);
    const takeoffCG = takeoffMoment / takeoffWeight;

    const landingWeight = takeoffWeight - reserveFuel;
    const landingMoment = takeoffMoment - (reserveFuel * ARM_FUEL);
    const landingCG = landingMoment / landingWeight;

    const box = document.getElementById("ljResults");
    if (box && rampWeight > 0) {
        box.innerHTML = `
            <p><b>Ramp Weight:</b> ${rampWeight.toFixed(1)} lbs</p>
            <p><b>Ramp CG:</b> ${rampCG.toFixed(2)} in</p>
            <p><b>Takeoff Weight:</b> ${takeoffWeight.toFixed(1)} lbs</p>
            <p><b>Takeoff CG:</b> ${takeoffCG.toFixed(2)} in</p>
            <p><b>Landing Weight:</b> ${landingWeight.toFixed(1)} lbs</p>
            <p><b>Landing CG:</b> ${landingCG.toFixed(2)} in</p>
        `;
    }

    updateSafeToFlyLJ45(takeoffWeight, landingWeight, s);
}

function updateSafeToFlyLJ45(tow, lw, s) {
    const maxTOW = s.maxTOW;
    const maxLW = s.maxLW;

    const box = document.getElementById("safeStatus");
    if (!box) return;

    if (tow <= maxTOW && lw <= maxLW) {
        box.innerHTML = `<p class="safe">Safe to fly</p>`;
    } else {
        box.innerHTML = `<p class="unsafe">Not safe to fly</p>`;
    }
}
