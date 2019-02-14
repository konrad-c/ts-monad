import { Maybe, Some, None, Either, Result, Success, Failure, Right, Left } from '../src/index';

const url:string = "";

// Maybe Examples
const something:Maybe<string> = Some("item");
const nothing:Maybe<string> = None();
const mapSomething:Maybe<string> = something.map(s => s.toLowerCase());
const bindSomething:Maybe<number> = something.bind(s => s.length > 3 ? Some(s.length) : None());
const matchSomething:number = 
    something.match(
        some => some.length,
        () => -1
    );

// Result Examples
const success:Result<Error, string> = Success("string");
const failure:Result<Error, string> = Failure(Error());
const chainSuccess:void = success
    .map(string => "new string")
    .map(string => string.split(' '))
    .bind(arr => arr.length == 2 ? Success("two words") : Failure(Error("one word")))
    .mapFailure(error => Error("useful error message"))
    .match(
        success => console.log(success),
        failure => console.error(failure)
    );

// Either Examples
const right:Either<number, string> = Right("string");
const left:Either<number, string> = Left(12);
const chainEither:number = right
    .map(string => "new string")
    .map(string => string.split(' '))
    .bind(arr => arr.length == 2 ? Right("two words") : Left<number, string>(6))
    .mapLeft(num => num * 2)
    .match(
        right => right.length,
        left => left + 2
    );

// Array Extension Examples
const data = [1, 2, 3, 4, 5, 6];
const promises = data
    .parallel(num => num + 1)  // parallel(...) will perform the function on each item in parallel by converting each item to a Promise
    .mapAsync((value:number) => Promise.resolve(value + 5))  // mapAsync(...) will then(...) each of the items in the list with the provided map function
    .mapAsync(async num => num / 2)  // which makes it easy to add async arrow functions to map(...)
    .delay(100)  // delay(...) tells each promise to wait for 100ms when they reach this point
    .mapAsyncThrottle(2, async num => num.toString())  // mapAsyncThrottle(X, ...) will throttle the number of Promises running at any given time to X
    .mapAsyncTimeLimit(3, 1000, async num => fetch(`${url}/${num}`))  // mapAsyncTimeLimit(X, Y, ...) will throttle the number of Promises running to a maximum of X promises every Y milliseconds 
    .waitAll();  // waitAll(...) is an easier way to call Promise.all(...) when chaining functions.