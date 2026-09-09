const STORAGE_KEY = "mi-lista-de-tareas";

const tareasGuardadas = localStorage.getItem(STORAGE_KEY);
let tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : null;

function guardarTareas() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
}

function mostrarTareas() {
    const lista = document.getElementById("listaTareas");
    lista.innerHTML = "";

    tareas.forEach((tarea) => {
        const li = document.createElement("li");
        li.className = "tarea";

        if (tarea.completada) {
            li.classList.add("completada");
        }

        const texto = document.createElement("span");
        texto.textContent = tarea.texto;
        texto.addEventListener("click", () => marcarCompleta(texto));

        const boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = "Eliminar";
        boton.addEventListener("click", () => eliminarTarea(boton));

        li.append(texto, boton);
        lista.appendChild(li);
    });
}

function agregarTarea() {
    const input = document.getElementById("nuevaTarea");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Por favor escribe una tarea");
        input.focus();
        return;
    }

    tareas.push({
        texto,
        completada: false,
    });

    guardarTareas();
    mostrarTareas();
    input.value = "";
    input.focus();
}

function marcarCompleta(elemento) {
    const tarea = elemento.parentElement;
    const indice = [...tarea.parentElement.children].indexOf(tarea);

    tareas[indice].completada = !tareas[indice].completada;
    guardarTareas();
    tarea.classList.toggle("completada");
}

function eliminarTarea(boton) {
    const tarea = boton.parentElement;
    const indice = [...tarea.parentElement.children].indexOf(tarea);

    tareas.splice(indice, 1);
    guardarTareas();
    tarea.remove();
}

document.addEventListener("DOMContentLoaded", () => {
    if (tareas === null) {
        const tareasIniciales = document.querySelectorAll("#listaTareas .tarea");

        tareas = [...tareasIniciales].map((elemento) => ({
            texto: elemento.querySelector("span").textContent,
            completada: elemento.classList.contains("completada"),
        }));

        guardarTareas();
    }

    document.getElementById("nuevaTarea").addEventListener("keypress", (evento) => {
        if (evento.key === "Enter") {
            agregarTarea();
        }
    });

    mostrarTareas();
});