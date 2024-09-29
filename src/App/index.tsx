import { FC } from "react"
import { BrowserRouter } from "react-router-dom"
import { ContextProvider } from "../store"
import { Navbar } from "../components/templates/Navbar"
import { CheckoutSideMenu } from "../components/organisms/CheckoutSideMenu"
import { RouterProvider } from "../router/index"

const App: FC = () => {
  	return (
		<ContextProvider>
			<BrowserRouter>
				<Navbar />
				<RouterProvider />
				<CheckoutSideMenu />
			</BrowserRouter>
		</ContextProvider>
  	)
}

export { App }
