import { auth } from './Firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword,

// export const doCreateUserWithEmailAndPassword = async (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
// };

// export const doSignInWithEmailAndPassword = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
// };

export const doSignInWithGoogle = async () => { //initiates Google sign-in using a pop-up window - creates a Google authentication provider, prompts the user to sign in, and returns the authentication result, including user information
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user; //add user to firestore
    return result;
};

export const doSignOut = () => { //signs out the current user by calling the signOut method of the auth object
    return auth.signOut();
};

// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//     return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//     });
// };
