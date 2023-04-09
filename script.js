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
function reflex(el) {
    if (el[0] == el[2]) return true
    else return false;
}

// симметричность
function symmetric(el) {
    return true;
}

// кососимметричность
function cososymmetric(el, pairs, num) {
    /** var1
    return pairs.includes(el.split('').reverse().join(''));
    */
   for (let i = 0; i < pairs.length; i++) {
    if (i == num) continue;
    if (pairs[i].includes(el.split('').reverse().join(''))) return true
   }
   return false;
}

// транзитивность
function tranzitive(el, pairs, num) {
    let el1 = el[0];
    let el2 = el[2];
    for (let i = 0; i< pairs.length; i++) {
        if (i == num) continue;
        if ((pairs[i].includes(el1.split('').join(''))) && (pairs[i].includes(el2.split('').join('')))) continue;
        let elEl = pairs[i];
        if (elEl[0] == elEl[2]) continue;
        if ((pairs[i].includes(el1.split('').join(''))) || (pairs[i].includes(el2.split('').join('')))) {
            return true;
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
        /** var 1
        let refl = true;
        let simm = true;
        let cosSimm = true;
        let tranz = true;
        */
        let refl = false;
        let simm = false;
        let cosSimm = false;
        let tranz = false;
        for (let i = 0; i < pairs.length; i++)
        {
            /** 
            refl = reflex(pairs[i]);
            simm = symmetric(pairs[i]);
            cosSimm = cososymmetric(pairs[i], pairs);
            tranz = tranzitive(pairs[i], pairs, i);
            */
           if (!refl)  refl = reflex(pairs[i]);
           if (!simm)  simm = symmetric(pairs[i]);
           if (!cosSimm) cosSimm = cososymmetric(pairs[i], pairs, i);
           if (!tranz) tranz = tranzitive(pairs[i], pairs, i);

        }
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