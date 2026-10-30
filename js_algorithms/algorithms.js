// Задача 2.1: Функции для работы с числами

// Реализуйте функцию isPrime
// Напишите функцию, которая проверяет, является ли число простым
function isPrime(number) {
    if (number <= 1) {
        return false;
    }
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

// Реализуйте функцию factorial
// Вычислите факториал числа (произведение всех чисел от 1 до n)
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result = result * i;
    }
    return result
    // Пример: factorial(5) = 5 × 4 × 3 × 2 × 1 = 120
}

// Реализуйте функцию fibonacci
// Верните массив первых n чисел Фибоначчи
function fibonacci(n) {
    if (n <= 0) return [];       // 0 чисел — пустой массив
    if (n === 1) return [0];     // только первое число
    let result = [0, 1];         // первые два числа
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;
    // Последовательность: 0, 1, 1, 2, 3, 5, 8, 13...
}

// Реализуйте функцию gcd (НОД)
// Найдите наибольший общий делитель двух чисел
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
    // Используйте алгоритм Евклида
}


// Задача 2.2: Функции для работы со строками

// Реализуйте функцию isPalindrome
// Проверьте, является ли строка палиндромом (читается одинаково слева направо и справа налево)
function isPalindrome(str) {
    const clean = str.toLowerCase().replace(/\s/g, '');
    let left = 0;
    let right = clean.length - 1;
    while (left < right) {
        if (clean[left] !== clean[right]) return false;
        left++;
        right--;
    }
    return true;
    // Игнорируйте пробелы и регистр: "А роза упала на лапу Азора" → true
}

// Реализуйте функцию countVowels
// Посчитайте количество гласных букв в строке
function countVowels(str) {
    const vowels = 'аеёиоуыэюяaeiou';
    let count = 0;
    const lower = str.toLowerCase();
    for (let i = 0; i < lower.length; i++) {
        if (vowels.includes(lower[i])) count++;
    }
    return count;
    // Гласные в русском: а,е,ё,и,о,у,ы,э,ю,я
    // Гласные в английском: a,e,i,o,u
}



// Реализуйте функцию reverseString
// Переверните строку без использования встроенных методов
function reverseString(str) {
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    return result;
    // Не используйте str.split('').reverse().join('')
}

// Реализуйте функцию findLongestWord
// Найдите самое длинное слово в предложении
function findLongestWord(sentence) {
    const words = sentence.split(' ');
    let longest = '';
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }
    return longest;
}



// Задача 2.3: Функции для работы с массивами

// Реализуйте функцию findMax
// Найдите максимальный элемент в массиве
function findMax(arr) {
    if (arr.length === 0) return undefined;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
    // Не используйте Math.max!
}

// Реализуйте функцию removeDuplicates
// Удалите дубликаты из массива
function removeDuplicates(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i]);
        }
    }
    return result;
    // Пример: [1,2,2,3,4,4,5] → [1,2,3,4,5]
}

// Реализуйте функцию bubbleSort
// Отсортируйте массив методом пузырьковой сортировки
function bubbleSort(arr) {
    const result = arr.slice();          // копия, чтобы не менять исходный
    for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
        }
    }
    return result;
    // Реализуйте алгоритм без использования встроенных методов сортировки
}
// Реализуйте функцию binarySearch
// Найдите элемент в отсортированном массиве методом бинарного поиска
function binarySearch(sortedArr, target) {
    let left = 0;
    let right = sortedArr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (sortedArr[mid] === target) return mid;
        if (sortedArr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
    // Верните индекс элемента или -1 если не найден
}

// Задача 2.4: Утилитарные функции

// Реализуйте функцию formatCurrency
// Отформатируйте денежную сумму в читаемый вид
function formatCurrency(amount, currency = '₽') {
    const fixed = amount.toFixed(2);                  // "1234.56"
    const [intPart, decPart] = fixed.split('.');      // ["1234", "56"]
    let withSpaces = '';
    let count = 0;
    for (let i = intPart.length - 1; i >= 0; i--) {   // с конца
        withSpaces = intPart[i] + withSpaces;
        count++;
        if (count % 3 === 0 && i !== 0) withSpaces = ' ' + withSpaces;
    }
    return `${withSpaces}.${decPart} ${currency}`;
    // Пример: 1234.56 → "1 234.56 ₽"
}

// Реализуйте функцию isValidEmail
// Проверьте валидность email адреса с помощью регулярного выражения
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}
// Реализуйте функцию generatePassword
// Сгенерируйте случайный пароль заданной длины
function generatePassword(length = 8) {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const special = '!@#$%^&*()_+-=';
    const all = upper + lower + digits + special;

    // гарантируем хотя бы по одному символу каждого типа
    let password = '';
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += special[Math.floor(Math.random() * special.length)];

    for (let i = 4; i < length; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }

    // перемешаем, чтобы типы не стояли в начале
    let arr = password.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
    // Пароль должен содержать буквы (заглавные и строчные), цифры и специальные символы
}