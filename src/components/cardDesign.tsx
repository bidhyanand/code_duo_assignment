import { useState } from "react";
import { TablePagination } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CardDesign: React.FC<Root> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(20);
  const handlePageChange = (e: any, newpage: number) => {
    setPage(newpage);
  };
  function handlePerPage(e: any) {
    setRowPerPage(+e.target.value);
    setPage(0);
  }

  function getStars(level: number) {
    if (level === 0) {
      return "No Rating Available ";
    }
    // Define an empty string to store the star symbols
    let stars = "";

    // Loop through the level and add a star symbol for each level
    for (let i = 0; i < level; i++) {
      stars += "⭐"; // Unicode star symbol
    }

    return stars;
  }
  const [fovurate, setFovurate] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center gap-4 pt-4 ">
      {data
        ?.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
        .map((item: any) => {
          return (
            <>
              <div className="max-w-sm font-mono border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-1/4 bg-gray-200 ">
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item?.name}
                    </h5>
                  </a>

                  <p className="flex justify-end py-3">
                    <span className="font-semibold  dark:text-gray-200 text-red-400 ">
                      Level:
                    </span>{" "}
                    <span className="text-red-500 pl-4">
                      {item?.size} {getStars(item?.level)}
                    </span>
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate(`/spells/${item?.index}`)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Description
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>

                    {fovurate ? (
                      <div className="flex justify-between">
                        <div className="heart-container relative group cursor-pointer ">
                          <p className="text-white group-hover:text-blue-700">
                            <FaRegHeart
                              className="text-white"
                              size={24}
                              onClick={() => {
                                setFovurate(!fovurate);

                                toast.success("Added to favorites");
                              }}
                            />{" "}
                            <span className="tooltip whitespace-nowrap absolute bottom-3 pr-4 right-4 text-white opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                              Add to favorites
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <div className="heart-container relative group cursor-pointer ">
                          <p className="text-white group-hover:text-blue-700">
                            <FcLike
                              className="text-white"
                              size={24}
                              onClick={() => {
                                setFovurate(!fovurate);
                                toast.error("Removed From favorites");
                              }}
                            />{" "}
                            <span className="tooltip whitespace-nowrap absolute bottom-3 pr-4 right-4 text-white opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                              Remove Favorite
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      <TablePagination
        rowsPerPageOptions={[6]}
        rowsPerPage={rowPerPage}
        page={page}
        count={data?.length}
        component={"div"}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePerPage}
      ></TablePagination>
    </div>
  );
};
export default CardDesign;

export interface Root {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  armor_class: ArmorClass[];
  hit_points: number;
  hit_dice: string;
  hit_points_roll: string;
  speed: Speed;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies: Proficiency[];
  damage_vulnerabilities: any[];
  damage_resistances: any[];
  damage_immunities: string[];
  condition_immunities: any[];
  senses: Senses;
  languages: string;
  challenge_rating: number;
  proficiency_bonus: number;
  xp: number;
  special_abilities: SpecialAbility[];
  actions: Action[];
  legendary_actions: LegendaryAction[];
  image: string;
  url: string;
  data: any;
}

export interface ArmorClass {
  type: string;
  value: number;
}

export interface Speed {
  walk: string;
  fly: string;
  swim: string;
}

export interface Proficiency {
  value: number;
  proficiency: Proficiency2;
}

export interface Proficiency2 {
  index: string;
  name: string;
  url: string;
}

export interface Senses {
  blindsight: string;
  darkvision: string;
  passive_perception: number;
}

export interface SpecialAbility {
  name: string;
  desc: string;
  usage?: Usage;
}

export interface Usage {
  type: string;
  times: number;
  rest_types: any[];
}

export interface Action {
  name: string;
  multiattack_type?: string;
  desc: string;
  actions: Action2[];
  attack_bonus?: number;
  damage?: Damage[];
  dc?: Dc;
  usage?: Usage2;
}

export interface Action2 {
  action_name: string;
  count: number;
  type: string;
}

export interface Damage {
  damage_type: DamageType;
  damage_dice: string;
}

export interface DamageType {
  index: string;
  name: string;
  url: string;
}

export interface Dc {
  dc_type: DcType;
  dc_value: number;
  success_type: string;
}

export interface DcType {
  index: string;
  name: string;
  url: string;
}

export interface Usage2 {
  type: string;
  dice: string;
  min_value: number;
}

export interface LegendaryAction {
  name: string;
  desc: string;
  dc?: Dc2;
  damage?: Damage2[];
}

export interface Dc2 {
  dc_type: DcType2;
  dc_value: number;
  success_type: string;
}

export interface DcType2 {
  index: string;
  name: string;
  url: string;
}

export interface Damage2 {
  damage_type: DamageType2;
  damage_dice: string;
}

export interface DamageType2 {
  index: string;
  name: string;
  url: string;
}
