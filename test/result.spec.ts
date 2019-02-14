import { Result, Failure, Success } from '../src/modules/result';
import { it, describe } from 'mocha';
import { expect } from 'chai';

const identity = (val:any):any => val;

describe("Result Monad", () => {
    it("should create Result from static constructors", () => {
        expect(Result.Failure("string")).to.be.instanceOf(Result);
        expect(Result.Success("string")).to.be.instanceOf(Result);
    });
    it("should match Success and Failure correctly", () => {
        expect(Result.Failure("").match(
            success => "success",
            failure => "failure")
        ).to.be.equal("failure");
        
        expect(Result.Success("").match(
            success => "success",
            failure => "failure")
        ).to.be.equal("success");
    });
    it("should allow alias constructors", () => {
        expect(Failure("failure")).to.be.instanceOf(Result);
        expect(Failure("failure").match(() => "", identity)).to.be.equal("failure");
        expect(Success("success")).to.be.instanceOf(Result);
        expect(Success("success").match(identity, () => "")).to.be.equal("success");
    });
    it("should map Success to new Result", () => {
        expect(Success("string").map(str => "newstring").match(identity, identity))
            .to.equal("newstring")
            .to.not.equal("string");
    });
    it("should not map Failure to new Result", () => {
        expect(Failure("string").map(str => "newstring").match(identity, identity))
            .to.equal("string")
            .to.not.equal("newstring");
    });

    it("mapFailure should map Failure to new Result", () => {
        expect(Failure("string").mapFailure(str => "newstring").match(identity, identity))
            .to.equal("newstring")
            .to.not.equal("string");
    });
    it("mapFailure should not map Success to new Result", () => {
        expect(Success("string").mapFailure(str => "newstring").match(identity, identity))
            .to.equal("string")
            .to.not.equal("newstring");
    });

    it("should bind Success to new Result", () => {
        expect(Success("string").bind(str => Success("newstring")).match(identity, identity))
            .to.equal("newstring")
            .to.not.equal("string");
    });
    it("should not bind Failure to new Result", () => {
        expect(Failure("string").bind(str => Success("newstring")).match(identity, identity))
            .to.equal("string")
            .to.not.equal("newstring");
    });

    it("bindFailure should bind Failure to new Result", () => {
        expect(Failure("string").bindFailure(str => Success("newstring")).match(identity, identity))
            .to.equal("newstring")
            .to.not.equal("string");
    });
    it("bindFailure should not bind Success to new Result", () => {
        expect(Success("string").bindFailure(str => Success("newstring")).match(identity, identity))
            .to.equal("string")
            .to.not.equal("newstring");
    });
});