document.addEventListener("DOMContentLoaded", function() {
    var presupuesto = 0;
    var gastos = [];
    var saldo = 0;

    document.getElementById("btn-calcular").addEventListener("click", function() {
        presupuesto = parseInt(document.getElementById("inputPresupuesto").value);
        document.getElementById("mostrarPresupuesto").setAttribute("data-value", presupuesto);
        document.getElementById("mostrarPresupuesto").innerHTML = "$" + presupuesto.toLocaleString('es-CL') + ".-";

        document.getElementById("inputPresupuesto").value = "";
        actualizarSaldo();
    });

    function actualizarSaldo() {
        var totalGastos = 0;
        gastos.forEach(function(gasto) {
            totalGastos += gasto.monto;
        });
        saldo = presupuesto - totalGastos;
        document.getElementById("mostrarGastos").innerHTML = "$" + totalGastos.toLocaleString('es-CL') + ".-";
        document.getElementById("mostrarSaldo").innerHTML = "$" + saldo.toLocaleString('es-CL') + ".-";
    }

    document.getElementById("btn-gastos").addEventListener("click", function() {
        var nombreGasto = document.getElementById("nombreGasto").value.trim();
        var montoGastado = parseInt(document.getElementById("montoGastado").value);

        if (nombreGasto === "") {
            alert("Por favor, ingrese un nombre de gasto válido.");
        } else if (isNaN(montoGastado) || montoGastado <= 0) {
            alert("Por favor, ingrese un monto de gasto válido mayor a 0.");
        } else if (montoGastado > presupuesto) {
            alert("El monto del gasto no puede superar el presupuesto.");
        } else if (montoGastado > saldo) {
            alert("El monto del gasto no puede superar el saldo actual.");
        } else {
            gastos.push({ nombre: nombreGasto, monto: montoGastado });
            actualizarSaldo();
            document.getElementById("nombreGasto").value = "";
            document.getElementById("montoGastado").value = "";
            agregarGasto(nombreGasto, montoGastado);
        }
    });

    function agregarGasto(nombre, monto) {
        var nuevoGasto = document.createElement("ul");
        nuevoGasto.classList.add("list-group-item");
        var fila = document.createElement("div");
        fila.classList.add("row");
        var nombreGasto = document.createElement("div");
        nombreGasto.classList.add("col", "col-4", "fw-normal", "align-items-center");
        nombreGasto.textContent = nombre;
        var montoGasto = document.createElement("div");
        montoGasto.classList.add("col", "col-3", "m-0", "align-items-center");
        montoGasto.textContent = "$" + monto.toLocaleString('es-CL') + ".-";
    
    }
});

// INCOMPLETO