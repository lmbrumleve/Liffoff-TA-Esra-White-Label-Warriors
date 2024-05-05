import React, { useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/Firebase';

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  // const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, [])

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      // check if provider is email and password login
      // const isEmail = user.providerData.some(
      //   (provider) => provider.providerId === "password"
      // );
      // setIsEmailUser(isEmail);
      // check if the auth provider is google or not
    //   const isGoogle = user.providerData.some(
    //     (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
    //   );
    //   setIsGoogleUser(isGoogle);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }


    const value = {
      userLoggedIn,
      // isEmailUser,
      isGoogleUser,
      currentUser,
      setCurrentUser
    };

    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
//   const [user, setUser] = useState({});

//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     // signInWithPopup(auth, provider);
//     signInWithRedirect(auth, provider)
//   };

//   const logOut = () => {
//       signOut(auth)
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       console.log('User', currentUser)
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(AuthContext);
