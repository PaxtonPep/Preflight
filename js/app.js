document.getElementById('settingsBtn').onclick = toggleSettings;

function toggleSettings() {
  document.getElementById('settingsPanel').classList.toggle('open');
}

function loadAircraft() {
  const ac = document.getElementById('aircraft').value;
  const planeImg = document.getElementById('planeImg');
  const planeName = document.getElementById('planeName');
  const planeMeta = document.getElementById('planeMeta');

  if (ac === '172') {
    planeImg.src = 'CofG/Assets/cessna172outline.png';
    planeImg.alt = 'Cessna 172 outline';
    planeName.innerText = 'Cessna 172S';
    planeMeta.innerText = '4 seats • Piston • Trainer';

    document.getElementById('maxTO').value = 2550;
    document.getElementById('maxLDG').value = 2550;

    document.getElementById('arm_empty').value = 39.5;
    document.getElementById('arm_front').value = 37.0;
    document.getElementById('arm_rear').value  = 73.0;
    document.getElementById('arm_bag').value   = 95.0;
    document.getElementById('arm_fuel').value  = 48.0;

    document.getElementById('row_rear').style.display = 'grid';
    document.getElementById('label_front_row').innerText = 'Front Seats';
    document.getElementById('label_rear_row').innerText  = 'Rear Seats';
    document.getElementById('label_bag_row').innerText   = 'Baggage';
    document.getElementById('label_arm_front').innerText = 'Front Seats';
    document.getElementById('label_arm_rear').innerText  = 'Rear Seats';
    document.getElementById('label_arm_bag').innerText   = 'Baggage';
  }

  if (ac === 'lj45') {
    planeImg.src = 'CofG/Assets/learjet45outline.png';
    planeImg.alt = 'Learjet 45 outline';
    planeName.innerText = 'Learjet 45';
    planeMeta.innerText = 'Bizjet • Cabin seating • High speed';

    document.getElementById('maxTO').value = 20500;
    document.getElementById('maxLDG').value = 19500;

    document.getElementById('arm_empty').value = 295;
    document.getElementById('arm_front').value = 310;  // cabin seats
    document.getElementById('arm_rear').value  = 345;  // extra cabin row if you ever use it
    document.getElementById('arm_bag').value   = 380;  // aft baggage
    document.getElementById('arm_fuel').value  = 300;

    document.getElementById('row_rear').style.display = 'none';
    document.getElementById('label_front_row').innerText = 'Cabin Seats';
    document.getElementById('label_bag_row').innerText   = 'Aft Baggage';
    document.getElementById('label_arm_front').innerText = 'Cabin Seats';
    document.getElementById('label_arm_rear').innerText  = 'Extra Cabin Row';
    document.getElementById('label_arm_bag').innerText   = 'Aft Baggage';
  }

  calcWB();
}

function calcWB() {
  const arm_empty = parseFloat(document.getElementById('arm_empty').value) || 0;
  const arm_front = parseFloat(document.getElementById('arm_front').value) || 0;
  const arm_rear  = parseFloat(document.getElementById('arm_rear').value) || 0;
  const arm_bag   = parseFloat(document.getElementById('arm_bag').value) || 0;
  const arm_fuel  = parseFloat(document.getElementById('arm_fuel').value) || 0;

  const wt_empty = parseFloat(document.getElementById('wt_empty').value) || 0;
  const wt_front = parseFloat(document.getElementById('wt_front').value) || 0;
  const wt_rear  = parseFloat(document.getElementById('wt_rear').value) || 0;
  const wt_bag   = parseFloat(document.getElementById('wt_bag').value) || 0;
  const wt_fuel_to = parseFloat(document.getElementById('wt_fuel_to').value) || 0;
  const wt_fuel_burn = parseFloat(document.getElementById('wt_fuel_burn').value) || 0;

  document.getElementById('arm_empty_disp').value = arm_empty;
  document.getElementById('arm_front_disp').value = arm_front;
  document.getElementById('arm_rear_disp').value  = arm_rear;
  document.getElementById('arm_bag_disp').value   = arm_bag;
  document.getElementById('arm_fuel_disp').value  = arm_fuel;

  const mom_empty = wt_empty * arm_empty;
  const mom_front = wt_front * arm_front;
  const mom_rear  = wt_rear  * arm_rear;
  const mom_bag   = wt_bag   * arm_bag;
  const mom_fuel_to = wt_fuel_to * arm_fuel;

  document.getElementById('mom_empty').value = mom_empty.toFixed(1);
  document.getElementById('mom_front').value = mom_front.toFixed(1);
  if (document.getElementById('row_rear').style.display !== 'none') {
    document.getElementById('mom_rear').value  = mom_rear.toFixed(1);
  } else {
    document.getElementById('mom_rear').value  = '';
  }
  document.getElementById('mom_bag').value   = mom_bag.toFixed(1);
  document.getElementById('mom_fuel_to').value = mom_fuel_to.toFixed(1);

  const rearVisible = document.getElementById('row_rear').style.display !== 'none';

  const zfw = wt_empty + wt_front + (rearVisible ? wt_rear : 0) + wt_bag;
  const zfwMom = mom_empty + mom_front + (rearVisible ? mom_rear : 0) + mom_bag;
  const zfwCG = zfw > 0 ? zfwMom / zfw : 0;

  const toWeight = zfw + wt_fuel_to;
  const toMoment = zfwMom + mom_fuel_to;
  const toCG = toWeight > 0 ? toMoment / toWeight : 0;

  const ldgFuel = wt_fuel_to - wt_fuel_burn;
  const ldgMoment = zfwMom + (ldgFuel * arm_fuel);
  const ldgWeight = zfw + ldgFuel;
  const ldgCG = ldgWeight > 0 ? ldgMoment / ldgWeight : 0;

  const maxTO = parseFloat(document.getElementById('maxTO').value) || Infinity;
  const maxLDG = parseFloat(document.getElementById('maxLDG').value) || Infinity;

  const zfwText = `ZFW: ${zfw.toFixed(0)} lbs • CG ${zfwCG.toFixed(1)} in`;
  const toText  = `Takeoff: ${toWeight.toFixed(0)} lbs • CG ${toCG.toFixed(1)} in`;
  const ldgText = `Landing: ${ldgWeight.toFixed(0)} lbs • CG ${ldgCG.toFixed(1)} in`;

  document.getElementById('zfwBox').innerHTML =
    `<span class="result-label">${zfwText}</span>`;

  document.getElementById('toBox').innerHTML =
    `<span class="result-label">${toText}</span>` +
    (toWeight > maxTO
      ? ` <span class="result-warn">⚠ Over max TO (${maxTO.toFixed(0)})</span>`
      : ` <span class="result-ok">OK</span>`);

  document.getElementById('ldgBox').innerHTML =
    `<span class="result-label">${ldgText}</span>` +
    (ldgWeight > maxLDG
      ? ` <span class="result-warn">⚠ Over max LDG (${maxLDG.toFixed(0)})</span>`
      : ` <span class="result-ok">OK</span>`);
}

