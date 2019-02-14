type State<T> = {type : 'some',  value : T} | {type: "none"};

export class Maybe<T> {
    private state:State<T>;

    private constructor(state:State<T>){
        this.state = state;
    }

    bind = <U>(bindFunc:(value:T) => Maybe<U>):Maybe<U> => 
        this.state.type == "some" ? bindFunc(this.state.value) : Maybe.None<U>();

    map = <U>(mapFunc:(value:T) => U):Maybe<U> => 
        this.state.type == "some" ? Maybe.Some<U>(mapFunc(this.state.value)) : Maybe.None<U>();

    match = <U>(someFunc:(value:T) => U, noneFunc:() => U):U => 
        this.state.type == "some" ? someFunc(this.state.value) : noneFunc();

    static Some = <U>(value:U):Maybe<U> => new Maybe<U>({ type: "some", value: value });
    static None = <U>():Maybe<U> => new Maybe<U>({ type: "none" });
}

export const Some = Maybe.Some;
export const None = Maybe.None;