import { useEffect, useRef, useState } from "react";
import { Bar, CircleRoundBar } from "./2D_Visualisations";
import VisualSelector from "./VisualSelector";

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
  const [visual, setVisual] = useState("Circle");
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
      code: CircleRoundBar,
      img: {
        default: "img/bar_default.png",
        large: "img/bar_large.png",
      },
      gif: "gif/bar.gif",
    },
  };

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
      visualisation.updateSize(canvas.width, canvas.height);
    };
    canvasResize();
    window.addEventListener("resize", canvasResize);

    //draw
    let animationFrameId: number;

    const animator = () => {
      visualisation.draw();
      animationFrameId = requestAnimationFrame(animator);
    };
    animator();

    return () => {
      window.removeEventListener("resize", canvasResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyser, visual]);

  //generate visual selectors
  const VisualSelectorList = Object.entries(visualData).map(([key, value]) => (
    <VisualSelector
      key={key}
      name={key}
      setVisual={setVisual}
      defaultImgUrl={value.img.default}
      gifUrl={value.gif}
    />
  ));

  return (
    <div className="visualiser-container bg-neutral-900 relative rounded-md flex-grow ml-2">
      <canvas ref={canvasRef} className="w-full h-full absolute"></canvas>
      <div className="visual-selector-wrap w-full h-28 box-border flex absolute bottom-0 gap-4 items-center justify-center">
        {VisualSelectorList}
      </div>
    </div>
  );
}
