import { type } from "os";
import { readCustomer } from "./db";

export function calculateAge(age: number) {
    return (age >= 18) ? 18 : -18;
}


export function personLevel(name: string) {
    if (name == "mohamed") return "greate";
    if (name == "adam") return "normal";
    return "bad";

}

export function getCurrencies() {
    return ["USD", "AUE", "MAD"];
}

export function getProduct(id: number) {
    return { "id": id, price: 10, category: "phone" };
}


export function getUser(username: string) {
    if (!username) throw new Error("Username is required");
    return { username: username, id: Date.now() };
}


export function fizzbuzz(input: any) {
    if (typeof input != "number")
        throw new Error("Input value shoud to be a number");

    if ((input % 3 === 0) && (input % 5 === 0))
        return "FizzBuzz"

    if (input % 3 === 0)
        return "Fizz";

    if (input % 5 === 0)
        return "Buzz";

    return input;
}

function applyDiscount(order: any) {
    const customer = readCustomer();
    if (customer.points > 10) (order.price *= 0.9);
}

export { applyDiscount };