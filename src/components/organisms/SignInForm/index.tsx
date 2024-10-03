import { FC, useState } from "react";
import { Form } from "../../atoms/Form";
import { Container } from "../../atoms/Container";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { useForm2, FormState } from "../../../hooks/useForm2";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../../store";
import { User } from "../../../models/user";

import Eye from "../../../assets/eye.svg"
import EyeClose  from "../../../assets/eyeClose.svg"
import UserIcon from "../../../assets/user.svg"

const SignInForm: FC = () => {
    const { actions } = useContextProvider()
    const navigate = useNavigate()
    
    const { register, handleSubmit, reset, formErrors, isFormValid, isSubmitting } = useForm2()
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async(data: FormState) => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        actions.setUser(data as User)
        reset()
        navigate("/")
    }

    return (
        <Form onSubmit={(e) => {
            e.preventDefault() 
            handleSubmit(onSubmit)
        }}>
            <Container className="justify-center mt-10">
                <Input 
                    {...register("name", {
                        required: "This field is required",
                        minLength: {
                            value: 3,
                            message: "Need to be more than 3 letters"
                        }
                    })}
                    className={`p-2 rounded-lg border my-2 w-72 ${formErrors.name ? "border-red-200 focus-within:border-red-500":"border-black/20 focus-within:border-black"}`}
                    placeholder="irio"
                    label={() => (<div className="font-light mt-2">Name</div>)}
                    onError={() => formErrors.name && <span className="text-red-500">{formErrors.name}</span>}
                />

                <Input 
                    {...register("lastname", {
                        required: "This field is required",
                        minLength: {
                            value: 3,
                            message: "Need to be more than 3 letters"
                        }
                    })}
                    className={`p-2 rounded-lg border my-2 w-72 ${formErrors.lastname ? "border-red-200 focus-within:border-red-500":"border-black/20 focus-within:border-black"}`}
                    placeholder="gomez"
                    label={() => (<div className="font-light mt-2">Lastname</div>)}
                    onError={() => formErrors.lastname && <span className="text-red-500">{formErrors.lastname}</span>}
                />

                <Input 
                    {...register("username", {
                        required: "This field is required",
                        emailFormat: "Must be a email",
                    })}
                    className={`p-2 rounded-lg border my-2 w-72 ${formErrors.username ? "border-red-200 focus-within:border-red-500":"border-black/20 focus-within:border-black"}`}
                    placeholder="iriojgv@gmail.com"
                    label={() => (<div className="font-light mt-2">Username</div>)}
                    rightIcon={() => (
                        <img 
                            className="h-5 w-5 ml-3" 
                            src={UserIcon}
                        />
                    )}
                    onError={() => formErrors.username && <span className="text-red-500">{formErrors.username}</span>}
                />

                <Input 
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Need to be more than 8 letters"
                        }
                    })}
                    type={showPassword ? "text":"password"}
                    className={`p-2 rounded-lg border w-72 my-2 ${formErrors.password ? "border-red-200 focus-within:border-red-500":"border-black/20 focus-within:border-black"}`}
                    placeholder="********"
                    label={() => (<div className="font-light mt-2">Password</div>)}
                    rightIcon={() => (
                        <img 
                            className="h-5 w-5 cursor-pointer ml-3" 
                            onClick={() => setShowPassword(!showPassword)} 
                            src={showPassword ? Eye:EyeClose}
                        />
                    )}
                    onError={() => formErrors.password && <span className="text-red-500">{formErrors.password}</span>}
                />
            </Container>

            <Container className="mt-5">
                <Button 
                    className={`
                        relative overflow-hidden border border-black w-full h-10 rounded-lg bg-none group 
                        ${(!isFormValid || isSubmitting) && "border-black/15 bg-black/10 cursor-not-allowed"}`}
                    disabled={!isFormValid || isSubmitting}
                >                        
                    <div className={`relative z-10 ${(isFormValid && !isSubmitting) && "transition-colors duration-300 group-hover:text-white"}`}>
                        Registrar
                    </div>
                    {(isFormValid && !isSubmitting) && (<span className="absolute inset-0 bg-black/70 transition-transform duration-300 translate-y-full group-hover:translate-y-0"></span>)}
                </Button>    
            </Container>
        </Form>
    )
}

export { SignInForm }