import Product from "../models/product.ts";

let products: Array<Product> = [
    {
        id: 1,
        name: 'macbook pro',
        price: 23,
        stock: 2,
    },
    {
        id: 2,
        name: 'iMac wheel',
        price: 23,
        stock: 2,
    },
    {
        id: 3,
        name: 'iMac 2020',
        price: 23,
        stock: 2,
    }
];
let count = products.length;

const getProductAll = () => products;

const getProductPrice = (min: string, max: string) => products.filter((product) => product.price >= Number(min) && product.price <= Number(max));

const getProductById = (id: string): Product | undefined => products.find((product) => product.id?.toString() == id);

const addProduct = (product: Product) => {
    count += 1;
    products.push({
        id: count,
        ...product,
    });
}

const updateProduct = (id: string, product: Product): boolean => {
    const index = products.findIndex((product) => product.id?.toString() == id);
    if (index !== -1) {
        products[index].name = product.name;
        products[index].price = product.price;
        products[index].stock = product.stock;
        return true;
    }
    return false;

}

const deleteProductById = (id: string): boolean => {
    const index = products.findIndex((product) => product.id?.toString() == id);
    if (index !== -1) {
        products.splice(index, 1);
        return true;
    }
    return false;
};
export default {
    getProductAll,
    getProductPrice,
    getProductById,
    addProduct,
    updateProduct,
    deleteProductById
}
