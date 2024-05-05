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

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user; //add user to firestore
    return result;
};

export const doSignOut = () => {
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