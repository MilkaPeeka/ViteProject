import {userLogIn, userLogOut, getRekemsByGdud, addRekemToGdud} from '../api/database';
import { createContext, useReducer } from 'react';
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
const reducerInitialData = {
    ...retrieveContextDataFromStorage(defaultUserData, defaultSessionData),
    wereRekemsLoaded: false,
    rekemsList: [],
};

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

        case mappings.setRekemList:
            return {
                ...state,
                rekemsList: action.value,
                wereRekemsLoaded: true
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
    toggleDarkmode: async () => {},
    onLogOutHandler: async () => {},
    onLogInHandler: async (pernum) => {},
    addRekemHandler: async (rekemData) => {}, 
    getRekemList: async () => {}
});


//// COMPONENT /////
const SiteContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, reducerInitialData);

    /*
    Recieves as an argument: pernum (string)
    sends a request to the server to authenticate using the pernum
    on success: updates the states of: sessionData, userData
    */

    const onLogInHandler = async (pernum) => {
        const result = await userLogIn(pernum);
        if (result.error)
            throw new Error(result.data.error_message);
        
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
    sends a request to the server to log out (doesnt send any arguments because theyre saved in the server)
    on success: updates the states of: sessionData, userData, rekemsInGdud
    */
    const onLogOutHandler = async () => {
        const result = await userLogOut();
        if (result.error)
            throw new Error(result.data.error_message);

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
        const result = await getRekemsByGdud();
        if (result.error)
            throw new Error(result.data.error_message);

        dispatch({type: mappings.setRekemList, value: result});
        
    };
    
    const addRekemHandler = async (rekemData) => {
        const result = await addRekemToGdud(rekemData);
        if (result.error)
            throw new Error(result.data.error_message);
    };
    

    return (
        <SiteContext.Provider value={{
            ...state,
            toggleDarkmode,
            onLogOutHandler,
            onLogInHandler,
            addRekemHandler,
            getRekemList
        }}>
            {props.children}
        </SiteContext.Provider>
    )
}

export default SiteContextProvider; 
