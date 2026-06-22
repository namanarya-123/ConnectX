// backend/src/routes/googleAuth.routes.js
import express from "express";
import passport from "../config/googleAuth.js";

const router = express.Router();

// Step 1: Redirect user to Google login page
router.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
);

// Step 2: Google redirects back here after login
router.get("/auth/google/callback",
    (req, res, next) => {
        passport.authenticate("google", { session: false }, (err, user, info) => {
            console.log("=== GOOGLE CALLBACK DEBUG ===");
            console.log("Error:", err);
            console.log("User:", user);
            console.log("Info:", info);

            if (err) {
                console.log("Passport error:", err.message);
                return res.redirect(`${process.env.FRONTEND_URL}/auth?error=google_failed`);
            }

            if (!user) {
                console.log("No user returned from strategy");
                return res.redirect(`${process.env.FRONTEND_URL}/auth?error=google_failed`);
            }

            const token = user.token;
            const name  = encodeURIComponent(user.name || user.username);

            console.log("Redirecting with token:", token);

            return res.redirect(
                `${process.env.FRONTEND_URL}/home?token=${token}&name=${name}`
            );
        })(req, res, next);
    }
);

export default router;