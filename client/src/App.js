import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "./store/thunks/fetchUsers";
import { createOrUpdateUser } from "./Hooks/useCreateOrUpdateUser";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        await createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch(
              fetchUsers({
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              })
            );
          })
          .catch();
      }
    });
    return () => unsubscribe;
  }, []);
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default App;
