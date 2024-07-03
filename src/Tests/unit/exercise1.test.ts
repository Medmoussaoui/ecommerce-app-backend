import { fizzbuzz } from "../../lib";


describe("- FizzBuzz", () => {
    it("shoud throw an Exception if input is not a number", () => {
        expect(() => { fizzbuzz("string"); }).toThrow();
        expect(() => { fizzbuzz(undefined); }).toThrow();
        expect(() => { fizzbuzz(null); }).toThrow();
        expect(() => { fizzbuzz(false); }).toThrow();
        expect(() => { fizzbuzz(true); }).toThrow();
        expect(() => { fizzbuzz([]); }).toThrow();
    });

    it("shoud return FizzBuzz if the giving value % 5 and 3 = 0", () => {
        const result = fizzbuzz(15);
        expect(result).toBe("FizzBuzz");
    });

    it("shoud return Fizz if the giving value % 3 = 0", () => {
        const result = fizzbuzz(3);
        expect(result).toBe("Fizz");
    });

    it("shoud return bazz if the giving value % 5 = 0", () => {
        const result = fizzbuzz(5);
        expect(result).toBe("Buzz");
    });

    it("shoud return same input if the giving value % 5 or 3 not equal = 0", () => {
        const result = fizzbuzz(7);
        expect(result).toBe(7);
    });
});