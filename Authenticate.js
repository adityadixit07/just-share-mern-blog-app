import jwt from "jsonwebtoken";

// const Authenticate = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   console.log(token);
//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Unauthorized, Token is missing" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res
//         .status(403)
//         .json({ success: false, message: "Token verification failed" });
//     }
//     req.user = decoded;
//     console.log(decoded, "->decoded user id");
//     next();
//   });
// };

// export default Authenticate;

const Authenticate = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Please login first!",
          success: false,
        });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      message: "You are not logged in!",
      success: false,
    });
  }
};
export default Authenticate;
