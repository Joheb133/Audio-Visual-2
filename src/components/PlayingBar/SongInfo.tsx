// music info
import { useEffect, useRef } from "react";
import { audioDataType } from "../../types";

interface SongInfoProp {
  metaData?: audioDataType["metaData"];
}

interface ElementWithAnimation {
  element: HTMLElement | null;
  animation: Animation | null;
}

export default function SongInfo({ metaData }: SongInfoProp) {
  // Refs storing html & animation referance
  const titleRef = useRef<ElementWithAnimation>({
    element: null,
    animation: null,
  });
  const channelRef = useRef<ElementWithAnimation>({
    element: null,
    animation: null,
  });

  // Handle animations
  function cancelAnimation(animation: Animation | null) {
    if (animation) {
      animation.cancel();
      animation = null;
    }
  }

  function overflowText(elementWithAnimation: ElementWithAnimation) {
    //apply stuff for overflowing text
    const { element, animation } = elementWithAnimation;

    if (!element) return;

    const parent = element as HTMLElement;
    const child = parent.children[0] as HTMLElement;
    const parentWidth = parent.clientWidth;
    const childWidth = child.offsetWidth;

    cancelAnimation(animation);

    if (childWidth > parentWidth) {
      //handle animation
      const difference = parentWidth - childWidth;
      const duration = Math.abs(difference / 5);
      const newAnimation = child.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(${difference - 2}px)`, offset: 0.45 },
          { transform: `translateX(${difference - 2}px)`, offset: 0.55 },
          { transform: "translateX(0)" },
        ],
        { delay: 1000, duration: duration * 1000 }
      );

      elementWithAnimation.animation = newAnimation;
    }
  }

  // Update song info
  useEffect(() => {
    if (!metaData) return;

    const titleElement = titleRef.current.element;
    const channelElement = channelRef.current.element;

    titleElement && overflowText(titleRef.current);
    channelElement && overflowText(channelRef.current);

    function handleResize() {
      cancelAnimation(titleRef.current.animation);
      cancelAnimation(channelRef.current.animation);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [metaData]);

  return (
    <div className="flex-grow min-w-[200px] w-1/3 gradient-mask">
      <div className="flex justify-start">
        <img
          className="rounded-md w-14 h-14 object-cover"
          src={metaData?.imgUrl ? metaData.imgUrl : "placeholder.png"}
          alt="placeholder"
        />
        <div className="flex flex-col justify-center mx-2 overflow-hidden">
          <span
            ref={(ref) => (titleRef.current.element = ref)}
            className="text-sm whitespace-nowrap"
          >
            <span className="inline-block">
              {metaData?.title ? (
                metaData?.videoUrl ? (
                  <a href={metaData.videoUrl} target="_blank">
                    {metaData.title}
                  </a>
                ) : (
                  <span>{metaData.title}</span>
                )
              ) : (
                <span>Title</span>
              )}
            </span>
          </span>
          <span
            ref={(ref) => (channelRef.current.element = ref)}
            className="text-xs opacity-75 whitespace-nowrap"
          >
            <span className="inline-block">
              {metaData?.channel ? metaData.channel : ""}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
