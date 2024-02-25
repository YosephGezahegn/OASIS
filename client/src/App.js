import { Route, Routes } from "react-router-dom";
import { Login, Main } from "./Container";
import { app } from "./config/firebase.config";
import { validateUserJWTToken } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { setUserDetails } from "./context/actions/userActions";
import { motion } from "framer-motion";
import { fadeInOut } from "./animations";
import { Alert, MainLoader } from "./Components";

export default function App() {
  const firebaseAuth = getAuth(app);
  const [isLoading, setisLoading] = useState(false);
  const alert = useSelector((state) => state.Alert);

  const dispatch = useDispatch();

  useEffect(() => {
    setisLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setisLoading(false);
      }, 3000);
    });
  }, {});

  return (
    <h1 className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </h1>
  );
}
