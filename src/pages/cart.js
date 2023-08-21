import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart";
import {
  clearCart,
  incrementItem,
  decrementItem,
  removeFromCart,
} from "@/contexts/cart/reducer";
import Navbar from "@/components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const [state, dispatch] = useContext(CartContext);
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    setCartItems(state.items);
  }, [state]);

  return (
    <>
      <Navbar isBlack={true} />
      <div className="p-10">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold pb-1">
          Shopping cart
        </h2>
        { cartItems?.length === 0 ? (
          <p>You have nothing in your shopping cart.</p>
        ) : (
          state.items.map((item) => {
            return (
              <div className="flex space-x-10 items-center h-40 border-b border-gray-300">
                <img src="" />
                <div>{item.name}</div>
                <div>
                  <div className="w-full">
                    <div className="border w-max">
                      <button
                        className="p-4"
                        onClick={() => dispatch(decrementItem({ id: 1 }))}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="p-4"
                        onClick={() => dispatch(incrementItem({ id: 1 }))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className=""
                  onClick={() => dispatch(removeFromCart({ id: 1 }))}
                >
                  <FontAwesomeIcon
                    className="text-black text-lg lg:text-xl"
                    icon={faClose}
                  />
                </button>
              </div>
            );
          })
        )}
      </div>
      {/* <button className="ml-4 bg-black text-white p-4" onClick={() => dispatch(clearCart())}>clear cart</button> */}
    </>
  );
}

//   export const getStaticProps = async () => {
//       const content = await getContent({
//           content_type: "aboutPageContent",
//       });

//       return {
//           props: { content: content[0].fields },
//           revalidate: 1
//       }
//   }
