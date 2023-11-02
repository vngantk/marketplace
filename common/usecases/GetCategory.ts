import {QueryUseCase} from "./UseCase";
import {Category} from "../entities/Category";

export interface GetCategory {
    name: string;
}

export abstract class GetCategoryUseCase extends QueryUseCase<GetCategory, Category | undefined> {
    protected constructor() {
        super("GetCategory");
    }
}

abstract class GetCategories extends QueryUseCase<{ name: string; }, Category[]> {
    protected constructor() {
        super("GetCategories");
    }
}

function MyFunction(name: string, age: number, address: string) {

}

let my: Parameters<typeof MyFunction> = ["", 1, ""];
