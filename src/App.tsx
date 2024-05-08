import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/apiHelper";
import apiEndPoint from "../utils/apiEndPoint.json";
import Loader from "./components/Loader";
import CardDesign from "./components/SpellCard";

export default function App() {
  const [getAllSpellList, setGetAllSpellList] = useState<Spells[]>([]);
  const [loaderState, setLoaderState] = useState<boolean>(true);

  useEffect(() => {
    fetchAPI(apiEndPoint.getAllSpells.url)
      .then((data: { results: Spells[] }) => {
        setGetAllSpellList(data.results);
        setLoaderState(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {loaderState ? (
        <Loader />
      ) : (
        <>
          <CardDesign data={getAllSpellList} />
        </>
      )}
    </>
  );
}

export interface Spells {
  index: string;
  name: string;
  level: number;
  url: string;
  id: number;
}
