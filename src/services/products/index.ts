import { Product } from '../../models/product';
import { BASE_URLS } from '../apiConfig';
import { apiCommand } from '../apiFactory';

const listAllProducts = () => {
    return apiCommand<Product[]>('GET')(BASE_URLS.PLATZI, '/api/v1/products');
}

export { listAllProducts }