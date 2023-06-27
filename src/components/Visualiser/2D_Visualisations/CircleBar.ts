//A circle made with rectangles
export class CircleBar {
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

        const centerX = width / 2;
        const centerY = height / 2;
        const barWidth = width / bufferLength;
        const angleIncrement = (2 * Math.PI) / dataArray.length;

        for (let i = 0; i < dataArray.length / 2 + 1; i++) {
            drawCircle(i, 1)
        }

        for (let i = 0; i < dataArray.length / 2; i++) {
            drawCircle(i, -1)
        }

        function drawCircle(i: number, toggleSign: number) {
            const element = dataArray[i]
            const angle = i * (angleIncrement * toggleSign) + (Math.PI / 2);
            const x = centerX + (maxRadius / 4) * Math.cos(angle);
            const y = centerY + (maxRadius / 4) * Math.sin(angle);
            const rotation = angle - Math.PI / 2;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);

            ctx.fillRect(-barWidth / 2, 0, barWidth, element / 2 + 5);
            ctx.restore();
        }

    }
}