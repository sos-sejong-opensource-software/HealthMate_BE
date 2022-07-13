const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        clientSecret: 'dmaMrAZ0JdiE5wR0TYpYR6SMrbxj7B1k',
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile.id)
            const exUser = await User.findOne({ where: { snsId: profile.id }});
            const tokenUser = {
                user: exUser,
                accessToken: accessToken || '',
            }
            if (exUser) {
                done(null, tokenUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao'
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }))
}