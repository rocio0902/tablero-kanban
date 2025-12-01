#  Tablero Kanban Simple

Un tablero Kanban interactivo y ligero construido con **HTML5, CSS3 y JavaScript Vanilla**. Permite gestionar tareas a través de un flujo de trabajo visual con funcionalidad "Drag and Drop" (arrastrar y soltar).

##  Características

* **Gestión Visual:** Columnas para tareas "Por Hacer", "En Progreso" y "Terminado".
* **Drag & Drop:** Arrastra las tarjetas intuitivamente entre columnas.
* **Persistencia de Datos:** Las tareas se guardan automáticamente en el `localStorage` del navegador, por lo que no se pierden al recargar.
* **Gestión de Tareas:**
    * Creación de nuevas tareas mediante un formulario modal.
    * Campos para título, descripción y estado inicial.
* **Diseño Responsivo:** Adaptable a diferentes anchos de pantalla con desplazamiento horizontal.

##  Estructura del Proyecto

El proyecto sigue una estructura semántica simple:

```
/
├── index.html        # Estructura principal y contenedores
├── server.py         # Servidor HTTP simple en Python para desarrollo
├── styles/
│   └── main.css      # Estilos del tablero, tarjetas y animaciones
└── scripts/
    └── main.js       # Lógica de renderizado, DnD y manejo de datos
```

##  Instalación y Uso

No necesitas instalar dependencias complejas de Node.js.

### 1. Clona el repositorio:

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd <NOMBRE_DEL_DIRECTORIO>
```

### 2. Ejecuta el servidor local:

El proyecto incluye un script de Python para servir los archivos estáticos correctamente.

```bash
python server.py
```

### 3. Abre el navegador:

Visita `http://localhost:8000` para ver el tablero en acción.

##  Uso

1. **Crear una tarea:** Haz clic en el botón "Nueva Tarea" y completa el formulario.
2. **Mover tareas:** Arrastra las tarjetas entre columnas para cambiar su estado.
3. **Persistencia:** Todas las tareas se guardan automáticamente en tu navegador.

##  Tecnologías Utilizadas

* **HTML5** - Estructura semántica
* **CSS3** - Diseño responsivo y animaciones
* **JavaScript Vanilla** - Lógica de aplicación sin frameworks
* **LocalStorage API** - Persistencia de datos en el cliente

##  Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
---