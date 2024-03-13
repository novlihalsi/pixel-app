import { EXCLUDE_LANDS } from "@/constants/app";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const Home = () => {
  const [chops, setChops] = useLocalStorage<any>("chop-data", []);
  const [rawData, setRawData] = useState("");
  const [landId, setLandId] = useState("");

  function toDate(raw: any) {
    // Convert milliseconds to seconds
    let lastTimerSeconds = Number(raw);

    // Create Date objects
    let lastTimerDate = new Date(lastTimerSeconds);

    lastTimerDate.setHours(lastTimerDate.getHours() + 7);
    lastTimerDate.setMinutes(lastTimerDate.getMinutes() + 15);

    // Output formatted date and time
    return lastTimerDate;
  }

  function rawToJSON(raw: any) {
    // Mencocokkan pola untuk mengekstrak data lastChop
    const pattern = /lastChop�\x01��(\d+)�/g;

    // Array untuk menyimpan hasil pencarian
    const lastChops = [];

    // Melakukan pencarian dalam data menggunakan pola
    let match;
    while ((match = pattern.exec(raw)) !== null) {
      // Menambahkan pasangan lastChop dan waktunya ke dalam array
      lastChops.push(
        moment(toDate(parseInt(match[1]))).format("DD MMMM YYYY, HH:mm")
      );
    }

    return {
      landId: landId,
      chops: lastChops,
    };
  }

  const handleSubmit = () => {
    const data = rawToJSON(rawData);
    const clone = [...chops];
    clone.push(data);
    setChops(clone);

    alert("data saved");
  };

  const handleShowData = () => {
    console.log(chops);
  };

  const handlePreview = () => {
    const data = rawToJSON(rawData);
    console.log(data);
  };

  return (
    <div className="p-16">
      <div className="flex flex-col gap-4">
        <p className="text-white">Raw Data</p>
        <textarea className="text-black" rows={6} onChange={(e) => setRawData(e.target.value)} />
        <p className="text-white">Land Id</p>
        <input onChange={(e) => setLandId(e.target.value)} />
        <button
          className="border border-1 px-4 rounded-md text-white"
          onClick={handlePreview}
        >
          Preview Data
        </button>
        <button
          className="border border-1 px-4 rounded-md text-white"
          onClick={handleSubmit}
        >
          Save Data
        </button>
        <button
          className="border border-1 px-4 rounded-md text-white"
          onClick={handleShowData}
        >
          Show All Data
        </button>
      </div>
    </div>
  );
};

export default Home;
