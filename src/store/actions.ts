/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, useEffect } from "react";
import { ActionTypes, State, Action, Actions } from "./contextTypes"
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Product } from "../models/product"
import { Order } from "../models/order";
import { User } from "../models/user";
import { v1 } from "uuid"
import { totalPriceCart } from "../utils";

export const useActions = (state: State, dispatch: Dispatch<Action<ActionTypes, any>>): Actions => {
    //localstorage
    const [ cart, saveCart, clearCart ] = useLocalStorage("CART_PRODUCTS_V1", state.cartProduct);
    const [ user, saveUser, deleteUser ] = useLocalStorage("USER_V1", state.user)

    useEffect(() => {
        if(cart) dispatch({type: ActionTypes.setCartProducts, payload: cart})
        if(user) dispatch({type: ActionTypes.setUser, payload: user})
    },[]) 

    useEffect(() => {
        saveCart(state.cartProduct)
    }, [state.cartProduct])
    
    //side menu product detail
    const openProducDetail = () => dispatch({ type: ActionTypes.setProductDetail, payload: true})
    const closeProductDetail = () => dispatch({ type: ActionTypes.setProductDetail, payload: false})

     //side menu cart products
    const openCheckoutSideMenuOpen = () => dispatch({type: ActionTypes.setSideMenu, payload: true})
    const closeCheckoutSideMenuOpen = () => dispatch({type: ActionTypes.setSideMenu, payload: false})

    //set product show detail
    const setProductShow = (product: Product) => dispatch({type: ActionTypes.setProductShow, payload: product})

    //update product to show side menu
    const updateProductShow = (product: Product) => {
        setProductShow(product)
        openProducDetail()
        closeCheckoutSideMenuOpen()
    }

    //add Item to cart
    const addItemToCart = (product: Product) => {
        dispatch({type: ActionTypes.setCartProducts, payload: [...state.cartProduct, product]})
        openCheckoutSideMenuOpen()
        closeProductDetail()
    }

    //delete item cart
    const deleteItemCart = (id: number) => {
        const filteredProducts = state.cartProduct.filter(product => product.id !== id)
        dispatch({type: ActionTypes.setCartProducts, payload: filteredProducts})
    }

    //create order
    const createOrder = () => {
        const newOrder: Order = {
            id: v1(),
            products: state.cartProduct,
            totalPrice: totalPriceCart(state.cartProduct),
            totalProducts: state.cartProduct.length,
            date: new Date().toLocaleDateString()
        }

        dispatch({type: ActionTypes.setOrders, payload: [...state.orders, newOrder]})
        dispatch({type: ActionTypes.setCartProducts, payload: []})
        clearCart()
        closeCheckoutSideMenuOpen()
    }

     //set global products and filters
    const setItems = (products: Product[]) => dispatch({type: ActionTypes.setItems, payload: products})
    const setSearchInput = (text:string) => dispatch({type: ActionTypes.setSearchInput, payload: text }) 
    const setCategoryFilter = (text: string) => dispatch({type: ActionTypes.setCategoryFilter, payload: text})

    //set user
    const setUser = (user: User | null) => {
        dispatch({type: ActionTypes.setUser, payload: user})
        if(user) saveUser(user)
        else deleteUser()
    }
    
    return  {
        openProducDetail,
        closeProductDetail,
        openCheckoutSideMenuOpen,
        closeCheckoutSideMenuOpen,
        setProductShow,
        updateProductShow,
        addItemToCart,
        deleteItemCart,
        createOrder,
        setItems,
        setSearchInput,
        setCategoryFilter,
        setUser,
    }
}