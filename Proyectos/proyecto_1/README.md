# Calculadora de Ahorro

**Calculadora de ahorro mensual y proyección de metas financieras**

## Descripción

Esta aplicación web permite calcular el ahorro mensual disponible y proyectar el tiempo necesario para alcanzar metas de ahorro financieras. Ideal para planificación personal y control de finanzas.

## Caracteristicas

- **Calculo de ahorro mensual**: Obtienes rapidamente cuanto puedes ahorrar segun tus ingresos y gastos
- **Calculo de meses para meta**: Visualiza cuantos meses necesitas para alcanzar tu meta
- **Porcentaje de ahorro**: Conoce que porcentaje de tu ingreso representan tus ahorros
- **Historial de calculos**: Guarda y revisa tus ultimos 10 calculos
- **Validacion completa**: Todos los campos estan validados para evitar errores

## Uso

1. Abre `index.html` en tu navegador
2. Ingresa tu ahorro actual
3. Ingresa tus ingresos y gastos mensuales
4. Define tu meta de ahorro
5. Haz clic en "Calcular" para ver los resultados

## Estructura del Proyecto

```
proyecto_1/
├── index.html          # Estructura HTML semántica
├── css/
│   └── style.css       # Estilos CSS responsive
├── js/
│   ├── app.js          # Lógica principal de la aplicación
│   ├── validaciones.js # Módulo de validación de entradas
│   └── pruebas.js      # Pruebas unitarias con console.assert()
└── README.md           # Este archivo
```

## Tecnologías

- **HTML5** con etiquetas semánticas (header, nav, main, footer)
- **CSS3** con variables CSS, Flexbox y CSS Grid
- **JavaScript ES6** modular y documentado con JSDoc

## Estándares Aplicados

| Estándar | Descripción |
|----------|-------------|
| HTML Semántico | Uso de `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` |
| Nomenclatura | camelCase para variables, PascalCase para constructores |
| DRY | Código modular con funciones reutilizables |
| KISS | Funciones simples y directas |
| YAGNI | Solo funcionalidad necesaria |
| JSDoc | Todas las funciones documentadas |
| Validación | Módulo de validaciones completo |
| Pruebas | console.assert() para funciones principales |
| Seguridad | textContent en lugar de innerHTML para datos del usuario |

## Ejecutar Pruebas

Abre la consola del navegador (F12) y ejecuta:

```javascript
ejecutarPruebas();
```

## Responsive Design

La aplicación es completamente responsive y se adapta a:
- Móviles (≤480px)
- Tablets (768px - 1024px)
- Escritorios (>1024px)

## Seguridad

- Todos los datos de usuario se escapan antes de insertarlos en el DOM
- Uso de `textContent` para prevenir ataques XSS
- Validación estricta de todos los inputs del formulario

## Licencia

Este proyecto es software libre bajo licencia MIT.

---

**Autor**: Proyecto Estandares  
**Versión**: 1.0.0  
**Fecha**: 2026
