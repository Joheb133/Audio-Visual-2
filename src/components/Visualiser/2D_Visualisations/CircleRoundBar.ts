//A circle made with round rectangles
export class CircleRoundBar {
    constructor(
        private ctx: CanvasRenderingContext2D,
        private analyser: AnalyserNode,
        private width: number = 2,
        private height: number = 2) {

        this.ctx = ctx;
        this.analyser = analyser;
        this.analyser.fftSize = 512;
        this.width = width;
        this.height = height;
    }
    updateSize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.draw()
    }
    draw() {
        const ctx = this.ctx;
        const width = this.width;
        const height = this.height;

        ctx.clearRect(0, 0, width, height);

        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);

        const maxRadius = width < height ? width : height //get smallest dimension

        //bass
        const bassBins = dataArray.slice(0, dataArray.length / 4)
        const bassAmp = bassBins.reduce((sum, value) => sum + value, 0) / bassBins.length

        const centerX = width / 2;
        const centerY = height / 2;
        const barWidth = width / bufferLength;
        const angleIncrement = (2 * Math.PI) / dataArray.length;

        function drawCircle(i: number, toggleSign: number) {
            const element = dataArray[i]
            const angle = (i + 1 / 2) * (angleIncrement * toggleSign) + (Math.PI / 2)
            const x = centerX + (maxRadius / 4) * Math.cos(angle);
            const y = centerY + (maxRadius / 4) * Math.sin(angle);
            const rotation = angle - Math.PI / 2;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);

            ctx.beginPath();
            ctx.roundRect(-barWidth / 2, bassAmp / 5, barWidth / 2, (element / 2) + (barWidth / 2), [barWidth]);
            ctx.closePath()
            ctx.fillStyle = `hsl(${2 * i}, 100%, 70%)`
            // ctx.fillStyle = `hsl(271, 80%, ${i % 2 === 0 ? 50 : 60}%)`
            ctx.fill();
            ctx.restore();
        }

        for (let i = 0; i < dataArray.length / 2; i++) {
            drawCircle(i, 1)
        }

        for (let i = 0; i < dataArray.length / 2; i++) {
            drawCircle(i, -1)
        }

    }
}