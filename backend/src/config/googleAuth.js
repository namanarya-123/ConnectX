// backend/src/config/googleAuth.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import crypto from "crypto";

passport.use(
    new GoogleStrategy(
        {
            clientID:     process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:  process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists with this Google ID
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Check if email already registered manually
                const email = profile.emails?.[0]?.value;
                if (email) {
                    user = await User.findOne({ username: email });
                    if (user) {
                        // Link Google ID to existing account
                        user.googleId = profile.id;
                        await user.save();
                        return done(null, user);
                    }
                }

                // Create brand new user
                const newUser = new User({
                    name:     profile.displayName,
                    username: email || `google_${profile.id}`,
                    password: crypto.randomBytes(16).toString("hex"), // dummy password
                    googleId: profile.id,
                    token:    crypto.randomBytes(20).toString("hex"),
                });

                await newUser.save();
                return done(null, newUser);

            } catch (err) {
                return done(err, null);
            }
        }
    )
);

export default passport;