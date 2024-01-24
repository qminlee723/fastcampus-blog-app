import { useState } from "react";
import { app } from "firebaseApp";
import { getAuth } from "firebase/auth";
import Router from "components/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = getAuth(app); // app을 넣어줘야 동작함
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );
  return (
    <>
      <ToastContainer />
      <Router isAuthenticated={isAuthenticated} />
    </>
  );
}

export default App;
