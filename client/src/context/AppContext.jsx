import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

//it is like a global component where you can keep values that multiple components might need to access
export const AppContext = createContext();

//it is used to wrap your app with this provider so that all the child compents inside it can access
export const AppContextProvider = ({children}) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate(); //it is a function that allows user to redirect to different routes
    const [user, setUser] = useState(null); //define user state initially null and setUser updates the user (eg after login)
    const [isSeller, setIsSeller] = useState(false); //checks if user is seller or not initially it is set to false
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState([]);


    // Total count of items in cart
const getCartItemCount = () => {
    let totalCount = 0;
    for(const item in cartItems){
        totalCount += cartItems[item];
    }
    return totalCount;
  };
  
  // Total amount of cart
  const getCartTotalAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems){
        let itemInfo = products.find((product) => product._id === items);
        if(cartItems[items] > 0) {
            totalAmount += itemInfo.offerPrice * cartItems[items    ]
        }
    }
    return Math.floor(totalAmount * 100) /100;
  };
  useEffect(() => {
    fetchProducts();
}, []);

    //fetch all products
    const fetchProducts = async() => {
        setProducts(dummyProducts);
    }
    //add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems); {/***structuredClone is used to create deep copy of the cartItems  */}

        if(cartData[itemId]){
            cartData[itemId] += 1;
        }
        else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart");
    }
    //update cart item quantity
    const updateCartItem = (ItemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[ItemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")

    }
    //remove product from the cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart")
        setCartItems(cartData);
    }

    {/**“Hey React, after the component renders for the first time, call fetchProducts() to load the data.” */}
    useEffect(() => {
        fetchProducts();
    })

    const value = {navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, getCartItemCount,       // added
        getCartTotalAmount,
        products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery} //this is what we pass in the object so any component using this can access the values



    //wraps the children and makes context value available to all of the nested components inside it.
    return <AppContext.Provider value={value}> 
        {children}
    </AppContext.Provider>
}

//it is a custom hook. Using this, instead of writing UseContext(AppContext) everytime you can use simply useContext()
export const useAppContext = () => {
    return useContext(AppContext);
}