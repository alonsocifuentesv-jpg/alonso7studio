window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMobile() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

const ro = new IntersectionObserver(entries => {
  entries.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

const SERVICES = [
  { name: 'Corte Clásico',    dur: 30, price: 10000 },
  { name: 'Degradado',        dur: 45, price: 12000 },
  { name: 'Afeitado al ras',  dur: 30, price: 6000  },
  { name: 'Limpieza Facial',  dur: 45, price: 10000 },
  { name: 'Combo Completo',   dur: 60, price: 20000 }
];

const BARBERS = [
  { name: 'Alonso Cifuentes', spec: 'Cortes clásicos & degradados' },
  { name: 'Studio',           spec: 'Afeitado & tratamientos' }
];

const OCCUPIED = {
  0: { 0: ['11:00','11:30','14:00','15:00'], 1: ['12:00','13:00','17:30'], 2: ['11:00','16:00','16:30'], 3: ['13:30','14:00'], 4: ['15:00','15:30','16:00'] },
  1: { 0: ['12:00','12:30','16:00'], 1: ['11:00','14:30','15:00'], 2: ['13:00','17:00'], 3: ['12:00','12:30','18:00','18:30'], 4: ['11:30','14:00'] }
};

let sel = { barber: -1, service: -1, dayIdx: -1, time: '', pago: -1 };

function selectBarber(i, el) {
  sel.barber = i;
  document.querySelectorAll('.barber-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  checkStep1();
}

function selectService(i, el) {
  sel.service = i;
  document.querySelectorAll('.serv-opt').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  checkStep1();
}

function checkStep1() {
  document.getElementById('btn1').disabled = sel.barber < 0 || sel.service < 0;
}

function buildCalendar() {
  const cont = document.getElementById('calDays');
  cont.innerHTML = '';
  const days = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const btn = document.createElement('button');
    btn.className = 'day-btn' + (i === 0 ? ' today' : '');
    btn.innerHTML = `<div class="day-name">${days[d.getDay()]}</div><div class="day-num">${d.getDate()}</div><div class="day-month">${months[d.getMonth()]}</div>`;
    btn.onclick = () => selectDay(i, btn);
    cont.appendChild(btn);
  }
}

function selectDay(idx, el) {
  sel.dayIdx = idx;
  sel.time = '';
  document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('btn2').disabled = true;
  buildSlots(idx);
}

function buildSlots(dayIdx) {
  const grid = document.getElementById('slotsGrid');
  const title = document.getElementById('slotsTitle');
  grid.innerHTML = '';
  title.style.display = 'block';
  const occupied = (OCCUPIED[sel.barber] && OCCUPIED[sel.barber][dayIdx]) || [];
  for (let h = 11; h < 20; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 19 && m === 30) continue;
      const label = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
      const div = document.createElement('div');
      div.className = 'slot' + (occupied.includes(label) ? ' ocupado' : '');
      div.textContent = label;
      if (!occupied.includes(label)) {
        div.onclick = () => {
          sel.time = label;
          document.querySelectorAll('.slot:not(.ocupado)').forEach(s => s.classList.remove('selected'));
          div.classList.add('selected');
          document.getElementById('btn2').disabled = false;
        };
      }
      grid.appendChild(div);
    }
  }
}

function buildResumen() {
  const s = SERVICES[sel.service];
  const b = BARBERS[sel.barber];
  const days = ['Hoy','Mañana','Pasado mañana','En 3 días','En 4 días','En 5 días','En 6 días'];
  document.getElementById('resumenBox').innerHTML = `
    <div class="res-row"><span class="res-label">Barbero</span><span class="res-value">${b.name}</span></div>
    <div class="res-row"><span class="res-label">Servicio</span><span class="res-value">${s.name}</span></div>
    <div class="res-row"><span class="res-label">Día</span><span class="res-value">${days[sel.dayIdx]}</span></div>
    <div class="res-row"><span class="res-label">Hora</span><span class="res-value">${sel.time} hrs</span></div>
    <div class="res-row"><span class="res-label">Duración</span><span class="res-value">${s.dur} minutos</span></div>
    <div class="res-row"><span class="res-label">Total</span><span class="res-value" style="color:var(--red)">$${s.price.toLocaleString('es-CL')}</span></div>
  `;
  const abono = Math.round(s.price * 0.5);
  const total = Math.round(s.price * 0.95);
  document.getElementById('pagoAbono').textContent = '$' + abono.toLocaleString('es-CL');
  document.getElementById('pagoTotal').textContent = '$' + total.toLocaleString('es-CL') + ' (-5%)';
}

function selectPago(i, el) {
  sel.pago = i;
  document.querySelectorAll('.pago-opt').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('pago-sim').style.display = 'block';
  document.getElementById('btn3').disabled = false;
}

function confirmar() {
  const code = 'BA-' + Math.floor(100000 + Math.random() * 900000);
  const s = SERVICES[sel.service];
  const b = BARBERS[sel.barber];
  const days = ['Hoy','Mañana','Pasado mañana','En 3 días','En 4 días','En 5 días','En 6 días'];
  const pagoTxt = sel.pago === 0 ? 'Abono 50%' : 'Pago completo (-5%)';
  document.getElementById('confirmCode').textContent = code;
  document.getElementById('confirmDetails').innerHTML = `
    ✂ <strong>Barbero:</strong> ${b.name}<br>
    🎯 <strong>Servicio:</strong> ${s.name}<br>
    📅 <strong>Día:</strong> ${days[sel.dayIdx]} a las ${sel.time} hrs<br>
    ⏱ <strong>Duración:</strong> ${s.dur} minutos<br>
    💳 <strong>Pago:</strong> ${pagoTxt}<br>
    🔔 <strong>Recordatorio:</strong> 24 hrs y 1 hr antes automáticamente
  `;
  goStep(4);
}

function resetAgenda() {
  sel = { barber: -1, service: -1, dayIdx: -1, time: '', pago: -1 };
  document.querySelectorAll('.barber-btn,.serv-opt,.pago-opt').forEach(el => el.classList.remove('selected'));
  document.getElementById('pago-sim').style.display = 'none';
  document.getElementById('slotsTitle').style.display = 'none';
  document.getElementById('slotsGrid').innerHTML = '';
  document.getElementById('calDays').innerHTML = '';
  document.getElementById('btn1').disabled = true;
  document.getElementById('btn2').disabled = true;
  document.getElementById('btn3').disabled = true;
  goStep(1);
}

function goStep(n) {
  [1, 2, 3, 4].forEach(i => {
    document.getElementById('step' + i).style.display = i === n ? 'block' : 'none';
    const si = document.getElementById('si' + i);
    si.classList.remove('active', 'done');
    if (i === n) si.classList.add('active');
    else if (i < n) si.classList.add('done');
  });
  if (n === 2) buildCalendar();
  if (n === 3) buildResumen();
}

function fmtCard(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 16);
  el.value = v.replace(/(.{4})/g, '$1 ').trim();
}

goStep(1);
