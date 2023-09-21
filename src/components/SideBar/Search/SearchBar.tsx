import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useFetch from "../../../hooks/useFetch";
import { audioDataType } from "../../../types";

interface SearchBarProp {
  setSearchList: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({
  setSearchList,
  setIsSearching,
  setIsError,
}: SearchBarProp) {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [searchReq, setSearchReq] = useState<string>();
  const { isPending, errorInfo, data } = useFetch(
    searchReq ? `api/search?v=${searchReq}` : undefined
  );

  useEffect(() => {
    if (isPending) {
      setIsSearching(true);
    } else if (errorInfo.isError) {
      setIsError(true);
      setIsSearching(false);
    } else if (!isPending && !errorInfo.isError) {
      setIsSearching(false);
      setSearchList(data);
    }
  }, [isPending, errorInfo.isError]);

  function handleSearch(input: string) {
    input.trim();
    setSearchReq(input);
  }

  return (
    <div className="gap-2 w-full flex text-white">
      <input
        ref={searchBarRef}
        type="text"
        className="w-full h-6 bg-neutral-700 py-4 px-2 rounded-md outline-none text-xs"
        onKeyDown={(e) => {
          if (e.key === "Enter")
            searchBarRef.current && handleSearch(searchBarRef.current.value);
        }}
      />
      <button
        className="opacity-70 hover:opacity-100"
        onClick={() =>
          searchBarRef.current && handleSearch(searchBarRef.current.value)
        }
      >
        <AiOutlineSearch size="24" />
      </button>
    </div>
  );
}
