import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.sendStatus(401)

    try {
        const decode = jwt.verify(token, 'duy')
        console.log("2222222222222222222222222222222222222222222222222222222222", decode);
        req.dataAll = decode
        next()
    } catch(err) {
        return res.sendStatus(403)
    }
}

export default verifyToken;