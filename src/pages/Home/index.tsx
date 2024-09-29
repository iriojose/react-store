import { FC, useEffect } from "react"
import { useContextProvider } from "../../store"
import { Layout } from "../../components/templates/Layout"
import { Card } from "../../components/organisms/Card"
import { ProductDetail } from "../../components/organisms/ProductDetail"
import { List } from "../../components/atoms/List"
import { Input } from "../../components/atoms/Input"
import Lupa from "../../assets/lupa.svg"
import Close from "../../assets/close.svg"
import { useApi } from "../../hooks/useApi"
import { listAllProducts } from "../../services/products"
import { Product } from "../../models/product"

const Home: FC = () => {
    const { state: {filteredProducts, sidebarProductDetailIsOpen, searchInput}, actions: { setSearchInput, setItems }} = useContextProvider()
    const [loadProducts, {data: productsData, loading: loadingProducts} ] = useApi(listAllProducts)

    useEffect(() => {
        loadProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) 

    useEffect(() => {
        if(!loadingProducts && productsData) setItems(productsData as Product[])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingProducts])

    return (
        <Layout>
            <div>
                <div className="text-lg font-medium text-center">Exclusive Products</div>
                <Input 
                    className="p-2 rounded-lg border border-black/20 my-4 focus-within:border-black w-72" 
                    value={searchInput} 
                    placeholder="Search..."
                    onChange={setSearchInput} 
                    leftIcon={() => <img className="h-6 w-6 mr-3" src={Lupa} />}
                    rightIcon={() => (searchInput.length > 0 &&
                        <img 
                            className="h-6 w-6 ml-3 cursor-pointer" 
                            onClick={() => setSearchInput("")} 
                            src={Close}
                        />
                    )}
                />
            </div>
            
            {loadingProducts && (
                <div className="flex justify-center items-center font-medium text-lg">Cargando...</div>
            )}

            {(filteredProducts && filteredProducts.length <= 0 && !loadingProducts) && (
                <div className="flex justify-center items-center">
                    <p className="font-medium text-lg">Products not found...</p>
                </div>
            )}
            
            <div className="grid place-content-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-screen-lg">
                {filteredProducts && (
                    <List values={filteredProducts}>
                        {(item, i) => {
                            return (
                                <Card 
                                    product={item} 
                                    key={i} 
                                />
                            )
                        }}
                    </List>
                )}
            </div>

            {sidebarProductDetailIsOpen && <ProductDetail />}
		</Layout>
    )
}
  
export { Home }
  