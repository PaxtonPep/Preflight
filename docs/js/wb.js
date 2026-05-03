/*  
   wb.js  
   Handles Weight & Balance for BOTH aircraft:
   - Cessna 172
   - Learjet 45
*/

// -------------------------------
// Detect which aircraft page we're on
// -------------------------------
function isC172() {
    return window.location.pathname.includes("cessna172");
}

function isLJ45() {
    return window.location.pathname.includes("learjet45");
}

// -------------------------------
// CESSNA 172 WEIGHT & BALANCE
// -------------------------------
function calculateC172WB() {
    const front = Number(document.getElementById("frontSeats").value) || 0;
    const rear = Number(document.getElementById("rearSeats").value) || 0;
    const bag = Number(document.getElementById("baggage").value) || 0;
    const fuelGal = Number(document.getElementById("fuel").value) || 0;
    const burnGal = Number(document.getElementById("fuelBurn").value) || 0;

    // Default arms (inches)
    const ARM_FRONT = 37;
    const ARM_REAR = 73;
    const ARM_BAG = 95;
    const ARM_FUEL = 48;

    // Fuel density
    const FUEL_LBS = 6;

    // Convert fuel
    const fuelLbs = fuelGal * FUEL_LBS;
    const burnLbs = burnGal * FUEL_LBS;

    // Empty weight (example)
    const EMPTY_WEIGHT = 1660;
    const EMPTY_ARM = 39.5;

    // Moments
    const momentEmpty = EMPTY_WEIGHT * EMPTY_ARM;
    const momentFront = front * ARM_FRONT;
    const momentRear = rear * ARM_REAR;
    const momentBag = bag * ARM_BAG;
    const momentFuel = fuelLbs * ARM_FUEL;

    const rampWeight = EMPTY_WEIGHT + front + rear + bag + fuelLbs;
    const rampMoment = momentEmpty + momentFront + momentRear + momentBag + momentFuel;
    const rampCG = rampMoment / rampWeight;

    const takeoffWeight = rampWeight - burnLbs;
    const takeoffMoment = rampMoment - (burnLbs * ARM_FUEL);
    const takeoffCG = takeoffMoment / takeoffWeight;

    document.getElementById("results").innerHTML = `
        <p><b>Ramp Weight:</b> ${rampWeight.toFixed(1)} lbs</p>
        <p><b>Ramp CG:</b> ${rampCG.toFixed(2)} in</p>
        <p><b>Takeoff Weight:</b> ${takeoffWeight.toFixed(1)} lbs</p>
        <p><b>Takeoff CG:</b> ${takeoffCG.toFixed(2)} in</p>
    `;
}

// -------------------------------
// LEARJET 45 WEIGHT & BALANCE
// -------------------------------
function calculateLJ45WB() {
    const crew = Number(document.getElementById("frontCrew").value) || 0;
    const pax = Number(document.getElementById("passengers").value) || 0;
    const aft = Number(document.getElementById("aftBaggage").value) || 0;
    const fuel = Number(document.getElementById("fuelLbs").value) || 0;
    const burn = Number(document.getElementById("fuelBurnLbs").value) || 0;

    // Arms (inches) — simplified example
    const ARM_CREW = 130;
    const ARM_PAX = 200;
    const ARM_AFT = 300;
    const ARM_FUEL = 180;

    // Empty weight (example)
    const EMPTY_WEIGHT = 12500;
    const EMPTY_ARM = 180;

    // Moments
    const momentEmpty = EMPTY_WEIGHT * EMPTY_ARM;
    const momentCrew = crew * ARM_CREW;
    const momentPax = pax * ARM_PAX;
    const momentAft = aft * ARM_AFT;
    const momentFuel = fuel * ARM_FUEL;

    const rampWeight = EMPTY_WEIGHT + crew + pax + aft + fuel;
    const rampMoment = momentEmpty + momentCrew + momentPax + momentAft + momentFuel;
    const rampCG = rampMoment / rampWeight;

    const takeoffWeight = rampWeight - burn;
    const takeoffMoment = rampMoment - (burn * ARM_FUEL);
    const takeoffCG = takeoffMoment / takeoffWeight;

    document.getElementById("ljResults").innerHTML = `
        <p><b>Ramp Weight:</b> ${rampWeight.toFixed(1)} lbs</p>
        <p><b>Ramp CG:</b> ${rampCG.toFixed(2)} in</p>
        <p><b>Takeoff Weight:</b> ${takeoffWeight.toFixed(1)} lbs</p>
        <p><b>Takeoff CG:</b> ${takeoffCG.toFixed(2)} in</p>
    `;
}

// -------------------------------
// AUTO‑UPDATE ON INPUT
// -------------------------------
document.addEventListener("input", () => {
    if (isC172()) calculateC172WB();
    if (isLJ45()) calculateLJ45WB();
});
