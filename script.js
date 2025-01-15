// Create a new Phaser game instance
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);

// Timer variables
let timer = 300; // Start with 5 minutes (300 seconds)
let timerText;
let countdownActive = false;
let countdownAccumulator = 0;

function preload() {
    this.load.image('background', 'assets/LIKE_AND_SUBSCRIBE_TO_MY_YOUTUBE_FOLLOW_MY_TWITCH.png');
}

function create() {
    const bg = this.add.image(960, 540, 'background');
    bg.setOrigin(0.5);

    bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Display timer
    timerText = this.add.text(960, 540, formatTime(timer), {
        fontSize: '216px',
        color: '#100c08',
        fontFamily: 'Impact',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Keyboard input
    this.input.keyboard.on('keydown', (event) => {
        if (event.code === 'ArrowUp') {
            timer = Math.min(timer + 30, 3599); // Add 30 seconds, max 59:59
            updateTimerText();
        } else if (event.code === 'ArrowDown') {
            timer = Math.max(timer - 30, 0); // Subtract 30 seconds, min 0
            updateTimerText();
        } else if (event.code === 'ArrowRight') {
            countdownActive = true; // Start timer
        } else if (event.code === 'ArrowLeft') {
            resetTimer(); // Reset timer
        }
    });
}

function update(time, delta) {
    if (countdownActive && timer > 0) {
        countdownAccumulator += delta;

        // Update timer every 1000ms (1 second)
        if (countdownAccumulator >= 1000) {
            countdownAccumulator -= 1000;
            timer -= 1;

            if (timer <= 0) {
                timer = 0;
                countdownActive = false; // Stop countdown when it reaches zero
            }

            updateTimerText();
        }
    }
}

function updateTimerText() {
    timerText.setText(formatTime(timer));
}

function resetTimer() {
    timer = 300; // Reset to 5 minutes
    countdownActive = false;
    countdownAccumulator = 0; // Reset accumulated delta
    updateTimerText();
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
// Countdown Timer by doubletrouble83
