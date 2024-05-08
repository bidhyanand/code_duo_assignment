import { FormEvent, useContext, useState } from "react";
import { TablePagination } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FavContext from "../context/Fav-context";


export interface Spells {
  id:number,
  index: string;
  name: string;
  level: number;
  url: string;
}


const CardDesign = () => {
 

  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(20);
  const handlePageChange = (newpage: number) => {
    setPage(newpage);
  };
  function handlePerPage(e: { target: { value: string | number; }; }) {
    setRowPerPage(+e.target.value);
    setPage(0);
  }
  const favContext = useContext(FavContext);
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

  const navigate = useNavigate();

  const addToFavHandler = (e: FormEvent, item:Spells) => {
    // eslint-disable-next-line no-debugger
    e.preventDefault();
    favContext.addItem({
      id: item.id,
      index: item.index,
      name: item.name,
      level: item.level,
      url: item.url,
    });
  };
  const removeFromFavHandler = (id:number) => {
    favContext.removeItem(id);
  };

  console.log(favContext.wishItems, "response");

  return (
    <div className="flex flex-wrap justify-center gap-4 pt-4 ">
      { favContext?.wishItems?.length > 0 ? 
       favContext?.wishItems
        ?.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
        .map((item: Spells) => {
          const idExistsInSecondArray = favContext?.wishItems.some(
            (obj:Spells) => obj.id === item.id
          );
          console.log(idExistsInSecondArray);
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
                      {getStars(item?.level)}
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

                    {!idExistsInSecondArray ? (
                      <div className="flex justify-between">
                        <div className="heart-container relative group cursor-pointer ">
                          <p className="text-white group-hover:text-blue-700">
                            <FaRegHeart
                              className="text-white"
                              size={24}
                              onClick={(e) => {
                                // setFavData({
                                //   ...getFavData,
                                //   id:item.id,
                                //   index: item.index,
                                //   url: item.url,
                                //   title: item.name,
                                //   level: item.level,
                                // });
                                addToFavHandler(e, item);

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
                                removeFromFavHandler(item.id);
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
        }) : <p>No items in favorite</p>
    
    }
    {
        favContext?.wishItems?.length > 0 && 

      <TablePagination
        rowsPerPageOptions={[6]}
        rowsPerPage={rowPerPage}
        page={page}
        count={favContext?.wishItems?.length}
        component={"div"}
        onPageChange={()=>handlePageChange}
        onRowsPerPageChange={handlePerPage}
      ></TablePagination>
    }
    </div>
  );
};
export default CardDesign;
