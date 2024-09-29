import { createElement, FC } from "react"
import { useRoutes, Navigate } from "react-router-dom"
import { Home } from "../pages/Home"
import { Account } from "../pages/Account"
import { Orders } from "../pages/Orders"
import { MyOrder } from "../pages/MyOrder"
import { SignIn } from "../pages/SignIn"
import { Login } from "../pages/Login"
import { NotFound } from "../pages/NotFound"
import { useContextProvider } from "../store"

const RouterProvider = () => {
    const { state: { user } } = useContextProvider()

    //validate routes
    const authRouteWithLogin = (element: FC) => user ? createElement(Navigate, {to:"/"}): createElement(element)
    const authRouteWithoutLogin = (element: FC) => !user ? createElement(Navigate, {to:"/"}): createElement(element)

    const routes = useRoutes([
        { path: "/", element: createElement(Home) },
        { path: "/:category", element: createElement(Home) },
        { path: "/my-account", element: authRouteWithoutLogin(Account) },
        { path: "/my-orders", element: authRouteWithoutLogin(Orders) },
        { path: "/my-orders/last", element: authRouteWithoutLogin(MyOrder) },
        { path: "/my-orders/:id", element: authRouteWithoutLogin(MyOrder) },
        { path: "/my-order", element: authRouteWithoutLogin(MyOrder) },
        { path: "/login", element: authRouteWithLogin(Login) },
        { path: "/sign-in", element: authRouteWithLogin(SignIn) },
        { path: "/*", element: createElement(NotFound) },
    ])

    return routes
}

export { RouterProvider }