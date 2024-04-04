import { firebaseAdminApp } from "../firebase/index.js";

const authCheck = async (req,res,next) => {
    
   
       const decodedToken = await firebaseAdminApp.auth().verifyIdToken(req.headers.authtoken);
       console.log(decodedToken);
      
};

export { authCheck };
