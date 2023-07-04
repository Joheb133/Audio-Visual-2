import { songDataType } from "./songDataList";

export default function SongList({ songsInfo }: { songsInfo: songDataType[] }) {
  return (
    <div className="h-full">
      {songsInfo.map((song, index) => (
        <SongBox key={index} index={index + 1} title={song.title} />
      ))}
    </div>
  );
}

interface SongBoxProp {
  index: number;
  title: string;
}

function SongBox({ index, title }: SongBoxProp) {
  return (
    <div className="flex gap-2 items-center px-4 w-full h-12 bg-neutral-900 rounded-md hover:bg-neutral-800">
      <div>
        <span className="pointer-events-none text-neutral-400">{index}</span>
      </div>
      <div>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-64 block pointer-events-none text-white">
          {title}
        </span>
      </div>
    </div>
  );
}
