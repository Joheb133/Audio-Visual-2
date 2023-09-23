//A frequency bar chart
//"bin" is the different frequencies

export class Wave {
    map: number[]
    tick: number = 0
    constructor(
        private ctx: CanvasRenderingContext2D,
        private analyser: AnalyserNode,
        private width: number = 2,
        private height: number = 2) {

        this.ctx = ctx;
        this.analyser = analyser;
        this.analyser.fftSize = 32;
        this.width = width;
        this.height = height
        this.map = [12, 2, 14, 7, 6, 1, 13, 3, 10, 15, 5, 11, 0, 9, 8, 16]
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
        const map = this.map;
        this.tick += 0.005;
        const tick = this.tick;
        ctx.clearRect(0, 0, width, height);

        const binLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(binLength);
        this.analyser.getByteFrequencyData(dataArray);

        const waveLength = (width) / 10; //5 //divide bin length by width to fit screen

        function createLine(gap: number, index: number, color: string) {
            const start = { x: 0, y: gap * index };
            ctx.save();

            ctx.translate((Math.sin(index / 5 + tick) * (waveLength / 2)) - width / 5, gap);
            ctx.beginPath();
            ctx.moveTo(start.x, start.y); //creates bug when scrolling wave

            // create curved line
            for (let i = 0; i < binLength - 1; i++) {
                const currentAmp = dataArray[map[i]] * (waveLength / 500); //AKA binY
                const nextAmp = dataArray[map[i + 1]] * (waveLength / 500);
                const currentBinX = waveLength * i;
                const nextBinX = waveLength * (i + 1);

                //control points
                let cp1 = {
                    x: (currentBinX + nextBinX) / 2,
                    y: gap * index - currentAmp
                };
                let cp2 = {
                    x: (currentBinX + nextBinX) / 2,
                    y: gap * index - nextAmp
                };
                let end = {
                    x: nextBinX,
                    y: gap * index - nextAmp
                };

                ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
            }

            ctx.restore();

            ctx.stroke();
            ctx.lineWidth = 2
            ctx.strokeStyle = color;
            ctx.closePath();
        }

        const gapBtwnLines = 15;
        const numOfLines = Math.round((height / 0.9) / gapBtwnLines);

        for (let i = 0; i < numOfLines; i++) {
            createLine(gapBtwnLines, i, `hsl(${(i + tick) * 5}, 40%, 40%)`)
        }
    }
}