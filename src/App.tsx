import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/apiHelper";
import apiEndPoint from "../utils/apiEndPoint.json";
import CardDesign from "./components/cardDesign";

export default function App() {
  const [getAllSpellList, setGetAllSpellList] = useState<Root[]>([]);

  useEffect(() => {
    fetchAPI(apiEndPoint.getAllSpells.url)
      .then((data) => {
        setGetAllSpellList(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="">
        <CardDesign data={getAllSpellList} />
        {/* <CardDesign /> */}
      </div>
    </>
  );
}

export interface Root {
  count: number;
  results: Result[];
}

export interface Result {
  index: string;
  name: string;
  level: number;
  url: string;
}
