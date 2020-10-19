const express = require('express');
const router = express.Router();

//Validation
const {
    validSign,
    validLogin,
    forgetPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid')

const {
    registerController,
    activationController,
    loginController,
    forgetController,
    resetController,
    googleController,
    facebookController

} = require('../controllers/auth.controllers')

router.post('/register', validSign, registerController)
router.post('/login', validLogin, loginController)
router.post('/activation', activationController)
router.put('/password/forget', forgetPasswordValidator, forgetController)
router.put('/password/reset', resetPasswordValidator, resetController)

//Google Oauth
router.post('/googlelogin', googleController)
//Facebook Oauth
router.post('/facebooklogin', facebookController)

module.exports = router;