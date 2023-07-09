import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useFetch from "../../../hooks/useFetch";
import { audioDataType } from "../../../types";

interface SearchBarProp {
  setSearchList: React.Dispatch<React.SetStateAction<audioDataType[]>>;
}

export default function SearchBar({ setSearchList }: SearchBarProp) {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [searchReq, setSearchReq] = useState<string>();
  const { isPending, data } = useFetch(
    searchReq ? `api/search?v=${searchReq}` : undefined
  );

  useEffect(() => {
    if (isPending || !data) return;

    setSearchList(data);
  }, [isPending, data]);

  return (
    <div className="gap-2 w-full flex text-white">
      <input
        ref={searchBarRef}
        type="text"
        className="w-full h-6 bg-neutral-700 py-4 px-2 rounded-md outline-none text-xs"
      />
      <button
        className="opacity-70 hover:opacity-100"
        onClick={() => setSearchReq(searchBarRef.current?.value)}
      >
        <AiOutlineSearch size="24" />
      </button>
    </div>
  );
}
