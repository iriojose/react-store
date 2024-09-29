import { ReactNode } from "react";

type Props<T> = {
    children: (value: T, index: number) => ReactNode,
    values: Array<T>,
}

const List = <T, >({ values, children }: Props<T>) => {
    return (
        <>{values.map(children)}</>
    )
}

export { List }