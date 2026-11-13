
<script>
    import SectionSesion from '../components/SectionSesion.vue'

    export default {
        components: {
            SectionSesion
        }
    }
</script>

<template>
    <main class="dashboard">
        <SectionSesion/>
        <h1>Panel de control</h1>
        <p>Bienvenido a Olivunas.</p>

        <div class="dashboard-cards">
            <div class="card">
                <h2>Trabajadores</h2>
                <p>Gestiona tus trabajadores.</p>
            </div>

            <div class="card">
                <h2>Fincas</h2>
                <p>Gestiona tus fincas.</p>
            </div>

            <div class="card">
                <h2>Jornadas</h2>
                <p>Consulta y registra jornadas.</p>
            </div>
        </div>
    </main>
</template>

<style scoped>
.dashboard {
    display: flex;
    min-height: 100vh;
}

.dashboard h1 {
    color: var(--color-dark);
}

.dashboard-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
}

.card {
    padding: 1.5rem;
    background-color: var(--color-background-text);
    border-radius: 12px;
}

@media (max-width: 700px) {
    .dashboard-cards {
        grid-template-columns: 1fr;
    }
}
</style>
