
<template>
  <footer class="footer">
    <div class="footer-contenido">
      <div class="footer-marca">
        <RouterLink to="/" class="logo">
          Olivunas
        </RouterLink>
        <p>La gestión de tu campo, más sencilla.</p>
      </div>

      <p class="copyright">© 2026 Olivunas</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-dark);
  color: white;
  padding: 1rem;
}
.footer-contenido {
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  justify-content:space-between;
  align-items: center;
}
.footer-marca .logo {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
}
.footer-marca p,
.copyright {
  margin: 0;
  color: var(--color-light);
  font-size: 0.9rem;
}
</style>