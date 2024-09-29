import { FC } from "react";
import "./style.css"
import Close from "../../../assets/close.svg"
import { useContextProvider } from "../../../store"; 
import { List } from "../../atoms/List";
import { OrderCard } from "../OrderCard";
import { totalPriceCart } from "../../../utils";
import { Link } from "react-router-dom";

const CheckoutSideMenu: FC = () => {    
    const {state: {cartProduct, isCheckoutSideMenuOpen}, actions: {closeCheckoutSideMenuOpen, createOrder, deleteItemCart}} = useContextProvider() 

    return (    
        <aside 
            className={`${isCheckoutSideMenuOpen ? "flex":"hidden"} checkout-side-menu flex-col fixed bg-white right-0 border border-black rounded-lg`}>
             <div className="flex justify-between items-center p-6">
                <h2 className="font-medium text-xl">My Order</h2>
                <div onClick={closeCheckoutSideMenuOpen} className="h-5 w-5 cursor-pointer">
                    <img src={Close} />
                </div>
            </div>
    
            <div className="px-6 overflow-y-auto flex-1">
                {cartProduct.length <= 0 && (
                    <div className="flex justify-center items-center absolute inset-10">Products not added yet...</div>
                )}
                
                {cartProduct && cartProduct.length > 0 && (
                    <List values={cartProduct}>
                        {(card, i) => {
                            return <OrderCard 
                                key={i} 
                                product={card} 
                                handleDelete={() => (
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg font-medium">${card.price}</p>
                                        <img 
                                            className="h-6 w-6 cursor-pointer" 
                                            onClick={() => deleteItemCart(card.id)} 
                                            src={Close}
                                        />
                                    </div>
                                )}
                            />
                        }}
                    </List>
                )}
            </div>

            <div className="px-6 mb-6">
                <p className="flex justify-between items-center mb-2">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium text-xl">${totalPriceCart(cartProduct)}</span>
                </p>

                <Link to="/my-orders/last" onClick={(e) => {if(cartProduct.length <= 0) e.preventDefault()}}>
                    <button 
                        className={`w-full py-3 text-white rounded-lg ${cartProduct.length > 0 ? "bg-black":"bg-gray-200 cursor-not-allowed"}`} 
                        onClick={createOrder}
                        disabled={cartProduct.length <= 0 ? true:false}
                    >
                        Checkout
                    </button>
                </Link>
            </div>
        </aside>
    )
}

export { CheckoutSideMenu }