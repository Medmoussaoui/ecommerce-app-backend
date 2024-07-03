import { ShoppingCartModule } from "../../module/shoppingCart.module";
import { server } from '../../index';

import request from "supertest";

describe("api/shoppingCart", () => {
    afterEach(() => {
       server.close();
    });
    
    describe("GET /:page", () => {
        it("shoud return 403 if client is not authorized", async () => {
            const res = await request(server).get("/shoppingCart/0");
            expect(res.status).toBe(403);
        });
    });
});


// /authorize?client_id=1&redirect_uri=https://myapp.com/callback&response_type=code&scope=*

///authorize?client_id=dsds445ds4s&redirect_uri=https://myapp/callback&response_type=code&scope=* 

/// client_id = <Unique>
/// redirect_uri = "myapp/callback"
/// response_type = "code"
/// scope = "*"