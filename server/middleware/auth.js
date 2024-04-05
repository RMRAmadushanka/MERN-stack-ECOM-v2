import { firebaseAdminApp } from "../firebase/index.js";

const authCheck = async (req, res, next) => {
  try {
    const decodedToken = await firebaseAdminApp
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

export { authCheck };
