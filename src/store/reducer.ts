/* eslint-disable @typescript-eslint/no-explicit-any */
import { State, ActionTypes, Action } from "./contextTypes"

export const initialState: State = {
    sidebarProductDetailIsOpen: false,
    isCheckoutSideMenuOpen: false,
    productShow: null,
    cartProduct: [],
    orders: [],
    items: [],
    filteredProducts: [],
    searchInput: "",
    categoryFilter: "",
    user: null
}

const reducerObject = (state: State, payload: any): Record<ActionTypes, State> => ({
    [ActionTypes.setProductDetail]: {
        ...state,
        sidebarProductDetailIsOpen: payload
    },
    [ActionTypes.setSideMenu]: {
        ...state,
        isCheckoutSideMenuOpen: payload
    },
    [ActionTypes.setProductShow]: {
        ...state,
        productShow: payload
    },
    [ActionTypes.setCartProducts]: {
        ...state,
        cartProduct: payload
    },
    [ActionTypes.setOrders]: {
        ...state,
        orders: payload
    },
    [ActionTypes.setItems]: {
        ...state, 
        items: payload
    },
    [ActionTypes.setFilteredProducts]: {
        ...state,
        filteredProducts: payload
    },
    [ActionTypes.setSearchInput]: {
        ...state,
        searchInput: payload
    },
    [ActionTypes.setCategoryFilter]: {
        ...state,
        categoryFilter: payload
    },
    [ActionTypes.setUser]: {
        ...state,
        user: payload
    }
})

export const reducer = (state:State, action: Action<ActionTypes, any>): State => {
    if(reducerObject(state, action.payload)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    }else {
        return state
    }
}