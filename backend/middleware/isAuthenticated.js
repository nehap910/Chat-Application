
import jwt from "jsonwebtoken"

const isAuthenticated = async (req, res, next) => {
  try {

    //get token from cookie
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({message:"User Not authnetictaed"})
    };

    //verify token with secret key
    const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log(decode);
    if(!decode){
      return res.status(401).json({message:"Invalid Token"});
    }

    req.id = decode.userId;
    next();
    // console.log(token);
 
  } catch (error) {
    console.log(error.message);
  }
};

export default isAuthenticated;
