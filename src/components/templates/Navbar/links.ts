type Link = {
    title: string
    path: string
    filter: string
}

const leftLinks: Link[] = [
    {title:"All", path: "", filter: ""},
    {title:"Clothes", path: "/clothes", filter: "clothes"},
    {title:"Electronics", path: "/electronics", filter: "electronics"},
    {title:"Furniture", path: "/furnitures", filter: "furniture"},
    {title:"Toys", path: "/toys", filter: "toys"},
    {title:"Others", path: "/others", filter: "others"}
]

const rightLinks: Link[] = [
    {title:"My Orders", path: "/my-orders", filter: ""},
    {title:"My Account", path: "/my-account", filter: ""},
    {title:"Sign out", path: "/login", filter: ""},
]

const rightLinksOffWebSite: Link[] = [
    { title:"Login", path: "/login", filter: "" },
]

export  { type Link, leftLinks, rightLinks, rightLinksOffWebSite}