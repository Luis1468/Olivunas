<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()

const usuario = ref(null)

let authSubscription = null

onMounted(() => {
    const { data } = supabase.auth.onAuthStateChange(
        (_event, session) => {
            usuario.value = session?.user ?? null
        }
    )

    authSubscription = data.subscription
})

onUnmounted(() => {
    authSubscription?.unsubscribe()
})

async function cerrarSesion() {
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error('Error al cerrar sesión:', error)
        return
    }

    await router.push('/')
}
</script>

<template>
    <header class="header">

        <RouterLink to="/" class="logo">
            Olivunas
        </RouterLink>

        <nav class="header-acciones">

            <div v-if="usuario" class="menu-usuario">

                <RouterLink to="/dashboard" class="boton-login">
                    Mi panel
                    <span class="flecha">⌄</span>
                </RouterLink>

                <div class="menu-desplegable">

                    <RouterLink to="/fincas">
                        Fincas
                    </RouterLink>

                    <RouterLink to="/trabajadores">
                        Trabajadores
                    </RouterLink>

                    <RouterLink to="/jornadas">
                        Jornadas
                    </RouterLink>

                    <button
                        type="button"
                        class="cerrar-sesion"
                        @click="cerrarSesion"
                    >
                        Cerrar sesión
                    </button>

                </div>
            </div>

            <RouterLink
                v-else
                to="/login"
                class="boton-login"
            >
                Iniciar sesión
            </RouterLink>

        </nav>
    </header>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    background-color: var(--color-primary);
    color: white;
    padding: 20px;
}

.header .logo {
    font-size: 2.3rem;
    margin: 0;
}

.header-acciones {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.boton-login {
    display: inline-block;
    color: black;
    background-color: var(--color-button);
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 15px;
    font: inherit;
    text-decoration: none;
}

.boton-login:hover {
    background-color: var(--color-button-hover);
    transition: background-color 0.3s ease;
}

.menu-usuario {
    position: relative;
}

.flecha {
    margin-left: 0.2rem;
}

.menu-desplegable {
    position: absolute;
    top: 100%;
    right: 0;

    min-width: 190px;
    padding: 0.5rem;

    background-color: #F7F5EF;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);

    transition:
        opacity 0.2s ease,
        transform 0.2s ease,
        visibility 0.2s ease;

    z-index: 100;
}

.menu-usuario:hover .menu-desplegable,
.menu-usuario:focus-within .menu-desplegable {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.menu-desplegable a,
.menu-desplegable button {
    display: block;
    width: 100%;
    box-sizing: border-box;

    padding: 0.7rem 0.9rem;
    border: none;
    border-radius: 8px;

    background: transparent;
    color: var(--color-dark);
    text-decoration: none;
    text-align: left;
    font: inherit;
}

.menu-desplegable a:hover {
    background-color: #E8EDE3;
    color: #263D2C;
}

.menu-desplegable .cerrar-sesion {
    color: #B42318;
    border-top: 1px solid #D7DFD0;
    border-radius: 0;
    margin-top: 0.3rem;
}

.menu-desplegable .cerrar-sesion:hover {
    background-color: #FCE8E8;
}

@media (max-width: 500px) {
    .header {
        flex-wrap: wrap;
    }

    .header .logo {
        font-size: 1.8rem;
    }

    .header-acciones {
        flex-wrap: wrap;
    }
}
</style>
