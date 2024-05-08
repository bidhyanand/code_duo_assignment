import { useState } from "react";
import { TablePagination } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CardDesign = ({ data}:{data:Spells[]}) => {
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(20);
  const handlePageChange = (_e: any, newpage: number) => {
    setPage(newpage);
  };
  function handlePerPage(e: React.ChangeEvent<HTMLInputElement>) {
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
    <div className="flex flex-wrap   gap-3 2xl:gap-4 justify-around pt-4 xl:px-4 ">
      {data
        ?.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
        .map((item: any) => {
          return (
            <>
              <div className="max-w-sm font-mono border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-1/5 2xl:w-1/4 bg-gray-200 ">
                <div className="p-5 ">
                  <a href="#">
                    <h5 className="mb-2 2xl:text-2xl font-bold tracking-tight text-base text-gray-900 dark:text-white  ">
                      {item?.name}
                    </h5>
                  </a>

                  <p className="flex justify-end py-3">
                    <span className="font-semibold  dark:text-gray-200 text-red-400  ">
                      Level:
                    </span>{" "}
                    <span className="text-red-500 pl-4 ">
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


export interface Spells {
  index: string
  name: string
  level: number
  url: string,
  
}