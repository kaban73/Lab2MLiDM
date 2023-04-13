function validateArr(el) {
    el = parseInt(el);
    return Number.isInteger(el);
}

function validatePairs(el, arr) {
    if (el.length > 3) {
        return false;
    }

    let el1 = parseInt(el[0]);
    let el2 = parseInt(el[2]);

    if (Number.isInteger(el1) && Number.isInteger(el2)) {
        if (arr.includes(el[0]) && arr.includes(el[2])) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    } 

}

// рефлексивность
function reflex(arr, pairs) {
    let fl = false;
    for (let i = 0; i < arr.length; i++) {
        fl = false;
        for (let j = 0; j < pairs.length; j++) {
            if ((arr[i] == pairs[j][0]) && (arr[i] == pairs[j][2])) {
                fl = true;
            }
        }
        if (!fl) {
            return false;
        }
    }
    if (fl) return true;
    else return false;
}

// симметричность
function symmetric(pairs) {
    let fl = false;
    for (let i = 0; i < pairs.length; i++) {
        fl = false;
        for (let j = 0; j < pairs.length; j++) {
            if ((pairs[i][0] == pairs[j][2]) && (pairs[i][2] == pairs[j][0])) {
                fl = true;
            }
        }
        if (!fl) {
            return false;
        }
    }
    if (fl) return true;
    else return false;
}

// кососимметричность
function cososymmetric(pairs) {
    let fl = true
    for (let i = 0; i < pairs.length; i++) {
        fl = true;
        if (pairs[i][0] != pairs[i][2]) {
            /** return false*/
            for (let j = 0; j < pairs.length; j++) {
                if ((pairs[i][0] == pairs[j][2]) && (pairs[i][2] == pairs[j][0])) {
                    fl = false;
                    break;
                }
            }
        }
    }
    if (fl) return true;
    else return false;
}

// транзитивность
function tranzitive(pairs) {
    for (let i = 0; i < pairs.length; i++) {
        for (let j = 0; j < pairs.length; j++) {
            for (let l = 0; l < pairs.length; l++) {
                if (((pairs[i][0] == pairs[l][0]) && (pairs[i][2] == pairs[j][0]) && (pairs[j][2] == pairs[l][2])) ||
                ((pairs[i][2] == pairs[l][0]) && (pairs[i][0] == pairs[j][2]) && (pairs[j][0] == pairs[l][2]))) {
                    return true;
                }
            }
        }
    }
    return false;
}

function Main() {
    // получение данных с формы
    let arr = document.getElementById('arr').value;
    let pairs =document.getElementById('pairs').value;

    // создание массивов
    arr = arr.split(' ');
    pairs = pairs.split(',');
    console.log(arr);
    console.log(pairs);

    // валидация элементов массивов
    let message1 = "";
    for (let i = 0; i < arr.length; i++)
    {
        if (!validateArr(arr[i]))
        {
            message1 += "Ошибка ввода данных множества";
            break;
        }
    }
    document.getElementById("val1").innerHTML = message1;

    let message2 = "";
    for (let i = 0; i < pairs.length; i++)
    {
        if (!validatePairs(pairs[i], arr))
        {
            message2 += "Ошибка ввода данных пар";
            break;
        }
    }
    document.getElementById("val2").innerHTML = message2;

    if (message1 == "" && message2 == "") {
        let refl = reflex(arr, pairs);
        let simm = symmetric(pairs);
        let cosSimm = cososymmetric(pairs);
        let tranz = tranzitive(pairs);
        let resultMessage = "";
        if (refl) resultMessage += "Рефлексивно "
        else resultMessage += "Не рефлексивно "

        if (simm) resultMessage += "Симметрично "
        else resultMessage += "Не симметрично "

        if (cosSimm) resultMessage += "Кососимметрично "
        else resultMessage += "Не кососимметрично "

        if (tranz) resultMessage += "Транзитивно "
        else resultMessage += "Не транзитивно "

        document.getElementById("result").innerHTML = resultMessage;
    }
}