import React from "react";

const FavContext = React.createContext({
    wishItems:[],
    totalAmount: 0 ,
    // eslint-disable-next-line no-debugger
    addItem : (item:any)=>{},
    removeItem : (id:any)=>{},
});



export default FavContext