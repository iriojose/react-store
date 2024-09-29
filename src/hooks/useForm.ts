import { useState, useEffect } from "react";

type FormState = { [key: string]: string}
type FormErrors = { [key: string]: string }
type ValidationRule = (value: string) => string | null;

const useForm = (initialValues: FormState, inputValidationRules: { [key: string]: ValidationRule[] }) => {

    const [formValues, setFormValues] = useState<FormState>(initialValues);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));

        // Aplica las reglas de validación asociadas a ese input
        if (inputValidationRules[name]) {
            let error = null;
            for (const rule of inputValidationRules[name]) {
                error = rule(value);
                if (error) break; // Si hay un error, no sigue con más reglas
            }
            setFormErrors(prevErrors => ({
                ...prevErrors,
                [name]: error || '',
            }));
        }
    };

    // Función que verifica si el formulario es válido
    const checkFormValidity = () => {
        const hasNoErrors = Object.values(formErrors).every(error => !error);
        const allFieldsFilled = Object.values(formValues).every(value => value.trim() !== '');
        return hasNoErrors && allFieldsFilled;
    };

    // useEffect para actualizar la validez del formulario cada vez que cambian los valores o errores
    useEffect(() => {
        setIsFormValid(checkFormValidity());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues, formErrors]);

    return {
        formValues,
        formErrors,
        isFormValid,
        handleChange,
    }
}

// Conjunto de reglas reutilizables
const validationRules = {
    required: (value: string) => value ? null : 'This field is required',
    minLength: (min: number) => (value: string) => value.length >= min ? null : `Must be at least ${min} characters`,
    emailFormat: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? null : 'Invalid email format';
    },
};

export { useForm, validationRules}