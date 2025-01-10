import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

const setupGoogleAuth = () => {
    passport.use(
        new GoogleStrategy(
          {
            clientID: '855101367831-0lslv6bo010d4jrhcqr86tdmh9fja3l5.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: "http://localhost:5000/api/auth/google/callback",
          },
          async (accessToken, refreshToken, profile, done) => {
            try {
              const existingUser = await User.findOne({ email: profile.emails[0].value });
              
              if (existingUser) {
                // Update existing user's Google ID if not present
                if (!existingUser.googleId) {
                  existingUser.googleId = profile.id;
                  await existingUser.save();
                }
                return done(null, existingUser);
              }
      
              // Create new user if doesn't exist
              const newUser = await User.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                provider: 'google',
                emailVerified: true
              });
      
              return done(null, newUser);
            } catch (error) {
              return done(error, null);
            }
          }
        )
      );

      passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser(async (id, done) => {
        try {
          const user = await User.findById(id);
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      });
};

export default setupGoogleAuth;