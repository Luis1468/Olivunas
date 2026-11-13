<template>
    <section>
        <div class="imagen_intro">
            <h2>La gestión de tu campo, más sencilla.</h2>
        </div>
        <div class="que_puedes_hacer">
            <h2>¿Qué puedes hacer con Olivunas?</h2>
            <p>Todo lo necesario para llevar el control diario del trabajo de forma sencilla.</p>
            <div class="tarjetas">
                <div class="tarjeta_trabajador">
                    <img src="../assets/images/trabajador.png" alt="Trabajador">
                        <h3>Trabajadores</h3>
                        <p>Gestionaa tus trabajadores y consulta facilmente las horas que han realizado
                            cada uno</p>
                    </div>
                    <div class="tarjeta_horario">
                        <img src="../assets/images/horario.png" alt="Jornadas">
                            <h3>Jornadas</h3>
                            <p>Registra el día, la finca, los trabajadores que han asistido y las horas
                                trabajadas
                            </p>
                        </div>
                        <div class="tarjeta_olivo">
                            <img src="../assets/images/olivo.png" alt="Olivo">
                                <h3>Fincas</h3>
                                <p>Organiza tus fincas y mantén cada jornada vinculada al lugar donde se ha
                                    trabajado</p>
                            </div>
                        </div>
                    </div>

                    <section class="nacido_del_campo">
                        <div class="contenido_campo">
                            <div class="texto_campo">
                                <span class="etiqueta">NUESTRA HISTORIA</span>

                                <h2>Un proyecto nacido del campo</h2>

                                <p>
                                    Olivunas nace de una necesidad real: simplificar el control de trabajadores,
                                    jornadas y fincas en el día a día.
                                </p>

                                <p>
                                    Lo que antes se llevaba en hojas de cálculo, ahora puede gestionarse de forma
                                    más clara, rápida y organizada.
                                </p>
                            </div>

                            <div class="imagen_campo">
                                <img
                                    src="../assets/images/aceite_aceitunas.jpg"
                                    alt="Aceite de oliva y aceitunas"/>
                            </div>
                        </div>
                    </section>

                </section>
            </template>
            <style scoped="scoped">
                .imagen_intro {
                    background-image: url("../assets/images/olivo_intro.jpg");
                    background-size: cover;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    padding: 10rem;
                    margin-bottom: 0;
                    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
                }
                .imagen_intro h2 {
                    background-color: var(--color-button);
                    padding: 0.8rem;
                    border-radius: 15px;
                    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
                    opacity: 0.8;
                }
                .que_puedes_hacer {
                    margin-top: 0;
                }
                .que_puedes_hacer h2 {
                    padding: 0.5rem;
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                    width: 100%;
                    text-align: center;
                }
                .que_puedes_hacer p {
                    margin-top: 0;
                    width: 100%;
                    text-align: center;
                    margin-bottom: 0.5rem;
                    font-size: 1rem;
                }
                .tarjetas {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    max-width: 1200px;
                    margin: 2rem auto;
                }
                .tarjeta_horario,
                .tarjeta_olivo,
                .tarjeta_trabajador {
                    flex: 1;
                    min-width: 0;
                    background-color: #6F8F72;
                    border-radius: 15px;
                    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
                    padding: 1.5rem;
                    text-align: center;
                }
                .tarjeta_horario img,
                .tarjeta_olivo img,
                .tarjeta_trabajador img {
                    width: 40%;
                    margin: 0;
                }
                .nacido_del_campo {
                    background-color: var(--color-background);
                    padding: 3.5rem 8% 5rem;
                }

                .contenido_campo {
                    display: flex;
                    align-items: center;
                    gap: 5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .texto_campo {
                    flex: 1;
                }
                .etiqueta {
                    color: var(--color-primary);
                    font-size: 0.85rem;
                    font-weight: bold;
                    letter-spacing: 2px;
                }
                .texto_campo h2 {
                    color: var(--color-dark);
                    font-size: 2.5rem;
                    line-height: 1.2;
                    margin: 1rem 0 1.5rem;
                }
                .texto_campo p {
                    color: var(--color-text);
                    font-size: 1.1rem;
                    line-height: 1.8;
                    margin-bottom: 1.2rem;
                }
                .imagen_campo {
                    width: 42%;
                    flex-shrink: 0;
                }
                .imagen_campo img {
                    display: block;
                    width: 100%;
                    height: 350px;
                    object-fit: cover;
                    border-radius: 18px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
                }
            </style>