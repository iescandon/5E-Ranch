import {  useContext } from "react";
import { CartContext } from "../contexts/cart";
import { clearCart } from "@/contexts/cart/reducer";
import Navbar from "@/components/navbar"

export default function Cart() {
  const [ state, dispatch ] = useContext(CartContext)

      return (
        <>
          <Navbar isBlack={true} />
          <p className="p-4">cart page coming soon</p>
          <button className="ml-4 bg-black text-white p-4" onClick={() => dispatch(clearCart())}>clear cart</button>
        </>
      )
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