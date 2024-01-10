import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from "passport"

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;
// opts.issuer = 'khunnlab.uk';
// opts.audience = 'test.com';

passport.use(new Strategy(opts, (jwtPayload, done) => {
    console.log(jwtPayload);
    return done(null, jwtPayload);
    // User.findOne({ id: jwtPayload.sub }, (err, user) => {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));

export const isAuthen = passport.authenticate('jwt', { session: false });