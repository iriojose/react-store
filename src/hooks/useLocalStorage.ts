import { useEffect, useState } from "react";

type Storage<T> = {
    error: boolean
    loading: boolean
    item: T | null
}

const useLocalStorage = <T>(key: string, initialValue: T): [Storage<T>, (args: T) => void, () => void] => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [item, setItem] = useState<T | null>(initialValue);

    useEffect(() => {
        try {
            const localStorageItem = localStorage.getItem(key);
            let parsedItem;
            
            if (!localStorageItem) {
                localStorage.setItem(key, JSON.stringify(initialValue));
                parsedItem = initialValue;
            } else {
                parsedItem = JSON.parse(localStorageItem);
            }

            setItem(parsedItem);
            setLoading(false);
        } catch(error) {
            console.log(error)
            setError(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])  

    const saveItem = (args: T) => {
        try {
            const stringifiedItem = JSON.stringify(args);
            localStorage.setItem(key, stringifiedItem);
            setItem(args);
        } catch(error) {
            console.log(error)
            setError(true);
        }
    }

    const clearItem = () => {
        try {
            localStorage.removeItem(key)
            setItem(null)
        }catch(e) {
            console.log(e)
            setError(true);
        }
    }

    return [
        { error, loading, item }, 
        saveItem, 
        clearItem
    ]
}

export { useLocalStorage }
