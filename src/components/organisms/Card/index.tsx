import { FC, MouseEvent } from "react";
import { useContextProvider } from "../../../store"; 
import { Product } from "../../../models/product";
import Plus from "../../../assets/plus.svg"
import Check from "../../../assets/check.svg"
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

type Props = {
    product: Product
}

const Card: FC<Props> = ({product}) => {
    const { state:{ cartProduct }, actions: {updateProductShow, addItemToCart}} = useContextProvider()

    const plusItem = (e: MouseEvent) => {
        e.stopPropagation()
        addItemToCart(product)
    }

    const renderIcon = (id: number) => {
        const inCart = cartProduct.filter(product => product.id === id).length > 0

        if(inCart) {
            return (
                <div onClick={(e) => e.stopPropagation()} className="absolute top-0 right-0 flex justify-center items-center bg-green-500 w-6 h-6 rounded-full m-2 p-1">
                    <img src={Check} />
                </div>
            )
        } else {
            return (
                <div 
                    onClick={plusItem}
                    className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
                >
                    <img src={Plus} />
                </div>
            )
        }
    }

    return (
        <div onClick={() => updateProductShow(product)} className="bg-white cursor-pointer w-56 h-60 rounded-lg">
            <figure className="relative mb-2 w-full h-4/5"> 
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
                    {product.category.name}
                </span>

                <LazyLoadImage 
                    className="w-full h-full object-cover rounded-lg" 
                    /* effect='blur' */
                    /*  placeholderSrc={Plus} */
                    src="https://images.pexels.com/photos/8000624/pexels-photo-8000624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />

                {/* <img 
                    className="w-full h-full object-cover rounded-lg"
                    src="https://images.pexels.com/photos/8000624/pexels-photo-8000624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Headphones" 
                /> */}

                {renderIcon(product.id)}
            </figure>

            <p className="flex justify-between">
                <span className="text-sm font-light">{product.title}</span>
                <span className="text-lg font-medium">${product.price}</span>
            </p>
        </div>
    )
}

export { Card }