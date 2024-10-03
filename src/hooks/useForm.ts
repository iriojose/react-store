import { useState, useEffect, useCallback, useRef, ChangeEvent } from "react";

type FormState = Record<string, string>
type FormErrors = Record<string, string>
type Validations = Record<string, Rules>

type Rules = Partial<Record<ACTION_RULES, RuleInformation | string | ((value: string) => string | null)>>
type StrategyRules = Partial<Record<ACTION_RULES, (inputValue: string, rules?: Rules) => boolean | null>>

type RuleInformation = {
    message: string
    value?: string | number
}

enum ACTION_RULES {
    REQUIRED = "required",
    EMAIL_FORMAT = "emailFormat",
    MIN_LENGTH = "minLength",
    MAX_LENGTH = "maxLength",
    VALIDATE = "validate"
}

const useForm = () => {
    const [formFields, setFormFields] = useState<FormState>({}) 
    const formFieldsRef = useRef<FormState>({}); 
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [validations, setValidations] = useState<Validations>({})
    const [isFormValid, setIsFormValid] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const setFormFieldValues = (name: string, value: string) => {
        setFormFields(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
        formFieldsRef.current[name] = value; //update the reference
    };

    const register = (name: string, rules?: Rules) => {
        if(!(name in formFields)) {
            setFormFieldValues(name, '');
            
            if(rules) {
                setValidations(prev => ({
                    ...prev,
                    [name]: rules
                }))
            }
        }

        return {
            name: name,
            value: formFields[name] || "",
            onChange: handleChange,
        }
    }
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormFieldValues(name, value);

        let error: string | null = null;
        for (const key of Object.keys(validations[name]) as ACTION_RULES[]) {

            const validateFn = validations[name][ACTION_RULES.VALIDATE];
            if (typeof validateFn === 'function') {
                error = validateFn(value);
                if (error) break; // Si hay un error, salimos del loop
            }
            
            if(validationStrategies[key] && !validationStrategies[key](value, validations[name])){
                if(typeof validations[name][key] === "string") error = validations[name][key]
                else error = (validations[name][key] as RuleInformation).message
                break;
            }
        }

        setFormErrors(prevErrors => ({
            ...prevErrors,
            [name]: error || '',
        }));
    }

    const checkFormValidity = useCallback(() => {
        const hasNoErrors = Object.values(formErrors).every(error => !error);
        const allFieldsFilled = Object.values(formFields).every(value => value.trim() !== '');
        return hasNoErrors && allFieldsFilled;
    },[formErrors, formFields]);
    
    useEffect(() => {
        setIsFormValid(checkFormValidity());
    }, [formFields, formErrors, checkFormValidity]);
    
    const reset = () => {
        setFormFields(prevFields => {
            Object.keys(prevFields).forEach(key => {
                prevFields[key] = '';
            });
            return prevFields;
        });
        
        setFormErrors(prevErrors => {
            Object.keys(prevErrors).forEach(key => {
                prevErrors[key] = '';
            });
            return prevErrors;
        });
    }

    const handleSubmit = async(onSubmit: (data: FormState) => Promise<void>) => {
        setIsSubmitting(true);
        try {
            await onSubmit(formFields)
        } finally {
            setIsSubmitting(false); 
        }
    }

    const getValues = (fieldName?: string): string | FormState => {
        if (fieldName) return formFieldsRef.current[fieldName] || "";
        return formFieldsRef.current;
    };

    return {
        register,
        handleSubmit,
        reset,
        getValues,
        formErrors,
        isFormValid,
        isSubmitting
    } 
}

const validationStrategies: StrategyRules = {
    [ACTION_RULES.REQUIRED]: (inputValue) => validationRules[ACTION_RULES.REQUIRED](inputValue),
    [ACTION_RULES.EMAIL_FORMAT]: (inputValue) => validationRules[ACTION_RULES.EMAIL_FORMAT](inputValue),

    [ACTION_RULES.MIN_LENGTH]: (inputValue, rules) => {
        const minLength = (rules?.[ACTION_RULES.MIN_LENGTH] as { value: number })?.value;
        return validationRules[ACTION_RULES.MIN_LENGTH](inputValue, minLength)
    },
    [ACTION_RULES.MAX_LENGTH]: (inputValue, rules) => {
        const maxLength = (rules?.[ACTION_RULES.MAX_LENGTH] as { value: number })?.value;
        return validationRules[ACTION_RULES.MIN_LENGTH](inputValue, maxLength)
    },

};

// reusable validations
const validationRules = {
    [ACTION_RULES.REQUIRED]: (value: string) => value ? true:false,
    [ACTION_RULES.MIN_LENGTH]: (value: string, min: number) => value.length >= min,
    [ACTION_RULES.MAX_LENGTH]: (value: string, max: number) => value.length <= max,
    
    [ACTION_RULES.EMAIL_FORMAT]: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
    },
}; 

export { useForm, type FormState}