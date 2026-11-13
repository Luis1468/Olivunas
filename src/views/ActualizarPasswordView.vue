
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()

const nuevaPassword = ref('')
const confirmarPassword = ref('')

const errorPassword = ref('')
const mensajeExito = ref('')

const comprobando = ref(true)
const sesionValida = ref(false)
const cargando = ref(false)

// Comprobar que Supabase ha establecido una sesión
// después de abrir el enlace de recuperación
onMounted(async () => {
    const { data, error } = await supabase.auth.getSession()

    sesionValida.value = !error && !!data.session
    comprobando.value = false
})

// Actualizar la contraseña
async function actualizarPassword() {
    errorPassword.value = ''
    mensajeExito.value = ''

    if (!sesionValida.value) {
        errorPassword.value = 'El enlace no es válido o ha caducado.'
        return
    }

    if (nuevaPassword.value !== confirmarPassword.value) {
        errorPassword.value = 'Las contraseñas no coinciden.'
        return
    }

    if (nuevaPassword.value.length < 8) {
        errorPassword.value = 'La contraseña debe tener al menos 8 caracteres.'
        return
    }

    cargando.value = true

    try {
        const { error } = await supabase.auth.updateUser({
            password: nuevaPassword.value
        })

        if (error) {
            errorPassword.value =
                'No se ha podido actualizar la contraseña. Inténtalo de nuevo.'
            return
        }

        mensajeExito.value = 'Contraseña actualizada correctamente.'

        // Cerramos la sesión para iniciar con la nueva contraseña
        const { error: errorSalida } = await supabase.auth.signOut()

        if (errorSalida) {
            errorPassword.value =
                'Contraseña cambiada, pero no se ha podido cerrar la sesión.'
            return
        }

        await router.push('/login')

    } catch (error) {
        console.error('Error al actualizar la contraseña:', error)
        errorPassword.value = 'Ha ocurrido un error de conexión.'
    } finally {
        cargando.value = false
    }
}
</script>

<template>
    <section class="actualizar-password">
        <h2>Establecer nueva contraseña</h2>

        <p>
            Introduce tu nueva contraseña para recuperar
            el acceso a Olivunas.
        </p>

        <p v-if="comprobando">
            Comprobando sesión...
        </p>

        <template v-else-if="!sesionValida">
            <p class="mensaje-error" role="alert">
                No hay una sesión válida para cambiar la contraseña.
                Solicita un nuevo enlace de recuperación.
            </p>

            <RouterLink to="/recuperar-password">
                Solicitar otro enlace
            </RouterLink>
        </template>

        <form v-else @submit.prevent="actualizarPassword">
            <div class="form-group">
                <label for="nueva-password">
                    Nueva contraseña
                </label>

                <input
                    type="password"
                    id="nueva-password"
                    v-model="nuevaPassword"
                    autocomplete="new-password"
                    minlength="8"
                    required
                />
            </div>

            <div class="form-group">
                <label for="confirmar-password">
                    Confirmar contraseña
                </label>

                <input
                    type="password"
                    id="confirmar-password"
                    v-model="confirmarPassword"
                    autocomplete="new-password"
                    minlength="8"
                    required
                />
            </div>

            <p v-if="errorPassword" class="mensaje-error" role="alert">
                {{ errorPassword }}
            </p>

            <p v-if="mensajeExito" class="mensaje-exito" role="status">
                {{ mensajeExito }}
            </p>

            <button type="submit" :disabled="cargando">
                {{ cargando ? 'Guardando...' : 'Cambiar contraseña' }}
            </button>
        </form>
    </section>
</template>

<style scoped>
.actualizar-password {
    width: 90%;
    max-width: 500px;
    margin: 5rem auto;
    padding: 2.5rem;
    box-sizing: border-box;

    background-color: var(--color-background-text);
    border-radius: 15px;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25);
}

.actualizar-password h2 {
    margin-top: 0;
    color: var(--color-button);
}

.actualizar-password > p {
    margin-bottom: 1.5rem;
    color: var(--color-dark);
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.4rem;
    color: var(--color-dark);
}

.form-group input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.7rem;
    border: none;
    border-radius: 10px;
    background-color: var(--color-button);
    font: inherit;
}

.actualizar-password button {
    width: 100%;
    padding: 0.8rem;
    margin-top: 0.5rem;
    border: none;
    border-radius: 12px;
    background-color: var(--color-button);
    cursor: pointer;
    font: inherit;
}

.actualizar-password button:disabled {
    opacity: 0.6;
    cursor: wait;
}

.mensaje-error {
    padding: 0.7rem;
    border-radius: 8px;
    background-color: #FCE8E8;
    color: #A61B1B;
}

.mensaje-exito {
    padding: 0.7rem;
    border-radius: 8px;
    background-color: #E3F3E5;
    color: #245C35;
}
</style>
