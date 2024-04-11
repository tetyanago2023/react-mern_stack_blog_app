import {createContext, useState} from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    // const [formData, setFormData] = useState({
    //     title: "",
    //     description: "",
    // });

    return<GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};