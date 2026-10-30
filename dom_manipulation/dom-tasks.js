// 1.1. Карточка с заголовком и текстом
function createCard(title, content) {
    const card = document.createElement('div');
    card.className = 'card';

    const h4 = document.createElement('h4');
    h4.textContent = title;

    const p = document.createElement('p');
    p.textContent = content;

    card.appendChild(h4);
    card.appendChild(p);

    const target = document.getElementById('target1');
    if (target) target.appendChild(card);

    return card;
}

// 1.2. Нумерованный список из массива
function createList(items) {
    const ol = document.createElement('ol');

    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ol.appendChild(li);
    });

    const target = document.getElementById('target1');
    if (target) target.appendChild(ol);

    return ol;
}

// 2.1. Количество дочерних элементов
function countChildren() {
    const parent = document.getElementById('parent-element');
    return parent ? parent.children.length : 0;
}

// 2.2. Текст элемента с классом "special"
function findSpecialChild() {
    const parent = document.getElementById('parent-element');
    if (!parent) return null;

    const special = parent.querySelector('.special');
    return special ? special.textContent : null;
}

// 2.3. Цвет фона родителя .child
function getParentBackground() {
    const child = document.querySelector('.child');
    if (!child || !child.parentElement) return null;

    return getComputedStyle(child.parentElement).backgroundColor;
}

// 3.1. Переключение класса active-style
function setupStyleToggle() {
    const btn = document.getElementById('toggle-style');
    const target = document.getElementById('style-target');
    if (!btn || !target) return;

    btn.addEventListener('click', () => {
        target.classList.toggle('active-style');
    });
}

// 3.2. Случайный цвет фона header
function changeHeaderColor() {
    const header = document.querySelector('header');
    if (!header) return;

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    header.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    header.style.transition = 'background-color 0.4s ease';
}

// 3.3. Анимация элемента (размер + прозрачность)
function animateElement() {
    const el = document.getElementById('style-target');
    if (!el) return;

    // Сохраняем исходные значения
    const originalTransform = el.style.transform || 'scale(1)';
    const originalOpacity = el.style.opacity || '1';

    el.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    el.style.transform = 'scale(1.2)';
    el.style.opacity = '0.5';

    // Возвращаем обратно через 600 мс
    setTimeout(() => {
        el.style.transform = originalTransform;
        el.style.opacity = originalOpacity;
    }, 600);
}

// 4.1. Счётчик кликов
function setupClickCounter() {
    const btn = document.getElementById('click-btn');
    const counter = document.getElementById('click-counter');
    if (!btn || !counter) return;

    let count = 0;
    btn.addEventListener('click', () => {
        count++;
        counter.textContent = `Кликов: ${count}`;
    });
}

// 4.2. Отображение ввода в реальном времени
function setupInputDisplay() {
    const input = document.getElementById('text-input');
    const display = document.getElementById('input-display');
    if (!input || !display) return;

    input.addEventListener('input', (e) => {
        display.textContent = e.target.value;
    });
}

// 4.3. Обработка клавиатуры
function setupKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
        console.log(`[keydown] code="${e.code}", key="${e.key}"`);
    });

    document.addEventListener('keyup', (e) => {
        console.log(`[keyup]   code="${e.code}", key="${e.key}"`);
    });
}

// 5.1. Добавление элемента в список
function addListItem() {
    const input = document.getElementById('item-input');
    const list = document.getElementById('dynamic-list');
    if (!input || !list) return;

    const value = input.value.trim();
    if (!value) return;

    const li = document.createElement('li');
    li.className = 'list-item';
    li.textContent = value;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('aria-label', 'Удалить');

    li.appendChild(deleteBtn);
    list.appendChild(li);

    input.value = '';
    input.focus();
}

// 5.2. Удаление элемента списка (делегирование)
function removeListItem(event) {
    const btn = event.target.closest('.delete-btn');
    if (!btn) return;

    const li = btn.closest('.list-item');
    if (li) li.remove();
}

// 5.3. Очистка всего списка
function clearList() {
    const list = document.getElementById('dynamic-list');
    if (list) list.innerHTML = '';
}

// 5.4. Настройка всех обработчиков списка
function setupListEvents() {
    const addBtn = document.getElementById('add-item-btn');
    const clearBtn = document.getElementById('clear-list-btn');
    const list = document.getElementById('dynamic-list');

    if (addBtn) addBtn.addEventListener('click', addListItem);
    if (clearBtn) clearBtn.addEventListener('click', clearList);
    if (list) list.addEventListener('click', removeListItem);
}

// 6.1. Валидация формы
function validateForm(formData) {
    const errors = {};

    const name = (formData.name || '').trim();
    if (!name) {
        errors.name = 'Имя обязательно';
    } else if (name.length < 2) {
        errors.name = 'Имя должно быть минимум 2 символа';
    }

    const email = (formData.email || '').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.email = 'Email обязателен';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Некорректный email';
    }

    const age = Number(formData.age);
    if (!formData.age || isNaN(age)) {
        errors.age = 'Возраст обязателен';
    } else if (age < 1 || age > 120) {
        errors.age = 'Возраст должен быть от 1 до 120';
    }

    return Object.keys(errors).length ? errors : null;
}

// 6.2. Отображение ошибок
function displayFormErrors(errors) {
    const output = document.getElementById('form-output');
    if (!output) return;

    output.innerHTML = '';

    Object.entries(errors).forEach(([field, message]) => {
        const div = document.createElement('div');
        div.className = 'error-message';
        div.textContent = `${field}: ${message}`;
        output.appendChild(div);
    });
}

// 6.3. Отображение успешного сообщения
function displayFormSuccess(userData) {
    const output = document.getElementById('form-output');
    if (!output) return;

    output.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'success-message';
    div.innerHTML = `
        <strong>Форма успешно отправлена!</strong><br>
        Имя: ${userData.name}<br>
        Email: ${userData.email}<br>
        Возраст: ${userData.age}
    `;
    output.appendChild(div);
}

// 6.4. Обработка отправки формы
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = {
        name: form.elements['name'] ? form.elements['name'].value : '',
        email: form.elements['email'] ? form.elements['email'].value : '',
        age: form.elements['age'] ? form.elements['age'].value : ''
    };

    const errors = validateForm(formData);
    if (errors) {
        displayFormErrors(errors);
    } else {
        displayFormSuccess(formData);
        form.reset();
    }
}

// 6.5. Настройка формы
function setupForm() {
    const form = document.getElementById('user-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function initializeApp() {
    setupStyleToggle();
    setupClickCounter();
    setupInputDisplay();
    setupKeyboardEvents();
    setupListEvents();
    setupForm();

    createCard('Пример карточки', 'Это содержимое карточки');
    createList(['Первый элемент', 'Второй элемент', 'Третий элемент']); // ← массив, а не отдельные аргументы

    console.log('Приложение инициализированно!');
}

document.addEventListener('DOMContentLoaded', initializeApp);