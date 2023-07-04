import SearchBar from "./SearchBar";

interface SearchBarProp {
  songInfoRef: React.MutableRefObject<any>;
}

export default function Search({ songInfoRef }: SearchBarProp) {
  return (
    <div className="flex flex-col gap-4">
      <span className="sidebar-component-title">Search</span>
      <SearchBar songInfoRef={songInfoRef} />
    </div>
  );
}
