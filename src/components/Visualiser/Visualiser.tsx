import { useEffect, useRef, useState } from "react";
import { Bar, Circle } from "./2D_Visualisations";

interface VisualiserProp {
  analyser: AnalyserNode | undefined;
}

type VisualisationObject = {
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

export default function Visualiser({ analyser }: VisualiserProp) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visual, setVisual] = useState("Bar");
  const visualData: VisualisationObject = {
    Bar: {
      code: Bar,
      img: {
        default: "img/bar_default.png",
        large: "img/bar_large.png",
      },
      gif: "gif/bar.gif",
    },
    Circle: {
      code: Circle,
      img: {
        default: "img/bar_default.png",
        large: "img/bar_large.png",
      },
      gif: "gif/bar.gif",
    },
  };
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const vContainer = document.querySelector(
      ".visualiser-container"
    ) as HTMLDivElement;
    const canvas = canvasRef.current;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx || !vContainer) return;

    const visualisation = new visualData[visual].code(ctx, analyser);

    //resize canvas
    const canvasResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      visualisation.update(canvas.width, canvas.height);
    };
    canvasResize();
    window.addEventListener("resize", canvasResize);

    //draw
    let animationFrameId: number;

    const animator = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      visualisation.draw();
      animationFrameId = requestAnimationFrame(animator);
    };
    animator();

    return () => {
      window.removeEventListener("resize", canvasResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyser, visual]);

  return (
    <div className="visualiser-container bg-neutral-900 relative rounded-md flex-grow ml-2">
      <canvas ref={canvasRef} className="w-full h-full absolute"></canvas>
      <div className="visual-selector-wrap w-full h-28 box-border flex absolute bottom-0 gap-4 items-center justify-center">
        <div
          className="w-32 h-16 left-1/2 hover:cursor-pointer border rounded-lg"
          onClick={() => {
            setVisual("Bar");
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered ? visualData.Bar.gif : visualData.Bar.img.default}
            alt=""
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
