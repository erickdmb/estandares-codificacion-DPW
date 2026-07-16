#  Lista de Tareas

**Gestor de tareas con prioridades y fechas límite**

## Descripción

Aplicación web para gestionar tareas personales con sistema de prioridades, categorías, fechas límite y filtros avanzados.

## Características

- **3 niveles de prioridad**: Alta, Media, Baja
- **5 categorías**: General, Trabajo, Personal, Estudio, Compras
- **Fechas límite** con indicador de vencidas
- **Filtrado** por estado y prioridad
- **Ordenamiento** por fecha, prioridad o fecha límite
- **Edición inline** de tareas
- **Persistencia** en localStorage

## Estructura

```
proyecto_4/
├── index.html
├── css/style.css
├── js/
│   ├── app.js
│   ├── validaciones.js
│   └── pruebas.js
└── README.md
```

## Estándares Aplicados

- HTML semántico (header, main, section, article)
- CSS responsive con variables CSS
- JavaScript modular
- JSDoc documentación completa
- Validación de inputs
- Pruebas con console.assert()
- textContent para seguridad XSS

## Uso

1. Abre `index.html`
2. Agrega una tarea con título, prioridad y categoría
3. Marca como completada con el checkbox
4. Usa filtros para organizar tu vista
5. ¡Listo!

---

**Versión**: 1.0.0 | **Fecha**: 2026
