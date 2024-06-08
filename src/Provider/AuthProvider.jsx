import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";



export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // Create user by google
    const createUserWithGoogle = (Provider) => {
        return signInWithPopup(auth, Provider);
        setLoading(true);
    }

    // Create user by email and password
    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
        setLoading(true);
    }

    // Sign in user by email and password
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
        setLoading(true);
    }

    // Observe state
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            
            if(currentUser){
                // 
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token);
                    }
                })
            }
            else{
                // 
                localStorage.removeItem('access-token');
            }

            setLoading(false);

        })
        return () => {
            unSubscribe();
        }
    }, [])


    // logut function
    const logOut = () => {
        return signOut(auth);
        setLoading(true);
    }

    // set all info
    const authInfo = {
        logOut,
        user,
        createUserWithGoogle,
        createNewUser,
        signInUser,
        loading,
        setUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;