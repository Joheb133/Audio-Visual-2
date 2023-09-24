import { Bar } from "./Bar";
import { CircleRoundBar } from "./CircleRoundBar";

export type VisualisationObject = {
    [key: string]: {
        code: new (
            ctx: CanvasRenderingContext2D,
            analyser: AnalyserNode,
            width?: number,
            height?: number
        ) => any;
        img: string,
        gif: string;
    };
};

export const visualData: VisualisationObject = {
    Bar: {
        code: Bar,
        img: "img/Bar.png",
        gif: "gif/Bar.gif",
    },
    CircleRoundBar: {
        code: CircleRoundBar,
        img: "img/CircleRoundBar.png",
        gif: "gif/CircleRoundBar.gif",
    }
};