import { Product } from "./product";

type Order = {
    id: string
    date: string
    products: Product[]
    totalPrice: number
    totalProducts: number
}

export { type Order }