import { FC } from "react"
import { Layout } from "../../components/templates/Layout"
import { useContextProvider } from "../../store"
import { Container } from "../../components/atoms/Container"
import { List } from "../../components/atoms/List"
import { OrdersCard } from "../../components/organisms/OrdersCard"
import { Link } from "react-router-dom"

const Orders:FC = () => {
    const { state: { orders } } = useContextProvider()

    return (
        <Layout>
            <div className="mb-6 text-2xl font-medium">
                My Orders
            </div>

            {orders.length <= 0 && (
                <div className="text-center mt-6 font-medium text-lg">Orders not found yet...</div>
            )}

            <Container>
                <List values={orders}>
                    {(order, i) => {
                        return (
                            <Link key={i} to={`/my-orders/${order.id}`} >
                                <OrdersCard order={order} />
                            </Link>
                        )
                    }}
                </List>
            </Container>
        </Layout>
    )
}
  
export { Orders }
  