import { FC, FormHTMLAttributes } from "react";

type FormProps = FormHTMLAttributes<HTMLFormElement>

const Form: FC<FormProps> = ({...props}) => {
    return (
        <form {...props}>
            {props.children}
        </form>
    )
}

export { Form }