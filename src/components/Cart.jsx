import { useContext } from "react"
import { Link } from "react-router"
import { UserContext } from "./UserContext";

const Cart = () => {
    const { cart } = useContext(UserContext);
    
    return (
        <div>
            <button className="bg-red-600 text-white p-2 px-3 rounded-md"><Link to="/">Page</Link></button>
            <div>
                <div className="flex flex-wrap items-start gap-20 p-10">
                    {
                        cart.map((ele) => {
                            return (
                                <div key={ele.id} className="border">
                                    <img src={ele.image} alt="" className="w-[270px] h-[200px]" />
                                    <div className="text-center p-2">
                                        <div>{ele.name}</div>
                                        <div>{ele.price}</div>
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