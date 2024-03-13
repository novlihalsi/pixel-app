import { useState } from "react";

const Search = () => {
  const [landId, setLandId] = useState("");
  const [lands, setLands] = useState<string[]>([])


  const showLand = () => {
    setLands(landId.split(','))
  }

  return (
    <div className="p-16">
      <div className="flex flex-col gap-4">
        <p className="text-white">Land Id</p>
        <input className="text-black" onChange={(e) => setLandId(e.target.value)} />
        <button
          className="border border-1 px-4 rounded-md text-white"
          onClick={showLand}
        >
          Show Land
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-10">
        {lands.map((item) => {
          return (
            <div
              key={item}
              className="flex flex-col items-center justify-center"
            >
              <p className="font-bold text-lg text-center text-white">{item}</p>
              <iframe
                id="iframeA"
                src={`https://play.pixels.xyz/pixels/share/${item}`}
                width="550"
                height="400"
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
