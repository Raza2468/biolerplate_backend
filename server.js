const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
// const session = require("cookie-session");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
dotenv.config();
require("./config/dbConnect")();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
// const authRoutes = require("./auth");
const http = require("http");

// =========================>

let app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("default"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const userRoute = require("./constants/routes").USER;
const userRouter = require("./routes/userRoutes");
//==============================================
const storage = multer.diskStorage({
  // https://www.npmjs.com/package/multer#diskstorage
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`
    );
  },
});
//==============================================
const upload = multer({ storage: storage });
app.use(userRoute, userRouter);
// =========================>
// app.use("/", express.static(path.resolve(path.join(__dirname, "Web/build"))));
// =========================>

// app.use("/auth", authRoutes);

// app.use(function (req, res, next) {

//     console.log("req.cookies: ", req.cookies);

// })

// ==========================================>Start Get Profile /////
// app.get("/getProfile", upload.any(), (req, res, next) => {
//     console.log("my tweets user=>", req.body);
//     getUser.findById(req.body.jToken.id, 'name email role createdOn', (err, doc) => {
//         console.log("ya kia han dekhna han", req.body.jToken.id)
//         if (!err) {
//             console.log(doc, "FSAfsafas");
//             res.send({
//                 profile: doc
//             })
//         } else {
//             res.status(500).send({
//                 message: "server error"
//             })
//         }
//     })
// });

// app.post("/profilePOST", upload.any(), (req, res, next) => {
//     console.log(req.body.tweet)
//     console.log("req body of tweet ", req.body);
//     // if (!req.body.formData) {
//     if (!req.body.tweet) {
//         res.status(409).send(`
//                 Please send useremail and tweet in json body
//                 e.g:
//                 "name": "name",
//                 "email": "abc@gmail.com",
//                 "text": "abc"
//             `)
//         return;
//     };
//     getUser.findById(req.body.jToken.id,
//         console.log(req.body),
//         (err, user) => {
//             if (!err) {
//                 console.log("tweet user : " + user);
//                 tweet.create({
//                     name: user.name,
//                     email: user.email,
//                     msg: req.body.tweet,
//                     profileUrl: user.profileUrl,
//                 }).then((data) => {
//                     console.log("Tweet creaxcvxcvxvted;': " + user),

//                         res.status(200).send({
//                             msg: req.body.tweet,
//                             name: data.name,
//                             email: data.email,
//                             profileUrl: data.profileUrl,
//                         });

//                     io.emit("chat-connect", data)
//                     // io.emit("chat-img", user)
//                 }).catch((err) => {
//                     res.status(500).send({
//                         message: "an error occured : " + err,
//                     });
//                 });
//             }
//             // else {
//             //     console.log("tweet user : " + user);
//             //     tweet.create({
//             //         name: user.name,
//             //         email: user.email,
//             //         msg: req.body.tweet,
//             //         profileUrl: user.profileUrl,
//             //     }).then((data) => {
//             //         console.log("Tweet creaxcvxcvxvted;': " + user),

//             //             res.status(200).send({
//             //                 msg: req.body.tweet,
//             //                 name: data.name,
//             //                 email: data.email,
//             //                 profileUrl: data.profileUrl,
//             //             });

//             //         io.emit("chat-connect", data)
//             //         // io.emit("chat-img", user)
//             //     }).catch((err) => {
//             //         res.status(500).send({
//             //             message: "an error occured : " + err,
//             //         });
//             //     });
//             //             }
//             //         }
//             //         )

//         }
//         // }
//     );
// })

// app.get('/realtimechat', upload.any(), (req, res, next) => {

//     tweet.find({}, (err, data) => {
//         if (!err) {
//             console.log("tweetdata=====>", data);
//             res.send({
//                 tweet: data,
//                 // profileUrl: urlData[0],
//             });
//         }
//         else {
//             console.log("error : ", err);
//             res.status(500).send("error");
//         }
//     })
// });

// app.post("/upload", upload.any(), (req, res, next) => {
//     // never use upload.single. see https://github.com/expressjs/multer/issues/799#issuecomment-586526877

//     bucket.upload(
//         req.files[0].path,
//         function (err, file, apiResponse) {
//             if (!err) {
//                 file.getSignedUrl({
//                     action: 'read',
//                     expires: '03-09-2491'
//                 }).then((urlData, err) => {
//                     if (!err) {
//                         getUser.findById(req.headers.jToken.id, (err, userData) => {
//                             userData.update({ profileUrl: urlData[0] }, (err, updated) => {
//                                 if (!err) {
//                                     res.status(200).send({
//                                         profileUrl: urlData[0],
//                                     })
//                                 }
//                             })
//                         })
//                     }
//                 })
//             } else {
//                 console.log("err: ", err)
//                 res.status(500).send();
//             }
//         });
// })

app.listen(process.env.PORT, () => {
  console.log("===================**===================");
  console.log(`listening on http://localhost:${process.env.PORT}`);
});

// ==========================================>Server /////
