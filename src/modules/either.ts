type State<T,U> = {type: "left", left : T} | {type : 'right',  right : U};

export class Either<TLeft, TRight> {
    private result:State<TLeft, TRight>;

    private constructor(result:State<TLeft, TRight>){
        this.result = result;
    }

    bind = <T>(bindFunc:(right:TRight) => Either<TLeft, T>):Either<TLeft, T> =>
        this.result.type == "left" ? Either.Left(this.result.left) : bindFunc(this.result.right);
    
    bindLeft = <T>(bindFunc:(left:TLeft) => Either<T, TRight>):Either<T, TRight> =>
        this.result.type == "left" ? bindFunc(this.result.left) : Either.Right(this.result.right);
    
    map = <T>(mapFunc:(right:TRight) => T):Either<TLeft, T> =>
        this.result.type == "left" ? Either.Left(this.result.left) : Either.Right(mapFunc(this.result.right));
    
    mapLeft = <T>(mapFunc:(left:TLeft) => T):Either<T, TRight> =>
        this.result.type == "left" ? Either.Left(mapFunc(this.result.left)) : Either.Right(this.result.right);

    match = <T>(rightHandler:(right:TRight) => T, leftHandler:(left:TLeft) => T):T => 
        this.result.type == "left" ? leftHandler(this.result.left) : rightHandler(this.result.right);

    static Left = <T, U>(error:T):Either<T, U> => new Either<T, U>({ type: "left", left: error });
    static Right = <T, U>(result:U):Either<T, U> => new Either<T, U>({ type: "right", right: result});
}

export const Right = Either.Right;
export const Left = Either.Left;