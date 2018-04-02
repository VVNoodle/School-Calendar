const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  //   const data = {
  //     otherData: "Something Else"
  //   };
  //   const vueOptions = {
  //     template: {
  //       html: {
  //         start: "<!DOCTYPE html><html>",
  //         end: "</html>"
  //       },
  //       body: {
  //         start: "<body>",
  //         end: "</body>"
  //       },
  //       template: {
  //         start: '<div id="app">',
  //         end: "</div>"
  //       }
  //     },
  //     head: {
  //       title: "Hello this is a global title",
  //       scripts: [{ src: "https://example.com/script.js" }],
  //       styles: [{ style: "/assets/rendered/style.css" }]
  //     }
  //   };
  //   res.renderVue("Home.vue", data, vueOptions);
  res.json(req.user);
});

module.exports = router;
