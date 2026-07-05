# LOOP — Barbería Alonso · Web de agendamiento (acción única)

## 🎯 Objetivo del loop (no cambia entre vueltas)
Construir una web de **Barbería Alonso** cuya única misión sea **agendar**.
Debe entenderse completa en **5 segundos**, caber sin scroll largo (nada de
landing page infinita), y llevar al usuario por un flujo lineal:

> **Servicios → Barbero → Hora → Datos → Pago (demo) → Confirmación**

Meta medible: reservar debe tomar **menos de 4 toques**, verse perfecto en
**móvil primero**, y funcionar como demo 24/7 (sin pagos reales, solo simulado).

---

## 🧭 Prompt del loop (esto es lo que se lanza)

```
/loop  Trabaja en /alonso-studio/ una web de "Barbería Alonso" enfocada 100% en
        agendar. Una sola experiencia tipo app de reservas, NO una landing larga.
        Flujo lineal por pasos: seleccionar servicio(s) -> elegir barbero (3) ->
        elegir día y hora -> datos del cliente -> pago DEMO -> confirmación.
        En cada iteración: levanta la página, recorre el flujo completo de
        agendar de principio a fin, arregla lo que falle y púlelo hasta cumplir
        la checklist de "Definición de terminado". Móvil primero. Sin secciones
        de info-info-info; lo único que destaca es agendar.
```

---

## 🔁 Iteraciones (qué hace cada vuelta)

**Vuelta 1 — Esqueleto de una pantalla**
Hero mínimo: logo "Barbería Alonso", una frase corta, botón gigante "AGENDAR".
Horario de atención visible arriba. Que quepa en una pantalla sin scroll.

**Vuelta 2 — Motor de agenda (el corazón)**
Wizard por pasos funcional en la misma página (sin recargar):
1. Grid de **servicios** seleccionables (multi-selección, suma precio y duración).
2. **3 barberos** con foto/avatar y nombre.
3. **Calendario** de día + grilla de horas disponibles.
4. Formulario mínimo: nombre + teléfono.
5. **Pago demo** (solo visual, muestra total y "pagar abono" simulado).
6. Pantalla de **confirmación** con resumen.

**Vuelta 3 — Móvil primero**
Botones grandes, sin zoom, sin scroll horizontal, pasos claros en celular.
Barra de progreso del wizard (paso 1 de 6).

**Vuelta 4 — Diseño y animaciones**
Transiciones suaves entre pasos, microinteracciones al seleccionar servicio/
barbero/hora, estilo de barbería (oscuro/elegante o clásico). Sin exagerar.

**Vuelta 5 — Lo mínimo de contexto (compacto, NO secciones largas)**
Todo esto en piezas pequeñas, no en scroll infinito:
- Iconos de **redes sociales** (Instagram, TikTok, WhatsApp).
- **Google Maps** embebido pequeño con la ubicación.
- **2–3 reseñas/testimonios** en formato compacto (carrusel o tarjetas chicas).
- **Horario de atención**.
- **3 correos corporativos** inventados (ver abajo).

**Vuelta 6 — Pulido final**
Confirmar que reservar toma < 4 toques, revisar el flujo completo una última
vez en móvil y escritorio, limpiar detalles visuales.

---

## ✅ Definición de terminado (checklist del loop)
- [ ] Se entiende TODO en 5 segundos al entrar.
- [ ] No hay landing larga: nada de secciones "info-info-info".
- [ ] Lo que más destaca visualmente es AGENDAR.
- [ ] Flujo completo funciona: servicios → barbero → hora → datos → pago demo → confirmación.
- [ ] Multi-selección de servicios suma precio y tiempo.
- [ ] 3 barberos seleccionables.
- [ ] Reservar en menos de 4 toques.
- [ ] Perfecto en móvil (sin scroll horizontal, botones grandes).
- [ ] Horario de atención visible.
- [ ] Redes sociales + Google Maps + 2-3 reseñas (compactos).
- [ ] 3 correos corporativos presentes.
- [ ] Animaciones/transiciones suaves entre pasos.

---

## 📌 Datos de ejemplo (inventados, para el demo)

**Barberos:** Alonso · Matías · Cristóbal

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

> ⚠️ Pagos/abonos: solo DEMO visual. Los vínculos reales de pago los conectas tú aparte.
```
