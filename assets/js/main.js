(function () {
    let speed = 3;
    let score = 0;
    let qntPizza = 0;
    let lives = 3;

    function createPizza() {
        const pizza = document.createElement('span');
        const emoji = document.createTextNode('🍕')
        pizza.appendChild(emoji);
        pizza.addEventListener('animationend', loseLives);
        pizza.classList.add('pizza');
        return pizza;
    }


    function putPizzaOnScreen() {
        const section = document.querySelector('.container');
        const margin = (Math.floor(Math.random() * 11) * 10) * 10;
        const pizza = createPizza();
        pizza.style.left = margin + "px";
        document.querySelector('.speed').innerHTML = `${speed.toFixed(1)}s`;
        pizza.style.animation = `goingdown ${speed}s ease-in`
        pizza.addEventListener('click', (e) => putScore(e.target))

        section.appendChild(pizza);
        qntPizza++;
        if (speed <= 1) {
            return;
        } else if (speed <= 1.5 && qntPizza < 70) {
            return;
        } else if (speed <= 2 && qntPizza < 50) {
            return;
        } else if (qntPizza > 70) {
            speed -= 0.05;
        } else if (qntPizza > 50) {
            speed -= 0.05
        } else if (qntPizza > 10) {
            speed -= 0.1
        }

    }

    function putScore(child) {
        child.remove();
        score += 100;
        const scoreSpan = document.querySelector("#score");
        scoreSpan.innerHTML = score;
    }

    function createInput() {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('maxlength', '3');
        input.setAttribute('minlength', '3');
        input.setAttribute('placeholder', 'Inser your name [Max 3.]')
        return input;
    }

    function createButton() {
        const button = document.createElement('button');
        button.innerText = 'Save score'
        return button;
    }

    function gameOver() {
        const overScreen = document.createElement('div');
        const section = document.querySelector('.container');
        const text = document.createElement('p');
        text.classList.add('form')
        const form = document.createElement('form');
        const input = createInput();
        const button = createButton();

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!input.value || input.value < 3) return 0;
            form.remove();
            writeScore(input.value.toUpperCase(), score);
            saveScore();
            writeAllScores();
        });

        text.innerHTML = `<p>GAME OVER<br><br><br> SCORE ${score} pts.</p>`

        text.classList.add('final-score');
        overScreen.classList.add('container');
        overScreen.classList.add('over-screen');
        section.style.paddingTop = '0px';

        form.appendChild(input);
        form.appendChild(button);
        text.appendChild(form);

        overScreen.appendChild(text);
        section.appendChild(overScreen);

        scrollTo(0, 350);
    }

    function loseLives() {
        lives--;
        const container = document.querySelector('.container')
        if (lives < 1) {
            container.innerHTML = '';
            gameOver();
            clearInterval(timer);
        };
        const livesSpan = document.querySelector('#lives');
        const livesText = livesSpan.textContent;
        const newLives = livesText.slice(0, -1);
        livesSpan.innerHTML = newLives;
        this.remove();

    }
    // SCORE 1-0-1-0-1-0-1-0-1-0-1-0-1-0-1-0-1-0-1-0-1-0-1-0-1-0-1-0-1-0

    function writeScore(name, score, i = 0) {
        if (!name) return;

        const highscore = document.querySelector('.hi-score');
        const div = document.createElement('div');
        div.innerHTML = `<span class="rank">${i}º</span>
                         <span class="name-score">${name}</span>
                         <span class="score-points">${score}</span><hr>`
        highscore.appendChild(div);
    }

    function saveScore() {

        const names = document.querySelectorAll('.name-score');
        const scores = document.querySelectorAll('.score-points');
        let listOfScores = [];

        for (let i = 0; i < names.length; i++) {
            let nameText = names[i].innerText;
            let scoreText = scores[i].innerText;
            listOfScores.push({ name: nameText, score: scoreText });

        }

        const scoresJSON = JSON.stringify(listOfScores);
        localStorage.setItem("score", scoresJSON);
    }

    function writeAllScores() {

        const div = document.querySelector('.hi-score');
        div.innerHTML = '   '

        const storageList = localStorage.getItem('score');
        const list = JSON.parse(storageList);

        list.sort((a, b) => {
            return b.score - a.score;
        })
        console.log(list)

        let names = [];
        let scores = [];

        for (let i in list) {
            names.push(list[i].name);
            scores.push(list[i].score);
        }
        console.log(scores)

        for (let x = 0; x < names.length; x++) {
            if (x >= 10) break;
            writeScore(names[x], scores[x], x + 1)
        }

    }

    const startButton = document.querySelector('.start');
    startButton.addEventListener('click', startGame);

    function startGame() {
        const startScreen = document.querySelector('.start-screen');
        startScreen.remove();
        timer = setInterval(() => putPizzaOnScreen(), 500);
    }

    writeAllScores()
}
)();

