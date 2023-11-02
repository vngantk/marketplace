
export interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
}

export namespace Product {
    export function getId(product: Product): string | undefined {
        return (product as Record<string, any>)['_id']
    }
    export function setId(product: Product, id: string): void {
        (product as Record<string, any>)['_id'] = id
    }
}

export default Product;
