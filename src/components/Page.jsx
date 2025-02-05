import { useContext, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "./UserContext";
import { useEffect } from "react";
import { products } from "../utils/constants";

const Page = () => {

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState(localStorage.getItem("category") || "ALL");
    const [data, setData] = useState(products);
    const [count, setCount] = useState(0);
    const { cart, setCart } = useContext(UserContext)

    function handlesearchCategory(event) {
        const val = event.target.value;
        setSearch(val);

        const filteredData = products.filter((ele) => (ele.name.toLowerCase()).startsWith(val.toLowerCase()));
        setData(filteredData);
    }

    function handlesetCategory(event) {
        const val = event.target.value;
        setCategory(val);
        localStorage.setItem("category", val)

        if (val === "ALL") {
            setData(products);
            return;
        } else {
            const filteredData = products.filter((ele) => (ele.category === val))
            setData(filteredData);
        }
    }

    // using Context ===========

    function handleAddtoCart(index) {
        const selectedProduct = data[index];
        const cartItems = JSON.parse(localStorage.getItem("cartitems")) || [];
        const isItemInCart = cartItems.find((ele) => ele.id === selectedProduct.id);

        if (isItemInCart) {
            const updatedCart = cartItems.map((ele) =>
                ele.id === selectedProduct.id ? { ...ele, count: ele.count + 1 } : ele
            );
            localStorage.setItem("cartitems", JSON.stringify(updatedCart));
            setCart(updatedCart);
            alert("add Again")
        } else {
            const updatedCart = [...cartItems, selectedProduct];
            localStorage.setItem("cartitems", JSON.stringify(updatedCart));
            setCart(updatedCart);
            alert("Added");
            // setCount(updatedCart.length);
        }
    }

    useEffect(() => {
        setCount(cart?.length);
    }, [cart])

    useEffect(() => {
        if (category !== "ALL") {
            const filteredData = products.filter((ele) => ele.category === category);
            setData(filteredData);
        } else {
            setData(products);
        }
    }, [category]);

    return (
        <div className="p-2">
            <div className="flex justify-between">
                <div>
                    <input type="text" value={search} placeholder="search product" className="border p-1" onChange={handlesearchCategory} />
                    <select name="product" id="category" value={category} className="border p-1" onChange={handlesetCategory}>
                        <option value="ALL">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Footwear">Footwear</option>
                        <option value="Bags">Bags</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Wearables">Wearables</option>
                        <option value="Fashion">Fashion</option>
                    </select>
                </div>
                <div>
                    <button className=""><Link to="/cart" className="bg-yellow-400 rounded-xl p-2">Cart</Link></button>
                    <button className="bg-black text-white p-1 rounded">{count}</button>
                </div>
            </div>

            <div className="flex flex-wrap items-start gap-20 p-10">
                {
                    data.map((ele, index) => {
                        return (
                            <div key={ele.id} className="border">
                                <img src={ele.image} alt="" className="w-[270px] h-[200px]" />
                                <div className="text-center p-2">
                                    <div>{ele.name}</div>
                                    <div>{ele.price}</div>
                                    <div>
                                        <button onClick={() => handleAddtoCart(index)} className="bg-black text-white p-1 px-3 rounded-xl">add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Page