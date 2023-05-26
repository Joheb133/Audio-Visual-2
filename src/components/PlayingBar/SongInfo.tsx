//music info

export default function SongInfo() {
  return (
    <div className="flex-grow min-w-[200px] w-1/3">
      <div className="flex justify-start">
        <img
          className="rounded-md w-14 h-14 ml-2"
          src="placeholder.jpg"
          alt="placeholder"
        />
        <div className="flex flex-col justify-center">
          <span className="mx-2 text-sm">
            <a href="https://open.spotify.com/track/6OfOzTitafSnsaunQLuNFw">
              DOGTOOTH
            </a>
          </span>
          <span className="mx-2 text-xs opacity-75">
            <a href="https://open.spotify.com/artist/4V8LLVI7PbaPR0K2TGSxFF">
              Tyler, The Creator
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
