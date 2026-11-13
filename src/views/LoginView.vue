<script setup="setup">
    import {ref} from 'vue'
    import {supabase} from '../lib/supabase'
    import {useRouter} from 'vue-router'

    const modo = ref('login')

    const loginEmail = ref('')
    const loginPassword = ref('')

    const registerName = ref('')
    const registerEmail = ref('')
    const registerPassword = ref('')
    const registerConfirmPassword = ref('')
    const registerTerms = ref(false)
    const mostrarPassword = ref(false)

    const errorLogin = ref('')
    const errorRegistro = ref('')

    const router = useRouter()

    async function iniciarSesion() {
        errorLogin.value = ''

        try {
            const {data, error} = await supabase
                .auth
                .signInWithPassword({email: loginEmail.value, password: loginPassword.value})

            if (error) {
                if (error.code === 'invalid_credentials') {
                    errorLogin.value = 'Correo o contraseña incorrectos'
                } else if (error.code === 'email_not_confirmed') {
                    errorLogin.value = 'Debes confirmar tu correo electrónico'
                } else {
                    errorLogin.value = 'No se ha podido iniciar sesión. Inténtalo de nuevo.'
                }

                return
            }

            console.log('Inicio de sesión correcto')
            console.log('Usuario:', data.user.email)
            await router.push('/dashboard')

        } catch (error) {
            console.error('Error de conexión:', error)
            errorLogin.value = 'No se ha podido conectar con el servidor'
        }
    }

    async function registrarUsuario() {
        errorRegistro.value = ''

        if (registerPassword.value !== registerConfirmPassword.value) {
            errorRegistro.value = 'Las contraseñas no coinciden'
            return
        }

        if (!registerTerms.value) {
            errorRegistro.value = 'Debes aceptar los términos y condiciones'
            return
        }

        try {
            const {data, error} = await supabase
                .auth
                .signUp({
                    email: registerEmail.value,
                    password: registerPassword.value,
                    options: {
                        data: {
                            nombre: registerName.value
                        }
                    }
                })

            if (error) {
                if (error.code === 'over_email_send_rate_limit') {
                    errorRegistro.value = 'Espera un momento antes de volver a intentarlo.'
                } else if (error.code === 'weak_password') {
                    errorRegistro.value = 'La contraseña no cumple los requisitos de seguridad.'
                } else {
                    errorRegistro.value = 'No se ha podido completar el registro. Inténtalo de nuevo.'
                }

                return
            }

            console.log('Solicitud de registro completada')
            console.log(
                'ID de usuario:',
                data.user
                    ?.id
            )

        } catch (error) {
            console.error('Error de conexión:', error)
            errorRegistro.value = 'No se ha podido conectar con el servidor'
        }
    }
</script>
<template>
    <section class="login">
        <div class="botones_form">
            <button
                type="button"
                :class="{ activo: modo === 'login' }"
                @click="modo = 'login'">
                Iniciar sesión
            </button>
            <button
                type="button"
                :class="{ activo: modo === 'registro' }"
                @click="modo = 'registro'">
                Regístrate
            </button>
        </div>
        <div v-if="modo === 'login'" class="inicie_sesion">
            <h2>Bienvenido de nuevo</h2>
            <p>Accede a tu cuenta Olivunas</p>
            <form @submit.prevent="iniciarSesion">
                <div class="form-group">
                    <label for="login-email">Correo electrónico</label>
                    <input
                        type="email"
                        id="login-email"
                        v-model="loginEmail"
                        placeholder="tu@email.com"
                        autocomplete="email"
                        required="required"/>
                </div>
                <div class="form-group">
                    <label for="login-password">Contraseña</label>
                    <input
                        :type="mostrarPassword ? 'text' : 'password'"
                        id="login-password"
                        v-model="loginPassword"
                        placeholder="********"
                        autocomplete="current-password"
                        required="required"/>
                </div>
                <div class="form-checkbox">
                    <input type="checkbox" id="login-show-password" v-model="mostrarPassword"/>
                    <label for="login-show-password">
                        Mostrar contraseña
                    </label>
                </div>
                <p v-if="errorLogin" class="mensaje-error" role="alert">
                    {{ errorLogin }}
                </p>

                <button type="submit" class="boton-submit">
                    Iniciar sesión
                </button>
                <p class="enlace-recuperar">
                    <RouterLink to="/recuperar-password">
                     ¿Olvidaste tu contraseña?
                    </RouterLink>
                </p>
            </form>
        </div>
        <div v-else class="registrate">
            <h2>Crea tu cuenta</h2>
            <p>Empieza a gestionar tu explotación de forma sencilla</p>

            <form @submit.prevent="registrarUsuario">
                <div class="form-group">
                    <label for="register-name">Nombre</label>
                    <input
                        type="text"
                        id="register-name"
                        v-model="registerName"
                        placeholder="Tu nombre completo"
                        autocomplete="name"
                        required="required"/>
                </div>
                <div class="form-group">
                    <label for="register-email">Correo electrónico</label>
                    <input
                        type="email"
                        id="register-email"
                        v-model="registerEmail"
                        placeholder="tu@email.com"
                        autocomplete="email"
                        required="required"/>
                </div>
                <div class="form-group">
                    <label for="register-password">Contraseña</label>
                    <input
                        type="password"
                        id="register-password"
                        v-model="registerPassword"
                        placeholder="********"
                        autocomplete="new-password"
                        required="required"/>
                </div>
                <div class="form-group">
                    <label for="register-confirm-password">
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        id="register-confirm-password"
                        v-model="registerConfirmPassword"
                        placeholder="********"
                        autocomplete="new-password"
                        required="required"/>

                    <p v-if="errorRegistro" class="mensaje-error" role="alert">
                        {{ errorRegistro }}
                    </p>

                </div>
                <div class="form-checkbox">
                    <input
                        type="checkbox"
                        id="register-terms"
                        v-model="registerTerms"
                        required="required"/>
                    <label for="register-terms">
                        Acepto los términos y condiciones
                    </label>
                </div>
                <button type="submit" class="boton-submit">
                    Crear cuenta
                </button>
                <p class="enlace-login">
                    ¿Ya tienes una cuenta?
                    <a href="#" @click.prevent="modo = 'login'">
                        Iniciar sesión
                    </a>
                </p>
            </form>
        </div>
    </section>
