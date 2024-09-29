import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode | ReactNode[]
    className?: string
}

const Container: FC<Props> = ({children, className}) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export { Container }