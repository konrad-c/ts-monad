type State<T,U> = {type: "left", failure : T} | {type : 'right',  value : U};

export class Result<TFailure, TSuccess> {
    private state:State<TFailure, TSuccess>;

    private constructor(result:State<TFailure, TSuccess>){
        this.state = result;
    }

    bind = <T>(bindFunc:(result:TSuccess) => Result<TFailure, T>):Result<TFailure, T> =>
        this.match(
            success => bindFunc(success),
            failure => Result.Failure(failure)
        );

    bindAsync = <T>(bindFunc:(result:TSuccess) => Promise<Result<TFailure, T>>):Promise<Result<TFailure, T>> =>
        this.match(
            success => bindFunc(success),
            failure => Promise.resolve(Result.Failure(failure))
        );
    
    bindFailure = <T>(bindFunc:(failure:TFailure) => Result<T, TSuccess>):Result<T, TSuccess> =>
        this.match(
            success => Result.Success(success),
            failure => bindFunc(failure)
        );
    
    bindFailureAsync = <T>(bindFunc:(failure:TFailure) => Promise<Result<T, TSuccess>>):Promise<Result<T, TSuccess>> =>
        this.match(
            success => Promise.resolve(Result.Success(success)),
            failure => bindFunc(failure)
        );
    
    map = <T>(mapFunc:(result:TSuccess) => T):Result<TFailure, T> =>
        this.match(
            success => Result.Success(mapFunc(success)),
            failure => Result.Failure(failure)
        );
    
    mapFailure = <T>(mapFunc:(failure:TFailure) => T):Result<T, TSuccess> =>
        this.match(
            success => Result.Success(success),
            failure => Result.Failure(mapFunc(failure))
        );

    match = <T>(successHandler:(result:TSuccess) => T, failureHandler:(error:TFailure) => T):T => 
        this.state.type == "left" ? failureHandler(this.state.failure) : successHandler(this.state.value);

    static Failure = <T, U>(failure:T):Result<T, U> => new Result<T, U>({ type: "left", failure: failure });
    static Success = <T, U>(result:U):Result<T, U> => new Result<T, U>({ type: "right", value: result});
}

export const Success = Result.Success;
export const Failure = Result.Failure;