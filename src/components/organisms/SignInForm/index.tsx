import { FC, FormEvent, useState } from "react";
import { Form } from "../../atoms/Form";
import { Container } from "../../atoms/Container";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { useForm, validationRules } from "../../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../../store";
import Eye from "../../../assets/eye.svg"
import EyeClose  from "../../../assets/eyeClose.svg"
import User from "../../../assets/user.svg"

const SignInForm: FC = () => {
    const { actions } = useContextProvider()
    const navigate = useNavigate()
    
    //init values and validations
    const initialValues = { name: "", lastname:"", username:"", password: ""}
    const inputValidationRules = {
        name: [validationRules.required, validationRules.minLength(3)],
        lastname: [validationRules.required, validationRules.minLength(3)],
        username: [validationRules.required, validationRules.emailFormat],
        password: [validationRules.required, validationRules.minLength(8)],
    };

    const { formValues, formErrors, isFormValid, handleChange} = useForm(initialValues, inputValidationRules)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handlerClick = (e: FormEvent) => {
        e.preventDefault();
        actions.setUser({username: formValues.username, password: formValues.password})
        navigate("/")
    }

    return (
        <Form onSubmit={handlerClick}>
            <Container className="justify-center mt-10">
                <Input 
                    className={`p-2 rounded-lg border my-2 w-72 ${formErrors.name ? "border-red-200 focus-within:border-red-500":"border-black/20 focus-within:border-black"}`}
                    value={formValues.name} 
                    name="name"
                    onChange={handleChange}
                    placeholder="irio"
                    label={() => (<div className="font-light mt-2">Name</div>)}
                    onError={() => formErrors.name && <span className="text-red-500">{formErrors.name}</span>}
                />

                <Input 
                    className={`p-2 rounded-lg border my-2 w-72 ${formErrors.lastname ? "border-red-200 focus-within:border-red-500":"border-black/20 focus-within:border-black"}`}
                    value={formValues.lastname} 
                    name="lastname"
                    onChange={handleChange}
                    placeholder="gomez"
                    label={() => (<div className="font-light mt-2">Lastname</div>)}
                    onError={() => formErrors.lastname && <span className="text-red-500">{formErrors.lastname}</span>}
                />

                <Input 
                    className={`p-2 rounded-lg border my-2 w-72 ${formErrors.username ? "border-red-200 focus-within:border-red-500":"border-black/20 focus-within:border-black"}`}
                    value={formValues.username} 
                    name="username"
                    onChange={handleChange}
                    placeholder="iriojgv"
                    label={() => (<div className="font-light mt-2">Username</div>)}
                    rightIcon={() => (
                        <img 
                            className="h-5 w-5 ml-3" 
                            src={User}
                        />
                    )}
                    onError={() => formErrors.username && <span className="text-red-500">{formErrors.username}</span>}
                />

                <Input 
                    name="password"
                    type={showPassword ? "text":"password"}
                    className={`p-2 rounded-lg border w-72 my-2 ${formErrors.password ? "border-red-200 focus-within:border-red-500":"border-black/20 focus-within:border-black"}`}
                    value={formValues.password} 
                    onChange={handleChange} 
                    placeholder={formValues.showPassword ? "12345678":"********"}
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
                    className={`relative overflow-hidden border border-black w-full h-10 rounded-lg bg-none group 
                        ${!isFormValid && "border-black/15 bg-black/10 cursor-not-allowed"}`}
                    disabled={!isFormValid}
                >                        
                    <div className={`relative z-10 ${isFormValid && "transition-colors duration-300 group-hover:text-white"}`}>
                        Registrar
                    </div>
                    {isFormValid && (<span className="absolute inset-0 bg-black/70 transition-transform duration-300 translate-y-full group-hover:translate-y-0"></span>)}
                </Button>    
            </Container>
        </Form>
    )
}

export { SignInForm }