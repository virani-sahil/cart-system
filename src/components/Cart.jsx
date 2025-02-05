import { useContext, useEffect } from "react"
import { Link } from "react-router"
import { UserContext } from "./UserContext";

const Cart = () => {
    const { cart, setCart } = useContext(UserContext);

    useEffect(() => {
        const cartNewData = JSON.parse(localStorage.getItem("cartitems"));
        setCart(cartNewData);
    }, [setCart]);

    console.log(cart, "cart")

    function handleRemovebtn(index) {
        const newData = cart.filter((ele, ind) => ind !== index)
        localStorage.setItem("cartitems", JSON.stringify(newData));
        setCart(newData);
    }

    return (
        <div>
            <button className="p-5"><Link to="/" className="bg-red-600 text-white p-2 px-3 rounded-md">Page</Link></button>
            <div>
                <div className="flex flex-wrap items-start gap-20 p-10">
                    {
                        cart?.map((ele, index) => {
                            return (
                                <div key={ele?.id} className="border">
                                    <img src={ele?.image} alt="" className="w-[270px] h-[200px]" />
                                    <div className="text-center p-2">
                                        <div>{ele?.name}</div>
                                        <div>{ele?.price}</div>
                                    </div>
                                    <div className="flex justify-around pb-1">
                                        <button className="bg-black text-red-500 rounded-md p-1 px-2" onClick={() => handleRemovebtn(index)}>remove</button>
                                        <label htmlFor="additems" className="flex items-center"> Quntity : {ele?.count}</label>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart