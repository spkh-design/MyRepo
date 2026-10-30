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

    document.getElementById('testResult').appendChild(resultElement);
    console.log(`${testName}:`, isEqual ? 'УСПЕХ' : 'ОШИБКА', {expected, actual});
}

// Запуск всех тестов
function runAllTests() {
    console.log('=== ЗАПУСК ТЕСТОВ ===');

    // Тесты для работы с числами
    runTest('isPrime(7)', isPrime(7), true);
    runTest('isPrime(10)', isPrime(10), false);
    runTest('factorial(5)', factorial(5), 120);
    runTest('gcd(54, 24)', gcd(54, 24), 6);
    runTest('fibonacci(6)', fibonacci(6), [0, 1, 1, 2, 3, 5]);

    // Тесты для работы со строками
    runTest('isPalindrome("А роза упала на лапу Азора")', isPalindrome("А роза упала на лапу Азора"), true);
    runTest('countVowels("JavaScript")', countVowels("JavaScript"), 3);
    runTest('reverseString("Hello")', reverseString("Hello"), "olleH");
    runTest('findLongestWord("Самое длинное слово в предложении")', findLongestWord("Самое длинное слово в предложении"), "предложении");

    // Тесты для работы с массивами
    runTest('findMax([3, 7, 2, 9, 1])', findMax([3, 7, 2, 9, 1]), 9);
}

// Автозапуск после загрузки страницы
runAllTests();