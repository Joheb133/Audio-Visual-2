//music info

export default function SongInfo() {
  return (
    <div className="flex-grow">
      <div className="flex justify-start">
        <img
          className="rounded-md w-14 h-14"
          src="placeholder.jpg"
          alt="placeholder"
        />
        <div className="flex flex-col">
          <span className="font-bold px-4">
            <a href="https://open.spotify.com/track/6OfOzTitafSnsaunQLuNFw">
              DOGTOOTH
            </a>
          </span>
          <span className="px-4">
            <a href="https://open.spotify.com/artist/4V8LLVI7PbaPR0K2TGSxFF">
              Tyler, The Creator
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
