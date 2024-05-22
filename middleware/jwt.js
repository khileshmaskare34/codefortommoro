const jwt = require('jsonwebtoken')

exports.checkToken = async function(req, res, next){

    try {
        const token = req.cookies.Token;

        const decoded = jwt.verify(token, 'iamfromindiaandwhereyoufromdostcaniknoweachother');

        if(decoded.exp * 1000 < Data.now()){
            res.clearCookie('Token');
            return res.redirect('/')
        }
        next();
    } catch (error) {
        console.log("lucky", error);
    }
}
