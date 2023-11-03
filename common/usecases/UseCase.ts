
export enum Type {
    QUERY = "QUERY",
    COMMAND = "COMMAND"
}

export interface UseCase<Req = any, Resp = any> {
    readonly name: string;
    readonly type: Type;
    execute(request: Req): Promise<Resp>;
}

export abstract class CommandUseCase<Command> implements UseCase<Command, void> {
    readonly type: Type.COMMAND;

    protected constructor(readonly name: string) {
        this.type = Type.COMMAND;
    }
    abstract execute(request: Command): Promise<void>;
}

export abstract class QueryUseCase<Query, Result> implements UseCase<Query, Result> {
    readonly type: Type.QUERY;
    protected constructor(readonly name: string) {
        this.type = Type.QUERY;
    }
    abstract execute(request: Query): Promise<Result>;
}
