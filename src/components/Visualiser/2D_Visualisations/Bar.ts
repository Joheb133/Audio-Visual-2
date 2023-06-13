export class Bar {
    constructor(private canvas: CanvasRenderingContext2D,
        private analyser: AnalyserNode,
        private width: number,
        private height: number) {

        this.canvas = canvas
        this.analyser = analyser
        this.analyser.fftSize = 2048
        this.width = width
        this.height = height
    }
    update(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    draw() {
        const canvas = this.canvas;
        const height = this.height
        const width = this.width

        const bufferLength = this.analyser.frequencyBinCount;
        const barWidth = this.width / bufferLength;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);

        dataArray.forEach((item, index) => {
            const x = barWidth * index;
            const y = item / 255 * this.height / 2;

            //this.canvas.fillStyle = `hsl(271, 95%, 50%)`;
            if (Math.abs(index % 2) === 1) {
                canvas.fillRect((width / 2) - x, (height / 2) - y / 2, barWidth, y);//top left
                canvas.fillRect((width / 2) + x, (height / 2) - y / 2, barWidth, y);//top right
                canvas.fillStyle = `hsl(271, 95%, 50%)`;
            } else if (index % 2 === 0) {
                canvas.fillRect((width / 2) + x, (height / 2) + y / 2, barWidth, -y);//bottom right
                canvas.fillRect((width / 2) - x, (height / 2) + y / 2, barWidth, -y);//bottom left
                canvas.fillStyle = `hsl(271, 95%, 25%)`;
            }
        });
    }
}