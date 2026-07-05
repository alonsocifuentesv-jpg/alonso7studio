# LOOP — Barbería Alonso · Web de agendamiento (acción única) · v2 "10/10"

## 🎯 Objetivo del loop (no cambia entre vueltas)
Construir una web de **Barbería Alonso** cuya única misión sea **agendar**, y
que además funcione como **carta de presentación de ventas**: cualquier dueño
de negocio que la vea debe pensar *"quiero exactamente esto para mí"*.

Debe entenderse completa en **5 segundos**, caber sin scroll largo (nada de
landing infinita), y llevar al usuario por un flujo lineal:

> **Servicios → Barbero → Hora → Datos → Pago (demo) → Confirmación**

Meta medible: reservar en **menos de 4 toques**, **móvil primero**, demo 24/7
(sin pagos reales, solo simulado), y con un nivel de diseño que **no parezca
plantilla genérica de IA**.

---

## 💥 Regla anti-genérico (lo que sube esto de 7 a 10)
El 90% de las webs generadas se ven igual: hero centrado, degradado morado,
3 tarjetas, botón redondeado. **Prohibido eso.** En su lugar:

- **Una identidad visual con carácter de barbería premium**: paleta definida
  (negro carbón + un acento fuerte tipo dorado/cobre o rojo navaja), tipografía
  con personalidad (una display con carácter para títulos), texturas sutiles.
- **Un "momento wow" en los primeros 2 segundos**: una animación de entrada
  memorable (el logo/navaja que se dibuja, el hero que revela con movimiento).
- **Detalles de producto real, no de plantilla**: estados hover distintos,
  feedback al tocar, transiciones encadenadas entre pasos del wizard, sensación
  "app nativa" no "página web".
- **Copy con actitud**, no relleno: frases cortas y con tono, cero párrafos.
- **Cero secciones de scroll de relleno.** Si algo no ayuda a agendar o a
  generar confianza en 1 vistazo, se elimina.

Prueba de fuego de cada vuelta: *"¿Esto se ve como algo que un negocio pagaría,
o como una plantilla gratis?"* Si es lo segundo, no está terminado.

---

## 🧭 Prompt del loop (esto es lo que se lanza)

```
/loop  Trabaja en /alonso-studio/ una web premium de "Barbería Alonso" enfocada
        100% en AGENDAR y pensada como demo de ventas para impresionar prospectos.
        Una sola experiencia tipo app de reservas, NO una landing larga.
        Flujo lineal: servicio(s) -> barbero (3) -> día y hora -> datos ->
        pago DEMO -> confirmación. Identidad visual con carácter (nada genérico
        ni degradado morado de plantilla), un momento "wow" de entrada, y
        microinteracciones que se sientan como app nativa. En cada iteración:
        levanta la página, recorre TODO el flujo de agendar, arregla lo que falle
        y aplica la prueba de fuego "¿se ve pagable o se ve plantilla?". Móvil
        primero. Lo único que destaca es agendar. Sigue hasta cumplir la checklist.
```

---

## 🔁 Iteraciones (qué hace cada vuelta)

**Vuelta 1 — Esqueleto + identidad**
Definir paleta, tipografías y tono ANTES de maquetar. Hero de una pantalla:
marca "Barbería Alonso", una frase con actitud, botón dominante "AGENDAR HORA".
Horario visible. Debe caber sin scroll y ya verse premium, no wireframe.

**Vuelta 2 — Motor de agenda (el corazón)**
Wizard por pasos funcional en la misma página (sin recargar):
1. Grid de **servicios** seleccionables (multi-selección; suma precio y duración
   en vivo en un resumen fijo).
2. **3 barberos** con avatar, nombre y especialidad.
3. **Calendario** de día + grilla de horas; horas ocupadas deshabilitadas.
4. Formulario mínimo: nombre + teléfono.
5. **Pago demo**: muestra total, abono sugerido (ej. 50%) y botón "pagar abono"
   simulado (solo visual).
6. **Confirmación** con resumen completo + opción "agregar a calendario" / WhatsApp.

**Vuelta 3 — Momento wow + animaciones**
Animación de entrada memorable, transiciones encadenadas entre pasos del wizard,
microinteracciones al seleccionar servicio/barbero/hora (que se sienta app).
Barra de progreso del wizard. Nada debe "saltar" bruscamente.

**Vuelta 4 — Móvil primero (crítico)**
Todo perfecto en celular: botones grandes tocables, sin zoom, sin scroll
horizontal, wizard cómodo con el pulgar. Probar el flujo entero en móvil.

**Vuelta 5 — Confianza en un vistazo (compacto, NO secciones largas)**
En piezas pequeñas, integradas, sin scroll de relleno:
- Iconos de **redes sociales** (Instagram, TikTok, WhatsApp).
- **Google Maps** embebido compacto con la ubicación.
- **2–3 reseñas** con foto/estrellas en formato tarjeta o carrusel chico.
- **Horario de atención** y **3 correos corporativos**.
- Señal de confianza: "+X cortes al mes", rating, o similar (breve).

**Vuelta 6 — Pulido de nivel producto**
Aplicar la prueba de fuego en cada pantalla. Reservar < 4 toques. Revisar
consistencia visual, estados vacíos/hover/activo, rendimiento y detalles finos.

---

## ✅ Definición de terminado (checklist del loop)
- [ ] Se entiende TODO en 5 segundos al entrar.
- [ ] NO se ve como plantilla genérica de IA (pasa la prueba de fuego).
- [ ] Tiene un "momento wow" en los primeros 2 segundos.
- [ ] Identidad visual con carácter (paleta + tipografía definidas, coherentes).
- [ ] No hay landing larga ni secciones "info-info-info".
- [ ] Lo que más destaca visualmente es AGENDAR.
- [ ] Flujo completo funciona: servicios → barbero → hora → datos → pago demo → confirmación.
- [ ] Multi-selección de servicios suma precio y tiempo en vivo.
- [ ] 3 barberos seleccionables con especialidad.
- [ ] Reservar en menos de 4 toques.
- [ ] Perfecto en móvil (sin scroll horizontal, botones grandes, cómodo con el pulgar).
- [ ] Microinteracciones y transiciones que se sienten "app nativa".
- [ ] Horario de atención visible.
- [ ] Redes sociales + Google Maps + 2-3 reseñas (compactos).
- [ ] 3 correos corporativos presentes.
- [ ] Confirmación con resumen + acción de recordatorio (calendario/WhatsApp).

---

## 📌 Datos de ejemplo (inventados, para el demo)

**Barberos:**
- Alonso — *Fades y diseño*
- Matías — *Barba y afeitado clásico*
- Cristóbal — *Cortes modernos y color*

**Servicios (ejemplo):**
- Corte clásico — $8.000 (30 min)
- Corte + barba — $12.000 (45 min)
- Perfilado de barba — $6.000 (20 min)
- Corte niño — $6.000 (25 min)
- Diseño / afeitado premium — $15.000 (50 min)

**Horario de atención:** Lun a Sáb · 10:00 – 20:00 · Dom cerrado

**Correos corporativos (inventados):**
- reservas@barberiaalonso.cl
- contacto@barberiaalonso.cl
- alonso@barberiaalonso.cl

**Redes:** Instagram @barberiaalonso · TikTok @barberiaalonso · WhatsApp

> ⚠️ Pagos/abonos: solo DEMO visual. Los vínculos reales de pago (Webpay,
> MercadoPago, Flow, etc.) los conectas tú aparte.
