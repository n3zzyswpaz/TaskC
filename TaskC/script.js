// Миска.
class Bowl {
    // Максимальное количество еды в миске.
    maxFoodAmount;
    // Текущее количество еды в миске.
    currentFoodAmount;
}

// Кот.
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

// Бабушка.
class Granny {
    // Время, за которое бабуля пополняет миску.
    timeToRefill;

    feedCat(cat, bowl) {
        return new Promise((resolve) => {
            let output = document.getElementById('output');
            output.innerText += `Котик ${cat.catId} подошел к миске. Корма в миске: ${bowl.currentFoodAmount}.\n`;
            if (bowl.currentFoodAmount >= cat.maxStomachCapacity) {
                output.innerText += `Котик ${cat.catId} кушает.\n`;
                setTimeout(() => {
                    bowl.currentFoodAmount -= cat.maxStomachCapacity;
                    cat.currentStomachCapacity = cat.maxStomachCapacity;
                    output.innerText += `Котик ${cat.catId} наелся.\n`;
                    resolve();
                }, cat.timeToEat);
            } else {
                output.innerText += `Котик ${cat.catId} ждет, пока бабушка пополнит миску.\n`;
                setTimeout(() => {
                    bowl.currentFoodAmount = bowl.maxFoodAmount;
                    output.innerText += `Бабушка наполнила миску. Корма в миске: ${bowl.currentFoodAmount}.\n`;
                    this.feedCat(cat, bowl).then(resolve);
                }, this.timeToRefill);
            }
        })
    }
}

async function simulate(cats, bowl) {
    const currentTime = new Date().getTime();
    for (let i = 0; i < cats.length - 1; i++) {
        await granny.feedCat(cats[i], bowl);
        if (cancellationToken) {
            document.getElementById('output').innerText += `Симуляция прервана.\n`;
            document.querySelector('.stopSimulation').disabled = false;
            break;
        }
    }
    output.innerText += `Затрачено ${new Date().getTime() - currentTime} ms.\n`;
}

function startSimulation() {
    const n = parseInt(document.getElementById('catsNumber').value); // Количество котиков.
    const m = parseInt(document.getElementById('bowlMaxFoodAmount').value); // Вместительность миски.
    const b = parseInt(document.getElementById('maxStomachCapacity').value); // Количество корма, которое котику нужно съесть, чтобы насытиться.
    // 1 кошка возле миски единовременно.
    const r = parseInt(document.getElementById('timeToRefill').value); // Время, за которое бабуля пополняет миску.
    const t = parseInt(document.getElementById('timeToEat').value); // Время, за которе котик съедает b единиц корма.

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

    granny.timeToRefill = r;

    if (!isSimulationRunning) {
        isSimulationRunning = true; // Устанавливаем флаг в true, чтобы указать, что симуляция запущена
        let output = document.getElementById('output');
        output.innerText = '';
        simulate(cats, bowl).then(() => {
            isSimulationRunning = false; // По завершении симуляции сбрасываем флаг в false
        });
    } else {
        // Если симуляция уже запущена, выводим сообщение об ошибке или выполняем другие действия по вашему усмотрению
        alert('Симуляция уже запущена. Пожалуйста, дождитесь ее завершения.');
    }
}

document.querySelector('.startSimulation').addEventListener('click', (event) => {
    startSimulation();
});

document.querySelector('.stopSimulation').addEventListener('click', (event) => {
    document.querySelector('.stopSimulation').disabled = true;
    cancellationToken = true;
});

let isSimulationRunning = false;
let cancellationToken = false;
let granny = new Granny();
let bowl = new Bowl();