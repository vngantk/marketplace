import mongoose, {Model, Mongoose, Schema, SchemaDefinition, SchemaDefinitionType, Types} from "mongoose";
import {Repository} from "./Repository";
import {Product} from "../../common/entities/Product";
import {Category} from "../../common/entities/Category";

export class MongoDBRepository extends Repository {

    readonly productModel: Model<Product>;
    readonly categoryModel: Model<Category>;

    public constructor(readonly mongoose: Mongoose) {
        super();
        this.productModel = this.initProductModel()
        this.categoryModel = this.initCategoryModel()
    }

    protected initModel<T>(name: string, definition: SchemaDefinition<SchemaDefinitionType<any>>): Model<T> {
        return this.mongoose.model<T>(name, new Schema(definition), name)
    }

    protected initProductModel(): Model<Product> {
        return this.initModel<Product>('product', {
            name: {type: String, index: true},
            description: String,
            price: Number,
            quantity: Number,
            category: {type: String, index: true}
        });
    }

    protected initCategoryModel(): Model<Category> {
        return this.initModel<Category>('category', {
            name: {type: String, index: true, unique: true},
        });
    }

    override getProduct(id: string): Promise<Product | undefined> {
        return this.productModel
            .findById(new Types.ObjectId(id))
            .exec()
            .then(result => {
                if (result) {
                    return result.toObject()
                }
                return undefined;
            });
    }

    override getAllProducts(): Promise<Product[]> {
        return this.productModel
            .find()
            .exec()
            .then(result => result.map(product => product.toObject()));
    }

    override getProductsByName(name: string): Promise<Product[]> {
        return this.productModel
            .find({name: {$eq: name}})
            .exec()
            .then(result => result.map(product => product.toObject()));
    }

    override getProductsByNamePattern(pattern: string): Promise<Product[]> {
        return this.productModel
            .find({name: {$regex: pattern, $options: 'i'}})
            .exec()
            .then(result => result.map(product => product.toObject()));
    }

    override getProductsByCategory(category: string): Promise<Product[]> {
        return this.productModel
            .find({category: category})
            .exec()
            .then(result => result.map(product => product.toObject()));
    }

    override addProduct(product: Product): Promise<Product> {
        return this.productModel
            .create({...product, _id: undefined})
            .then(result => result.toObject())
    }

    override deleteProduct(id: string): Promise<number> {
        return this.productModel
            .findByIdAndDelete(new Types.ObjectId(id))
            .exec()
            .then(result => result ? 1 : 0);
    }

    override updateProduct(id: string, productPartial: Partial<Product>): Promise<Product> {
        const fields: Record<string, any> = {}
        if (productPartial.name !== undefined) {
            fields['name'] = productPartial.name
        }
        if (productPartial.description !== undefined) {
            fields['description'] = productPartial.description
        }
        if (productPartial.price !== undefined) {
            fields['price'] = productPartial.price
        }
        if (productPartial.quantity !== undefined) {
            fields['quantity'] = productPartial.quantity
        }
        if (productPartial.category !== undefined) {
            fields['category'] = productPartial.category
        }
        return this.productModel
            .findByIdAndUpdate(new Types.ObjectId(id), {$set: fields}, {returnDocument: 'after'})
            .exec()
            .then(result => {
                if (result) {
                    return result.toObject();
                }
                throw new Error(`Product with d: ${id} not found`);
            })
    }

    override getCategory(id: string): Promise<Category | undefined> {
        return this.categoryModel
            .findById(new Types.ObjectId(id))
            .exec()
            .then(result => result?.toObject());
    }

    override getCategoryByName(name: string): Promise<Category | undefined> {
        return this.categoryModel
            .findOne({name: name})
            .exec()
            .then(result => result?.toObject());
    }

    override getAllCategories(): Promise<Category[]> {
        return this.categoryModel
            .find()
            .exec()
            .then(result => result.map(category => category.toObject()));
    }

    override getCategoriesByNamePattern(pattern: string): Promise<Category[]> {
        return this.categoryModel
            .find({name: {$regex: pattern, $options: 'i'}})
            .exec()
            .then(result => result.map(category => category.toObject()));
    }

    override addCategory(category: Category): Promise<Category> {
        return this.categoryModel
            .create({...category, _id: undefined})
            .then(result => result.toObject())
    }

    override deleteCategory(id: string): Promise<number> {
        return this.categoryModel
            .findByIdAndDelete(new Types.ObjectId(id))
            .exec()
            .then(result => result ? 1 : 0);
    }

    override deleteCategoryByName(name: string): Promise<number> {
        return this.categoryModel
            .deleteMany({name: name})
            .exec()
            .then(result => result.deletedCount || 0);
    }

    override deleteAllProducts(): Promise<number> {
        return this.productModel
            .deleteMany({})
            .exec()
            .then(result => result.deletedCount || 0);
    }

    override deleteAllCategories(): Promise<number> {
        return this.categoryModel
            .deleteMany({})
            .exec()
            .then(result => result.deletedCount || 0);
    }
}

export default MongoDBRepository;
