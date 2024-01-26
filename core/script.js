let backButtonClicked = false;
let correctAnswersCount = 0;  // เพิ่มตัวแปรเก็บจำนวนข้อที่ตอบถูก
let IncorrectAnswersCount = 0;
let confettiDisplayed = false;  // เพิ่มตัวแปรเพื่อตรวจสอบว่า Confetti ถูกแสดงหรือไม่
function toggleMenu() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navList = document.querySelector('.nav-list');
            menuToggle.classList.toggle('active');
            navList.classList.toggle('show');
        }
    
    let currentQuestionIndex = -1;

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }


    function toggleBackground() {
        const switchElement = document.getElementById('switch');
        const options = document.getElementsByClassName('option');

        if (switchElement.checked) {
            // ถ้า switch ถูกเปิด
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                if (option.textContent === questions[currentQuestionIndex].correctAnswer) {
                    option.classList.add('green-background');
                }
            }
        } else {
            // ถ้า switch ถูกปิด
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                option.classList.remove('green-background');
            }
        }
    }

    const totalQuestions = questions.length;

    function displayQuestion() {
        if (backButtonClicked) {
            currentQuestionIndex = (currentQuestionIndex - 1 + totalQuestions) % totalQuestions;
            correctAnswersCount--;
        } else {
            currentQuestionIndex = (currentQuestionIndex + 1) % totalQuestions;  // ใช้ totalQuestions แทน questions.length
            correctAnswersCount++;
        }
        const currentQuestion = questions[currentQuestionIndex];     
        backButtonClicked = false; // Reset the flag

        document.getElementById('options-container').innerHTML = '';
        document.getElementById('question-title').innerHTML = currentQuestion.question;
        document.getElementById('current-question-number').textContent = currentQuestionIndex + 1;
            document.getElementById('total-questions').textContent = totalQuestions;  // อัปเดตจำนวนข้อทั้งหมด

        currentQuestion.options = shuffleArray(currentQuestion.options);

        document.getElementById('back-button').style.display = (currentQuestionIndex > 0) ? 'block' : 'none';

        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => checkAnswer(index));
            document.getElementById('options-container').appendChild(optionElement);

            // ตรวจสอบถ้าเป็น correctAnswer ให้เพิ่ม class สีเขียวตรงนี้
            if (option === currentQuestion.correctAnswer && document.getElementById('switch').checked) {
                optionElement.classList.add('green-background');
            }
        });


        document.getElementById('result').textContent = '';
    }



    function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.options.findIndex(option => option === currentQuestion.correctAnswer);
    document.getElementById('question-title').innerHTML = currentQuestion.question;

    const resultElement = document.getElementById('result');
    if (selectedIndex === correctIndex) {
        resultElement.textContent = 'Correct!';
        resultElement.classList.remove('incorrect');

        if (correctAnswersCount === totalQuestions & IncorrectAnswersCount === 0) {
            displayCelebration();  // Trigger celebration effect
        } else {
            setTimeout(displayQuestion, 1000);
        }

        if (correctAnswersCount === totalQuestions) {
            correctAnswersCount = 0;  // รีเซ็ต correctAnswersCount สำหรับการทดลองในอนาคต
            IncorrectAnswersCount = 0;           
        }
    } else {
        resultElement.textContent = 'Incorrect! Try again.';
        resultElement.classList.add('incorrect');
        IncorrectAnswersCount = IncorrectAnswersCount + 1;
    }
}

    // Display the first question
    displayQuestion();

    function goBack() {
        backButtonClicked = true;
            displayQuestion();
    }


    // ตรวจสอบการเปิด Developer Tools
    function checkDevTools() {
        const isOpen = () => {
            const element = new Image();
            element.__defineGetter__('id', () => {
                console.log('Developer Tools is open!');
                // ทำบางสิ่งที่คุณต้องการทำเมื่อ Developer Tools ถูกเปิด
            });
            console.clear();
            console.log('%c', element);
        };

        setInterval(isOpen, 1000);
    }

    // เรียกใช้งานฟังก์ชัน checkDevTools
    checkDevTools();




// Function เพิ่ม effect Confetti
function addConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.id = 'confetti-container';
    document.body.appendChild(confettiContainer);

    // สร้าง Confetti
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.animationDuration = Math.random() * 2 + 1 + 's';
        confetti.style.opacity = Math.random();
        confettiContainer.appendChild(confetti);
    }

    // ลบ Confetti หลังจาก animation เสร็จสิ้น
    setTimeout(() => {
        document.body.removeChild(confettiContainer);
        congratsEffect.style.transition = 'opacity 1s ease-in-out';
        congratsEffect.style.opacity = '0';  // ทำให้ opacity เป็น 0 เพื่อให้หายไป
    }, 10000);
}

// Function สุ่มสี
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function แสดงประกาศยินดีพร้อม Effect Confetti
function displayCelebration() {
    // เพิ่ม effect แสดงประกาศยินดี
    const congratsEffect = document.createElement('div');
    congratsEffect.id = 'congratulation-effect';
    congratsEffect.textContent = 'Congratulations!';  // ข้อความประกาศยินดี
    congratsEffect.style.position = 'absolute';
    congratsEffect.style.top = '100px';
    congratsEffect.style.font = 'Prompt';
    document.body.appendChild(congratsEffect);

    // เพิ่ม effect Confetti
    addConfetti();

    // รีเซ็ต correctAnswersCount และ แสดง effect ลงทะเบียน
    setTimeout(() => {
        document.body.removeChild(congratsEffect);
        correctAnswersCount = 0;  // รีเซ็ต correctAnswersCount สำหรับการทดลองในอนาคต
        IncorrectAnswersCount = 0;
        displayQuestion();  // ดำเนินการไปที่คำถามถัดไป
    },6000);
}

