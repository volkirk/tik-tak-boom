tikTakBoom = {
    init(
        tasks,
        timerField,
        gameStatusField,
        textFieldQuestion,
        textFieldAnswer1,
        textFieldAnswer2,
        btnStart,
        btnStop
    ) {
        // this.boomTimer = parseInt(prompt('Введите количество времени на игру'));
        // this.countOfPlayers = parseInt(prompt('Введите количество игроков'));
        this.boomTimer = 30;
        this.countOfPlayers= 3;
        this.tasks = JSON.parse(tasks);
        this.timerField = timerField;
        this.gameStatusField = gameStatusField;
        this.textFieldQuestion = textFieldQuestion;
        this.textFieldAnswer1 = textFieldAnswer1;
        this.textFieldAnswer2 = textFieldAnswer2;
        this.btnStart = btnStart;
        this.btnStop = btnStop;
        this.needRightAnswers = 3;
    },
    // start(){
    //     this.btnStart.addEventListener('click', this.run());
    // },
    run() {
        this.oldState=1;
        this.state = 1;
        this.mainTimerFlag=true;
        this.rightAnswers = 0;
        this.beforeTimer();
        // setTimeout(() => this.turnOn(),5000);
        // setTimeout(() => this.timer(), 5000);

    },

    turnOn() {
        
        this.gameStatusField.innerText = `Вопрос игроку №${this.state}`;

        const taskNumber = randomIntNumber(this.tasks.length - 1);
        this.printQuestion(this.tasks[taskNumber]);

        this.tasks.splice(taskNumber, 1);
       

        //  this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
        if (this.state===this.countOfPlayers) {
            this.state=1;
        }
        else {
            this.oldState=this.state;
            this.state=this.state+1;
        }
       
    },

    turnOff(value) {
        if (this.currentTask[value].result) {
            this.gameStatusField.innerText = 'Верно!';
            this.rightAnswers += 1;
            this.boomTimer=this.boomTimer+5;
        } else {
            this.gameStatusField.innerText = 'Неверно!';
            this.boomTimer=this.boomTimer-5;
        }
        if (this.rightAnswers < this.needRightAnswers) {
            if (this.tasks.length === 0) {
                this.finish('lose');
            } else {
                this.turnOn();
            }
        } else {
            this.finish('won');
        }

        if (this.oldState!=this.state) {
            this.mainTimerFlag=false;
            this.beforeTimer();
        }

        this.textFieldAnswer1.removeEventListener('click', answer1);
        this.textFieldAnswer2.removeEventListener('click', answer2);
    },

    printQuestion(task) {
        this.textFieldQuestion.innerText = task.question;
        this.textFieldAnswer1.innerText = task.answer1.value;
        this.textFieldAnswer2.innerText = task.answer2.value;

        this.textFieldAnswer1.addEventListener('click', answer1 = () => this.turnOff('answer1'));
        this.textFieldAnswer2.addEventListener('click', answer2 = () => this.turnOff('answer2'));

        this.currentTask = task;
    },

    finish(result = 'lose') {
        this.mainTimerFlag=false;
        if (result === 'lose') {
            this.gameStatusField.innerText = `Вы проиграли!`;
        }
        if (result === 'won') {
            this.gameStatusField.innerText = `Вы выиграли!`;
        }

        this.textFieldQuestion.innerText = ``;
        this.textFieldAnswer1.innerText = ``;
        this.textFieldAnswer2.innerText = ``;

        console.log(this);
    },

    timer() {
        if (this.mainTimerFlag) {
            this.boomTimer -= 1;
            let sec = this.boomTimer % 60;
            let min = (this.boomTimer - sec) / 60;
            sec = (sec >= 10) ? sec : '0' + sec;
            min = (min >= 10) ? min : '0' + min;
            this.timerField.innerText = `${min}:${sec}`;

            if (this.boomTimer > 0) {
                setTimeout(
                    () => {
                        this.timer()
                    },
                    1000,
                )
            } else {
                this.finish('lose');
            }
        }
    },
    
    j:4,

    beforeTimer() {
		var i = this.j;
		this.timeClear = setInterval(() => {
			this.gameStatusField.innerText = `Игроку ${this.state} приготовиться...${i}`;
			i--;
			if (i < 0) {
                clearInterval(this.timeClear); 
                this.mainTimerFlag=true;
                this.timer();
                this.turnOn();
			}
        }, 1000);
        
	}
}
