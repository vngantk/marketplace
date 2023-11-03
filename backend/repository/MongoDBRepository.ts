import mongoose, {Mongoose, Model, Schema, SchemaDefinition, SchemaDefinitionType, Types, ConnectOptions} from "mongoose";
import Repository from "./Repository";
import Product from "../../common/entities/Product";
import Category from "../../common/entities/Category";


function toObjectId(id: any): Promise<Types.ObjectId> {
    try {
        return Promise.resolve(new Types.ObjectId(id))
    } catch (error) {
        return Promise.reject(error)
    }
}

function produce<T>(producer: () => T): Promise<T> {
    try {
        return Promise.resolve(producer())
    } catch (error) {
        return Promise.reject(error)
    }
}

export class MongoDBRepository implements Repository {

    private static defaultUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
    private static defaultOptions = {
        dbName: process.env.MONGODB_NAME || 'Marketplace',
        user: process.env.MONGODB_USER || 'root',
        pass: process.env.MONGODB_PASS || 'goodExample'
    }

    readonly productModel: Model<Product>;
    readonly categoryModel: Model<Category>;

    public constructor(
        url?: string,
        options?: ConnectOptions,
        onConnected?: (mongoose: Mongoose) => void,
        onError?: (error: any) => void
    ) {
        const connectUrl = url || MongoDBRepository.defaultUrl
        const connectOptions = options || MongoDBRepository.defaultOptions
        mongoose.connect(connectUrl, connectOptions)
            .then( (mongoose) => {
                if (onConnected) {
                    onConnected(mongoose)
                } else {
                    console.log(`MongoDB connected with url: ${connectUrl}, options: ${JSON.stringify(connectOptions)}`)
                }
            })
            .catch((error) => {
                if (onError) {
                    onError(error)
                } else {
                    console.error('MongoDB connection error: ' + error)
                }
            }
        )
        this.productModel = this.initProductModel()
        this.categoryModel = this.initCategoryModel()
    }

    protected initModel<T>(name: string, definition: SchemaDefinition<SchemaDefinitionType<any>>): Model<T> {
        const schema = new Schema(definition, {
            id: true, versionKey: false,
            toObject: {virtuals: true, id: true, _id: false, versionKey: false},
            toJSON: {virtuals: true, id: true, _id: false, versionKey: false }
        })
        return mongoose.model<T>(name,schema, name)
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

    getProduct(id: string): Promise<Product | undefined> {
        return toObjectId(id).then(idObj => {
            return this.productModel
                .findById(idObj)
                .exec()
                .then(result => {
                    if (result) {
                        return result.toObject()
                    }
                    return undefined;
                });
        })
    }

    getAllProducts(): Promise<Product[]> {
        return this.productModel
            .find()
            .exec()
            .then(result => result.map(product => product.toObject()));
    }

    getProductsByName(name: string): Promise<Product[]> {
        return this.productModel
            .find({name: {$eq: name}})
            .exec()
            .then(result => result.map(product => product.toObject()));
    }

    getProductsByNamePattern(pattern: string): Promise<Product[]> {
        return this.productModel
            .find({name: {$regex: pattern, $options: 'i'}})
            .exec()
            .then(result => result.map(product => product.toObject()));
    }

    addProduct(product: Product): Promise<Product> {
        return this.productModel
            .create(product)
            .then(result => {
                return result.toObject()
            })
            .catch(error => {
                throw error
            })
    }

    deleteProduct(id: string): Promise<number> {
        return toObjectId(id).then(idObj => {
            return this.productModel
                .findByIdAndDelete(idObj)
                .exec()
                .then(result => result ? 1 : 0);
        })
    }

    updateProduct(id: string, productPartial: Partial<Product>): Promise<Product> {
        return produce<Record<string, any>>(() => {
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
            return fields
        }).then(fields => {
            return this.productModel
                .findByIdAndUpdate(new Types.ObjectId(id), {$set: fields}, {returnDocument: 'after'})
                .exec()
                .then(result => {
                    if (result) {
                        return result.toObject();
                    }
                    throw new Error(`Product with d: ${id} not found`);
                })
        })
    }

    getCategory(id: string): Promise<Category | undefined> {
        return toObjectId(id).then(idObj => {
            return this.categoryModel
                .findById(idObj)
                .exec()
                .then(result => {
                    return result?.toObject()
                });
        })
    }

    getCategoryByName(name: string): Promise<Category | undefined> {
        return this.categoryModel
            .findOne({name: name})
            .exec()
            .then(result => result?.toObject());
    }

    getAllCategories(): Promise<Category[]> {
        return this.categoryModel
            .find()
            .exec()
            .then(result => result.map(category => category.toObject()));
    }

    addCategory(category: Category): Promise<Category> {
        return this.categoryModel
            .create({...category})
            .then(result => result.toObject())
    }

    deleteCategory(id: string): Promise<number> {
        return this.categoryModel
            .findByIdAndDelete(new Types.ObjectId(id))
            .exec()
            .then(result => result ? 1 : 0);
    }

    deleteCategoryByName(name: string): Promise<number> {
        return this.categoryModel
            .deleteMany({name: name})
            .exec()
            .then(result => result.deletedCount || 0);
    }

    deleteAllProducts(): Promise<number> {
        return this.productModel
            .deleteMany({})
            .exec()
            .then(result => result.deletedCount || 0);
    }

    deleteAllCategories(): Promise<number> {
        return this.categoryModel
            .deleteMany({})
            .exec()
            .then(result => result.deletedCount || 0);
    }
}

export default MongoDBRepository;
