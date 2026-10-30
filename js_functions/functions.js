// Создайте функцию sum, которая принимает любое количество аргументов
// Используйте rest parameters для получения всех аргументов
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

// Создайте функцию createUser, которая принимает объект с деструктуризацией
// Объект должен содержать: name, age, email (email - необязательный)
function createUser({ name, age, email = "не указан" }) {
    return `Пользователь: ${name}, возраст: ${age}, email: ${email}`;
}


// Создайте функцию secretMessage, которая сохраняет секретное сообщение
// и возвращает функцию для его проверки
function secretMessage(password, message) {
    return function(checkPassword) {
        return checkPassword === password ? message : "Доступ запрещен";
    };
}


// Часть 3: Рекурсия и функции высшего порядка

// Создайте функцию compose, которая принимает несколько функций
// и возвращает их композицию (результат последовательного применения)
// Примечание: функции применяются справа налево (стандартная математическая композиция)
function compose(...functions) {
    return function(initialValue) {
        return functions.reduceRight((value, fn) => fn(value), initialValue);
    };
}

// Реализуйте функцию myMap, которая работает как Array.prototype.map
function myMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }
    return result;
}

// Реализуйте функцию myFilter, которая работает как Array.prototype.filter
function myFilter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}


// Реализуйте функцию myReduce, которая работает как Array.prototype.reduce
function myReduce(array, callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;

    // Если начальное значение не передано, берем первый элемент массива
    if (accumulator === undefined) {
        if (array.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = array[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
}


// Часть 4: Сложно, но важно

// Каррирование
// Реализуйте функцию curry, которая превращает функцию от нескольких аргументов в цепочку функций
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

// Мемоизация 
// Реализуйте функцию memoize, которая кэширует результаты вызовов функции
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Дебаунсинг
// Реализуйте функцию debounce, которая откладывает вызов функции
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Троттлинг
// Реализуйте функцию throttle, которая ограничивает частоту вызовов функции
function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// Функция-валидатор
// Реализуйте функцию createValidator, которая возвращает функцию проверки
// Валидатор должен проверять: минимальную длину, наличие цифр, наличие заглавных букв
function createValidator(options) {
    return function(str) {
        if (options.minLength && str.length < options.minLength) return false;
        if (options.hasDigit && !/\d/.test(str)) return false;
        if (options.hasUpperCase && !/[A-Z]/.test(str)) return false;
        return true;
    };
}