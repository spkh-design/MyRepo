// Задача 2.1: Функции для работы с числами

// Временная сложность: O(√n) - сублинейная (оптимизированный перебор)
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

// Временная сложность: O(n) - линейная
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result = result * i;
    }
    return result;
}

// Временная сложность: O(n) - линейная
function fibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    let result = [0, 1];
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;
}

// Временная сложность: O(log(min(a, b))) - логарифмическая
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}


// Задача 2.2: Функции для работы со строками

// Временная сложность: O(n) - линейная
// (где n — длина строки)
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
}

// Временная сложность: O(n) - линейная
function countVowels(str) {
    const vowels = 'аеёиоуыэюяaeiou';
    let count = 0;
    const lower = str.toLowerCase();
    for (let i = 0; i < lower.length; i++) {
        if (vowels.includes(lower[i])) count++;
    }
    return count;
}

// Временная сложность: O(n) - линейная
function reverseString(str) {
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    return result;
}

// Временная сложность: O(n) - линейная
// (где n — количество слов в предложении)
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

// Временная сложность: O(n) - линейная
function findMax(arr) {
    if (arr.length === 0) return undefined;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

// Временная сложность: O(n²) - квадратичная
// Примечание: из-за использования метода includes() внутри цикла
function removeDuplicates(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i]);
        }
    }
    return result;
}

// Временная сложность: O(n²) - квадратичная
function bubbleSort(arr) {
    const result = arr.slice();
    for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
        }
    }
    return result;
}

// Временная сложность: O(log n) - логарифмическая
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
}


// Задача 2.4: Утилитарные функции

// Временная сложность: O(d) - линейная (где d — количество цифр в целой части числа)
function formatCurrency(amount, currency = '₽') {
    const fixed = amount.toFixed(2);
    const [intPart, decPart] = fixed.split('.');
    let withSpaces = '';
    let count = 0;
    for (let i = intPart.length - 1; i >= 0; i--) {
        withSpaces = intPart[i] + withSpaces;
        count++;
        if (count % 3 === 0 && i !== 0) withSpaces = ' ' + withSpaces;
    }
    return `${withSpaces}.${decPart} ${currency}`;
}

// Временная сложность: O(1) - константная (зависит от длины строки, но регулярка проверяет за один проход)
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Временная сложность: O(n) - линейная (где n — длина пароля)
function generatePassword(length = 8) {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const special = '!@#$%^&*()_+-=';
    const all = upper + lower + digits + special;

    let password = '';
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += special[Math.floor(Math.random() * special.length)];

    for (let i = 4; i < length; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }

    let arr = password.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}
