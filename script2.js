/**
 * Валидация параметров ввода
 */
function validateElement(element)
{
    return (element.length == 2) &&
            (0 <= element[0] <= 9 || '0' <= element[0] <= '9' ||  'a' <= element[0] <= 'z' ||  'A' <= element[0] <= 'Z') &&
            (0 <= element[1] <= 9 || '0' <= element[1] <= '9' ||  'a' <= element[1] <= 'z' ||  'A' <= element[1] <= 'Z');
}

/**
 * Перестановки
 * @param n
 * @param x
 */

let curr = [];
let used = [];
let sizeForPerm = 0;
let perms = [];

function permutations(n, x) {
    if (x == n) {
        let res = [];
        for (let i = 0; i < n; ++i) {
            res[res.length] = curr[i];
        }
        perms[perms.length] = res;
        return;
    }
    for (let i = 0; i < sizeForPerm; ++i) {
        if (used[i] == undefined) {
            used[i] = 1;
            curr[x] = i;
            permutations(n, x + 1);
            curr[x] = 0;
            used[i] = 0;
        }
    }
}

/**
 * Проверка на рефлексивность
 * @returns {boolean}
 * @param mp
 * @param isText
 */
function isReflexive(mp, isText) {
    let cnt = 0;
    let res = false;
    for (let key of mp.keys()) {
        if (mp.get(key).has(key))
            ++cnt;
    }
    if (cnt === mp.size)
        res = true;
    if (isText === 1) {
        let tmp = "";
        if (!res)
            tmp += "не "
        tmp += "рефлексивная";
        res = tmp;
    }
    return res;
}

/**
 * Проверка на симметричность
 * @returns {boolean}
 * @param mp
 * @param isText
 */
function isSymmetrical(mp, isText) {
    let cnt = 0;
    let res = true;
    for (let key of mp.keys()) {
        for (let elem of mp.get(key)) {
            if (!(mp.get(key).has(elem) && mp.get(elem).has(key))) {
                res = false;
                break;
            }
        }
    }

    if (isText == 1) {
        let tmp = "";
        if (!res)
            tmp += "не "
        tmp += "симметричная";
        res = tmp;
    }
    return res;
}

/**
 * Проверка на кососимметричность
 * @returns {boolean}
 * @param mp
 * @param isText
 */
function isSkewsymmetrical(mp, isText) {
    let cnt = 0;
    let res = true;
    let tmpSet = new Set();
    for (let key of mp.keys()) {
        for (let elem of mp.get(key)) {
            tmpSet = new Set();
            tmpSet.add(key);
            tmpSet.add(elem);
            if (tmpSet.size === 2) {
                if (!(mp.get(key).has(elem) && mp.get(elem).has(key)) || (mp.get(key).has(key) || mp.get(elem).has(elem))) {
                    res = false;
                }
            }
        }
    }

    if (isText === 1) {
        let tmp = "";
        if (!res)
            tmp += "не "
        tmp += "кососимметричная";
        res = tmp;
    }

    return res;
}

/**
 * Проверка на транзитивность
 * @returns {boolean}
 * @param mp
 * @param isText
 */
function isTransitive(mp, isText) {
    let tmp = [];
    let tmpSet = new Set();

    for (let key of mp.keys()) {
        tmp[tmp.length] = key;
    }
    let res = true;

    curr = [];
    used = [];
    sizeForPerm = tmp.length;
    perms = [];
    permutations(3, 0);

    for (let perm of perms) {
        tmpSet = new Set();
        let u = tmp[perm[0]];
        let v = tmp[perm[1]];
        let w = tmp[perm[2]];
        tmpSet.add(v);
        tmpSet.add(w);
        tmpSet.add(u);
        if ((mp.get(u).has(v) && mp.get(v).has(w)) && !(mp.get(u).has(w))) {
            res = false;
        }
    }

    curr = null;
    used = null;
    sizeForPerm = null;
    perms = null;

    if (isText === 1) {
        let tmp = "";
        if (!res)
            tmp += "не "
        tmp += "транзитивная";
        res = tmp;
    }

    return res;
}

/**
 * Основная функция
 */
function main() {
    let mas1 = document.getElementById("id_mas1").value
    let mas2 = document.getElementById("id_mas2").value
    mas2 =mas2.split(" ");
    let strError = "";
    mas1 = mas1.split(", ")
    let mp = new Map();
    let cnt = 1, err_cnt = 0;
    let errPositions = [];
    for (let elem of mas1) {
        elem = elem.split(" ");
        if (!(validateElement(elem))) {
            if (err_cnt == 0)
                strError += "Ошибка в " + cnt;
            else {
                strError += ", " + cnt;
            }
            ++err_cnt;
        } else {
            if (mp.has(elem[0]) == 0) {
                mp.set(elem[0], new Set());
            }
            if (mp.has(elem[1]) == 0) {
                mp.set(elem[1], new Set());
            }
            mp.get(elem[0]).add(elem[1]);
        }
        ++cnt;
    }

    for (let elem of mas2) {
        if (mp.has(elem) == 0) {
            mp.set(elem, new Set());
        }
    }

    mas1 = null;
    mas2 = null;
    cnt = null;

    if (err_cnt > 0) {
        strError += " отношении";
    }
    document.getElementById('result').innerHTML = "Результат работы:" + "<br>";
    if (strError === '') {
        document.getElementById('result').innerHTML += isReflexive(mp, 1) + "<br>";
        document.getElementById('result').innerHTML += isSymmetrical(mp, 1) + "<br>";
        document.getElementById('result').innerHTML += isSkewsymmetrical(mp, 1) + "<br>";
        document.getElementById('result').innerHTML += isTransitive(mp, 1) + "<br>";
    }
    else
    {
        document.getElementById("result").innerHTML += strError;
    }

    err_cnt = null;
    strError = null;
    mp = null;
}