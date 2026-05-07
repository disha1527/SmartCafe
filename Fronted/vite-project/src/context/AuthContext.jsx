

// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [adminToken, setAdminToken] = useState(null);

//   // 🔥 FIX: reload token on refresh
//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     if (token) {
//       setAdminToken(token);
//     }
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     window.location.href = "/";
//   };

//   const adminLogin = (token) => {
//     localStorage.setItem("adminToken", token);
//     setAdminToken(token);
//   };

//   const adminLogout = () => {
//     localStorage.removeItem("adminToken");
//     setAdminToken(null);
//     window.location.href = "/";
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         adminToken,
//         adminLogin,
//         adminLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };









import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    const sessionAdmin = sessionStorage.getItem("admin");
    const sessionAdminToken = sessionStorage.getItem("adminToken");

    // If this tab is already a User session, stick to it
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
      return;
    }

    // If this tab is already an Admin session, stick to it
    if (sessionAdminToken && sessionAdmin) {
      setAdminToken(sessionAdminToken);
      setAdmin(JSON.parse(sessionAdmin));
      return;
    }

    // Fallback to localStorage if no session exists in this tab
    const localAdmin = localStorage.getItem("admin");
    const localAdminToken = localStorage.getItem("adminToken");
    if (localAdminToken && localAdmin) {
      setAdminToken(localAdminToken);
      setAdmin(JSON.parse(localAdmin));
      sessionStorage.setItem("adminToken", localAdminToken);
      sessionStorage.setItem("admin", localAdmin);
      return;
    }

    const localUser = localStorage.getItem("userInfo");
    if (localUser) {
      setUser(JSON.parse(localUser));
      sessionStorage.setItem("user", localUser);
    }
  }, []);

  // ✅ USER LOGIN
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    // Do not clear admin token to allow simultaneous sessions
  };

  // ✅ USER LOGOUT
  const logout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  // ✅ ADMIN LOGIN
  const adminLogin = (token, adminData) => {
    sessionStorage.setItem("adminToken", token);
    sessionStorage.setItem("admin", JSON.stringify(adminData));
    localStorage.setItem("adminToken", token);
    localStorage.setItem("admin", JSON.stringify(adminData));
    setAdminToken(token);
    setAdmin(adminData);
    // Do not clear user token to allow simultaneous sessions
  };

  // ✅ ADMIN LOGOUT
  const adminLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    setAdminToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        adminToken,
        admin,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};