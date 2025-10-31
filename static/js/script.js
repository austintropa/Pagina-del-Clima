// conversion helpers
function celsiusToFahrenheit(c) {
    return Math.round((c * 9 / 5) + 32);
}
function fahrenheitToCelsius(f) {
    return Math.round((f - 32) * 5 / 9);
}

// extra: extrae el número de la string "24°" o "24 °C" devolviendo Number
function extractNumber(text) {
    const m = text.match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : NaN;
}

// actualiza visualmente todos los elementos .p-red y .p-blue según unidad
function updateTemperatures(unit) {
    // usamos el valor base guardado en data-base-c (en °C)
    const temps = document.querySelectorAll(".p-red, .p-blue");
    temps.forEach(el => {
        const baseC = parseFloat(el.dataset.baseC); // base en °C
        if (Number.isNaN(baseC)) return;
        if (unit === "F") {
            el.textContent = celsiusToFahrenheit(baseC) + "°F";
        } else { // "C"
            el.textContent = Math.round(baseC) + "°C";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // 1) Guardar la temperatura base (asumimos que los números actuales son °C)
    const temps = document.querySelectorAll(".p-red, .p-blue");
    temps.forEach(el => {
        const n = extractNumber(el.textContent);
        // si no hay número, dejamos 0 como fallback
        el.dataset.baseC = Number.isNaN(n) ? 0 : n;
    });

    // 2) Ajustar la visual inicial según el select
    const select = document.getElementById("temperature-unit");
    updateTemperatures(select.value);

    // 3) Listener para cambios en el select
    select.addEventListener("change", (e) => {
        updateTemperatures(e.target.value);
    });

    // 4) Si quisieras permitir editar manualmente una temperatura y recalcular la base,
    //    podrías añadir handlers aquí. (No solicitado, lo dejo como comentario.)

    // 5) Cookies: eliminar el banner al hacer click en el botón o en el propio div
    const cookieDiv = document.querySelector(".acept-coockies");
    const cookieBtn = document.getElementById("btn-accept");

    if (cookieBtn) {
        cookieBtn.addEventListener("click", () => {
            cookieDiv.remove();
            // aquí podrías setear localStorage para recordar la aceptación:
            // localStorage.setItem('cookiesAccepted', '1');
        });
    }

    // también permitir quitar si se hace click en cualquier parte del banner
    if (cookieDiv) {
        cookieDiv.addEventListener("click", (e) => {
            // evitar que el click en elementos internos (como enlaces) borre si no quieres,
            // pero como pediste que al hacer click se borre, lo removemos.
            cookieDiv.remove();
        });
    }
});


function cambioCiudad(elemento) {
    alert ("Cambiando ciudad a: " + elemento.textContent);
}