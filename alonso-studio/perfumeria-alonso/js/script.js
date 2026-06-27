window.addEventListener('scroll',()=>{document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>40);});
function toggleMenu(){document.getElementById('hamburger').classList.toggle('open');document.getElementById('mobileMenu').classList.toggle('open');}
function closeMobile(){document.getElementById('hamburger').classList.remove('open');document.getElementById('mobileMenu').classList.remove('open');}

const ro=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible');});},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

const co=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.querySelectorAll('.count').forEach(c=>{const t=+c.dataset.target;let n=0;const s=t/55;const i=setInterval(()=>{n=Math.min(n+s,t);c.textContent=Math.floor(n).toLocaleString('es-CL');if(n>=t)clearInterval(i);},22);});co.unobserve(x.target);}});},{threshold:.3});
document.querySelectorAll('.stats').forEach(el=>co.observe(el));

let ckStep=1;
function openCheckout(){
  if(!cart.length)return;
  ckStep=1;showCkPanel(1);
  document.getElementById('ckModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeCheckout(){
  document.getElementById('ckModal').classList.remove('open');
  document.body.style.overflow='';
}
function showCkPanel(n){
  ckStep=n;
  [1,2,3].forEach(i=>{
    document.getElementById('ckp'+i).classList.toggle('show',i===n);
    const s=document.getElementById('cks'+i);
    s.classList.remove('active','done');
    if(i===n)s.classList.add('active');
    else if(i<n)s.classList.add('done');
  });
  const titles=['Datos de entrega','Datos de pago','Pedido confirmado'];
  document.getElementById('ckTitle').textContent=titles[n-1];
}
function ckNext(n){
  if(n===2){
    const fields=['ck_nombre','ck_apellido','ck_email','ck_tel','ck_dir','ck_ciudad','ck_region'];
    for(const f of fields){const el=document.getElementById(f);if(!el.value.trim()){el.focus();el.style.borderColor='#ef4444';setTimeout(()=>el.style.borderColor='',1800);return;}}
    const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
    document.getElementById('ckPayAmt').textContent='$'+total.toLocaleString('es-CL');
    const lines=cart.map(i=>`<div class="ck-sum-row"><span>${i.name} ×${i.qty}</span><span>$${(i.price*i.qty).toLocaleString('es-CL')}</span></div>`).join('');
    const ship=`<div class="ck-sum-row"><span>Envío a domicilio</span><span style="color:#22c55e">Gratis</span></div>`;
    const tot=`<div class="ck-sum-row"><span>Total</span><span>$${total.toLocaleString('es-CL')}</span></div>`;
    document.getElementById('ckSummary').innerHTML=lines+ship+tot;
  }
  if(n===1){showCkPanel(1);return;}
  showCkPanel(n);
}
function fmtCkCard(el){let v=el.value.replace(/\D/g,'').slice(0,16);el.value=v.replace(/(.{4})/g,'$1 ').trim();}
function fmtExp(el){let v=el.value.replace(/\D/g,'').slice(0,4);if(v.length>=2)v=v.slice(0,2)+'/'+v.slice(2);el.value=v;}
function ckPagar(){
  const card=document.getElementById('ck_card').value.replace(/\s/g,'');
  const exp=document.getElementById('ck_exp').value;
  const cvv=document.getElementById('ck_cvv').value;
  const tit=document.getElementById('ck_titular').value;
  if(card.length<16||exp.length<5||cvv.length<3||!tit.trim()){alert('Completa todos los datos de pago.');return;}
  const code='PA-'+Math.floor(100000+Math.random()*900000);
  document.getElementById('ckOrderCode').textContent=code;
  const nombre=document.getElementById('ck_nombre').value+' '+document.getElementById('ck_apellido').value;
  const dir=document.getElementById('ck_dir').value;
  const ciudad=document.getElementById('ck_ciudad').value;
  const email=document.getElementById('ck_email').value;
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById('ckDelivBox').innerHTML=`📦 <strong>Pedido:</strong> ${code}<br>👤 <strong>Cliente:</strong> ${nombre}<br>📍 <strong>Entrega:</strong> ${dir}, ${ciudad}<br>📧 <strong>Confirmación enviada a:</strong> ${email}<br>💳 <strong>Total cobrado:</strong> $${total.toLocaleString('es-CL')}<br>🚚 <strong>Despacho:</strong> 2–3 días hábiles`;
  cart=[];renderCart();
  toggleCart();
  showCkPanel(3);
}

document.querySelectorAll('.filtro-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filtro-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    filterCat();
  });
});
function filterCat(){
  const f=document.querySelector('.filtro-btn.active').dataset.f;
  const q=document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.cat-card').forEach(c=>{
    const cat=c.dataset.cat;
    const name=c.querySelector('.cat-name').textContent.toLowerCase();
    const show=(f==='all'||cat===f)&&(!q||name.includes(q));
    c.classList.toggle('hidden',!show);
  });
}

