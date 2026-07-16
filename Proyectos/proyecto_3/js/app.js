/**
 * @fileoverview Aplicación principal del Conversor de Unidades
 */
const ConversorUnidades = {
    /** Definición de todas las unidades y sus factores de conversión a la unidad base */
    unidades: {
        longitud: {
            nombre: 'Longitud',
            base: 'm',
            unidades: {
                mm: { nombre: 'Milímetro', factor: 0.001 },
                cm: { nombre: 'Centímetro', factor: 0.01 },
                m: { nombre: 'Metro', factor: 1 },
                km: { nombre: 'Kilómetro', factor: 1000 },
                pulgada: { nombre: 'Pulgada', factor: 0.0254 },
                pie: { nombre: 'Pie', factor: 0.3048 },
                yarda: { nombre: 'Yarda', factor: 0.9144 },
                milla: { nombre: 'Milla', factor: 1609.34 }
            }
        },
        peso: {
            nombre: 'Peso',
            base: 'kg',
            unidades: {
                mg: { nombre: 'Miligramo', factor: 0.000001 },
                g: { nombre: 'Gramo', factor: 0.001 },
                kg: { nombre: 'Kilogramo', factor: 1 },
                lb: { nombre: 'Libra', factor: 0.453592 },
                oz: { nombre: 'Onza', factor: 0.0283495 },
                ton: { nombre: 'Tonelada', factor: 1000 }
            }
        },
        temperatura: {
            nombre: 'Temperatura',
            base: 'C',
            unidades: {
                C: { nombre: 'Celsius' },
                F: { nombre: 'Fahrenheit' },
                K: { nombre: 'Kelvin' }
            }
        },
        volumen: {
            nombre: 'Volumen',
            base: 'L',
            unidades: {
                mL: { nombre: 'Mililitro', factor: 0.001 },
                L: { nombre: 'Litro', factor: 1 },
                gal: { nombre: 'Galón', factor: 3.78541 },
                pinta: { nombre: 'Pinta', factor: 0.473176 },
                taza: { nombre: 'Taza', factor: 0.236588 }
            }
        }
    },

    categoriaActual: 'longitud',

    init() {
        console.log('Inicializando Conversor de Unidades...');
        this.configurarEventos();
        this.cambiarCategoria('longitud');
    },

    configurarEventos() {
        // Botones de categoría
        document.querySelectorAll('.nav__link[data-categoria]').forEach(btn => {
            btn.addEventListener('click', () => this.cambiarCategoria(btn.dataset.categoria));
        });

        // Entrada de valor
        document.getElementById('valorEntrada').addEventListener('input', () => this.convertir());

        // Selects de unidad
        document.getElementById('unidadOrigen').addEventListener('change', () => this.convertir());
        document.getElementById('unidadDestino').addEventListener('change', () => this.convertir());

        // Botón invertir
        document.getElementById('btnInvertir').addEventListener('click', () => this.invertirUnidades());
    },

    /**
     * Cambia la categoría de conversión
     * @param {string} categoria 
     */
    cambiarCategoria(categoria) {
        this.categoriaActual = categoria;
        const datos = this.unidades[categoria];

        // Actualizar botones de navegación
        document.querySelectorAll('.nav__link[data-categoria]').forEach(btn => {
            btn.classList.toggle('nav__link--active', btn.dataset.categoria === categoria);
        });

        // Actualizar título
        document.getElementById('tituloCategoria').textContent = `Conversor de ${datos.nombre}`;

        // Poblar selects
        this.poblarSelectores(datos.unidades);

        // Renderizar tabla de referencia
        this.renderizarTablaReferencia(datos);

        // Limpiar resultado
        document.getElementById('valorEntrada').value = '';
        document.getElementById('valorSalida').value = '';
        document.getElementById('infoConversion').innerHTML = '';
    },

    /**
     * Llena los selectores con las unidades disponibles
     * @param {Object} unidades 
     */
    poblarSelectores(unidades) {
        const selectOrigen = document.getElementById('unidadOrigen');
        const selectDestino = document.getElementById('unidadDestino');

        selectOrigen.innerHTML = '';
        selectDestino.innerHTML = '';

        for (const [clave, datos] of Object.entries(unidades)) {
            selectOrigen.innerHTML += `<option value="${clave}">${datos.nombre} (${clave})</option>`;
            selectDestino.innerHTML += `<option value="${clave}">${datos.nombre} (${clave})</option>`;
        }

        // Seleccionar diferentes por defecto
        const claves = Object.keys(unidades);
        if (claves.length > 1) {
            selectDestino.selectedIndex = 1;
        }
    },

    /**
     * Realiza la conversión
     */
    convertir() {
        const valor = document.getElementById('valorEntrada').value;
        const unidadOrigen = document.getElementById('unidadOrigen').value;
        const unidadDestino = document.getElementById('unidadDestino').value;
        const salida = document.getElementById('valorSalida');

        if (!valor || !ValidadorUnidades.validarNumero(valor)) {
            salida.value = '';
            document.getElementById('infoConversion').innerHTML = '';
            return;
        }

        const resultado = this.convertirValor(parseFloat(valor), this.categoriaActual, unidadOrigen, unidadDestino);
        salida.value = resultado.toFixed(6).replace(/\.?0+$/, '');

        this.mostrarInfoConversion(parseFloat(valor), unidadOrigen, resultado, unidadDestino);
    },

    /**
     * Convierte un valor entre unidades
     * @param {number} valor 
     * @param {string} categoria 
     * @param {string} desde 
     * @param {string} hasta 
     * @returns {number}
     */
    convertirValor(valor, categoria, desde, hasta) {
        if (desde === hasta) return valor;

        const datos = this.unidades[categoria];

        // Manejo especial para temperatura
        if (categoria === 'temperatura') {
            return this.convertirTemperatura(valor, desde, hasta);
        }

        // Conversión a través de la unidad base
        const aBase = valor * datos.unidades[desde].factor;
        return aBase / datos.unidades[hasta].factor;
    },

    /**
     * Conversión especial para temperaturas
     * @param {number} valor 
     * @param {string} desde 
     * @param {string} hasta 
     * @returns {number}
     */
    convertirTemperatura(valor, desde, hasta) {
        // Primero a Celsius
        let celsius;
        switch (desde) {
            case 'C': celsius = valor; break;
            case 'F': celsius = (valor - 32) * 5/9; break;
            case 'K': celsius = valor - 273.15; break;
        }

        // Luego de Celsius a destino
        switch (hasta) {
            case 'C': return celsius;
            case 'F': return celsius * 9/5 + 32;
            case 'K': return celsius + 273.15;
        }
    },

    /**
     * Alias para usar en pruebas
     */
    convertirParaPruebas(valor, categoria, desde, hasta) {
        return this.convertirValor(valor, categoria, desde, hasta);
    },

    /**
     * Muestra información de la conversión
     */
    mostrarInfoConversion(valor, desde, resultado, hasta) {
        const datos = this.unidades[this.categoriaActual];
        const panel = document.getElementById('infoConversion');
        panel.innerHTML = `
            <p class="info-panel__title">Equivalencia</p>
            <p class="info-panel__value">${valor} ${datos.unidades[desde].nombre} = ${resultado.toFixed(4)} ${datos.unidades[hasta].nombre}</p>
        `;
    },

    /**
     * Invierte las unidades de origen y destino
     */
    invertirUnidades() {
        const origen = document.getElementById('unidadOrigen');
        const destino = document.getElementById('unidadDestino');
        const temp = origen.value;
        origen.value = destino.value;
        destino.value = temp;
        this.convertir();
    },

    /**
     * Renderiza la tabla de referencia rápida
     * @param {Object} datosCategoria 
     */
    renderizarTablaReferencia(datosCategoria) {
        const contenedor = document.getElementById('tablaReferencia');
        const esTemperatura = this.categoriaActual === 'temperatura';

        if (esTemperatura) {
            contenedor.innerHTML =
                '<table><thead><tr><th>De \ A</th><th>Celsius</th><th>Fahrenheit</th><th>Kelvin</th></tr></thead><tbody>' +
                '<tr><td>Celsius</td><td>-</td><td>C x 9/5 + 32</td><td>C + 273.15</td></tr>' +
                '<tr><td>Fahrenheit</td><td>(F - 32) x 5/9</td><td>-</td><td>(F - 32) x 5/9 + 273.15</td></tr>' +
                '<tr><td>Kelvin</td><td>K - 273.15</td><td>(K - 273.15) x 9/5 + 32</td><td>-</td></tr>' +
                '</tbody></table>';
            return;
        }

        const unidades = Object.entries(datosCategoria.unidades);
        const [refClave, refDatos] = unidades[0];

        let html = '<table><thead><tr><th>Unidad</th><th>Equivale a ' + refDatos.nombre + '</th></tr></thead><tbody>';

        for (const [clave, datos] of unidades) {
            const conversion = datos.factor ? (datos.factor / refDatos.factor).toFixed(4) : '-';
            html += '<tr><td>' + datos.nombre + ' (' + clave + ')</td><td>' + conversion + '</td></tr>';
        }

        html += '</tbody></table>';
        contenedor.innerHTML = html;
    }
};

document.addEventListener('DOMContentLoaded', () => ConversorUnidades.init());
