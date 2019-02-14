import { Maybe, None, Some } from '../src/modules/maybe';
import { it } from 'mocha';
import { expect } from 'chai';

const identity = (val:any):any => val;

describe("Maybe Monad", () => {
    it("should create Maybe from static constructors", () => {
        expect(Maybe.Some("string")).to.be.instanceOf(Maybe);
        expect(Maybe.None()).to.be.instanceOf(Maybe);
    });
    it("should match Some and None correctly", () => {
        expect(Maybe.None().match(
            some => "some",
            () => "none")
        ).to.be.equal("none");
        
        expect(Maybe.Some("").match(
            some => "some",
            () => "none")
        ).to.be.equal("some");
    });
    it("should allow alias constructors", () => {
        expect(None()).to.be.instanceOf(Maybe);
        expect(None().match(some => "", () => "none")).to.be.equal("none");
        expect(Some("some")).to.be.instanceOf(Maybe);
        expect(Some("some").match(some => "some", () => "")).to.be.equal("some");
    });
    it("should map Some to new Some", () => {
        expect(Some("string").map(str => "newstring").match(identity, () => ""))
            .to.equal("newstring")
            .to.not.equal("string");
    });
    it("should not map None to new Some", () => {
        expect(None().map(str => "string").match(identity, () => "none"))
            .to.equal("none")
            .to.not.equal("string");
    });
    it("should bind Some to new Some", () => {
        expect(Some("string").bind(str => Some("newstring")).match(identity, () => "none"))
            .to.equal("newstring")
            .to.not.equal("string");
    });
    it("should not bind None to new Some", () => {
        expect(None().bind(str => Some("string")).match(identity, () => "none"))
            .to.equal("none")
            .to.not.equal("string");
    });
})