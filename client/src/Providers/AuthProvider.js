import { createContext } from "react";
import { useProvideAuth } from "../Hooks/useProvideAuth";

const initialState = {
    user:null,
    signIn:()=> {},
    signUp:()=> {},
    logOut:()=> {},
    products:null,
    addProduct:()=> {},
    deleteProduct:()=>{},
    addDraft:()=> {},
    deleteDraft:()=> {},
    updateProfile:()=> {}
}

export const AuthContext = createContext(initialState);

export const AuthProvider = ({children})=>{
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}