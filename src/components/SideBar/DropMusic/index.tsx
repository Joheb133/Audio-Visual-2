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
      <SongList songsInfo={songList} />
    </div>
  );
}
