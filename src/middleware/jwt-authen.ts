import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from "passport"
import { prisma } from '../db';
import { Request } from 'express';

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;
// opts.issuer = 'khunnlab.uk';
// opts.audience = 'test.com';

passport.use(
    new Strategy(opts, async function (jwt_payload, done) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: Number(jwt_payload.user_id) },
          select: {
            id: true,
            fullname: true,
            email: true,
            role: true,
            profile: {
              select: { address: true },
            },
          },
        });
        if (!user) {
          return done(new Error("ไม่พบผู้ใช้นี้ในะรบบ"), false);
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
  

export const isAuthen = passport.authenticate('jwt', { session: false });
