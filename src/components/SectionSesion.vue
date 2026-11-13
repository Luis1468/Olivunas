<script setup="setup">
    import {House, CalendarDays, UsersRound, MapPin} from 'lucide-vue-next'
</script>
<template>
    <section>
        <RouterLink to="/dashboard" class="boton"><House/>
            <span>Inicio</span>
        </RouterLink>
        <button class="boton"><CalendarDays/>
            <span>Jornadas</span>
        </button>
        <button class="boton"><UsersRound/>
            <span>Trabajadores</span>
        </button>
        <RouterLink to="/fincas" class="boton"><MapPin/>
            <span>Fincas</span>
        </RouterLink>
    </section>
</template>

<style scoped="scoped">
section {
    background-color: var(--color-dark);
    width: 20%;
    min-height: 100%;

    padding-top: 1rem;
    box-sizing: border-box;
}
.boton {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    margin: 0.8rem 0 0.8rem 10%;
    color: white;
    background-color: var(--color-dark);
    width: 80%;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    border: none;
}
    .boton:hover {
        color: black;
        background-color: var(--color-button-hover);
        transition: 0.5s ease;
    }
    @media (max-width: 1024px) {
        section {
            width: 10%;
        }

        .boton span {
            display: none;
        }
    }
        @media (max-width: 600px) {
        section {
            width: 15%;
        }
    }
</style>