/* PERFORMANCE UI BEHAVIOR */

function updatePerfMode() {
  const mode = document.getElementById('perfMode').value;
  const distWrap = document.getElementById('perfDistanceWrap');
  const timeWrap = document.getElementById('perfTimeWrap');
  const tasWrap  = document.getElementById('perfTASWrap');

  if (mode === 'distanceToTime') {
    // distance → time: input distance + TAS
    distWrap.style.display = 'block';
    timeWrap.style.display = 'none';
    tasWrap.style.display  = 'block';
    document.getElementById('perfTime').value = '';
  } else if (mode === 'timeToDistance') {
    // time → distance: input time + TAS
    distWrap.style.display = 'none';
    timeWrap.style.display = 'block';
    tasWrap.style.display  = 'block';
    document.getElementById('perfDistance').value = '';
  } else if (mode === 'fuelOnly') {
    // time → fuel only: input time + FF
    distWrap.style.display = 'none';
    timeWrap.style.display = 'block';
    tasWrap.style.display  = 'none';
    document.getElementById('perfDistance').value = '';
  }
  document.getElementById('perfFuelUsed').value = '';
  document.getElementById('perfBox').innerText = '';
}

function calcPerf() {
  const mode = document.getElementById('perfMode').value;
  let dist = parseFloat(document.getElementById('perfDistance').value) || 0;
  let timeMin = parseFloat(document.getElementById('perfTime').value) || 0;
  const tas = parseFloat(document.getElementById('perfTAS').value) || 0;
  const ff = parseFloat(document.getElementById('perfFF').value) || 0;

  let timeHr, fuelUsed;

  if (mode === 'distanceToTime') {
    if (dist <= 0 || tas <= 0) {
      document.getElementById('perfBox').innerText = 'Set distance and TAS.';
      return;
    }
    timeHr = dist / tas;
    timeMin = timeHr * 60;
    document.getElementById('perfTime').value = timeMin.toFixed(0);
    fuelUsed = ff > 0 ? timeHr * ff : 0;
    document.getElementById('perfFuelUsed').value = fuelUsed.toFixed(1);
    document.getElementById('perfBox').innerText =
      `Est: ${dist.toFixed(0)} NM • ${timeMin.toFixed(0)} min` +
      (ff > 0 ? ` • ${fuelUsed.toFixed(1)} gal` : '') +
      ' (no wind)';
  } else if (mode === 'timeToDistance') {
    if (timeMin <= 0 || tas <= 0) {
      document.getElementById('perfBox').innerText = 'Set time and TAS.';
      return;
    }
    timeHr = timeMin / 60;
    dist = tas * timeHr;
    document.getElementById('perfDistance').value = dist.toFixed(0);
    fuelUsed = ff > 0 ? timeHr * ff : 0;
    document.getElementById('perfFuelUsed').value = fuelUsed.toFixed(1);
    document.getElementById('perfBox').innerText =
      `Est: ${dist.toFixed(0)} NM • ${timeMin.toFixed(0)} min` +
      (ff > 0 ? ` • ${fuelUsed.toFixed(1)} gal` : '') +
      ' (no wind)';
  } else if (mode === 'fuelOnly') {
    if (timeMin <= 0 || ff <= 0) {
      document.getElementById('perfBox').innerText = 'Set time and fuel flow.';
      return;
    }
    timeHr = timeMin / 60;
    fuelUsed = timeHr * ff;
    document.getElementById('perfFuelUsed').value = fuelUsed.toFixed(1);
    document.getElementById('perfBox').innerText =
      `Est: ${timeMin.toFixed(0)} min • ${fuelUsed.toFixed(1)} gal`;
  }
}

/* INIT */
loadAircraft();
updatePerfMode();
