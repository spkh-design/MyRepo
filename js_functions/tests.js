// Функция для вывода результатов тестов
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

    document.getElementById('testResults').appendChild(resultElement);
    console.log(`${testName}:`, isEqual ? 'УСПЕХ' : 'ОШИБКА', {expected, actual});
}

// Запуск всех тестов
function runAllTests() {
    console.log('=== ЗАПУСК ТЕСТОВ ===');

    // 1. Тесты для sum
    runTest('sum(1, 2, 3, 4)', sum(1, 2, 3, 4), 10);
    runTest('sum()', sum(), 0);

    // 2. Тесты для createUser
    runTest('createUser({name: "Иван", age: 25})', 
        createUser({name: "Иван", age: 25}), 
        "Пользователь: Иван, возраст: 25, email: не указан");
    runTest('createUser({name: "Анна", age: 30, email: "anna@mail.ru"})', 
        createUser({name: "Анна", age: 30, email: "anna@mail.ru"}), 
        "Пользователь: Анна, возраст: 30, email: anna@mail.ru");

    // 3. Тесты для secretMessage
    const getSecret = secretMessage("1234", "Секретный код");
    runTest('secretMessage правильный пароль', getSecret("1234"), "Секретный код");
    runTest('secretMessage неправильный пароль', getSecret("0000"), "Доступ запрещен");

    // 4. Тесты для compose
    const addOne = x => x + 1;
    const double = x => x * 2;
    const composed = compose(addOne, double); // Сначала double, потом addOne
    runTest('compose(addOne, double)(5)', composed(5), 11); // (5*2)+1 = 11

    // 5. Тесты для myMap
    runTest('myMap([1, 2, 3], x => x * 2)', myMap([1, 2, 3], x => x * 2), [2, 4, 6]);

    // 6. Тесты для myFilter
    runTest('myFilter([1, 2, 3, 4], x => x % 2 === 0)', myFilter([1, 2, 3, 4], x => x % 2 === 0), [2, 4]);

    // 7. Тесты для myReduce
    runTest('myReduce([1, 2, 3, 4], (acc, x) => acc + x, 0)', myReduce([1, 2, 3, 4], (acc, x) => acc + x, 0), 10);
    runTest('myReduce([1, 2, 3], (acc, x) => acc + x)', myReduce([1, 2, 3], (acc, x) => acc + x), 6); // Без initialValue

    // 8. Тесты для curry
    const add = (a, b, c) => a + b + c;
    const curriedAdd = curry(add);
    runTest('curry(add)(1)(2)(3)', curriedAdd(1)(2)(3), 6);
    runTest('curry(add)(1, 2)(3)', curriedAdd(1, 2)(3), 6);

    // 9. Тесты для memoize
    let callCount = 0;
    const slowFn = (x) => { callCount++; return x * 2; };
    const memoizedFn = memoize(slowFn);
    memoizedFn(5); // Первый вызов
    memoizedFn(5); // Второй вызов (должен взять из кэша)
    runTest('memoize: количество вызовов', callCount, 1);
    runTest('memoize: результат', memoizedFn(5), 10);

    // 10. Тесты для createValidator
    const validator = createValidator({ minLength: 5, hasDigit: true, hasUpperCase: true });
    runTest('validator("Pass123")', validator("Pass123"), true);
    runTest('validator("pass123")', validator("pass123"), false); // нет заглавной
    runTest('validator("Password")', validator("Password"), false); // нет цифры
    runTest('validator("Pas1")', validator("Pas1"), false); // слишком короткий

    // Примечание: debounce и throttle тестируются асинхронно и здесь не включены,
    // так как требуют ожидания (setTimeout).
}

// Автозапуск после загрузки страницы
runAllTests();