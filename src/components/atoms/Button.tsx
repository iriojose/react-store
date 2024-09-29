import { FC, ButtonHTMLAttributes} from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({...props}) => {
    return (
        <button {...props}>
            {props.children}
        </button>
    )
}

export { Button }