</template>

<style scoped="scoped">
    .login {
        width: 90%;
        max-width: 900px;
        margin: 5rem auto;
        padding: 2.5rem;
        background-color: var(--color-background-text);
        border-radius: 15px;
        box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25);
        box-sizing: border-box;
    }
    .botones_form {
        display: flex;
        gap: 0.5rem;
        padding: 0 2rem;
    }
    .botones_form button {
        flex: 1;
        min-width: 0;
        padding: 0.6rem;
        background-color: var(--color-button);
        color: var(--color-dark);
        border: none;
        border-radius: 15px;
        cursor: pointer;
    }
    .botones_form button.activo {
        background-color: var(--color-button);
        opacity: 1;
        font-weight: bold;
    }

    .botones_form button:not(.activo) {
        background-color: var(--color-button);
        opacity: 0.6;
    }
    .inicie_sesion,
    .registrate {
        padding: 2rem;
        text-align: left;
    }
    .inicie_sesion h2,
    .registrate h2 {
        margin: 0;
        color: var(--color-button);
        font-size: 1.5rem;
    }
    .inicie_sesion > p,
    .registrate > p {
        margin: 0 0 1rem;
        color: var(--color-button);
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
        display: block;
        width: 100%;
        padding: 0.65rem;
        background-color: var(--color-button);
        border: 1px solid transparent;
        border-radius: 10px;
        box-sizing: border-box;
        font: inherit;
    }
    .form-group input:focus {
        outline: 2px solid var(--color-dark);
        outline-offset: 2px;
    }
    .form-checkbox {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    .form-checkbox input {
        width: auto;
        margin: 0;
        cursor: pointer;
        accent-color: var(--color-dark);
    }
    .form-checkbox label {
        color: var(--color-dark);
        cursor: pointer;
        font-size: 0.9rem;
    }

    .mensaje-error {
        color: #A61B1B;
        background-color: #FCE8E8;
        border: 1px solid #E9A8A8;
        border-radius: 8px;

        padding: 0.7rem;
        margin: 0.5rem 0 1rem;
        font-size: 0.9rem;
    }

    .boton-submit {
        width: 100%;
        padding: 0.7rem;

        background-color: var(--color-button);
        color: var(--color-dark);
        border: none;
        border-radius: 15px;
        cursor: pointer;
        font: inherit;
    }
    .boton-submit:hover {
        opacity: 0.85;
    }
    .enlace-login,
    .enlace-recuperar {
        margin-top: 1rem;
        text-align: center;
        color: var(--color-button);
        font-size: 0.9rem;
    }
    .enlace-login a,
    .enlace-recuperar a {
        color: inherit;
        text-decoration: underline;
    }
    .enlace-login a:hover,
    .enlace-recuperar a:hover {
        opacity: 0.8;
    }
</style>