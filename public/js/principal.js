document.addEventListener('DOMContentLoaded', function () {
    /* Toggle del menú hamburguesa en móvil */
    const botonMenu = document.getElementById('nav-toggle');
    const enlacesNav = document.querySelector('.nav-enlaces');

    if (botonMenu && enlacesNav) {
        botonMenu.addEventListener('click', function () {
            enlacesNav.classList.toggle('activo');
        });
    }

    /* Desvanece y oculta las alertas de error después de 4 segundos */
    const alertas = document.querySelectorAll('.alerta-error');
    alertas.forEach(function (alerta) {
        setTimeout(function () {
            alerta.style.transition = 'opacity 0.5s ease';
            alerta.style.opacity = '0';
            setTimeout(function () {
                alerta.style.display = 'none';
            }, 500);
        }, 4000);
    });
});
