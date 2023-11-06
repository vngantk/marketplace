import {
    CommandUseCase,
    CommandUseCaseProperties,
    QueryUseCase,
    UseCase,
    UseCaseProperties
} from "../../common/usecases";
import {Repository} from "../repository";

export abstract class UseCaseInteractor<T extends UseCase<Req, Resp>, Req = any, Resp = any> implements UseCase<Req, Resp> {
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
    abstract execute(command: Req): Promise<Resp>;
}

export abstract class CommandInteractor<T extends CommandUseCase<Command>, Command = any> extends UseCaseInteractor<T, Command, void> {
    protected constructor(repository: Repository, properties: CommandUseCaseProperties) {
        super(repository, properties);
    }
    abstract execute(command: Command): Promise<void>;
}

export abstract class QueryInteractor<T extends QueryUseCase<Query, Result>, Query = any, Result = any> extends UseCaseInteractor<T, Query, Result> {
    protected constructor(repository: Repository, properties: Omit<T, "execute">) {
        super(repository, properties);
    }
    abstract execute(query: Query): Promise<Result>;
}
