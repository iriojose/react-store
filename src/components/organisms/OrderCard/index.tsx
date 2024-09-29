import { FC, ReactNode } from "react";
import { Product } from "../../../models/product";

type Props = {
    product: Product
    handleDelete?: () => ReactNode
}

const OrderCard: FC<Props> = ({product, handleDelete}) => {
    return (
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
                <figure className="w-16 h-12">
                    <img 
                        className="w-full h-full rounded-lg object-cover" 
                        src="https://images.pexels.com/photos/8000624/pexels-photo-8000624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        alt="" 
                    />
                </figure>
                <p className="text-sm font-light">{product.title}</p>
            </div>

            {handleDelete && handleDelete()}
        </div>
    )
}

export { OrderCard }