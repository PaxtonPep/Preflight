/* specs.js
   Populates specs page from current settings
*/

document.addEventListener("DOMContentLoaded", () => {
    const specsCard = document.getElementById("specsCard");
    if (!specsCard) return;

    const s = getCurrentSettings();

    function setSpan(id, val) {
        const el = document.getElementById(id);
        if (el && val !== undefined && val !== null) el.textContent = val;
    }

    if (isC172()) {
        setSpan("specModel", "Cessna 172S");
        setSpan("specEngine", "Lycoming IO‑360‑L2A");
        setSpan("specFuelType", "100LL Avgas");

        setSpan("specMaxTOW", s.maxTOW);
        setSpan("specEmptyWeight", s.emptyWeight);
        setSpan("specUsefulLoad", s.maxTOW - s.emptyWeight);
        setSpan("specFuelCapacity", s.fuelCapacity);

        setSpan("specCrew", s.crew);
        setSpan("specPassengers", s.passengers);
        setSpan("specTotalSeats", s.totalSeats);
        setSpan("specBaggageCapacity", s.baggageCapacity);

        setSpan("specCruise", s.cruise);
        setSpan("specRange", s.range);
        setSpan("specCeiling", s.ceiling);

        setSpan("specVr", s.vr);
        setSpan("specVx", s.vx);
        setSpan("specVy", s.vy);
        setSpan("specVfe", s.vfe);
        setSpan("specVne", s.vne);
    }

    if (isLJ45()) {
        setSpan("specModel", "Learjet 45");
        setSpan("specEngine", "Honeywell TFE731‑20");
        setSpan("specFuelType", "Jet‑A");

        setSpan("specMaxTOW", s.maxTOW);
        setSpan("specMaxLW", s.maxLW);
        setSpan("specEmptyWeight", s.emptyWeight);
        setSpan("specFuelCapacity", s.fuelCapacity);

        setSpan("specCrew", s.crew);
        setSpan("specPassengers", s.passengers);
        setSpan("specTotalSeats", s.totalSeats);
        setSpan("specBaggageCapacity", s.baggageCapacity);

        setSpan("specCruise", s.cruise);
        setSpan("specRange", s.range);
        setSpan("specCeiling", s.ceiling);

        setSpan("specVr", s.vr);
        setSpan("specVfe", s.vfe);
        setSpan("specVne", s.vne);
    }
});
