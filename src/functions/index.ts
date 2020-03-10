import * as functions from "firebase-functions";
import next from "next";
import express from "express";

const dev = process.env.NODE_ENV !== "production";
const app: any = next({ dev, conf: { distDir: "next" } });
const handle = app.getRequestHandler(app);

const server = express();
server.get("/service-worker.js", (req: any, res: any) => {
  const filePath = "next/service-worker.js";
  app.serveStatic(req, res, filePath);
});

// const serviceWorkers = [
//   {
//     filename: "service-worker.js",
//     path: "next/service-worker.js"
//   },
//   {
//     filename: "firebase-messaging-sw.js",
//     path: "next/firebase-messaging-sw.js"
//   }
// ];

// serviceWorkers.forEach(({ filename, path }) => {
//   server.get(`/${filename}`, (req, res) => {
//     app.serveStatic(req, res, path);
//   });
// });

server.get("*", (req, res) => handle(req, res));

export const nextApp = functions.https.onRequest((req, res) => {
  return app.prepare().then(() => {
    server(req, res);
  });
});
