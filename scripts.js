const gameSelect = document.querySelector('select[nachobingo-gamerselect]');
const resetButton = document.querySelector('button[nachobingo-reset]');
const bingoTitle = document.querySelector('h1#bingoTitle');
const bingoCard = document.querySelector('div#bingoCard');

gameSelect.addEventListener('change', handleGamerChoose);

function handleGamerChoose(event) {
    const key = event.target.value;
    const bingoid = bingoids.find((e) => e.key === key);
    const size = bingoid.options.length;
    bingoTitle.innerText = bingoid.title;
    bingoCard.innerHTML = '';

    let gameState = loadGameState(key, size);

    for (let i = 0; i < size; i++) {
        const option = bingoid.options[i];
        const div = document.createElement('div');
        div.innerText = option;
        bingoCard.appendChild(div);

        div.onclick = () => {
            div.classList.toggle('active');
            gameState[i] = !gameState[i];
            saveGameState(key, gameState);
            resetButton.disabled = !gameState.includes(true);
        };

        if (gameState[i]) {
            div.classList.toggle('active');
        }
    }

    resetButton.disabled = !gameState.includes(true);

    resetButton.onclick = () => {
        gameState = new Array(size).fill(false);
        saveGameState(key, gameState);
        bingoCard.querySelectorAll('div').forEach((e) => e.classList.remove('active'));
        resetButton.disabled = !gameState.includes(true);
    };
}

function loadGameState(key, size) {
    const existing = localStorage.getItem(key);
    if (existing === null) return new Array(size).fill(false);
    return JSON.parse(existing);
}

function saveGameState(key, state) {
    localStorage.setItem(key, JSON.stringify(state));
}

const bingoids = [
    {
        key: 'NachoToast',
        title: 'Nacho Bigno',
        options: [
            '"AUGHHHHH"',
            '"What the dog doin?"',
            '"Amogus"',
            '"Sus"',
            '"Imposter"',
            'Overwatch',
            'Minecraft Server',
            'Anything CompSci',
            'Fornite Dance',
            '"Which Liam"',
            'Bing Chilling',
            'Short',
            'Free Space',
            '"this truly says a lot about society"',
            '"ok buddy"',
            '"(cum) what???"',
            '"the palest example"',
            '"real (and true)"',
            'Bullying Daniel',
            'Albert Einstein',
            '"hee hee hee ha"',
            '"oooh aah ooh ahh"',
            'Whisper yelling past 10pm',
            'BTS Limited Edition 2021 Among Us hoodie',
            'Snoring sounds',
        ],
    },
    {
        key: 'Finn',
        title: 'Rhingo Bingo',
        options: [
            'I have a real name',
            'Bodily harm reference (I hope X occurs)',
            'Business studies',
            'Discussion of History from OBC prior',
            'I am the best (in some variation)',
            '"Good Good"',
            'huh guh guh guh guh guh',
            'Dad joke',
            'Rage quit Overwatch',
            'Sexual comment',
            'What do you mean "x"',
            'Strange comment (like completely unrelated)',
            'Free Space',
            'Music opinion',
            '"What the hell are you doing"',
            "Finn don't know",
            'Comment about Manlet (height)',
            'Complain about esports staff',
            '"Joke ruined (over)"',
            "That's literally not true (response to false thing)",
            'No followed by sarcastic comment',
            'Team Fortress 2 comment',
            '"Ruh roh"',
            'Tongue flicking noise',
            "Guess I'll go fuck myself then",
        ],
    },
];

bingoids.forEach(({ key }) => {
    const option = document.createElement('option');
    option.value = key;
    option.innerText = key;
    gameSelect.appendChild(option);
});

handleGamerChoose({ target: { value: bingoids[0].key } });