let cart=[];
function addCart(name,price,btn){
  const ex=cart.find(i=>i.name===name);
  if(ex){ex.qty++;}else{cart.push({name,price,qty:1});}
  btn.textContent='✓ Agregado';btn.classList.add('added');
  setTimeout(()=>{btn.innerHTML='🛒 Agregar al carrito';btn.classList.remove('added');},1500);
  renderCart();
}
function renderCart(){
  const items=document.getElementById('cartItems');
  const footer=document.getElementById('cartFooter');
  const count=document.getElementById('cartCount');
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const qty=cart.reduce((s,i)=>s+i.qty,0);
  count.textContent=qty;count.style.display=qty?'flex':'none';
  if(!cart.length){items.innerHTML='<div class="cart-empty">Tu carrito está vacío.<br>Agrega productos del catálogo.</div>';footer.style.display='none';return;}
  items.innerHTML=cart.map((it,i)=>`<div class="cart-item"><div style="flex:1"><div class="cart-item-name">${it.name}</div><div class="cart-item-price">$${(it.price*it.qty).toLocaleString('es-CL')} (×${it.qty})</div></div><button class="cart-item-remove" onclick="removeCart(${i})">✕</button></div>`).join('');
  document.getElementById('cartTotalPrice').textContent='$'+total.toLocaleString('es-CL');
  footer.style.display='block';
}
function removeCart(i){cart.splice(i,1);renderCart();}
function toggleCart(){document.getElementById('cartDrawer').classList.toggle('open');document.getElementById('cartOverlay').classList.toggle('open');}

function toggleBlog(i,btn){const el=document.getElementById('bf'+i);el.classList.toggle('open');btn.textContent=el.classList.contains('open')?'Leer menos ↑':'Leer más →';}

