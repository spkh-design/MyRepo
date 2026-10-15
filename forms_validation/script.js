document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input', 'select', 'textarea');
    const bioTextarea = document.getElementById('bio');
    const charCount = document.getElementById('charCount');

    if (bioTextarea && charCount) {
        bioTextarea.addEventListener('input', function() {
            charCount.textContent = this.value.lenght;
        });
    }

    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });

    const password = document.getElementById('password');
    const cofirmPassword = document.getElementById("confirmPassword");

    if (password && confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            validatePasswordMatch();
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        inputs.forEach(input => {
            if (!validateField({ target: input})) {
                isValid = false;
            }
        });

        if (password && confirmPassword) {
            if (!validatePasswordMatch()) {
                isValid = false;
            }
        }

        if (isValid) {
            showSuccessMessage();
            form.submit
        } else {
            showErrorMessage('Пожалуйста, исправьте ошибки в форме');
        }

    })

    function validateField(e) {
        const field = e.target;
        const errorElement = document.getElementById(field.id + 'Error');

        if (!field.required && !field.value.trim()) {
            clearErrorForField(field);
            return true;
        }

        if (!field.checkValidity()) {
            showErrorForField(field, getErrorMessage(field));
            return false;
        } else {
            clearErrorField(field);
            return true;
        }
    }

    function validatePasswordMatch() {
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;
        const errorElement = document.getElementById('confirmPasswordError');

        if (confirmPasswordValue && passwordValue !== confirmPasswordValue) {
            showErrorForField(confirmPassword, 'Пароли не совпадают');
            return false;
        } else {
            clearErrorForField(confirmPassword);
            return true;
        }
    }

    function getErrorMessage(field) {
        if (field.validity.valueMissing) {
            return 'Это поле обязательное для заполнения';
        }

        if (field.validity.typeMismatch) {
            if (field.type == 'email') {
                return 'Введите корректный email адрес';
            }
        }

        if (field.validity.tooShort) {
            return 'Минимальная длина: ${field.minLenght} символов';
        }

        if (field.validity.tooLong) {
            return 'Максимальная длина: ${field.maxLenght} символов';
        }

        if (field.validity.patternMismatch) {
            if (field.type === 'password') {
                return 'Пароль должен содержать заглавные и строчные буквы, цифры';
            }

            if (field.type === 'tel') {
                return 'Введдите телефон в формате +7 (999) 999-99-99';
            }
        }

        return 'Некорректное значение';
    }

    function showErrorForField(field, message) {
        field.classlist.add('error');
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrorForField(field) {
        field.class.List.remove('error');
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    function clearError(e) {
        clearErrorForField(e.target);
    }

    function showSuccessMessage() {
        alert('Форма успешно отправлена');
        form.reset();
        charCount,textContent = '0';

        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });

        document.querySelectorAll('.error').forEach (el => {
            el.classList.remove('error');
        });
    }

    function showErrorMessage(message) {
        alert(message);
    }

});