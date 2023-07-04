import AudioUploader from "./AudioUploader";

export default function DropMusic() {
  return (
    <div className="flex flex-col gap-4">
      <span className="sidebar-component-title">Drop Music</span>
      <AudioUploader />
    </div>
  );
}
