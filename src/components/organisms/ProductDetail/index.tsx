import { FC } from "react";
import "./style.css"
import Close from "../../../assets/close.svg"
import { useContextProvider } from "../../../store";

const ProductDetail: FC = () => {
    const { actions: {closeProductDetail}, state:{ productShow } } = useContextProvider()
    
    return (
        <aside 
            className={"product-detail flex flex-col fixed bg-white right-0 border border-black rounded-lg"}>
            <div className="flex justify-between items-center p-6">
                <h2 className="font-medium text-xl">Detail</h2>
                <div onClick={closeProductDetail} className="h-5 w-5 cursor-pointer"><img src={Close} /></div>
            </div>

            <figure className="px-6">
                <img 
                    className="w-full h-64 rounded-lg object-cover" 
                    src="https://images.pexels.com/photos/8000624/pexels-photo-8000624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="" 
                />
                <p className="flex flex-col p-6">
                    <span className="font-medium text-2xl mb-2">${productShow?.price}</span>
                    <span className="font-medium text-md">{productShow?.title}</span>
                    <span className="text-sm">{productShow?.description}</span>
                </p>
            </figure>
        </aside>
    )
}

export { ProductDetail }

