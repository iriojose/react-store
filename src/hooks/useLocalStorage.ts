import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
    //set values with initialValues o localstorage data
    const [item, setItem] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn("Error reading localStorage", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.warn("Error saving to localStorage", error);
        }
    }, [key, item]);

    const clearLocalStorage = () => {
        try {
            window.localStorage.removeItem(key);
            setItem(initialValue); 
        } catch (error) {
            console.warn("Error clearing localStorage", error);
        }
    };

    return [ item, setItem, clearLocalStorage ] as const;
}

export { useLocalStorage }
