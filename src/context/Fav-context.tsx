import React from "react";
interface Item {
  id: number;
  index: string;
  name: string;
  url: string;
  level: number;
}
const FavContext = React.createContext({
  wishItems: [] as Item[] ,
 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: (_item: Item) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: (_id: number) => {},
});

export default FavContext;
