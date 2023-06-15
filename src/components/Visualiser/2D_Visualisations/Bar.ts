export class Bar {
    constructor(private ctx: CanvasRenderingContext2D,
        private analyser: AnalyserNode,
        private width: number = 2,
        private height: number = 2) {

        this.ctx = ctx;
        this.analyser = analyser;
        this.analyser.fftSize = 2048;
        this.width = width;
        this.height = height;
    }
    update(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    draw() {
        const ctx = this.ctx;
        const width = this.width;
        const height = this.height;

        const bufferLength = this.analyser.frequencyBinCount;
        const barWidth = this.width / bufferLength;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);

        dataArray.forEach((item, index) => {
            const x = barWidth * index;
            const y = item / 255 * this.height / 2;

            if (Math.abs(index % 2) === 1) {
                ctx.fillRect((width / 2) - x, (height / 2) - y / 2, barWidth, y);//top left
                ctx.fillRect((width / 2) + x, (height / 2) - y / 2, barWidth, y);//top right
                ctx.fillStyle = `hsl(271, 95%, 50%)`;
            } else if (index % 2 === 0) {
                ctx.fillRect((width / 2) + x, (height / 2) + y / 2, barWidth, -y);//bottom right
                ctx.fillRect((width / 2) - x, (height / 2) + y / 2, barWidth, -y);//bottom left
                ctx.fillStyle = `hsl(271, 95%, 25%)`;
            }
        });
    }
}