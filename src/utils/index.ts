
import { Product } from "../models/product";



export const totalPriceCart = (products: Product[]) => {
    return products.reduce((acc, current ) => acc + current.price, 0)
}