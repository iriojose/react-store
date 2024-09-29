import { FC, ReactNode } from "react";

type Props = {
    className?: string
    value: string
    placeholder?: string
    name: string
    type?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label?: () => ReactNode
    leftIcon?: () => ReactNode
    rightIcon?: () => ReactNode
    onError?: () => ReactNode
    onSuccess?: () => ReactNode
}

const Input: FC<Props> = ({className, value, onChange, label, rightIcon, leftIcon, placeholder, type = "text", onError, onSuccess, name}) => {
    return (
        <div>
            {label && label()}

            <div className={`flex items-center ${className} ${rightIcon && "justify-around"}`}>
                {leftIcon && leftIcon()}

                <input 
                    className="focus:outline-none"
                    type={type} 
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange} 
                    name={name}
                />
                
                {rightIcon && rightIcon()}
            </div>


            <div className="min-h-5">
                {onError && onError()}
                {onSuccess && onSuccess()}
            </div>
        </div>
    )
}

export { Input }