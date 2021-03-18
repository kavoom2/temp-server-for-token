// ---------------INITIALIZATION------------------ //
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const cookieParser = require("cookie-parser");
const data = require("./data.js");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(data);
  res.send();
});

// ---------------ENDPOINT: /users------------------ //

app.get("/user/info", (req, res) => {
  const authorization = req.headers["authorization"].split(" ");
  console.log("/user/info", `${authorization[1]}를 전달받았습니다.`);

  res.json({
    id: 1,
    username: "codestates",
    email: "codestates@gmail.com",
  });
});

app.post("/user/login", (req, res) => {
  const { email, password } = req.body;
  console.log("/user/login", `${email}, ${password}를 전달받았습니다.`);
  res.status(200).send({ data: { accessToken: "TOKEN!!" } });
});

app.post("/user/logout", (req, res) => {
  const authorization = req.headers["authorization"].split(" ");
  console.log("/user/logout", `${authorization[1]}을 전달받았습니다.`);
  res.status(200).send({ message: "good" });
});

app.post("/user/signup", (req, res) => {
  const { username, email, password } = req.body;
  console.log(
    "/user/signup",
    `${username}, ${email}, ${password}를 전달받았습니다.`
  );

  res.status(200).json({ email, password, username });
});
// ---------------ENDPOINT: /todo------------------ //

app.get("/todo/info", (req, res) => {
  const authorization = req.headers["authorization"].split(" ");
  console.log("/todo/info", `${authorization[1]}을 전달받았습니다.`);
  res.status(200).json({
    data: data,
    message: "good",
  });
});

// ------------------------------------------------ //
app.listen(port, () => {
  console.log(`This server listening on ${port}`);
});
