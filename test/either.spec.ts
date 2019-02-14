import { Either, Left, Right } from '../src/modules/either';
import { it, describe } from 'mocha';
import { expect } from 'chai';

const identity = (val:any):any => val;

describe("Either Monad", () => {
    it("should create Either from static constructors", () => {
        expect(Either.Left("string")).to.be.instanceOf(Either);
        expect(Either.Right("string")).to.be.instanceOf(Either);
    });
    it("should match Right and Left correctly", () => {
        expect(Either.Left("").match(
            Right => "Right",
            Left => "Left")
        ).to.be.equal("Left");
        
        expect(Either.Right("").match(
            Right => "Right",
            Left => "Left")
        ).to.be.equal("Right");
    });
    it("should allow alias constructors", () => {
        expect(Left("Left")).to.be.instanceOf(Either);
        expect(Left("Left").match(() => "", identity)).to.be.equal("Left");
        expect(Right("Right")).to.be.instanceOf(Either);
        expect(Right("Right").match(identity, () => "")).to.be.equal("Right");
    });
    it("should map Right to new Either", () => {
        expect(Right("string").map(str => "newstring").match(identity, identity))
            .to.equal("newstring")
            .to.not.equal("string");
    });
    it("should not map Left to new Either", () => {
        expect(Left("string").map(str => "newstring").match(identity, identity))
            .to.equal("string")
            .to.not.equal("newstring");
    });

    it("mapLeft should map Left to new Either", () => {
        expect(Left("string").mapLeft(str => "newstring").match(identity, identity))
            .to.equal("newstring")
            .to.not.equal("string");
    });
    it("mapLeft should not map Right to new Either", () => {
        expect(Right("string").mapLeft(str => "newstring").match(identity, identity))
            .to.equal("string")
            .to.not.equal("newstring");
    });

    it("should bind Right to new Either", () => {
        expect(Right("string").bind(str => Right("newstring")).match(identity, identity))
            .to.equal("newstring")
            .to.not.equal("string");
    });
    it("should not bind Left to new Either", () => {
        expect(Left("string").bind(str => Right("newstring")).match(identity, identity))
            .to.equal("string")
            .to.not.equal("newstring");
    });

    it("bindLeft should bind Left to new Either", () => {
        expect(Left("string").bindLeft(str => Right("newstring")).match(identity, identity))
            .to.equal("newstring")
            .to.not.equal("string");
    });
    it("bindLeft should not bind Right to new Either", () => {
        expect(Right("string").bindLeft(str => Right("newstring")).match(identity, identity))
            .to.equal("string")
            .to.not.equal("newstring");
    });
});