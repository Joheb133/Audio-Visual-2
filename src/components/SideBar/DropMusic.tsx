import { BsMusicNoteBeamed } from "react-icons/bs";

export default function DropMusic() {
  return (
    <div className="flex flex-col gap-4">
      <span className="sidebar-component-title">Drop Music</span>
      <div className="flex justify-center items-center w-full h-72 rounded-lg bg-neutral-800">
        <div className="w-fit p-6 rounded-full border-[4px] border-neutral-900">
          <BsMusicNoteBeamed size="40" className="text-neutral-900" />
        </div>
      </div>
    </div>
  );
}
