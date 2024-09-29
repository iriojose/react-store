import { FC } from "react"
import { Layout } from "../../components/templates/Layout"
import { List } from "../../components/atoms/List"
import { OrderCard } from "../../components/organisms/OrderCard"
import { useContextProvider } from "../../store"
import Chevron from "../../assets/chevron.svg"
import { Link, useParams } from "react-router-dom"

const MyOrder: FC = () =>  {
    const { state: { orders } } = useContextProvider()
    const { id } = useParams()
    const index = id ? orders.findIndex((order) => order.id == id):orders.length - 1;

    return (
        <Layout>
            <div className="flex items-center justify-center relative w-80 mb-6">
                <Link to={"/my-orders"} className="absolute left-0">
                    <img className="w-6 h-6 cursor-pointer text-black" src={Chevron} />
                </Link>
                <h1>My Order</h1>
            </div>

            {orders.length > 0 && (
                <div className="flex flex-col w-80">
                    <List values={orders[index].products}>
                        {(product, i) => {
                            return <OrderCard key={i} product={product} />
                        }}
                    </List>
                </div>
            )}
        </Layout>
    )
}
  
export { MyOrder }
  