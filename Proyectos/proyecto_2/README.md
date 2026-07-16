# Gestor de Gastos

**Aplicación web para registrar y categorizar tus gastos personales**

## Descripción

Gestor de gastos personales que permite registrar, categorizar y visualizar tus finanzas de forma intuitiva. Incluye persistencia en localStorage.

## Características

- **Registro de gastos** con descripción, monto, categoría y fecha
- **7 categorías** predefinidas: Alimentación, Transporte, Entretenimiento, Salud, Educación, Servicios, Otros
- **Resumen financiero** por categoría y total
- **Filtros** por categoría
- **Edicion y eliminacion** de gastos individuales
- **Persistencia** en localStorage

## Estructura

```
proyecto_2/
├── index.html
├── css/style.css
├── js/
│   ├── app.js
│   ├── validaciones.js
│   └── pruebas.js
└── README.md
```

## Estándares Aplicados

- HTML semántico (header, nav, main, footer, section, article)
- CSS responsive con variables CSS
- JavaScript modular (app.js, validaciones.js, pruebas.js)
- camelCase y PascalCase
- DRY, KISS, YAGNI
- JSDoc en todas las funciones
- Validación completa de inputs
- Pruebas con console.assert()
- Seguridad: textContent en lugar de innerHTML

## Uso

1. Abre `index.html` en tu navegador
2. Completa el formulario de gasto
3. Visualiza el resumen y la lista
4. Usa filtros para buscar por categoria

---

**Versión**: 1.0.0 | **Fecha**: 2026
