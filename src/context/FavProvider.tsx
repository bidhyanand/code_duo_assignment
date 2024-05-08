import React, { useReducer,useEffect } from "react";
import FavContext from "./Fav-context";

// Default state of the cart
const defaultCartState = {
  items: [],
};
const WISH_LOCAL_STORAGE_KEY = "favorites";
// Reducer function for managing cart state and actions
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // eslint-disable-next-line no-debugger
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); 
    // getting the index of item if item already exist.

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      
    };
  }
  if (action.type === "REMOVE") {

    let updatedItems;
   
      updatedItems = state.items.filter((item) => item.id !== action.id);
    
    return {
      items: updatedItems,
    };
  }
  if (action.type === "ORDER") {
    return {
      items: [],
      totalAmount: 0,

    };
  }
  return defaultCartState;
};

const FavProvider = (props) => {
  const initialCartState = 
    (typeof localStorage !== 'undefined' && localStorage.getItem(WISH_LOCAL_STORAGE_KEY))
    ? JSON.parse(localStorage.getItem(WISH_LOCAL_STORAGE_KEY))
    : defaultCartState;
  // Initialize the cart state with the default state
  const [curState, dispatchCartAction] = useReducer(cartReducer, initialCartState);
  useEffect(() => {
    localStorage.setItem(WISH_LOCAL_STORAGE_KEY, JSON.stringify(curState));
  }, [curState]);
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const onOrderHandler = () => {
    dispatchCartAction({ type: "ORDER" });
  };
 

  const wishContext = {
    wishItems: curState.items,
    totalAmount: curState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    order: onOrderHandler,
    
  };

  return (
    <FavContext.Provider value={wishContext}>
      {props.children}
    </FavContext.Provider>
  );
};

export default FavProvider;