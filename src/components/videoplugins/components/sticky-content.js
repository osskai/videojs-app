import videojs from "video.js"
import CheckButton from "@/components/videoplugins/components/check-button";

let Component = videojs.getComponent("Component");
let StickyContent = videojs.extend(Component, {
    constructor: function (player, options) {
        Component.apply(this, arguments);
    },
    createEl: function () {
        let container = videojs.dom.createEl('div', {
            className: 'vjs-sticky-content',
            id: 'quiz-div'
        });
        let quiz_container = videojs.dom.createEl('div', {
            className: 'card quizlib-question'
        });
        // title
        let quiz_title = videojs.dom.createEl('div', {
            className: 'quizlib-question-title'
        });
        videojs.dom.appendContent(quiz_title, "1. Your enemy's father...");
        quiz_container.appendChild(quiz_title);
        // answers
        let quiz_answers = videojs.dom.createEl('div', {
            className: 'quizlib-question-answers'
        });
        // option 1
        let label_1 = videojs.dom.createEl('label', {
            className: 'quizlib-question-label',
        });
        let option_1 = videojs.dom.createEl('input', { }, {
            type: 'radio',
            name: 'q1',
            value: 'a'
        });
        label_1.appendChild(option_1);
        videojs.dom.appendContent(label_1, " Option 1");
        quiz_answers.appendChild(label_1);
        quiz_answers.appendChild(videojs.dom.createEl('br'));
        // option 2
        let label_2 = videojs.dom.createEl('label', {
            className: 'quizlib-question-label'
        });
        let option_2 = videojs.dom.createEl('input', { }, {
            type: 'radio',
            name: 'q1',
            value: 'b'
        });
        label_2.appendChild(option_2);
        videojs.dom.appendContent(label_2, " Option 2");
        quiz_answers.appendChild(label_2);

        quiz_container.appendChild(quiz_answers);
        container.appendChild(quiz_container);

        let check = new CheckButton(this.player_, {});
        container.appendChild(check.el());

        return container
    },
});

videojs.registerComponent("StickyContent", StickyContent);
export default StickyContent;