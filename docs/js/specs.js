/* specs.js — dynamic specs */

document.addEventListener("DOMContentLoaded", () => {
    const s = getCurrentSettings();

    function set(id, val) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    if (isC172()) {
        set("specMaxTOW", s.maxTOW);
        set("specEmptyWeight", s.emptyWeight);
        set("specFuelCapacity", s.fuelCapacity);
        set("specBaggageCapacity", s.baggageCapacity);
    }

    if (isLJ45()) {
        set("specMaxTOW", s.maxTOW);
        set("specMaxLW", s.maxLW);
        set("specEmptyWeight", s.emptyWeight);
        set("specFuelCapacity", s.fuelCapacity);
    }
});
