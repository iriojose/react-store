import { useState, ChangeEvent } from "react";

type FormState = Record<string, string>
type FormErrors = Record<string, string>
type Validations = Record<string, Rules>

type Rules = Partial<Record<ACTION_RULES, RuleInformation | string>>

type RuleInformation = {
    message: string
    value?: string | number
}

enum ACTION_RULES {
    REQUIRED = "required",
    EMAIL_FORMAT = "emailFormat",
    MIN_LENGTH = "minLength",
    MAX_LENGTH = "maxLength",
    MATCH_PASSWORD = "matchPassword"
}

const useForm2 = () => {
    const [formFields, setFormFields] = useState<FormState>({}) 
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [validations, setValidations] = useState<Validations>({})

    
    const register = (name: string, rules?: Rules) => {
        if(!(name in formFields)) {
            setFormFields((prevValues) => ({//add field
              ...prevValues,
              [name]: '',
            }));
            
            if(rules) {
                setValidations(prev => ({//add validations of rules
                    ...prev,
                    [name]: rules
                }))
            }
        }

        return {//return params for inputs
            name: name,
            value: formFields[name] || "",
            onChange: handleChange,
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormFields(prevValues => ({
            ...prevValues,
            [name]: value, 
        }));

        let error: string | null = null;//validate of rules
        for (const key of Object.keys(validations[name]) as ACTION_RULES[]) {
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

    return {
        register,
        formFields,
        formErrors
    } 
}

const validationStrategies: Record<ACTION_RULES, (inputValue: string, rules?: Rules) => boolean | null> = {
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

    [ACTION_RULES.MATCH_PASSWORD]: () => true,

    /* pending method
    [ACTION_RULES.MATCH_PASSWORD]: (value, _, formFields) => {
        const passwordValue = formFields?.['password'] || '';
        return validationRules[ACTION_RULES.MATCH_PASSWORD](value, passwordValue);
    },*/
};

// reusable validations
const validationRules = {
    [ACTION_RULES.REQUIRED]: (value: string) => value ? true:false,
    [ACTION_RULES.MIN_LENGTH]: (value: string, min: number) => value.length >= min,
    [ACTION_RULES.MAX_LENGTH]: (value: string, max: number) => value.length <= max,
    [ACTION_RULES.MATCH_PASSWORD]: (value1: string, value2: string) => value1 === value2,
    [ACTION_RULES.EMAIL_FORMAT]: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
    },
}; 

export { useForm2 }