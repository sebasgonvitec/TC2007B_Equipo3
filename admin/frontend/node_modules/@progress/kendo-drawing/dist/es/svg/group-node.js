import Node from './node';

var GroupNode = (function (Node) {
    function GroupNode () {
        Node.apply(this, arguments);
    }

    if ( Node ) GroupNode.__proto__ = Node;
    GroupNode.prototype = Object.create( Node && Node.prototype );
    GroupNode.prototype.constructor = GroupNode;

    GroupNode.prototype.template = function template () {
        return ("<g" + (this.renderId() + this.renderTransform() + this.renderStyle() + this.renderOpacity() + this.renderDefinitions()) + ">" + (this.renderChildren()) + "</g>");
    };

    GroupNode.prototype.optionsChange = function optionsChange (e) {
        if (e.field === "transform") {
            this.transformChange(e.value);
        }

        Node.prototype.optionsChange.call(this, e);
    };

    return GroupNode;
}(Node));

export default GroupNode;
