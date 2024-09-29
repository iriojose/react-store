/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { ApiResponse } from "../models/api";

type ApiHookResponse<T> = {
    data: ApiResponse<T> | null;
    loading: boolean;
    error: Error | null;
};

function useApi<T>(requestFunction: (...args: any[]) => Promise<ApiResponse<T>>): [(...args: any[]) => void, ApiHookResponse<T>, () => void] {
    const [data, setData] = useState<ApiResponse<T> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const execute = async (...args: any[]) => {
        setLoading(true);
        setError(null);

        try {
            const responseData = await requestFunction(...args);
            setData(responseData);
        } catch (e) {
            setError(e as Error);
        } finally {
            setLoading(false);
        }
    };

    const resetData = () => {
        setData(null);
        setLoading(false);
        setError(null);
    };

    return [execute, {data, loading, error}, resetData]
}

export { useApi }