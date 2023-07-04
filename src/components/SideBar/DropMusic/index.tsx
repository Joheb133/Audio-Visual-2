import { useState } from "react";
import AudioUploader from "./AudioUploader";
import SongList from "./SongList";
import { songDataList, songDataType } from "./songDataList";

export default function DropMusic() {
  const [songList, setSongList] = useState<songDataType[]>(songDataList);

  return (
    <div className="flex flex-col gap-4">
      <span className="sidebar-component-title">Drop Music</span>
      <AudioUploader setSongList={setSongList} />
      <span className="text-neutral-500 font-medium text-base">
        Local Music
      </span>
      <SongList songsInfo={songList} />
    </div>
  );
}
