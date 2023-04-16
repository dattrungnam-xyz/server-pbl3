import jwt from "jsonwebtoken";

const middlewareController = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      jwt.verify(token.toString(), process.env.JWT_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        req.role = user.role;
        req.id = user.id;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },

  verifyTokenOnlyAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.role === "admin") {
        next();
      } else {
        return res.status(401).json("You're not authenticated");
      }
    });
  },
  verifyTokenAdminAndStaff: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.role === "admin" || req.role === "staff") {
        next();
      } else {
        return res.status(401).json("You're not authenticated");
      }
    });
  },
};

export default middlewareController;