const ASERVS=[{name:'Asesoría personal',dur:30,price:0},{name:'Prueba de aromas',dur:45,price:5000},{name:'Set personalizado',dur:60,price:8000}];
const ABARBERS=[{name:'Alonso Cifuentes',spec:'Perfumes hombre & colección'},{name:'Alonso Studio',spec:'Perfumes mujer & niños'}];
const OCC={0:{0:['09:00','09:30','13:00','14:30'],1:['10:00','11:00','16:00'],2:['09:00','15:00'],3:['12:30','13:00']},1:{0:['11:00','14:00'],1:['09:30','15:30','16:00'],2:['12:00','16:30'],3:['10:00','10:30']}};
let asel={barber:-1,service:-1,dayIdx:-1,time:'',pago:-1};
function selBarber(i,el){asel.barber=i;document.querySelectorAll('.barber-btn').forEach(b=>b.classList.remove('selected'));el.classList.add('selected');chk1();}
function selServ(i,el){asel.service=i;document.querySelectorAll('.serv-opt').forEach(b=>b.classList.remove('selected'));el.classList.add('selected');chk1();}
function chk1(){document.getElementById('btn1').disabled=asel.barber<0||asel.service<0;}
function buildCal(){
  const c=document.getElementById('calDays');c.innerHTML='';
  const days=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const months=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const today=new Date();
  for(let i=0;i<7;i++){const d=new Date(today);d.setDate(today.getDate()+i);const btn=document.createElement('button');btn.className='day-btn'+(i===0?' today':'');btn.innerHTML=`<div class="dn">${days[d.getDay()]}</div><div class="dd">${d.getDate()}</div><div class="dm">${months[d.getMonth()]}</div>`;btn.onclick=()=>{asel.dayIdx=i;asel.time='';document.querySelectorAll('.day-btn').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');document.getElementById('btn2').disabled=true;buildSlots(i);};c.appendChild(btn);}
}
function buildSlots(d){
  const g=document.getElementById('slotsGrid');g.innerHTML='';document.getElementById('slotsWrap').style.display='block';
  const occ=(OCC[asel.barber]&&OCC[asel.barber][d])||[];
  for(let h=8;h<19;h++){for(let m=0;m<60;m+=30){const label=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;const div=document.createElement('div');div.className='slot'+(occ.includes(label)?' occ':'');div.textContent=occ.includes(label)?'Ocupado':label;if(!occ.includes(label)){div.onclick=()=>{asel.time=label;document.querySelectorAll('.slot:not(.occ)').forEach(s=>s.classList.remove('selected'));div.classList.add('selected');document.getElementById('btn2').disabled=false;};}g.appendChild(div);}}
}
function buildRes(){
  const s=ASERVS[asel.service];const b=ABARBERS[asel.barber];
  const days=['Hoy','Mañana','Pasado mañana','En 3 días','En 4 días','En 5 días','En 6 días'];
  document.getElementById('resBox').innerHTML=`<div class="res-row"><span class="rl">Asesor</span><span class="rv">${b.name}</span></div><div class="res-row"><span class="rl">Servicio</span><span class="rv">${s.name}</span></div><div class="res-row"><span class="rl">Día</span><span class="rv">${days[asel.dayIdx]}</span></div><div class="res-row"><span class="rl">Hora</span><span class="rv">${asel.time} hrs</span></div><div class="res-row"><span class="rl">Total</span><span class="rv" style="color:var(--sky)">${s.price?'$'+s.price.toLocaleString('es-CL'):'Gratis'}</span></div>`;
  const abono=Math.round(s.price*.5);
  document.getElementById('pagoA').textContent=abono?'$'+abono.toLocaleString('es-CL'):'$0 (gratis)';
  document.getElementById('pagoT').textContent=s.price?'$'+Math.round(s.price*.95).toLocaleString('es-CL'):'Gratis';
}
function selPago(i,el){asel.pago=i;document.querySelectorAll('.pago-opt').forEach(p=>p.classList.remove('selected'));el.classList.add('selected');document.getElementById('cardSim').style.display='block';document.getElementById('btn3').disabled=false;}
function confirmar(){
  const code='PA-'+Math.floor(100000+Math.random()*900000);
  const s=ASERVS[asel.service];const b=ABARBERS[asel.barber];
  const days=['Hoy','Mañana','Pasado mañana','En 3 días','En 4 días','En 5 días','En 6 días'];
  document.getElementById('confCode').textContent=code;
  document.getElementById('confDet').innerHTML=`👤 <strong>Asesor:</strong> ${b.name}<br>🎯 <strong>Servicio:</strong> ${s.name}<br>📅 <strong>Día:</strong> ${days[asel.dayIdx]} a las ${asel.time} hrs<br>💳 <strong>Pago:</strong> ${asel.pago===0?'Abono 50%':'Pago total (-5%)'}<br>🔔 <strong>Recordatorio:</strong> Automático 24 hrs antes`;
  goStep(4);
}
function resetAgenda(){asel={barber:-1,service:-1,dayIdx:-1,time:'',pago:-1};document.querySelectorAll('.barber-btn,.serv-opt,.pago-opt').forEach(el=>el.classList.remove('selected'));document.getElementById('cardSim').style.display='none';document.getElementById('slotsWrap').style.display='none';document.getElementById('btn1').disabled=true;document.getElementById('btn2').disabled=true;document.getElementById('btn3').disabled=true;goStep(1);}
function goStep(n){
  [1,2,3,4].forEach(i=>{document.getElementById('step'+i).style.display=i===n?'block':'none';const si=document.getElementById('si'+i);si.classList.remove('active','done');if(i===n)si.classList.add('active');else if(i<n)si.classList.add('done');});
  if(n===2)buildCal();if(n===3)buildRes();
}
function fmtCard(el){let v=el.value.replace(/\D/g,'').slice(0,16);el.value=v.replace(/(.{4})/g,'$1 ').trim();}
goStep(1);

function toggleFaq(btn){const item=btn.parentElement;item.classList.toggle('open');}

const PRODUCTOS={
  'Aqua Montana':{cat:'Hombre',img:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=700&h=900&fit=crop&q=90',badge:'29% OFF',stars:'★★★★★',reviews:'(52 compras)',desc:'Aqua Montana es una fragancia fresca y acuática que evoca la pureza del aire de montaña después de la lluvia. Ideal para el hombre moderno que busca una presencia sutil pero memorable en el día a día.',n1:'Bergamota',n2:'Cedro',n3:'Almizcle blanco',vol:'100ml · Eau de Parfum',intensidad:'Media',duracion:'6–8 horas',ocasion:'Diario · Trabajo · Casual',old:'$41.990',price:'$29.990',disc:'29% OFF',name:'Aqua Montana',rawPrice:29990},
  'Black Forest':{cat:'Hombre',img:'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=700&h=900&fit=crop&q=90',badge:'30% OFF',stars:'★★★★★',reviews:'(41 compras)',desc:'Black Forest captura la esencia oscura y profunda del bosque en invierno. Una fragancia amaderada e intensa para el hombre que no pasa desapercibido. Proyección excepcional.',n1:'Pimienta negra',n2:'Vetiver',n3:'Oud',vol:'75ml · Extrait de Parfum',intensidad:'Alta',duracion:'10–14 horas',ocasion:'Noche · Eventos · Citas',old:'$49.990',price:'$34.990',disc:'30% OFF',name:'Black Forest',rawPrice:34990},
  'El Conquistador':{cat:'Hombre',img:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&h=900&fit=crop&q=90',badge:'28% OFF',stars:'★★★★☆',reviews:'(38 compras)',desc:'El Conquistador es una fragancia oriental especiada con carácter. Sus notas cálidas y envolventes transmiten confianza y elegancia en cada situación.',n1:'Cardamomo',n2:'Rosa de Damasco',n3:'Ámbar',vol:'100ml · Eau de Toilette',intensidad:'Media-alta',duracion:'7–9 horas',ocasion:'Casual · Noche · Fin de semana',old:'$34.990',price:'$24.990',disc:'28% OFF',name:'El Conquistador',rawPrice:24990},
  'Dark Summit':{cat:'Hombre',img:'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&h=900&fit=crop&q=90',badge:'27% OFF',stars:'★★★★★',reviews:'(67 compras)',desc:'Dark Summit es nuestra fragancia masculina más vendida. Un extrait intenso con corazón de sándalo y base de cuero que genera una estela irresistible y duradera.',n1:'Limón negro',n2:'Sándalo',n3:'Cuero',vol:'50ml · Extrait de Parfum',intensidad:'Muy alta',duracion:'12–16 horas',ocasion:'Noche · Eventos formales · Lujo',old:'$54.990',price:'$39.990',disc:'27% OFF',name:'Dark Summit',rawPrice:39990},
  'Rose Blanche':{cat:'Mujer',img:'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=700&h=900&fit=crop&q=90',badge:'28% OFF',stars:'★★★★★',reviews:'(89 compras)',desc:'Rose Blanche es la esencia de la feminidad en su forma más pura. Una rosa centifolia envuelta en notas polveadas y musgo blanco que crea una nube de elegancia y delicadeza.',n1:'Peonía',n2:'Rosa centifolia',n3:'Musgo blanco',vol:'100ml · Eau de Parfum',intensidad:'Media',duracion:'7–9 horas',ocasion:'Diario · Trabajo · Romántica',old:'$38.990',price:'$27.990',disc:'28% OFF',name:'Rose Blanche',rawPrice:27990},
  'Celeste Infinita':{cat:'Mujer',img:'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=700&h=900&fit=crop&q=90',badge:'27% OFF',stars:'★★★★★',reviews:'(74 compras)',desc:'Celeste Infinita es una fragancia floral acuática inspirada en un jardín al amanecer. Fresca, luminosa y con una permanencia que te acompañará durante todo el día.',n1:'Jazmín',n2:'Gardenia',n3:'Sándalo cremoso',vol:'75ml · Eau de Parfum',intensidad:'Media',duracion:'6–8 horas',ocasion:'Primavera · Verano · Brunch',old:'$44.990',price:'$32.990',disc:'27% OFF',name:'Celeste Infinita',rawPrice:32990},
  'La Femme':{cat:'Mujer',img:'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=700&h=900&fit=crop&q=90',badge:'28% OFF',stars:'★★★★☆',reviews:'(45 compras)',desc:'La Femme es una fragancia sofisticada y sensual que celebra la mujer moderna. Sus notas orientales florales crean un misterio irresistible que permanece en la piel durante horas.',n1:'Bergamota',n2:'Iris',n3:'Pachulí',vol:'100ml · Extrait de Parfum',intensidad:'Alta',duracion:'10–12 horas',ocasion:'Noche · Cenas · Ocasiones especiales',old:'$39.990',price:'$28.990',disc:'28% OFF',name:'La Femme',rawPrice:28990},
  'Aurora':{cat:'Mujer',img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&h=900&fit=crop&q=90',badge:'29% OFF',stars:'★★★★★',reviews:'(61 compras)',desc:'Aurora captura los primeros rayos del día en un frasco. Una fragancia luminosa y radiante con notas de mandarina y flor de azahar, perfecta para comenzar el día con energía positiva.',n1:'Mandarina',n2:'Flor de azahar',n3:'Vainilla suave',vol:'50ml · Eau de Parfum',intensidad:'Ligera-media',duracion:'5–7 horas',ocasion:'Mañana · Diario · Oficina',old:'$41.990',price:'$29.990',disc:'29% OFF',name:'Aurora',rawPrice:29990},
  'Little Explorer':{cat:'Niño',img:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=700&h=900&fit=crop&crop=right&q=90',badge:'25% OFF',stars:'★★★★★',reviews:'(33 compras)',desc:'Little Explorer es una colonia fresca y suave especialmente formulada para niños. Con notas cítricas y verdes que evocan la aventura y el juego al aire libre. Sin alcohol agresivo.',n1:'Limón',n2:'Manzana verde',n3:'Almizcle suave',vol:'50ml · Colonia',intensidad:'Ligera',duracion:'3–4 horas',ocasion:'Diario · Escuela · Actividades',old:'$19.990',price:'$14.990',disc:'25% OFF',name:'Little Explorer',rawPrice:14990},
  'Ocean Boy':{cat:'Niño',img:'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&h=900&fit=crop&crop=left&q=90',badge:'26% OFF',stars:'★★★★☆',reviews:'(31 compras)',desc:'Ocean Boy es una colonia marina y fresca que los niños adoran. Inspirada en el mar y la aventura costera, es perfecta para niños activos que disfrutan estar al aire libre.',n1:'Marino',n2:'Melón',n3:'Sándalo blanco',vol:'50ml · Colonia',intensidad:'Ligera',duracion:'3–5 horas',ocasion:'Diario · Deportes · Playa',old:'$18.990',price:'$13.990',disc:'26% OFF',name:'Ocean Boy',rawPrice:13990},
  'Sky Captain':{cat:'Niño',img:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&h=900&fit=crop&crop=bottom&q=90',badge:'26% OFF',stars:'★★★★★',reviews:'(44 compras)',desc:'Sky Captain es una fragancia fresca y juvenil que combina notas dulces y cítricas. Formulada especialmente para niños con ingredientes suaves y seguros para la piel delicada.',n1:'Naranja',n2:'Lavanda dulce',n3:'Vainilla',vol:'75ml · Eau de Toilette',intensidad:'Ligera-media',duracion:'4–6 horas',ocasion:'Diario · Cumpleaños · Salidas',old:'$22.990',price:'$16.990',disc:'26% OFF',name:'Sky Captain',rawPrice:16990},
  'Adventure':{cat:'Niño',img:'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=700&h=900&fit=crop&crop=top&q=90',badge:'28% OFF',stars:'★★★★☆',reviews:'(36 compras)',desc:'Adventure es la colonia ideal para el niño curioso y lleno de energía. Una fragancia fresca con un toque dulce que dura todo el día de escuela y juegos.',n1:'Pomelo',n2:'Menta',n3:'Musgo',vol:'50ml · Colonia',intensidad:'Ligera',duracion:'3–4 horas',ocasion:'Escuela · Juegos · Diario',old:'$17.990',price:'$12.990',disc:'28% OFF',name:'Adventure',rawPrice:12990},
  'Sweet Princess':{cat:'Niña',img:'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=700&h=900&fit=crop&crop=right&q=90',badge:'25% OFF',stars:'★★★★★',reviews:'(57 compras)',desc:'Sweet Princess es un sueño hecho fragancia. Notas de frambuesa, flor de algodón y vainilla rosada crean una combinación mágica que encanta a las niñas y sus mamás.',n1:'Frambuesa',n2:'Flor de algodón',n3:'Vainilla rosada',vol:'50ml · Colonia',intensidad:'Ligera',duracion:'4–5 horas',ocasion:'Diario · Cumpleaños · Escuela',old:'$19.990',price:'$14.990',disc:'25% OFF',name:'Sweet Princess',rawPrice:14990},
  'Little Rose':{cat:'Niña',img:'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=700&h=900&fit=crop&crop=right&q=90',badge:'26% OFF',stars:'★★★★★',reviews:'(42 compras)',desc:'Little Rose es la primera rosa de tu princesa. Una colonia floral suave y encantadora con pétalos de rosa, durazno y un fondo de musgo blanco. Delicada y perfecta para niñas.',n1:'Durazno',n2:'Rosa rosada',n3:'Musgo blanco',vol:'50ml · Colonia',intensidad:'Ligera',duracion:'3–5 horas',ocasion:'Diario · Fiestas · Escuela',old:'$18.990',price:'$13.990',disc:'26% OFF',name:'Little Rose',rawPrice:13990},
  'Magic Butterfly':{cat:'Niña',img:'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=700&h=900&fit=crop&crop=right&q=90',badge:'26% OFF',stars:'★★★★★',reviews:'(39 compras)',desc:'Magic Butterfly es una fragancia mágica y colorida para niñas soñadoras. Sus notas frutales y florales crean una estela alegre que encantará a tu pequeña princesa.',n1:'Cereza',n2:'Jazmín tierno',n3:'Sándalo dulce',vol:'75ml · Eau de Toilette',intensidad:'Ligera-media',duracion:'4–6 horas',ocasion:'Fiestas · Diario · Ocasiones',old:'$22.990',price:'$16.990',disc:'26% OFF',name:'Magic Butterfly',rawPrice:16990},
  'Dream Garden':{cat:'Niña',img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&h=900&fit=crop&crop=right&q=90',badge:'28% OFF',stars:'★★★★☆',reviews:'(34 compras)',desc:'Dream Garden es un jardín encantado en miniatura. Una colonia fresca y floral que combina flores silvestres con un toque de pera y almizcle suave. Para niñas que sueñan despierta.',n1:'Pera',n2:'Flores silvestres',n3:'Almizcle suave',vol:'50ml · Colonia',intensidad:'Ligera',duracion:'3–4 horas',ocasion:'Diario · Escuela · Jugar',old:'$17.990',price:'$12.990',disc:'28% OFF',name:'Dream Garden',rawPrice:12990},
  'Summit Reserve':{cat:'Colección',img:'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=700&h=900&fit=crop&q=90',badge:'28% OFF',stars:'★★★★★',reviews:'(118 compras)',desc:'Summit Reserve es nuestra obra maestra. Construida sobre un trío de cedro del Atlas, oud de Medio Oriente y vetiver de Haití. Solo 200 unidades numeradas disponibles en todo Chile.',n1:'Cedro del Atlas',n2:'Oud',n3:'Vetiver de Haití',vol:'100ml · Extrait · Ed. Limitada',intensidad:'Muy alta',duracion:'18–24 horas',ocasion:'Lujo · Colección · Regalo premium',old:'$124.990',price:'$89.990',disc:'28% OFF',name:'Summit Reserve',rawPrice:89990},
  'Eternal Peak':{cat:'Colección',img:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=700&h=900&fit=crop&crop=left&q=90',badge:'27% OFF',stars:'★★★★★',reviews:'(93 compras)',desc:'Eternal Peak es una fragancia de colección que captura la eternidad en un frasco. Sus notas de incienso, rosa de Taif y madera de cachemira crean una experiencia olfativa única.',n1:'Rosa de Taif',n2:'Incienso',n3:'Madera de cachemira',vol:'75ml · Extrait · Ed. Limitada',intensidad:'Alta',duracion:'14–20 horas',ocasion:'Colección · Eventos · Regalo',old:'$109.990',price:'$79.990',disc:'27% OFF',name:'Eternal Peak',rawPrice:79990},
  'Cumbre Dorada':{cat:'Colección',img:'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&h=900&fit=crop&crop=right&q=90',badge:'27% OFF',stars:'★★★★★',reviews:'(76 compras)',desc:'Cumbre Dorada es la fragancia más exclusiva de nuestra colección. Numerada y firmada, combina azafrán iraní, rosa búlgara y ámbar gris en una composición de lujo absoluto.',n1:'Azafrán iraní',n2:'Rosa búlgara',n3:'Ámbar gris',vol:'50ml · Extrait · Numerada',intensidad:'Muy alta',duracion:'20–26 horas',ocasion:'Lujo extremo · Colección · Regalo',old:'$129.990',price:'$94.990',disc:'27% OFF',name:'Cumbre Dorada',rawPrice:94990},
  'Alpine Exclusive':{cat:'Colección',img:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&h=900&fit=crop&crop=top&q=90',badge:'26% OFF',stars:'★★★★★',reviews:'(84 compras)',desc:'Alpine Exclusive nace de la inspiración en los Alpes suizos. Una fragancia limpia, mineral y majestuosa con pino negro, lavanda alpina y un fondo de ámbar amaderado.',n1:'Pino negro',n2:'Lavanda alpina',n3:'Ámbar amaderado',vol:'100ml · Extrait · Numerada',intensidad:'Alta',duracion:'12–16 horas',ocasion:'Colección · Lujo · Invierno',old:'$94.990',price:'$69.990',disc:'26% OFF',name:'Alpine Exclusive',rawPrice:69990}
};
let currentProd=null;
function openProd(name){
  const p=PRODUCTOS[name];if(!p)return;
  currentProd=p;
  document.getElementById('pmBadge').textContent=p.badge;
  document.getElementById('pmImg').src=p.img;
  document.getElementById('pmImg').alt=p.name;
  document.getElementById('pmCat').textContent=p.cat;
  document.getElementById('pmName').textContent=p.name;
  document.getElementById('pmStars').textContent=p.stars;
  document.getElementById('pmReviews').textContent=p.reviews;
  document.getElementById('pmDesc').textContent=p.desc;
  document.getElementById('pmN1').textContent=p.n1;
  document.getElementById('pmN2').textContent=p.n2;
  document.getElementById('pmN3').textContent=p.n3;
  document.getElementById('pmVol').textContent=p.vol;
  document.getElementById('pmIntensidad').textContent=p.intensidad;
  document.getElementById('pmDuracion').textContent=p.duracion;
  document.getElementById('pmOcasion').textContent=p.ocasion;
  document.getElementById('pmOld').textContent=p.old;
  document.getElementById('pmPrice').childNodes[0].textContent=p.price;
  document.getElementById('pmDisc').textContent=' · '+p.disc;
  const btn=document.getElementById('pmAddBtn');
  btn.textContent='🛒 Agregar al carrito';btn.classList.remove('added');
  document.getElementById('prodModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeProd(){document.getElementById('prodModal').classList.remove('open');document.body.style.overflow='';}
function prodAddCart(){
  if(!currentProd)return;
  addCart(currentProd.name,currentProd.rawPrice,document.getElementById('pmAddBtn'));
  const btn=document.getElementById('pmAddBtn');
  btn.textContent='✓ Agregado';btn.classList.add('added');
  setTimeout(()=>{btn.innerHTML='🛒 Agregar al carrito';btn.classList.remove('added');},1500);
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProd();});

(function(){
  const cur=document.getElementById('cursor');
  const ring=document.getElementById('cursorRing');
  if(!cur||!ring)return;
  if(window.matchMedia('(hover:none),(pointer:coarse)').matches){cur.remove();ring.remove();return;}
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  (function animRing(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);})();
  document.querySelectorAll('a,button,[onclick]').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(2.2)';ring.style.transform='translate(-50%,-50%) scale(1.5)';ring.style.borderColor='rgba(184,146,74,.7)';});
    el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';ring.style.transform='translate(-50%,-50%) scale(1)';ring.style.borderColor='rgba(184,146,74,.45)';});
  });
})();
