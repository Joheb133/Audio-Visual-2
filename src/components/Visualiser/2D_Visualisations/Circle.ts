export class Circle {
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
        const scalingFactor = (32 / (bufferLength * 4)) * 32 //scale based on fttSize
        const radius = scalingFactor * (maxRadius * 0.001) //use scale & dimension

        for (let i = 0; i < dataArray.length; i++) {
            const element = dataArray[i];

            const radian = (Math.PI * 2) / bufferLength
            const x = width / 2 - Math.cos(radian * i) * ((maxRadius / 3) + (element / 2))
            const y = height / 2 - Math.sin(radian * i) * ((maxRadius / 3) + (element / 2))

            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = "white";
        }

    }
}