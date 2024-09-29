import { FC } from "react";
import { Order } from "../../../models/order";
import ChevronRigh from "../../../assets/cheronRight.svg"
import Calendar from "../../../assets/calendar.svg"
import Bag from "../../../assets/shoppingbag.svg"

type Props = {
    order: Order
}

const OrdersCard: FC<Props> = ({order}) => {
    return (    
        <div className="flex items-center justify-between w-80 border border-black mb-3 rounded-lg p-3">
            <div className="flex flex-col h-full">
                <div className="flex items-center gap-2">
                    <img className="h-4 w-4" src={Calendar} />
                    <p>{order.date}</p>
                </div>

                <div className="flex items-center gap-2">
                    <img className="h-4 w-4" src={Bag} />
                    <p>{order.totalProducts} articles</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <p className="text-2xl font-medium">${order.totalPrice}</p>
                <img className="h-4 w-4" src={ChevronRigh} />
            </div>
        </div>
    )
}

export { OrdersCard }