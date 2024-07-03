import { readCustomer } from "../../db";
import { applyDiscount, calculateAge, getCurrencies, getProduct, getUser, personLevel } from "../../lib";

describe("Test The Age Value", () => {
    it("shoud return 18 if greater then or equal 18", () => {
        const result = calculateAge(20);
        expect(result).toBe(18)
    });

    it("should return a negative number id age less then 18", () => {
        const result = calculateAge(15);
        expect(result).toBe(-18);
    });
});

describe("- Person Level", () => {
    it("if name is mohamed return 'greate'", () => {
        const result = personLevel("mohamed");
        expect(result).toBe("greate");
    });

    it("if name is adam return 'normal'", () => {
        const result = personLevel("adam");
        expect(result).toBe("normal");
    });

    it("if name is not adam or mohamed return 'bad'", () => {
        const result = personLevel("akram");
        expect(result).toBe("bad");
    });
});

describe("- currency", () => {
    it("should return supported currencies", () => {
        const result = getCurrencies();
        expect(result.length).toBe(3);

        expect(result).toContain("MAD");
        expect(result).toContain("USD");
        expect(result).toContain("AUE");

        expect(result).toEqual(expect.arrayContaining(["MAD", "USD", "AUE"]));
    });
});


describe("- Get Product", () => {
    it("should return the product with the giving id", () => {
        const result = getProduct(4);
        expect(result).toHaveProperty("id", 4);
        expect(result).toMatchObject({ id: 4, price: 10 });
    });
});

describe("- Get User", () => {
    it("should throw if user is falsy", () => {
        const args = [0, false, "", undefined, null];
        args.forEach(a => {
            expect(() => { getUser((a as string)); }).toThrow();
        });
    });

    it("should return user object if username is Passed", () => {
        const result = getUser("mohamed");
        expect(result).toMatchObject({ username: "mohamed" });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe("Apply Discount", () => {
    const order = { customerId: 10, price: 9 };
    expect(order.price).toBe(9);
});

