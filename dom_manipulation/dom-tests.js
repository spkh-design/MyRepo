// Функция для вывода результатов тестов (взята из вашего примера)
function runTest(testName, actual, expected) {
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    const resultElement = document.createElement('div');
    resultElement.className = `test-result ${isEqual ? 'success' : 'error'}`;

    resultElement.innerHTML = `
        <strong>${testName}:</strong>
        ${isEqual ? 'УСПЕХ' : 'ОШИБКА'}
        <br>
        Ожидалось: ${JSON.stringify(expected)}
        <br>
        Получено: ${JSON.stringify(actual)}
    `;

    // Создаем контейнер для результатов, если его нет
    let testResultsContainer = document.getElementById('testResults');
    if (!testResultsContainer) {
        testResultsContainer = document.createElement('div');
        testResultsContainer.id = 'testResults';
        document.body.appendChild(testResultsContainer);
    }
    
    testResultsContainer.appendChild(resultElement);
    console.log(`${testName}:`, isEqual ? 'УСПЕХ' : 'ОШИБКА', {expected, actual});
}

// Запуск всех тестов
function runDomTests() {
    console.log('=== ЗАПУСК ТЕСТОВ DOM ===');

    // --- ПОДГОТОВКА ПЕСОЧНИЦЫ (создаем элементы для тестов) ---
    const sandbox = document.createElement('div');
    sandbox.id = 'test-sandbox';
    sandbox.innerHTML = `
        <div id="target1"></div>
        <div id="parent-element">
            <div class="child">Child 1</div>
            <div class="child special">Special Child</div>
        </div>
        <button id="toggle-style"></button>
        <div id="style-target"></div>
        <button id="click-btn"></button>
        <div id="click-counter">Кликов: 0</div>
        <input type="text" id="text-input">
        <div id="input-display"></div>
        <input type="text" id="item-input">
        <button id="add-item-btn"></button>
        <button id="clear-list-btn"></button>
        <ul id="dynamic-list"></ul>
        <form id="user-form">
            <input name="name" value="Иван" />
            <input name="email" value="ivan@mail.ru" />
            <input name="age" value="25" />
        </form>
        <div id="form-output"></div>
    `;
    document.body.appendChild(sandbox);

    // 1. Тесты для createCard
    const card = createCard('Заголовок', 'Текст');
    runTest('createCard: класс карточки', card.className, 'card');
    runTest('createCard: текст заголовка', card.querySelector('h4').textContent, 'Заголовок');
    runTest('createCard: карточка добавлена в DOM', document.getElementById('target1').contains(card), true);

    // 2. Тесты для createList
    const list = createList(['А', 'Б', 'В']);
    runTest('createList: количество элементов', list.children.length, 3);
    runTest('createList: текст первого элемента', list.children[0].textContent, 'А');
    runTest('createList: список добавлен в DOM', document.getElementById('target1').contains(list), true);

    // 3. Тесты для countChildren и findSpecialChild
    runTest('countChildren: количество детей', countChildren(), 2);
    runTest('findSpecialChild: текст особого элемента', findSpecialChild(), 'Special Child');

    // 4. Тесты для getParentBackground
    const bgColor = getParentBackground();
    runTest('getParentBackground: возвращает строку цвета', typeof bgColor, 'string');
    runTest('getParentBackground: не null', bgColor !== null, true);

    // 5. Тесты для setupStyleToggle и changeHeaderColor
    // (Проверяем только базовую логику, так как они завязаны на события)
    setupStyleToggle();
    const toggleBtn = document.getElementById('toggle-style');
    const styleTarget = document.getElementById('style-target');
    toggleBtn.click(); // Имитируем клик
    runTest('setupStyleToggle: класс добавлен', styleTarget.classList.contains('active-style'), true);
    toggleBtn.click(); // Имитируем второй клик
    runTest('setupStyleToggle: класс удален', styleTarget.classList.contains('active-style'), false);

    // 6. Тесты для setupClickCounter
    setupClickCounter();
    const clickBtn = document.getElementById('click-btn');
    const clickCounter = document.getElementById('click-counter');
    clickBtn.click();
    clickBtn.click();
    runTest('setupClickCounter: счетчик кликов', clickCounter.textContent, 'Кликов: 2');

    // 7. Тесты для setupInputDisplay
    setupInputDisplay();
    const textInput = document.getElementById('text-input');
    const inputDisplay = document.getElementById('input-display');
    textInput.value = 'Привет';
    textInput.dispatchEvent(new Event('input')); // Имитируем ввод
    runTest('setupInputDisplay: текст отображается', inputDisplay.textContent, 'Привет');

    // 8. Тесты для списка (Добавление, Удаление, Очистка)
    setupListEvents(); // Настраиваем обработчики
    const itemInput = document.getElementById('item-input');
    const addBtn = document.getElementById('add-item-btn');
    const dynamicList = document.getElementById('dynamic-list');

    // Тест добавления
    itemInput.value = 'Новый элемент';
    addBtn.click();
    runTest('addListItem: элемент добавлен', dynamicList.children.length, 1);
    runTest('addListItem: текст элемента', dynamicList.children[0].textContent, 'Новый элемент✕'); // Учитывая кнопку удаления
    runTest('addListItem: поле ввода очищено', itemInput.value, '');

    // Тест удаления (имитация клика по кнопке внутри li)
    const deleteBtn = dynamicList.querySelector('.delete-btn');
    if (deleteBtn) deleteBtn.click();
    runTest('removeListItem: элемент удален', dynamicList.children.length, 0);

    // Тест очистки
    itemInput.value = 'Элемент 1'; addBtn.click();
    itemInput.value = 'Элемент 2'; addBtn.click();
    const clearBtn = document.getElementById('clear-list-btn');
    clearBtn.click();
    runTest('clearList: список пуст', dynamicList.children.length, 0);

    // 9. Тесты для валидации формы
    const validData = { name: 'Иван', email: 'test@test.com', age: '25' };
    const invalidData = { name: 'И', email: 'не-почта', age: '150' };

    runTest('validateForm: валидные данные', validateForm(validData), null);
    
    const errors = validateForm(invalidData);
    runTest('validateForm: ошибка имени', !!errors.name, true);
    runTest('validateForm: ошибка email', !!errors.email, true);
    runTest('validateForm: ошибка возраста', !!errors.age, true);

    // 10. Тесты для отображения сообщений формы
    displayFormSuccess(validData);
    const formOutput = document.getElementById('form-output');
    runTest('displayFormSuccess: класс сообщения', formOutput.querySelector('.success-message') !== null, true);

    displayFormErrors(errors);
    runTest('displayFormErrors: класс ошибки', formOutput.querySelector('.error-message') !== null, true);
    
    // --- ОЧИСТКА ПЕСОЧНИЦЫ ---
    document.body.removeChild(sandbox);
}

// Запускаем тесты после загрузки страницы (или сразу, если DOM уже готов)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runDomTests);
} else {
    runDomTests();
}