# Calculadora de IMC

**Calcula tu Índice de Masa Corporal de forma rápida y precisa**

## Descripción

Aplicación web que calcula el IMC (Índice de Masa Corporal) según los estándares de la OMS, incluyendo clasificación, peso ideal y rango de peso saludable.

## Características

- **Cálculo preciso** del IMC con fórmula estándar
- **Clasificación OMS**: Bajo peso, Normal, Sobrepeso, Obesidad I, II, III
- **Peso ideal** basado en IMC de 22
- **Rango de peso saludable** (IMC 18.5-24.9)
- **Historial** de cálculos guardados
- **Validación completa** de todos los campos
- **Diseño visual** con colores por categoría

## Estructura

```
proyecto_5/
├── index.html
├── css/style.css
├── js/
│   ├── app.js
│   ├── validaciones.js
│   └── pruebas.js
└── README.md
```

## Estándares Aplicados

- HTML semántico (header, main, section, article, footer)
- CSS responsive con variables CSS
- JavaScript modular (app.js, validaciones.js, pruebas.js)
- JSDoc en todas las funciones
- Validación completa de inputs
- Pruebas con console.assert()
- textContent para seguridad XSS

## Clasificaciones OMS

| Categoría | IMC (kg/m²) |
|-----------|-------------|
| Bajo peso | < 18.5 |
| Peso normal | 18.5 - 24.9 |
| Sobrepeso | 25 - 29.9 |
| Obesidad I | 30 - 34.9 |
| Obesidad II | 35 - 39.9 |
| Obesidad III | ≥ 40 |

## Uso

1. Abre `index.html`
2. Ingresa tu peso en kg
3. Ingresa tu altura en cm
4. Selecciona tu sexo
5. ¡Listo! Ve tu IMC y clasificación

---

**Versión**: 1.0.0 | **Fecha**: 2026
