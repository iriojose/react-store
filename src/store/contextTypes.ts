import { Product } from "../models/product";
import { User } from "../models/user";
import { Order } from "../models/order";

export type ContextType = {
    state: State
    actions: Actions
    deleteUser: () => void
}

export interface Actions {
    openProducDetail: () => void
    closeProductDetail: () => void
    openCheckoutSideMenuOpen: () => void
    closeCheckoutSideMenuOpen: () => void
    setProductShow: (product: Product) => void
    setItems: (products: Product[]) => void
    updateProductShow: (product: Product) => void
    addItemToCart: (product: Product) => void
    createOrder: () => void
    deleteItemCart: (id: number) => void
    setSearchInput: (text: string) => void
    setCategoryFilter: (text: string) => void
    setUser: (user: User | null) => void
}

export type State = {
    sidebarProductDetailIsOpen: boolean
    isCheckoutSideMenuOpen: boolean
    productShow: Product | null
    cartProduct: Product[]
    orders: Order[],
    items: Product[],
    filteredProducts: Product[],
    searchInput: string,
    categoryFilter: string,
    user: User | null
}

export enum ActionTypes {
    setProductDetail = "SET_PRODUCT_DETAIL",
    setSideMenu = "SET_SIDE_MENU",
    setProductShow = "SET_PRODUCT_SHOW",
    setCartProducts = "SET_CART_PRODUCTS",
    setOrders = "SET_ORDERS",
    setItems = "SET_ITEMS",
    setFilteredProducts = "SET_FILTERED_PRODUCTS",
    setSearchInput = "SET_SEARCH_INPUT",
    setCategoryFilter = "SET_CATEGORY_FILTER",
    setUser = "SET_USER"
}

export type Action<ActionTypes, T> = {
    type: ActionTypes,
    payload?: T
}