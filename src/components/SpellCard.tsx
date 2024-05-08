import { FormEvent, useContext, useState } from "react";
import { TablePagination } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FavContext from "../context/Fav-context";

export interface Spells {
  id: number;
  index: string;
  name: string;
  level: number;
  url: string;
}

const CardDesign = ({ data }: { data: Spells[] }) => {
  data = data?.map((item: Spells, index: number) => {
    return {
      ...item,
      id: index + 1,
    };
  });

  const favContext = useContext(FavContext);
  const addToFavHandler = (e: FormEvent, item: Spells) => {
    e.preventDefault();
    favContext.addItem({
      id: item.id,
      index: item.index,
      name: item.name,
      level: item.level,
      url: item.url,
    });
  };
  const removeFromFavHandler = (id: number) => {
    favContext.removeItem(id);
  };

  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(20);
  const handlePageChange = (_e: FormEvent, newpage: number) => {
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

    let stars = "";

    for (let i = 0; i < level; i++) {
      stars += "⭐";
    }

    return stars;
  }

  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap   gap-3 2xl:gap-4 justify-around pt-4 xl:px-4 ">
      {data
        ?.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
        .map((item: Spells) => {
          const idExistsInSecondArray = favContext?.wishItems.some(
            (obj: Spells) => obj.id === item.id
          );
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
                                addToFavHandler(e, item);

                                toast.success("Added to favorites");
                              }}
                            />{" "}
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
        onPageChange={() => handlePageChange}
        onRowsPerPageChange={() => handlePerPage}
      ></TablePagination>
    </div>
  );
};
export default CardDesign;
