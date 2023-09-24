import { useState } from "react";

interface VisualSelectorProp {
  name: string;
  setVisual: React.Dispatch<React.SetStateAction<string>>;
  defaultImgUrl: string;
  gifUrl: string;
}

export default function VisualSelector({
  name,
  setVisual,
  defaultImgUrl,
  gifUrl,
}: VisualSelectorProp) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-36 h-20 hover:cursor-pointer rounded-lg border-neutral-950 border-2 relative"
      onClick={() => {
        setVisual(name);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered ? gifUrl : defaultImgUrl}
        alt=""
        className="absolute top-0 left-0 object-cover w-full h-full rounded-lg"
      />
    </div>
  );
}
