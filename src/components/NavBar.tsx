import  { useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import FavContext from "../context/Fav-context";
import { Link } from "react-router-dom";
export default function NavBar() {
  const favContext = useContext(FavContext);

  return (
    <div>
      <nav className="bg-gray-300 flex items-center justify-between px-10 ">
        <div className="text-xl font-bold  mx-5 py-3">
            <Link to={'/'}>
            Spells
            </Link>
            </div>
        <div>
            <Link to={'/spells/fav'}>

          <div className="flex relative cursor-pointer">
            <FaRegHeart size={40} />

            <div className="bg-red-600 absolute px-1 rounded-md right-0  ">
              <p className="text-white ">{favContext?.wishItems?.length}</p>
            </div>
          </div>
            </Link>
        </div>
      </nav>
    </div>
  );
}