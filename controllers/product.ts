import productService from '../services/product.ts';
import { Status } from "https://deno.land/x/oak@v6.0.1/mod.ts";


function notFound(response: any, message: string) {
    response.status = Status.NotFound;
    response.body = { message };
}

function badRequest(response: any) {
    response.status = Status.BadRequest;
    response.body = { message: "Invalid request" };
}


const getProducts = ({ response }: { response: any }) => {
    response.body = productService.getProductAll;
};

const getProductPrice = ({ response, request }: { response: any; request: any }) => {
    const min = request.url.searchParams.get("min");
    const max = request.url.searchParams.get("max");
    if (!min || !max) {
        badRequest(response);
        return;
    }
    response.body = productService.getProductPrice(min, max);
};

const getProductById = ({ response, params }: { response: any; params: { id: string } }) => {
    if (params && params.id) {
        const product = productService.getProductById(params.id)
        if (!product) {
            notFound(response, `product id: ${params.id} not found`);
            return;
        }
        response.body = product;
    }
};

const addProduct = async ({ response, request }: { response: any; request: any }) => {
    if (!request.hasBody) {
        badRequest(response);
        return;
    }

    const product: { name: string, price: number, stock: number } = await request.body().value;
    productService.addProduct(product);
    response.status = Status.Created
    response.body = { message: "Add Product Successfully!" }
}

const updateProduct = async ({ response, request, params }: { response: any; request: any, params: { id: string } }) => {
    if (!request.hasBody) {
        badRequest(response);
        return;
    }

    if (params && params.id) {
        const product: { name: string, price: number, stock: number } = await request.body().value;
        if (productService.updateProduct(params.id, product)) {
            response.body = { message: 'Update Product Successfully!' };
            return;
        }
        notFound(response, `product id: ${params.id} not found`);
    }
}

const deleteProductById = ({ response, params }: { response: any; params: { id: string } }) => {
    if (params && params.id) {
        if (productService.deleteProductById(params.id)) {
            response.status = Status.NoContent;
            response.body = { message: 'Delete Product Successfully!' };
            return;
        }
        notFound(response, `product id: ${params.id} not found!`);
    }
};
export default {
    getProducts,
    getProductPrice,
    getProductById,
    addProduct,
    updateProduct,
    deleteProductById
}

