import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({children}) => {
    return (
        <div className="flex flex-col mt-20 items-center">
            {children}
        </div>
    )
}

export { Layout }