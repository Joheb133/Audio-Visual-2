//music info

import { useEffect, useRef } from "react";

interface SongInfoProp {
  songInfo: any;
}

export default function SongInfo({ songInfo }: SongInfoProp) {
  const titleRef = useRef<HTMLElement>(null);
  const animationRef = useRef<any>(null);
  let { title, channel, videoUrl, img }: any = {};

  if (songInfo) {
    ({ title, channel, videoUrl, img } = songInfo.video);
  }

  function overflowText() {
    //apply stuff for overflowing text

    if (!titleRef.current) return;

    const title = titleRef.current as HTMLElement;
    const child = title.children[0] as HTMLElement;
    const titleWidth = title.clientWidth;
    const childWidth = child.offsetWidth;

    //remove old animation class
    if (animationRef.current) {
      animationRef.current.cancel();
      animationRef.current = null;
    }

    if (childWidth > titleWidth) {
      //handle animation
      const difference = titleWidth - childWidth;
      const duration = Math.abs(difference / 25);
      animationRef.current = child.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(${difference - 2}px)`, offset: 0.45 },
          { transform: `translateX(${difference - 2}px)`, offset: 0.55 },
          { transform: "translateX(0)" },
        ],
        duration * 1000
      );
    }
  }

  useEffect(() => {
    if (!songInfo) return;

    overflowText();
  }, [songInfo]);

  return (
    <div className="flex-grow min-w-[200px] w-1/3 gradient-mask">
      <div className="flex justify-start">
        <img
          className="rounded-md w-14 h-14 object-cover"
          src={img ? img.url : "placeholder.jpg"}
          alt="placeholder"
        />
        <div className="flex flex-col justify-center mx-2">
          <span ref={titleRef} className="text-sm whitespace-nowrap">
            <span className="inline-block">
              <a href={videoUrl ? videoUrl : ""} target="_blank">
                {title ? title : "Song Title"}
              </a>
            </span>
          </span>
          <span className="text-xs opacity-75 whitespace-nowrap">
            <span className="inline-block">
              {channel ? channel : "Channel"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
