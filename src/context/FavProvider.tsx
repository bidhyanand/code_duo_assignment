import { useReducer, useEffect, ReactNode } from "react";
import FavContext from "./Fav-context";

interface Item {
  id: number;
  index: string;
  name: string;
  url: string;
  level: number;
}
interface Props {
  children: ReactNode;
}

interface ActionType {
  type: string;
  item?: Item;
  id?: number;
}

// Default state of the cart
const defaultCartState = {
  items: [] as Item[],
};
const WISH_LOCAL_STORAGE_KEY = "favorites";
// Reducer function for managing cart state and actions
const cartReducer = (state: any, action: ActionType) => {
  if (action.type === "ADD") {
    let updatedItems = state.items.concat(action?.item);

    return {
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE") {
    let updatedItems;

    updatedItems = state.items.filter((item: Item) => item.id !== action.id);

    return {
      items: updatedItems,
    };
  }
  return defaultCartState;
};

const FavProvider = (props: Props) => {
  const initialCartState =
    typeof localStorage !== "undefined" &&
    localStorage.getItem(WISH_LOCAL_STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(WISH_LOCAL_STORAGE_KEY)!)
      : defaultCartState;
  // Initialize the cart state with the default state
  const [curState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );
  useEffect(() => {
    localStorage.setItem(WISH_LOCAL_STORAGE_KEY, JSON.stringify(curState));
  }, [curState]);
  const addItemToCartHandler = (item: Item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id: number) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const wishContext = {
    wishItems: curState.items,

    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <FavContext.Provider value={wishContext}>
      {props.children}
    </FavContext.Provider>
  );
};

export default FavProvider;
