type Category = {
    id: number
    name: string
    image: string
}

type Product = {
    id: number
    name: string
    title: string,
    price: number,
    description: string
    category: Category
    images: string[]
}

export { type Product}