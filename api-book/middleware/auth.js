const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const authheader = req.headers["authorization"];
        const token = authheader && authheader.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded..................",decoded)
        req.user = decoded;
        next() 
    } catch (error) {
      console.log(error.message);  
      res.status(500).send({success: false})
    }
}

module.exports = auth;