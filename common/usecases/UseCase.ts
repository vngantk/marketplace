export type UseCaseType = "query" | "command" | "request" | "event" ;

export type UseCaseProperties = {
    readonly name: string;
    readonly type: UseCaseType;
}

export type QueryUseCaseProperties = UseCaseProperties & {
    readonly type: "query";
}

export type CommandUseCaseProperties = UseCaseProperties & {
    readonly type: "command";
}

export type RequestUseCaseProperties = UseCaseProperties & {
    readonly type: "request";
}

export type EventUseCaseProperties = UseCaseProperties & {
    readonly type: "event";
}

export type UseCase<Input = any, Output = any> = UseCaseProperties & {
    invoke(input: Input): Promise<Output>;
}

export type QueryUseCase<Query = any, Result = any> = UseCase<Query, Result> & QueryUseCaseProperties

export type CommandUseCase<Command = any> = UseCase<Command, void> & CommandUseCaseProperties

export type RequestUseCase<Request = any, Response = any> = UseCase<Request, Response> & RequestUseCaseProperties

export type EventUseCase<Event = any> = UseCase<Event, void> & EventUseCaseProperties
