import { useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { songDataType } from "./songDataList";

export default function AudioUploader({
  setSongList,
}: {
  setSongList: React.Dispatch<React.SetStateAction<songDataType[]>>;
}) {
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];

    //check file type
    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];
    const fileType = file.type;

    if (allowedTypes.includes(fileType)) {
      handleAudioFile(file);
    } else {
      console.log("File type not supported:", fileType);
    }
  }

  function handleAudioFile(file: File) {
    // Handle the audio file
    const newSong = {
      title: file.name,
      path: "",
    };

    setSongList((prevSongList) => [...prevSongList, newSong]);
  }

  return (
    <div
      className={`flex justify-center items-center w-full h-72 rounded-lg ${
        dragging ? "bg-[#2b2b2b]" : "bg-neutral-800"
      }`}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDragOver={(e: React.DragEvent) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="w-fit p-6 rounded-full border-[4px] border-neutral-900 pointer-events-none">
        <BsMusicNoteBeamed size="40" className="text-neutral-900" />
      </div>
    </div>
  );
}
