# ts-funct

This is a typescript package to add some simple Monadic types:
- Maybe
- Either
- Result

## Examples

### Monads
#### Maybe<T>
```typescript
import { Maybe, Some, None } from 'ts-funct';
const something:Maybe<string> = Some("item");
const nothing:Maybe<string> = None();
const mapSomething:Maybe<string> = something.map(s => s.toLowerCase());
const bindSomething:Maybe<number> = something.bind(s => s.length > 3 ? Some(s.length) : None());
const matchSomething:number = 
    something.match(
        some => some.length,
        () => -1
    );
```

#### Result<TFailure, TSuccess>
```typescript
import { Result, Success, Failure } from 'ts-funct';
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
```

#### Either<TLeft, TRight>
```typescript
import { Either, Left, Right } from 'ts-funct';
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
```