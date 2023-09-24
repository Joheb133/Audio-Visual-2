//A frequency bar chart
export class Bar {
    constructor(
        private ctx: CanvasRenderingContext2D,
        private analyser: AnalyserNode,
        private width: number = 2,
        private height: number = 2) {

        this.ctx = ctx;
        this.analyser = analyser;
        this.analyser.fftSize = 2048;
        this.width = width;
        this.height = height;
    }
    updateSize(width: number, height: number) {
        this.width = width;
        this.height = height;

        //change fftSize
        if (this.width > 2000) {
            this.analyser.fftSize = 2048;
        } else if (this.width > 1000) {
            this.analyser.fftSize = 1024;
        } else if (this.width > 500) {
            this.analyser.fftSize = 512;
        } else {
            this.analyser.fftSize = 256;
        }
    }
    draw() {
        const ctx = this.ctx;
        const width = this.width;
        const height = this.height;
        ctx.clearRect(0, 0, width, height);

        const bufferLength = this.analyser.frequencyBinCount;
        const barWidth = (width / bufferLength) * 0.75;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);

        const centerX = width / 2;
        const centerY = height / 2;

        ctx.fillStyle = `hsl(271, 65%, 50%)`;

        dataArray.forEach((item, index) => {
            const x = (barWidth * index);
            const y = item;

            if (index % 2 === 1) {
                ctx.fillRect(centerX - x, centerY - y / 4, barWidth, y);//top left
                ctx.fillRect(centerX + x, centerY - y / 4, barWidth, y);//top right
            } else if (index % 2 === 0) {
                ctx.fillRect(centerX + x, centerY + y / 4, barWidth, -y);//bottom right
                ctx.fillRect(centerX - x, centerY + y / 4, barWidth, -y);//bottom left
            }
        });
    }
}