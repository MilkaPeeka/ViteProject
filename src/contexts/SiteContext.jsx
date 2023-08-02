import {userLogIn, userLogOut, getRekemsByGdud, addRekemToGdud, getRekemsOfUser} from '../api/database';
import { createContext, useEffect, useReducer, useState } from 'react';
import {retrieveContextDataFromStorage} from '../helpers/contextHelpers'
import mappings from '../mappings';


//// REDUCER DEFAULTS /////
const defaultUserData = {
    gdud: '',
    isManager: false,
    pernum: '',
};

const defaultSessionData = {
    isLoggedIn: false,
    sessionExpiryDate: null,
};


/*
NOTE: We don't save or retireve any data from the database until we are sure that the user is authenticated. 
Because we are not sure that the session is still valid and user is authenticated (as the user can change the cookies locally),
we wont include any sensitive information like rekems list. For that the user will have to request for it,
and if the user is not authenticated in the server then we will reset the cookies state.
*/
const reducerInitialData = retrieveContextDataFromStorage(defaultUserData, defaultSessionData);

//// REDUCER FUNCTION /////
const reducer = (state, action) => {
    switch (action.type) {
        case mappings.setUserData:
            return {
                ...state,
                userData: action.value
            };

        case mappings.toggleDarkMode:
            return {
                ...state,
                isInDarkMode: !state.isInDarkMode
            };

        case mappings.setSessionData:
            return {
                ...state,
                sessionData: action.value,
            }

        case mappings.setDarkMode:
            return {
                ...state,
                isInDarkMode: action.value
            };

        default:
            return state;
    }
};



//// SITE CONTEXT ////
export const SiteContext = createContext({
    ...reducerInitialData,
    rekemList: [],
    toggleDarkmode: async () => {},
    onLogOutHandler: async () => {},
    onLogInHandler: async (pernum) => {},
    addRekemHandler: async (rekemData) => {}, 
    getRekemList: async () => {},
    getRekemListByGdud: async (gdud) => {}
});


//// COMPONENT /////
const SiteContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, reducerInitialData);
    const [rekemList, setRekemList] = useState([]);


    /*
    loading rekemList on site's load. data is not persistent throughout reloads
    */
    useEffect(() => {
        if (!state.sessionData.isLoggedIn){
            return;
        }

        console.log("initial site load - loaded rekemList")
        getRekemsOfUser()
        .then((result) => setRekemList(result))
        .catch((err) => console.log(err));
    }, [state.sessionData.isLoggedIn]);
    /*
    tries to log in using by pernum and creates a session on success
    */
    const onLogInHandler = async (pernum) => {
        const result = await userLogIn(pernum);
        if (result.error)
            throw new Error(result.error_message);
        
        const userData = {
            gdud: result.user.gdud,
            isManager: result.user.isManager,
            pernum: result.user.pernum
        };

        const sessionData = {
            isLoggedIn: true,
            sessionExpiryDate: result.sessionExpiry 
        };

        dispatch({type: mappings.setUserData, value: userData});
        dispatch({type: mappings.setSessionData, value: sessionData});
        localStorage.setItem(mappings.sessionData, JSON.stringify(sessionData));
        localStorage.setItem(mappings.userData, JSON.stringify(userData));
    
    };
    
    /*
    logs user out; destroys session
    */
    const onLogOutHandler = async () => {
        const result = await userLogOut();
        if (result.error)
            throw new Error(result.error_message);


        setRekemList([]);
        dispatch({type: mappings.setRekemList, value: []});
        dispatch({type: mappings.setUserData, value: defaultUserData});
        dispatch({type: mappings.setSessionData, value: defaultSessionData});
        localStorage.removeItem(mappings.sessionData);
        localStorage.removeItem(mappings.userData);
        
        };

    /*
    toggles dark mode state in the website.
    */
    const toggleDarkmode = async () => {
        // !state.isInDarkMode because we want to change the value
        localStorage.setItem(mappings.darkMode, !state.isInDarkMode ? '1' : '0'); 
        dispatch({type: mappings.toggleDarkMode});
    };
    
    const getRekemList = async () => {
        const result = await getRekemsOfUser();
        if (result.error)
            throw new Error(result.error_message);
            
        setRekemList(result);
    };

    const getRekemListByGdud = async (gdud) => {
        const result = await getRekemsByGdud(gdud);
        if (result.error)
            throw new Error(result.error_message);
            
        return result;
    };
    
    const addRekemHandler = async (rekemData) => {
        const apiData = {
            carNumber: rekemData.serialNum,
            makat: rekemData.makat,
            kshirot: rekemData.isRekemValid,
        }
        const result = await addRekemToGdud(apiData);
        if (result.error)
            throw new Error(result.error_message);
    };
    

    return (
        <SiteContext.Provider value={{
            ...state,
            rekemList,
            toggleDarkmode,
            onLogOutHandler,
            onLogInHandler,
            addRekemHandler,
            getRekemList,
            getRekemListByGdud
        }}>
            {props.children}
        </SiteContext.Provider>
    )
}

export default SiteContextProvider; 
