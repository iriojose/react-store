import { FC } from "react";
import { Form } from "../../atoms/Form";
import { Container } from "../../atoms/Container";
import { Input } from "../../atoms/Input";

import { useForm2 } from "../../../hooks/useForm2";

const LoginForm: FC = () => {
    const { register, formErrors } = useForm2()

    return (
        <Form>
            <Container className="justify-center mt-10">
                <Input 
                    {...register("name", {
                        required: "This field is required",
                        minLength: {
                            value: 3,
                            message: "Need to be more than 3 letters"
                        }
                    })}
                    className={`p-2 rounded-lg border my-2 w-72 border-black/20 focus-within:border-black`}
                    placeholder="iriojgv"
                    label={() => (<div className="font-light mt-2">Name</div>)}
                    onError={() => formErrors.name && <span className="text-red-500">{formErrors.name}</span>}
                />
            </Container>

        </Form>
    )
}

export { LoginForm }