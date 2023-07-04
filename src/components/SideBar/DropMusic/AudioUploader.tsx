import { useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";

export default function AudioUploader() {
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    // Handle the dropped file, e.g., pass it to a function for further processing
    handleAudioFile(file);
  }

  function handleAudioFile(file: any) {
    // Handle the audio file, e.g., upload it, process it, etc.
    console.log("Uploaded audio file:", file);
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
