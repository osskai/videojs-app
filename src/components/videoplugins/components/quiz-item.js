import videojs from 'video.js'

let ClickableComponent = videojs.getComponent("ClickableComponent");
// quiz item
let QuizItem = videojs.extend(ClickableComponent, {
    constructor: function (player, options) {
        ClickableComponent.apply(this, arguments);
    },
    createEl: function () {
        let container = videojs.dom.createEl('div', {
            className: this.options_.class
        });
        // label
        let label = videojs.dom.createEl('label', {
            className: 'quizlib-question-label'
        });
        // button
        let button = videojs.dom.createEl('input', { }, {
            type: this.options_.type,
            name: this.options_.name,
            value: this.options_.value
        });
        label.appendChild(button);
        videojs.dom.appendContent(label, 'options..');
        container.appendChild(label);

        let text = videojs.dom.createEl('textarea', {
            className: 'quizlib-question-text'
        }, {
            rows: '2',
            cols: '20',
            id: "story",
            name: "story"
        });
        text.style.display = 'none';
        // event
        text.addEventListener('blur', (event) => {
            videojs.dom.insertContent(label, text.value);

            label.style.display = '';
            text.style.display = 'none';
        }, false);

        container.appendChild(text);
        // event
        container.addEventListener('dblclick', (event) => {
            console.log('dbclick');
            event.stopImmediatePropagation();

            label.style.display = 'none';
            text.style.display = 'block';
        }, false);

        return container;
    },
    handleClick: function (event) {
        console.log('click');
        event.stopImmediatePropagation();
    }
});

videojs.registerComponent("QuizItem", QuizItem);