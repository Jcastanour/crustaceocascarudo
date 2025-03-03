import { Product } from "../types/Product";
import burger1 from "./images/burger1.jpg";
import burger2 from "./images/burger2.jpg";
import burger3 from "./images/burger3.jpg";

export const ProductsMocks: Product[] = [
  {
    id: 1,
    name: "Cangreburger",
    price: 1.25,
    description: "Pan, carne, queso,lechuga",
    image: burger1,
  },
  {
    id: 2,
    name: "Cangreburger + gaseosa",
    price: 3.25,
    description: "Pan, carne, lechuga, queso,lechuga, gaseosa",
    image: burger2,
  },
  {
    id: 3,
    name: "Combo Cangreburger + gaseosa + papas",
    price: 5.25,
    description: "Pan, carne, tomate, queso, lechuga, gaseosa, papas",
    image: burger3,
  },
];
