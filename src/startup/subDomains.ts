import express, { Express } from "express";
import vhost from "vhost";


export function subDomains(app: Express) {
    app.use(vhost("admin.localhost", (req, res) => {
        res.send("Welcome into admin section");
    }));

    app.use(vhost("dashboard.localhost", (req, res) => {
        res.send("Welcome into dashboard section");
    }));

}