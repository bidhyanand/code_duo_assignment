import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAPI } from "../../utils/apiHelper";
import apiEndPoint from "../../utils/apiEndPoint.json";
import Loader from "../components/Loader";
import SpellDetailCardDesign from "../components/SpellDetailCardDesign";
export default function SpellsDetail() {
  const params = useParams();
  const [getSpellDescription, setGetSpellDescription] = useState <Root> ({

    higher_level: [],
    index: "",
    name: "",
    desc: [],
    range: "",
    components: [],
    material: "",
    ritual: false,
    duration: "",
    concentration: false,
    casting_time: "",
    level: 0,
    area_of_effect: {
      type: "",
      size: 0,
    },
    school: {
      index: "",
      name: "",
      url: "",
    },
    classes: [],
    subclasses: [],
    url: "",
  

  });
  const [loaderState, setLoaderState] = useState<boolean>(true);
  useEffect(() => {
    fetchAPI(apiEndPoint.getSpellDescription.url + params?.id)
      .then((data) => {
        setGetSpellDescription(data);
        setLoaderState(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <React.Fragment>
      {loaderState ? (
        <Loader />
      ) : (
        <SpellDetailCardDesign detailData={getSpellDescription} />
      )}
    </React.Fragment>
  );
}

export interface Root {
  higher_level: any[]
  index: string
  name: string
  desc: string[]
  range: string
  components: string[]
  material: string
  ritual: boolean
  duration: string
  concentration: boolean
  casting_time: string
  level: number
  area_of_effect: AreaOfEffect
  school: School
  classes: Class[]
  subclasses: Subclass[]
  url: string
  damage?: string
  attack_type?: string
}

export interface AreaOfEffect {
  type: string
  size: number
}

export interface School {
  index: string
  name: string
  url: string
}

export interface Class {
  index: string
  name: string
  url: string
}

export interface Subclass {
  index: string
  name: string
  url: string
}

