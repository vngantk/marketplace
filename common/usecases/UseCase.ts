export type UseCaseType = "query" | "command";

export type UseCaseProperties = {
    readonly name: string;
    readonly type: UseCaseType;
}

export type CommandUseCaseProperties = UseCaseProperties & {
    readonly type: "command";
}

export type QueryUseCaseProperties = UseCaseProperties & {
    readonly type: "query";
}

export type UseCase<Req = any, Resp = any> = UseCaseProperties & {
    execute(request: Req): Promise<Resp>;
}

export type CommandUseCase<Command = any> = UseCase<Command, void> & CommandUseCaseProperties

export type QueryUseCase<Query = any, Result = any> = UseCase<Query, Result> & QueryUseCaseProperties
