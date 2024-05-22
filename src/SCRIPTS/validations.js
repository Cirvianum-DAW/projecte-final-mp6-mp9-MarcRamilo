document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('messaje').value.trim();

        // Esborra tots els missatges d'error abans de la validació
        clearErrorMessages();

        let isValid = true;

        // Validació del nom
        if (nombre === '') {
            isValid = false;
            displayErrorMessage('nombre', 'Please enter your name.');
        }

        // Validació del correu electrònic
        if (email === '') {
            isValid = false;
            displayErrorMessage('email', 'Please enter your email.');
        } else if (!isValidEmail(email)) {
            isValid = false;
            displayErrorMessage('email', 'Please enter a valid email address.');
        }

        // Validació del missatge
        if (mensaje === '') {
            isValid = false;
            displayErrorMessage('messaje', 'Please enter your message.');
        }

        // Si tot és vàlid, envia el formulari
        if (isValid) {
            form.submit();
        }
    });

    function displayErrorMessage(fieldId, message) {
        const errorDiv = document.querySelector(`#${fieldId}`).nextElementSibling;
        errorDiv.innerText = message;
        errorDiv.style.color = 'red';
    }

    function clearErrorMessages() {
        const errorDivs = document.querySelectorAll('.error-msg');
        errorDivs.forEach(function(div) {
            div.innerText = '';
        });
    }

    function isValidEmail(email) {
        // Utilitza una expressió regular per validar el format de correu electrònic
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
