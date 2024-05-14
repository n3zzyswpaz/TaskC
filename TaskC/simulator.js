// Миска.
class Bowl {
    // Максимальное количество еды в миске.
    maxFoodAmount;
    // Текущее количество еды в миске.
    currentFoodAmount;
}

class Cat {
    // Номер котика.
    catId;
    // Максимальная сытость котика.
    maxStomachCapacity;
    // Текущая сытость котика.
    currentStomachCapacity;
    // Время, за которое котик съедает необходимое количество корма.
    timeToEat;
}

class Granny {
    // Время, за которое бабуля пополняет миску.
    timeToRefill;

    feedCat(cat, bowl) {
        return new Promise((resolve) => {
            //console.log(`Котик ${cat.catId} подошел к миске. Корма в миске: ${bowl.currentFoodAmount}`);
            document.getElementById('output').innerHTML += `Котик ${cat.catId} подошел к миске. Корма в миске: ${bowl.currentFoodAmount}<br>`;
            if (bowl.currentFoodAmount >= cat.maxStomachCapacity) {
                //console.log(`Котик ${cat.catId} кушает.`);
                document.getElementById('output').innerHTML += `Котик ${cat.catId} кушает.<br>`;
                setTimeout(() => {
                    bowl.currentFoodAmount -= cat.maxStomachCapacity;
                    cat.currentStomachCapacity = cat.maxStomachCapacity;
                    //console.log(`Котик ${cat.catId} наелся.`);
                    document.getElementById('output').innerHTML += `Котик ${cat.catId} наелся.<br>`;
                    resolve();
                }, cat.timeToEat);
            } else {
                //console.log(`Котик ${cat.catId} ждет, пока бабушка пополнит миску.`);
                document.getElementById('output').innerHTML += `Котик ${cat.catId} ждет, пока бабушка пополнит миску.<br>`;
                setTimeout(() => {
                    bowl.currentFoodAmount = bowl.maxFoodAmount;
                    //console.log(`Бабушка наполнила миску. Корма в миске: ${bowl.currentFoodAmount}`);
                    document.getElementById('output').innerHTML += `Бабушка наполнила миску. Корма в миске: ${bowl.currentFoodAmount}<br>`;
                    this.feedCat(cat, bowl).then(resolve);
                }, this.timeToRefill);
            }
        })
    }
}

async function simulate(cats, bowl) {
    for (let i = 0; i < cats.length - 1; i++) {
        await granny.feedCat(cats[i], bowl);
    }
    //console.log(`Затрачено ${new Date().getTime() - currentTime} ms.`)
    document.getElementById('output').innerHTML += `Затрачено ${new Date().getTime() - currentTime} ms.<br>`;
}

const n = parseInt(document.getElementById('catsNumber').value); // Количество котиков.
const m = parseInt(document.getElementById('bowlMaxFoodAmount').value); // Вместительность миски.
const b = parseInt(document.getElementById('maxStomachCapacity').value); // Количество корма, которое котику нужно съесть, чтобы насытиться.
// 1 кошка возле миски единовременно.
const r = parseInt(document.getElementById('timeToRefill').value); // Время, за которое бабуля пополняет миску.
const t = parseInt(document.getElementById('timeToEat').value); // Время, за которе котик съедает b единиц корма.
let currentTime = new Date().getTime();

let bowl = new Bowl();
bowl.maxFoodAmount = m;
bowl.currentFoodAmount = m;

let cats = [];
for (let i = 1; i <= n; i++) {
    let cat = new Cat();
    cat.catId = i;
    cat.maxStomachCapacity = b;
    cat.currentStomachCapacity = 0;
    cat.timeToEat = t;
    cats.push(cat);
}

let granny = new Granny();
granny.timeToRefill = r;

function startSimulation() {
    simulate(cats, bowl)
}