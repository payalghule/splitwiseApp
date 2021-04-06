// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const db = require("../db.js");

// const userstorage = multer.diskStorage({
//   destination: path.join(__dirname, "..") + "/public/userImage",
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       "user" +
//         req.params.user_id +
//         "-" +
//         Date.now() +
//         path.extname(file.originalname)
//     );
//   },
// });

// const useruploads = multer({
//   storage: userstorage,
//   limits: { fileSize: 1000000 },
// }).single("image");

// router.post("/:userId", (req, res) => {
//   console.log("inside upload");

//   useruploads(req, res, function (err) {
//     if (!err) {
//       let imageSql = `UPDATE dbsplitwise.users SET user_image = '${req.file.filename}' WHERE id = ${req.params.userId}`;
//       console.log(req.file.filename);
//       db.query(imageSql, (err, result) => {
//         if (err) {
//           res.writeHead(500, {
//             "Content-Type": "text/plain",
//           });
//           res.end("Database Error");
//         }
//       });
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(req.file.filename);
//     } else {
//       console.log("Error!" + err);
//     }
//   });
// });

// module.exports = router;
