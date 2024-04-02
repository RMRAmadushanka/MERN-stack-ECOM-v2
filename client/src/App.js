import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import { useEffect } from "react";
import { fetchUsers } from "./store/thunks/fetchUsers";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idTokenResult = await user.getIdTokenResult();
        let userData = {email:user.email,token:idTokenResult.token}
        dispatch(fetchUsers(userData))
      }
    })
  },[])
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default App;
