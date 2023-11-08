import mongoose, {
    ConnectOptions,
    Model,
    Mongoose,
    Schema,
    SchemaDefinition,
    SchemaDefinitionType,
    Types
} from "mongoose";
import {Repository} from "./Repository";
import {Category, Product} from "../../common/entities";

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
                    console.log(`Connected to MongoDB at: ${connectUrl}, options: ${JSON.stringify(connectOptions)}`)
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
        const model = mongoose.models[name]
        if (model) {
            return model as Model<T>
        }
        const schema = new Schema(definition, {
            id: true, versionKey: false,
            toObject: {
                virtuals: true,
                id: true,
                versionKey: false,
                transform: function (doc, ret) {
                    delete ret._id;
                }
            },
            toJSON: {
                virtuals: true,
                id: true,
                versionKey: false,
                transform: function (doc, ret) {
                    delete ret._id;
                }
            }
        })
        return mongoose.model<T>(name, schema, name)
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
        const idObj = toObjectId(id)
        return this.productModel
            .findById(idObj).then(result => {
                if (result) {
                    return result.toObject()
                }
                return undefined;
            });
    }

    getAllProducts(): Promise<Product[]> {
        return this.productModel
            .find().then(result => result.map(product => product.toObject({})));
    }

    getProductsByName(name: string): Promise<Product[]> {
        return this.productModel
            .find({name: {$eq: name}})
            .then(result => result.map(product => product.toObject()));
    }

    getProductsByNamePattern(pattern: string): Promise<Product[]> {
        return this.productModel
            .find({name: {$regex: pattern, $options: 'i'}})
            .then(result => result.map(product => product.toObject()));
    }

    getProductsByCategory(category: string): Promise<Product[]> {
        return this.productModel
            .find({category: {$eq: category}})
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
        return this.productModel
            .findByIdAndDelete(toObjectId(id))
            .then(result => result ? 1 : 0);
    }

    updateProduct(id: string, partial: Partial<Omit<Product, "id">>): Promise<Product> {
        const fields: Record<string, any> = {}
        if (partial.name !== undefined) {
            fields['name'] = partial.name
        }
        if (partial.description !== undefined) {
            fields['description'] = partial.description
        }
        if (partial.price !== undefined) {
            fields['price'] = partial.price
        }
        if (partial.quantity !== undefined) {
            fields['quantity'] = partial.quantity
        }
        if (partial.category !== undefined) {
            fields['category'] = partial.category
        }
        return this.productModel
            .findByIdAndUpdate(new Types.ObjectId(id), {$set: fields}, {returnDocument: 'after'})
            .then(result => {
                if (result) {
                    return result.toObject();
                }
                throw new Error(`Product with d: ${id} not found`);
            })
    }

    getCategory(id: string): Promise<Category | undefined> {
        return this.categoryModel
            .findById(toObjectId(id))
            .then(result => {
                return result?.toObject()
            });
    }

    getCategoryByName(name: string): Promise<Category | undefined> {
        return this.categoryModel
            .findOne({name: name})
            .then(result => result?.toObject());
    }

    getAllCategories(): Promise<Category[]> {
        return this.categoryModel
            .find()
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
            .then(result => result ? 1 : 0);
    }

    deleteCategoryByName(name: string): Promise<number> {
        return this.categoryModel
            .deleteMany({name: name})
            .then(result => result.deletedCount || 0);
    }

    deleteAllProducts(): Promise<number> {
        return this.productModel
            .deleteMany({})
            .then(result => result.deletedCount || 0);
    }

    deleteAllCategories(): Promise<number> {
        return this.categoryModel
            .deleteMany({})
            .then(result => result.deletedCount || 0);
    }
}

function toObjectId(id: any): Types.ObjectId | undefined {
    return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : undefined
}
