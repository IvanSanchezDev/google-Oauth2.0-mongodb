import express from "express";
import passport from "passport";

const routerAuth= express.Router();

routerAuth.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email"] })
);

routerAuth.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google",
    successRedirect: "/home",
  })
);

routerAuth.get("/logoutGoogle", (req, res) => {
  req.logout({}, (err) => console.log(err));
  res.redirect("/auth/google");
});

routerAuth.get("/home",  (req, res) => {
  //extraemos los datos del req.user
  res.send(`<h1>Bienvenido, ${req.user.displayName}!</h1>
              <p>Email: ${req.user.email}</p>
              <a href="/logoutGoogle">Cerrar sesión</a>`);
});



export default routerAuth;
