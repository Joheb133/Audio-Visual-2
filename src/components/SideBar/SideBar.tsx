import { AiOutlineSearch } from "react-icons/ai";

export default function SideBar() {
  function searchUrl() {
    console.log(1);
  }

  return (
    <div className="sidebar w-[380px] bg-neutral-900 rounded-md">
      <div className="search-container p-3 gap-2 w-full flex text-white">
        <input
          type="text"
          className="w-full h-6 bg-neutral-700 py-4 px-2 rounded-md outline-none text-xs"
        />
        <button className="opacity-70 hover:opacity-100" onClick={searchUrl}>
          <AiOutlineSearch size="24" />
        </button>
      </div>
    </div>
  );
}
