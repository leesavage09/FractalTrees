import React from 'react';

class Canvas extends React.PureComponent {

    colTreeBark = "rgb(55,38,25)";
    colTreeShadow = "rgba(65,48,25,0.75)";
    colFruit = "rgb(224,93,0)";
    colFruitShadow = "rgba(0,0,0,0.75)";

    constructor(props) {
        super(props);
        this.ctx = { ctx: null };
    }

    componentDidMount() {
        this.ctx = this.refs.canvas.getContext("2d");
    }

    createTree() {
        if (this.ctx === null) return;
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.ctx.clearRect(0, 0, 2000, 2000);
            let angle = 0;
            let startX = 500;
            let startY = 1000;
            this.draw(startX, startY, this.props.initLength, angle, this.props.initWidth);
        }, 50);
    }

    render() {
        this.createTree();
        return (
            <canvas ref="canvas" width='1000' height='1000' className="treeCanvas" />
        )
    }

    draw(startX, startY, len, angle, branchWidth, ctx = this.ctx) {
        ctx.save();
        var bend = this.randValue(this.props.nextBendMin, this.props.nextBendMax);
        var nextWidth = branchWidth * this.randValue(this.props.nextWidthMin, this.props.nextWidthMax);

        ctx.translate(startX, startY);
        ctx.rotate(angle * Math.PI / 180);
        this.drawBranch(len, branchWidth, nextWidth, bend);
        ctx.translate(0, -len);

        if (branchWidth < 1) {
            this.drawLeaf();
            this.drawFruit()
        }

        if (len < 7) {
            ctx.restore();
            return;
        }

        var numBranch = 0;
        if (this.booleanPercent(this.props.deathMax)) {
            numBranch = numBranch + 1;
            angle = this.randValue(this.props.nextAngleMin, this.props.nextAngleMax);
            var length = len * this.randValue(this.props.nextLengthMin, this.props.nextLengthMax);
            this.draw(0, 0, length, angle, nextWidth);
        }
        var width = nextWidth * this.randValue(this.props.nextWidthMin, this.props.nextWidthMax);
        if (this.booleanPercent(this.props.deathSideMax)) {
            numBranch = numBranch + 1;
            angle = this.randValue(this.props.nextSideAngleMin, this.props.nextSideAngleMax);
            length = len * this.randValue(this.props.nextLengthMin, this.props.nextLengthMax);
            this.draw(0, 0, length, -angle, width);
        }
        width = nextWidth * this.randValue(this.props.nextWidthMin, this.props.nextWidthMax);
        if (this.booleanPercent(this.props.deathSideMax)) {
            numBranch = numBranch + 1;
            angle = this.randValue(this.props.nextSideAngleMin, this.props.nextSideAngleMax);
            length = len * this.randValue(this.props.nextLengthMin, this.props.nextLengthMax);
            this.draw(0, 0, length, angle, width);
        }

        if (numBranch !== 0) {
            this.drawSproutNode(0, 0, nextWidth);
        }

        ctx.restore();
    }

    drawFruit(ctx = this.ctx) {
        if (!this.booleanPercent(this.props.fruit)) return;
        ctx.beginPath();
        ctx.shadowColor = this.colFruitShadow;
        ctx.fillStyle = this.colFruit;
        ctx.arc(0, 2.5, 3, 0, 2 * Math.PI);
        ctx.stroke();
        if (!this.props.wireframe) ctx.fill();
    }

    drawLeaf(ctx = this.ctx) {
        if (!this.booleanPercent(this.props.leaf)) return;
        ctx.beginPath();
        var r = Math.floor((Math.random() * 10) + 0);
        var g = Math.floor((Math.random() * 80) + 50);
        var b = Math.floor((Math.random() * 10) + 0);
        ctx.shadowColor = "rgb(0,0,0,0.75)";
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.arc(-8, 0, 8, 0, 0.5 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        if (!this.props.wireframe) ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 8, 8, 1 * Math.PI, 1.5 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        if (!this.props.wireframe) ctx.fill();
    }

    drawSproutNode(x, y, width, ctx = this.ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.colTreeBark;
        ctx.arc(x, y, width / 2, 0, 2 * Math.PI);
        ctx.stroke();
        if (!this.props.wireframe) ctx.fill();
    }

    drawBranch(len, branchWidth, nextWidth, bend, ctx = this.ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.colTreeBark;
        ctx.fillStyle = this.colTreeBark;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.colTreeShadow;

        let topRightX = 0 + (nextWidth / 2);
        let topRightY = -len;
        let topLeftX = 0 - (nextWidth / 2);
        let topLeftY = -len;

        let bottomRightX = branchWidth / 2;
        let bottomRightY = 0;
        let bottomLeftX = 0 - (branchWidth / 2);
        let bottomLeftY = 0;

        let bendLeft = this.getRandomBool();

        ctx.moveTo(topRightX, topRightY);

        if (bend !== 0) {
            if (bendLeft) {
                ctx.bezierCurveTo(topRightX, topRightY, (topRightX) + (topRightY / bend), topRightY / 2, bottomRightX, bottomRightY);
            } else {
                ctx.bezierCurveTo(topRightX, topRightY, (topRightX) + (-topRightY / bend), topRightY / 2, bottomRightX, bottomRightY);
            }
            ctx.lineTo(bottomLeftX, bottomLeftY);
            if (bendLeft) {
                ctx.bezierCurveTo(bottomLeftX, bottomLeftY, (topLeftX) + (topRightY / bend), topRightY / 2, topLeftX, topLeftY);
            } else {
                ctx.bezierCurveTo(bottomLeftX, bottomLeftY, (topLeftX) + (-topRightY / bend), topRightY / 2, topLeftX, topLeftY);
            }
        } else {
            ctx.lineTo(topLeftX, topLeftY);
            ctx.lineTo(bottomLeftX, bottomLeftY);
            ctx.lineTo(bottomRightX, bottomRightY);
        }

        ctx.closePath();
        ctx.stroke();
        if (!this.props.wireframe) ctx.fill();
    }

    /**
    * @param {number} per - a number between 0 and 100
    * @return {boolean} returns true 'per%' of the time
    */
    booleanPercent(per) {
        per = per > 100 ? 100 : per;
        per = per > 0 ? per : 0;
        per = per / 100;
        return Math.random() < per;
    }

    /**
    * @param {number} min - number
    * @param {number} max - number
    * @return {number} returns any number between the two numbers
    */
    randValue(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * @return {boolean} returns true half the time
     */
    getRandomBool() {
        return Math.random() <= 0.5;
    }
    
}
export default Canvas