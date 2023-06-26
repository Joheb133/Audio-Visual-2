//music info

interface SongInfoProp {
  songInfo: any;
}

export default function SongInfo({ songInfo }: SongInfoProp) {
  let { title, channel, videoUrl, img }: any = {};

  if (songInfo) {
    ({ title, channel, videoUrl, img } = songInfo.video);
  }

  return (
    <div className="flex-grow min-w-[200px] w-1/3">
      <div className="flex justify-start">
        <img
          className="rounded-md w-14 h-14 object-cover"
          src={img ? img.url : "placeholder.jpg"}
          alt="placeholder"
        />
        <div className="flex flex-col justify-center mx-2 gradient-mask">
          <span className="text-sm whitespace-nowrap">
            <a href={videoUrl ? videoUrl : ""} target="_blank">
              {title ? title : "Song Title"}
            </a>
          </span>
          <span className="text-xs opacity-75 whitespace-nowrap">
            {channel ? channel : "Channel"}
          </span>
        </div>
      </div>
    </div>
  );
}
