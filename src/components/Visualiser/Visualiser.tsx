import { useEffect, useRef, useState } from "react";
import VisualSelector from "./VisualSelector";
import { visualData } from "./2D_Visualisations";

interface VisualiserProp {
  analyser: AnalyserNode | undefined;
}

export default function Visualiser({ analyser }: VisualiserProp) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visual, setVisual] = useState("CircleRoundBar");

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

  useEffect(() => {
    //show selector when first load
    const selector = document.querySelector(
      ".selector-container"
    ) as HTMLDivElement;

    setTimeout(() => {
      selector.style.opacity = "1";
      selector.style.transform = "translate(-50%, 0)";
    }, 500);

    setTimeout(() => {
      selector.style.opacity = "";
      selector.style.transform = "";
    }, 3000);
  }, []);

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
      <div className="selector-container">{VisualSelectorList}</div>
    </div>
  );
}
