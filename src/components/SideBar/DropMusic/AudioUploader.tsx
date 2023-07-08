import { useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { audioDataType } from "../../../types";

export default function AudioUploader({
  setSongList,
}: {
  setSongList: React.Dispatch<React.SetStateAction<audioDataType[]>>;
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
    const audioContext = new AudioContext();
    const fileReader = new FileReader();
    // Handle parsing file data
    fileReader.onload = function (e: ProgressEvent<FileReader>) {
      const arrayBuffer = e.target?.result;

      if (arrayBuffer instanceof ArrayBuffer) {
        audioContext.decodeAudioData(arrayBuffer, (buffer: AudioBuffer) => {
          // Handle long audio file
          if (buffer.duration > 390) {
            console.log("Audio duration exceeds 6m30s limit");
            return;
          }

          // Handle the audio file
          const newSong = {
            audioData: {
              buffer,
            },
            metaData: {
              title: file.name,
              duration: buffer.duration,
            },
          };
          setSongList((prevSongList) => [...prevSongList.slice(0, 3), newSong]);
        });
      } else {
        console.log("Failed to decode file");
      }
    };

    fileReader.readAsArrayBuffer(file);
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
