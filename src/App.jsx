import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const user = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to={"/login"}></Navigate>;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }></Route>
          <Route path="login" element={user ? <Navigate to={"/"} /> : <Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
