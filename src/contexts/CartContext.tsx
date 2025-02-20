import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (productId: number, quantity: number) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.productId === productId);
      if (index !== -1) {
        const newCart = [...prev];
        newCart[index].quantity = quantity;
        return newCart;
      } else {
        return [...prev, { productId, quantity }];
      }
    });
  };

  // Para verificar que se actualice el carrito
  useEffect(() => {
    console.log("Cart actualizado:", cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};
