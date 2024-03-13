import { EXCLUDE_LANDS } from "@/constants/app";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const Home = () => {
  const [landIds, setLandIds] = useState<number[]>([]);

  const [restrictLands, setRestrictLands] = useLocalStorage<any>(
    "restrict-land",
    []
  );

  function getRandomNumber(min: number, max: number, excludedLands: number[]) {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (excludedLands.includes(randomNumber));
    return randomNumber;
  }

  const generateRandomLandId = () => {
    const ids = [];

    for (let i = 0; i < 4; i++) {
      ids.push(getRandomNumber(1, 5000, restrictLands));
    }

    setLandIds(ids);
  };

  useEffect(() => {
    if (restrictLands?.length < 1) {
      setRestrictLands(EXCLUDE_LANDS);
    }
  }, []);

  const setRestrictedLand = (id: any) => {
    const clone = [...restrictLands];
    clone.push(id);
    setRestrictLands(clone);
  };

  return (
    <div className="pt-16">
      <div className="flex justify-center">
        <button
          className="border border-1 px-4 rounded-md text-white"
          onClick={generateRandomLandId}
        >
          Find
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-10">
        {landIds.map((item) => {
          return (
            <div
              key={item}
              className="flex flex-col items-center justify-center"
            >
              <p className="font-bold text-lg text-center text-white">{item}</p>
              {!restrictLands.includes(item) && (
                <button
                  className="border border-1 px-4 rounded-md text-white"
                  onClick={() => setRestrictedLand(item)}
                >
                  Restricted
                </button>
              )}

              <iframe
                id="iframeA"
                src={`https://play.pixels.xyz/pixels/share/${item}`}
                width="850"
                height="400"
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
