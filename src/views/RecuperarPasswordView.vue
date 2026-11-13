
<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const email = ref('')
const errorRecuperacion = ref('')
const mensajeExito = ref('')
const cargando = ref(false)

async function recuperarPassword() {
    errorRecuperacion.value = ''
    mensajeExito.value = ''
    cargando.value = true

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(
            email.value,
            {
                redirectTo: `${window.location.origin}/actualizar-password`
            }
        )

        if (error) {
            errorRecuperacion.value =
                'No se ha podido enviar el correo. Inténtalo de nuevo.'
            return
        }

        mensajeExito.value =
            'Si existe una cuenta con ese correo, recibirás un enlace para recuperar tu contraseña.'

    } catch (error) {
        console.error('Error de recuperación:', error)
        errorRecuperacion.value =
            'No se ha podido conectar con el servidor.'
    } finally {
        cargando.value = false
    }
}
</script>

<template>
    <section class="recuperacion">
        <h2>Recuperar contraseña</h2>

        <p>
            Introduce tu correo electrónico y te enviaremos
            un enlace para restablecer tu contraseña.
        </p>

        <form @submit.prevent="recuperarPassword">
            <div class="form-group">
                <label for="recuperar-email">
                    Correo electrónico
                </label>

                <input
                    type="email"
                    id="recuperar-email"
                    v-model="email"
                    placeholder="tu@email.com"
                    autocomplete="email"
                    required
                />
            </div>

            <p v-if="errorRecuperacion" class="mensaje-error" role="alert">
                {{ errorRecuperacion }}
            </p>

            <p v-if="mensajeExito" class="mensaje-exito" role="status">
                {{ mensajeExito }}
            </p>

            <button type="submit" :disabled="cargando">
                {{ cargando ? 'Enviando...' : 'Enviar enlace' }}
            </button>
        </form>

        <RouterLink to="/login" class="volver-login">
            Volver al inicio de sesión
        </RouterLink>
    </section>
</template>

<style scoped>
.recuperacion {
    width: 90%;
    max-width: 500px;
    margin: 5rem auto;
    padding: 2.5rem;
    box-sizing: border-box;
    border-radius: 15px;
    background-color: var(--color-background-text);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25);
}

.recuperacion h2 {
    margin-top: 0;
    color: var(--color-button);
}

.recuperacion p {
    color: var(--color-dark);
}

.form-group {
    margin: 1.5rem 0;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
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

.recuperacion button {
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 12px;
    background-color: var(--color-button);
    cursor: pointer;
    font: inherit;
}

.recuperacion button:disabled {
    opacity: 0.6;
    cursor: wait;
}

.mensaje-error {
    padding: 0.7rem;
    border-radius: 8px;
    color: #A61B1B !important;
    background-color: #FCE8E8;
}

.mensaje-exito {
    padding: 0.7rem;
    border-radius: 8px;
    color: #245C35 !important;
    background-color: #E3F3E5;
}

.volver-login {
    display: block;
    margin-top: 1.5rem;
    text-align: center;
    color: var(--color-dark);
}
</style>
