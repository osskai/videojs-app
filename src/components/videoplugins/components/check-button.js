import videojs from "video.js"
import Quiz from "@/components/videoplugins/utils/quizlib";

let Button = videojs.getComponent("Button");
let CheckButton = videojs.extend(Button, {
    constructor: function (player, options) {
        Button.apply(this, arguments)
    },
    createEl: function () {
        let el = videojs.dom.createEl('button', {
            className: 'vjs-quiz-check fa fa-check-square'
        });
        videojs.dom.appendContent(el, " check");

        return el;
    },
    handleClick: function (event) {
        let quiz = new Quiz('quiz-div', ['a']);
        // checkAnswers returns true if all questions have been answered and updates the result object
        if (quiz.checkAnswers(true)) {
            quiz.highlightResults((quiz, question, no, correct) => {
                if (!correct) {
                    let answers = question.getElementsByTagName('input');
                    for (let i = 0; i < answers.length; i++) {
                        if (answers[i].type === "checkbox" || answers[i].type === "radio"){
                            // If the current input element is part of the correct answer, highlight it
                            if (quiz.answers[no].indexOf(answers[i].value) > -1) {
                                answers[i].parentNode.classList.add(Quiz.Classes.CORRECT);
                            }
                        } else {
                            // If the input is anything other than a checkbox or radio button, show the correct answer next to the element
                            let correctAnswer = document.createElement('span');
                            correctAnswer.classList.add(Quiz.Classes.CORRECT);
                            correctAnswer.classList.add(Quiz.Classes.TEMP); // quiz.checkAnswers will automatically remove elements with the temp class
                            correctAnswer.innerHTML = quiz.answers[no];
                            correctAnswer.style.marginLeft = '10px';
                            answers[i].parentNode.insertBefore(correctAnswer, answers[i].nextSibling);
                        }
                    }
                }
            });
        }
    }
});

videojs.registerComponent("CheckButton", CheckButton);
export default CheckButton;