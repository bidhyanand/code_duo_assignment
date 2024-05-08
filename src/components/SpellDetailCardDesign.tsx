
import { useParams } from "react-router-dom";

const SpellDetailCardDesign: React.FC<Root> = ({ detailData }) => {
  console.log("detailData", detailData);
  

  // fetch params form the url
  const params = useParams();
 
  return (
    <>
      <div className="flex justify-center  h-screen">
        <div className="border-2 border-black h-[30rem] w-[80rem] flex flex-col shadow-xl shadow-black  ">
      <h1 className="text-4xl text-center ">{params?.id}</h1>
          
          <div className="flex justify-between p-4">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Description</h1>
              <p className="text-xl">Casting Time: 1 action</p>
              <p className="text-xl">Range: 90 feet</p>
              <p className="text-xl">Components: V, S, M (powdered rhubarb leaf and an adder’s stomach)</p>
              <p className="text-xl">Duration: Instantaneous</p>
              <p className="text-xl">Classes: Sorcerer, Wizard</p>
              <p className="text-xl">Level: 2</p>
              <p className="text-xl">School: Evocation</p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Higher Level</h1>
              <p className="text-xl">When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and acid) increases by 1d6 for each slot level above 2nd.</p>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <h1 className="text-3xl font-bold">Description</h1>
            <p className="text-xl">A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default SpellDetailCardDesign;

export interface Root {
  index: string;
  name: string;
  desc: string[];
  higher_level: string[];
  range: string;
  components: string[];
  material: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  attack_type: string;
  damage: Damage;
  school: School;
  classes: Class[];
  subclasses: Subclass[];
  url: string;
}

export interface Damage {
  damage_type: DamageType;
  damage_at_slot_level: DamageAtSlotLevel;
}

export interface DamageType {
  index: string;
  name: string;
  url: string;
}

export interface DamageAtSlotLevel {
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
}

export interface School {
  index: string;
  name: string;
  url: string;
}

export interface Class {
  index: string;
  name: string;
  url: string;
}

export interface Subclass {
  index: string;
  name: string;
  url: string;
}
