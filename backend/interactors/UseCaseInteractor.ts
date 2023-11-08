import {
    CommandUseCase,
    CommandUseCaseProperties,
    QueryUseCase, QueryUseCaseProperties,
    UseCase,
    UseCaseProperties
} from "../../common/usecases";
import {Repository} from "../repository";

export abstract class UseCaseInteractor<T extends UseCase<Input, Output>, Input = any, Output = any> implements UseCase<Input, Output> {
    protected constructor(
        public readonly repository: Repository,
        private readonly properties: UseCaseProperties) {
    }
    get name(): T["name"] {
        return this.properties.name
    }
    get type(): T["type"] {
        return this.properties.type
    }
    abstract invoke(input: Input): Promise<Output>;
}

export abstract class CommandInteractor<T extends CommandUseCase<Command>, Command = any> extends UseCaseInteractor<T, Command, void> {
    protected constructor(repository: Repository, properties: CommandUseCaseProperties) {
        super(repository, properties);
    }
    abstract invoke(command: Command): Promise<void>;
}

export abstract class QueryInteractor<T extends QueryUseCase<Query, Result>, Query = any, Result = any> extends UseCaseInteractor<T, Query, Result> {
    protected constructor(repository: Repository, properties: QueryUseCaseProperties) {
        super(repository, properties);
    }
    abstract invoke(query: Query): Promise<Result>;
}
