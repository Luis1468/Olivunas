<script>
    import SectionSesion from '../components/SectionSesion.vue'
    import {Search} from 'lucide-vue-next'

    export default {
        components: {
            SectionSesion,
            Search
        },

        data() {
            return {mostrarFormulario: false}
        }
    }
</script>
<template>
    <div class="layout">
        <SectionSesion/>

        <div class="contenido">
            <div class="nuevaFinca">
                <div>
                    <h1>Fincas</h1>
                    <p>Gestiona las fincas de tu explotación.</p>
                </div>

                <button @click="mostrarFormulario = true">
                    + Nueva finca
                </button>
            </div>
            <div class="buscador">
                <Search :size="20" class="icono-buscar"/>
                <input type="text" placeholder="Buscar finca..."/>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Propiedad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td class="bordeIzquierdo">La Loma</td>
                            <td>Propia</td>
                            <td class="bordeDerecho">
                                <button class="buttonEditar">Editar</button>
                                <button class="buttonEliminar">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <p>Tu campo, en orden</p>
            </div>
            <div v-if="mostrarFormulario" class="modal-overlay">
                <div class="modal">
                    <h2>Nueva finca</h2>
                    <form action="">
                        <div>
                        <label for="nombreFinca">Nombre de la finca</label>
                        <input type="text" name="nombreFinca" id="nombreFinca" placeholder="Escibe el nombre de la finca">
                        </div>
                        <div>
                        <p>Tipo de propiedad</p>
                            <input type="radio" id="propiedadPropia" name="propiedad" value="propia">
                            <label for="propiedadPropia">Propia</label>
                            <input type="radio" id="propiedadAjena" name="propiedad" value="ajena">
                            <label for="propiedadAjena">De otra persona</label>
                        </div>
                    </form>

                    <button @click="mostrarFormulario = false">
                        Cancelar
                    </button>
                    <button @click="mostrarFormulario = false">
                        Guardar finca
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped="scoped">
    .layout {
        display: flex;
        min-height: 100vh;
    }

    .contenido {
        flex: 1;
        min-width: 0;
        padding: 2rem;
    }
    .nuevaFinca {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .nuevaFinca button {
        padding: 1rem;
        color: white;
        background-color: var(--color-primary);
        border: none;
        border-radius: 12px;
    }
    .buscador {
        background-color: #FFFF;
        padding: 1rem;
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }

    .icono-buscar {
        position: absolute;
        left: 30px;
        color: #777;
        pointer-events: none;
    }

    .buscador input {
        width: 100%;
        padding: 12px 12px 12px 42px;
        border: 1px solid #ccc;
        border-radius: 10px;
    }
    table {
        margin-top: 2rem;
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        border: 1px solid #E1E4DA;
        border-radius: 12px;
        overflow: hidden;
    }
    td,
    th {
        text-align: left;
    }
    th {
        font-size: 0.8rem;
        border-top: solid 1px #ccc;
        padding: 1.2rem;
        background-color: #F4F6F0;
        color: #72766C;
    }
    td {
        background-color: #FFFFFF;
        border-bottom: 1px solid #E1E4DA;
        padding: 1.5rem 1.2rem;
    }
    td:last-child,
    th:last-child {
        text-align: right;
    }
    td button {
        border-radius: 8px;
        padding: 0.6rem 0.9rem;
    }
    .bordeDerecho {
        border-right: solid 1px #ccc;
    }
    .bordeIzquierdo {
        border-left: solid 1px #ccc;
    }
    th:first-child {
        border-top-left-radius: 10px;
        border-left: solid 1px #ccc;
    }
    th:last-child {
        border-top-right-radius: 10px;
        border-right: solid 1px #ccc;
    }
    .buttonEditar {
        margin-right: 0.4rem;
        background-color: #E8EDE3;
        color: #556B2F;
        font-weight: bold;
    }
    .buttonEliminar {
        border: 1px solid #E1E4DA;
        background-color: #FFFF;
        color: #A14A42;
        font-weight: bold;
    }

.modal-overlay {
    position: fixed;
    inset: 0;

    background-color: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1000;
}

.modal {
    background-color: #FFFFFF;
    border-radius: 12px;
    padding: 2rem;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-sizing: border-box;

    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

</style>