import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../Models/User.js";

export function initializePassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:5002/auth/google/callback",
      },
      async (accessToken, refreshToken, profile,done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });//BUSCAR EL USUARIO POR EL GOOGLE ID, SI NO LO ENCUENTRA CREA UNO
          if (!user) {
            user = new User({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
            });
            await user.save();
          }
          //Una vez que se ha encontrado o creado el usuario, utilizamos la función done para finalizar el proceso de autenticación y pasar el usuario al siguiente paso.
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

 //alamacenar el id del user en la session
  passport.serializeUser((user, done) => done(null, user.id));

  //buscamos el usuario en la base de datos por su ID 
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      //el objeto user se almacena en req.user
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  

  passport.checkAuthentication = (req, res, next) => {
    return req.isAuthenticated() ? next() : res.redirect('/auth/google');
  };
}
