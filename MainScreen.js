var sceneConfig = {
    key: 'mainScreen',
    pack: {
        files: [{
            type: 'plugin',
            key: 'rexwebfontloaderplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js',
            start: true
        }]
    }
};

var numberButtons = 3;
var numbersOfGreenBall = 5;
var arrayGreenBall;
var posXGreenBall1 = 479;
var posYGreenBall = 21;
var arrayButton;
var posYButton1 = 162;
var arrayTextAnswer;
var arrayAnswer;
var posYAnswer1 = 137;
var number1;
var number2;
var operator = ['+', '-'];
var rdOperator;
var correctAnswer;
var inputBox;
var inputNumber;
var inputNumber2;
var numbersOfInput;

class MainScreen extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    preload() {
        // load editor
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js';
        this.load.plugin('rexbbcodetextplugin', url, true);
      
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js';
        this.load.plugin('rextexteditplugin', url, true);

        // load font 
        this.plugins.get('rexwebfontloaderplugin').addToScene(this);

        var configFont = {
            google: {
                families: ['PT Sans', 'Noto Sans']
            }
        };
        this.load.rexWebFont(configFont);

        // load images
        this.load.image('mainBox', 'assets/images/mainBox.png');
        this.load.image('greenBall', 'assets/images/greenBall.png');
        this.load.image('bar', 'assets/images/bar.png');
        this.load.spritesheet('button', 'assets/images/buttonsprite.png', {
            frameWidth: 432,
            frameHeight: 80
        });
        this.load.image('inputBox', 'assets/images/inputBox.png');
    }

    create() {

        // box 
        this.box = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY-75, 'mainBox');

        //start button


        // back button
        this.backButton = this.add.text(277, 23, '< Back', {
            fontFamily: 'Noto Sans',
            color: '#5280b7',
            fontSize: '18px'
        });
        var color1 = '#83d5d4';
        var color2 = '#5280b7';
        this.backButton.on('pointerover', () => { this.backButton.setColor(color1); }).setInteractive({cursor: 'pointer'});
        this.backButton.on('pointerout', () => { this.backButton.setColor(color2); }).setInteractive({cursor: 'pointer'});

        // bar
        this.bar = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY-356, 'bar');

        // green ball
        arrayGreenBall = new Array('greenBall');
        for (let i=0; i<numbersOfGreenBall; ++i) {
            arrayGreenBall[i] = this.add.image(posXGreenBall1 += 23, posYGreenBall, 'greenBall').setOrigin(0, 0);
        }

        // language
        this.language = this.add.text(1110, 23, 'English', {
            fontFamily: 'Noto Sans',
            color: '#5280b7',
            fontSize: '18px'
        });
        this.language.on('pointerover', () => { this.language.setColor(color1); }).setInteractive({cursor: 'pointer'});
        this.language.on('pointerout', () => { this.language.setColor(color2); }).setInteractive({cursor: 'pointer'});

        this.initial();
    
    }

    textAreaChanged() {
        var text = this.formUtil.getTextAreaValue("area51");
        console.log(text);
    }

    initial() {
        // input number
        inputNumber = this.add.text(0, 0, ' ');
        inputNumber2 = this.add.text(0, 0, ' ');
        numbersOfInput = 0;

        //
        posYButton1 = 162;
        posYAnswer1 = 137;

        // question 
        rdOperator = Phaser.Math.Between(0, 1);
        if (rdOperator == 0) {
            do {
                number1 = Phaser.Math.Between(10, 50);
                number2 = Phaser.Math.Between(10, 50);
            } while (number1 % 10 == 0 || number2 % 10 == 0);    
        } else {
            do {
                number1 = Phaser.Math.Between(10, 50);
            } while (number1 % 10 == 0);
            do {
                number2 = Phaser.Math.Between(10, 50);
            } while (number2 % 10 == 0 || (number1 - number2) <= 9);
        }
        this.numberQuestion = this.add.text(config.width/2-107, config.height/8-20, number1 + ' ' + operator[rdOperator] + ' ' + number2 + ' = ', {
                    fontFamily: 'PT Sans',
                    fontSize: '45px',
                    color: '#000000'
        });
        this.questionMark = this.add.text(config.width/2 + 87, config.height/8-20, '?', {
            fontFamily: 'PT Sans',
            fontSize: '45px',
            color: '#000000'
        });

        // answer correct
        if (rdOperator == 0) correctAnswer = number1 + number2;
        else correctAnswer = number1 - number2;

        // question text
        this.textQuestion = this.add.text(config.width/3.5-8, config.height/4-40, 'How would you solve the equation?', {
            fontFamily: 'PT Sans',
            fontSize: '42px',
            color: '#000000'
        });

        // button answer
        arrayButton = new Array('button');
        arrayTextAnswer = new Array();
        arrayAnswer = new Array();
        for (let i=0; i<numberButtons; ++i) {
            arrayButton[i] = this.add.sprite(this.cameras.main.centerX, posYButton1 += 90, 'button').setInteractive({cursor: 'pointer'});
            if (rdOperator == 0) {
                arrayTextAnswer[i] = this.add.text(config.width/2-90, posYAnswer1 += 90, (number1-number1%10+number2-number2%10)+' '+operator[rdOperator]+' '+number1%10+' '+operator[(rdOperator+1)%2]+' '+number2%10, {
                    fontFamily: 'PT Sans',
                    fontSize: '45px',
                    color: '#000000'
                });
                arrayAnswer[i] = (number1-number1%10+number2-number2%10) + number1%10 + number2%10;
            } else {
                arrayTextAnswer[i] = this.add.text(config.width/2-90, posYAnswer1 += 90, (number1-number1%10-number2+number2%10)+' '+operator[(rdOperator+1)%2]+' '+number1%10+' '+operator[rdOperator]+' '+number2%10, {
                    fontFamily: 'PT Sans',
                    fontSize: '45px',
                    color: '#000000'
                });
                arrayAnswer[i] = (number1-number1%10-number2+number2%10) + number1%10 - number2%10;
            }
            
        }

        for (let j=0; j<numberButtons; ++j) {
            arrayButton[j].on('pointerover', () => {
                arrayButton[j].setFrame(1)
            });

            arrayButton[j].on('pointerout', () => {
                arrayButton[j].setFrame(0)
            });

            arrayButton[j].on('pointerdown', () => {
                this.printStatus(j);
            });
        }
        
    }

    clearSceneFirst(index) {
        this.textQuestion.destroy();
        this.questionMark.destroy();
        for (let i=0; i<numberButtons; ++i) {
            arrayButton[i].destroy();
            if (i != index) {
                arrayTextAnswer[i].destroy();
            }
        }
        
    }

    clearSceneSecond(index) {
        this.numberQuestion.destroy();
        inputBox.destroy();
        inputNumber.destroy();
        inputNumber2.destroy();
        arrayTextAnswer[index].destroy();
    }

    checkButtonAnswer(index) {
        if (arrayAnswer[index] === correctAnswer) {
            console.log('arryAnswer = '+arrayAnswer[index]);
            console.log('correctAnswer = '+correctAnswer);
            return true;
        }
        else {
            console.log('arryAnswer = '+arrayAnswer[index]);
            console.log('correctAnswer = '+correctAnswer);
            return false;
        }
    }

    printStatus(index) {
        if (this.checkButtonAnswer(index)) {
            arrayButton[index].setFrame(3);
            this.time.addEvent({
                delay: 1500,
                callback: () => {
                    arrayButton[index].setFrame(0);
                    this.clearSceneFirst(index);
                    this.textMove(index);
                },
                loop: false
            });
        } else {
            arrayButton[index].setFrame(2);
            this.time.addEvent({
                delay: 1500,
                callback: () => {
                    arrayButton[index].setFrame(0);
                },
                loop: false
            })
        }
    }

    textMove(index){
        this.numberQuestion.x -= 130;
        arrayTextAnswer[index].x += 45;
        arrayTextAnswer[index].y -= 150 + index*90;
        arrayTextAnswer[index].text += " = ";
        
        inputBox = this.add.image(config.width/2+180, config.height/8-27, 'inputBox').setOrigin(0, 0);
        
        this.input.keyboard.on('keydown', function (event) {
            if (event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4 || event.key == 5 ||
                event.key == 6 || event.key == 7 || event.key == 8 || event.key == 9 || event.key == 0)
            {
                if (numbersOfInput == 0) {
                    if (event.key == Math.floor(correctAnswer/10)) {
                        console.log(Math.floor(correctAnswer/10));
                        inputNumber.destroy();
                        inputNumber = this.add.text(config.width/2+195, config.height/8-18, Math.floor(correctAnswer/10), {
                            fontFamily: 'PT Sans',
                            color: '#000000',
                            fontSize: '45px',
                        });
                        numbersOfInput ++;
                    } else {
                        console.log(event.key);
                        inputNumber.destroy();
                        inputNumber = this.add.text(config.width/2+195, config.height/8-18, event.key, {
                            fontFamily: 'PT Sans',
                            color: 'red',
                            fontSize: '45px',
                        });
                        
                    }
                } else {
                    if (event.key == correctAnswer%10) {
                        console.log(correctAnswer%10);
                        inputNumber.destroy();
                        inputNumber2.destroy();
                        inputNumber = this.add.text(config.width/2+195, config.height/8-18, Math.floor(correctAnswer/10) + ' ' + correctAnswer%10, {
                            fontFamily: 'PT Sans',
                            color: '#000000',
                            fontSize: '45px',
                        });  
                       
                        this.time.addEvent({
                            delay: 1500,
                            callback: () => {
                                this.clearSceneSecond(index);
                                this.initial();
                            }
                        })
                         
                    } else {
                        console.log(event.key);
                        inputNumber.destroy();
                        inputNumber2.destroy();
                        inputNumber2 = this.add.text(config.width/2+195, config.height/8-18, Math.floor(correctAnswer/10), {
                            fontFamily: 'PT Sans',
                            color: '#000000',
                            fontSize: '45px',
                        });
                        inputNumber = this.add.text(config.width/2+228, config.height/8-18,  event.key, {
                            fontFamily: 'PT Sans',
                            color: 'red',
                            fontSize: '45px',
                        });
                    }
                }
                
            } else {
                console.log('Input a number!!!');
            }
            
        }, this);
        
        
        
        
    }

    inputAnswer(event) {

    }

    update() {

    }
}