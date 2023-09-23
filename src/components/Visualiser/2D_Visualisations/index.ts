import { Bar } from "./Bar";
import { CircleRoundBar } from "./CircleRoundBar";
import { Wave } from "./Wave";

export type VisualisationObject = {
    [key: string]: {
        code: new (
            ctx: CanvasRenderingContext2D,
            analyser: AnalyserNode,
            width?: number,
            height?: number
        ) => any;
        img: {
            default: string;
            large: string;
        };
        gif: string;
    };
};

export const visualData: VisualisationObject = {
    Bar: {
        code: Bar,
        img: {
            default: "img/bar_default.png",
            large: "img/bar_large.png",
        },
        gif: "gif/bar.gif",
    },
    CircleRoundBar: {
        code: CircleRoundBar,
        img: {
            default: "img/circle-bar_default.png",
            large: "img/circle-bar_large.png",
        },
        gif: "gif/bar.gif",
    },
    Wave: {
        code: Wave,
        img: {
            default: "img/circle-bar_default.png",
            large: "img/circle-bar_large.png",
        },
        gif: "gif/bar.gif",
    },
};