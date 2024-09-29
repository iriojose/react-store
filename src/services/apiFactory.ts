import { ApiResponse } from '../models/api';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestConfig {
    method: RequestMethod;
    headers?: Record<string, string>;
    body?: string;
}

const createRequest = (method: RequestMethod, /* apiKey: string, */ bodyData?: object): RequestConfig => {
    const headers = {
        'Content-Type': 'application/json',
        //add keys
        //'x-api-key': apiKey,
    };

    const config: RequestConfig = {
        method,
        headers,
    };

    if (bodyData) {
        config.body = JSON.stringify(bodyData);
    }

    return config;
};

export const apiCommand = <T>(method: RequestMethod) => {

    return async (baseUrl: string, endpoint: string, /* apiKey: string, */ data?: object): Promise<ApiResponse<T>> => {
        const config = createRequest(method, data);
    
        try {
            const response = await fetch(`${baseUrl}${endpoint}`, config);
            const responseData = (await response.json()) as ApiResponse<T>;

            if (!response.ok || (response.status !== 200 && response.status !== 201)) {
                throw new Error(response.statusText || `API Error on url: ${endpoint}`
                );
            }

            return responseData;
        } catch (error) {
            throw new Error(`API Error: ${(error as Error).message}`);
        }
    };
};
