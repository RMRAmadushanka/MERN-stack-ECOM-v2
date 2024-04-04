
import firebaseApp from "../firebase/index.js";
const authCheck = async (req,res,next) => {
    
      await firebaseApp().verifyIdToken(req.headers.authtoken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log(uid);
      })
      .catch((error) => {
        // Handle error
      });
};

export { authCheck };
