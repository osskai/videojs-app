import videojs from "video.js"

let TipTree = function () {
    this.tree = this.createTree();
};

TipTree.prototype.createTree = function () {
    return videojs.dom.createEl('ul', { }, {
        id: "tree-id"
    });
};

TipTree.prototype.addNode = function (parent, children) {
    let parent_node = videojs.dom.createEl('li', {});

    let parent_span = videojs.dom.createEl('span', {
        className: 'caret'
    });
    videojs.dom.appendContent(parent_span, parent);

    parent_span.style.fontSize = "16px";
    parent_span.style.color = "black";
    parent_node.appendChild(parent_span);

    let ul = videojs.dom.createEl('ul', {
        className: 'nested'
    });
    for (let i = 0; i < children.length; i++) {
        let li = videojs.dom.createEl('li', { });
        videojs.dom.appendContent(li, children[i]);
        li.style.fontSize = "16px";
        li.style.color = "black";
        ul.appendChild(li);
    }

    parent_node.appendChild(ul);
    this.tree.appendChild(parent_node);
};

export default TipTree;