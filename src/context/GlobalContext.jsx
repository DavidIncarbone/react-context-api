// IMPORT

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// VARIABLES

const GlobalContext = createContext();
const apiUrl = "http://localhost:3000";

const GlobalProvider = ({ children }) => {

    // VARIABLES
    const [postsList, setPostsList] = useState([]);
    const initialData = { type: "", message: "" };
    const [alertData, setAlertData] = useState(initialData);
    // FUNCTIONS

    useEffect(() => {
        getPosts();

    }, []);


    function getPosts() {
        axios
            .get(apiUrl + "/posts")
            .then((res) => {

                setPostsList(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                console.log("Always executed")
            });
    }

    return (
        <GlobalContext.Provider value={{ alertData, setAlertData, postsList, getPosts }}>
            {children}
        </GlobalContext.Provider>
    );

}

function useGlobalContext() {
    const context = useContext(GlobalContext);
    return context;
}

export { GlobalProvider, useGlobalContext };
