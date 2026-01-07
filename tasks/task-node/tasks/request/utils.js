import express from "express";

export function runServer() {
  const app = express();

  app.post("/post", (req, res) => {
    res.send({
      a: 5,
      b: 6,
    });
  });

  app.get("/get", (req, res) => {
    if (req.headers.auth) {
      res.header('auth', req.headers.auth);
    }

    res.send({
      a: 10,
      b: 16,
    });
  });

  const server = app.listen(3000, () => {
    console.log("Server started on port 3000");
  });

  return server;
}
