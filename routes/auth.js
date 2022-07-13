const express = require('express');
const passport = require('passport');
const axios = require('axios');
const qs = require('qs');
const bcrypt = require('bcrypt');
const { Admin, Center } = require('../models');


const router = express.Router();

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

// 00-01
router.post('/register', async (req, res, next) => {
    try {
        const { id, pw, name, phone, email, center_number, place_name, address, center_phone } = req.body
        const exUser = await Admin.findOne({ where: { id }})
        const exCenter = await Center.findOne({ where: { center_number: center_number }})
        
        if (exUser) {
            return res.status(400).json({ message: '이미 존재하는 회원입니다.' })
        }
        if (exCenter) {
            return res.status(400).json({ message: '이미 등록된 장소입니다.' })
        }

        const hash = await bcrypt.hash(pw, 12);
        await Admin.create({
            id, name, phone, email, 
            pw: hash,
        }) 

        const data = await Admin.findOne({ 
            attributes: ['admin_id'],
            where: { id: id }
        })
        await Center.create({
            place_name, address, center_number,
            phone: center_phone,
            admin_id: data.admin_id
        })

        return res.status(201).json({ success: true })
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.get('/kakaologin',(req,res)=>{
    const kakao = {
        clientID: process.env.KAKAO_ID,
        clientSecret: 'dmaMrAZ0JdiE5wR0TYpYR6SMrbxj7B1k',
        redirectUri: 'http://localhost:8080/kakaologin'
    }
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile,account_email`;
    res.json(kakaoAuthURL);
})

// router.get('/kakao', async (req, res, next) => {
//     let token
//     try{//access토큰을 받기 위한 코드
//         token = await axios({//token
//             method: 'POST',
//             url: 'https://kauth.kakao.com/oauth/token',
//             headers:{
//                 'content-type':'application/x-www-form-urlencoded'
//             },
//             data:qs.stringify({
//                 grant_type: 'authorization_code',//특정 스트링
//                 client_id:process.env.KAKAO_ID,
//                 client_secret:'dmaMrAZ0JdiE5wR0TYpYR6SMrbxj7B1k',
//                 redirectUri:'http://localhost:8080/kakaologin',
//                 code:req.query.authorize_code,//결과값을 반환했다. 안됐다.
//             })//객체를 string 으로 변환
//         })
//     } catch(err) {
//         res.json(err.data);
//     }
//     console.log(token.data);
//     let user
//     try {
//         user = await axios({
//             method: 'get',
//             url: 'https://kapi.kakao.com/v2/user/me',
//             headers: {
//                 Authorization: `Bearer ${token.data.access_token}`
//             }
//         })
//     } catch (err) {
//         console.log(err)
//     }
//     console.log(user.data)
//     res.json(token.data)
//     // res.json(token.data)
//     // const baseUrl = 'https://kauth.kakao.com/oauth/token'
//     // const config = {
//     //     client_id: process.env.KAKAO_ID,
//     //     grant_type: 'authorization_code',
//     //     redirect_uri: 'http://localhost:8080/kakaologin',
//     //     code: req.query.authorize_code
//     // }
//     // const params = new URLSearchParams(config).toString();
//     // const Url = `${baseUrl}?${params}`;
//     // console.log(Url)
//     // const kakaoTokenRequest = request(Url, {
//     //     method: 'POST',
//     //     headers: {
//     //         "Content-type": 'application/json',
//     //     }
//     // })
//     // const json = await kakaoTokenRequest.json();
//     // console.log(json)
// });

router.post('/kakao/logout', async(req, res, next) => {
    let result
    console.log(req.body.access_token)
    try {
        result = await axios({
            method: 'post',
            url: 'https://kapi.kakao.com/v1/user/logout',
            headers: {
                Authorization: `Bearer ${req.body.access_token}`
            }
        })
        console.log(result.data)
    } catch (err) {
        console.error(err.data)
    }
})

module.exports = router;