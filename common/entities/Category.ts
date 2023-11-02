
export interface Category {
    name: string;
}

export namespace Category {
    export function getId(product: Category): string | undefined {
        return (product as Record<string, any>)['_id']
    }
    export function setId(product: Category, id: string): void {
        (product as Record<string, any>)['_id'] = id
    }
}

export default Category;
