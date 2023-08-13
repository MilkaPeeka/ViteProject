import {userLogIn, userLogOut, getRekemsByGdud, addRekemToGdud, getSummarizedRekemsOfUser, removeByCarNumber as DBremoveByCarNumber} from '../api/database';
import { createContext, useEffect, useReducer } from 'react';
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

const reducerInitialState = {
    sessionData: defaultSessionData,
    userData: defaultUserData,
    isInDarkMode: false,
    ...retrieveContextDataFromStorage(),
    summarizedRekemList: []
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

        case mappings.setDarkMode:
            return {
                ...state,
                isInDarkMode: action.value
            };

        case mappings.setSummarizedRekemList:
            return {
                ...state,
                summarizedRekemList: action.value
            };

        default:
            return state;
    }
};



//// SITE CONTEXT ////
export const SiteContext = createContext({
    ...reducerInitialState,
    toggleDarkmode: async () => {},
    onLogOutHandler: async () => {},
    onLogInHandler: async (pernum) => {},
    addRekemHandler: async (rekemData) => {}, 
    getSummarizedRekemList: async () => {},
    getRekemListByGdud: async (gdud) => {},
    removeByCarNumber: async (carNumber) => {}
});


//// COMPONENT /////
const SiteContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, reducerInitialState);
    /*
    loading rekemList on site's load. data is not persistent throughout reloads
    */
    useEffect(() => {
        if (!state.sessionData.isLoggedIn){
            return;
        }
    console.log("initial site load - loaded rekemList")
    getSummarizedRekemsOfUser()
    .then((result) => {
        result.sort((a,b) => a.makat.localeCompare(b.makat));
        dispatch({type: mappings.setSummarizedRekemList, value:result})
    })
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


        dispatch({type: mappings.setSummarizedRekemList, value: []});
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
    
    const getSummarizedRekemList = async () => {
        console.log("hey");
        const result = await getSummarizedRekemsOfUser();
        if (result.error)
            throw new Error(result.error_message);

        result.sort((a,b) => a.makat.localeCompare(b.makat));
            
        dispatch({type: mappings.setSummarizedRekemList, value:result});
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
    

    const removeByCarNumber = async (carNumber) => {
        console.log("hey");
        const result = await DBremoveByCarNumber(carNumber);
        console.log(result);
        if (result.error)
            throw new Error(result.error_message);

        await getSummarizedRekemList();
    }

    return (
        <SiteContext.Provider value={{
            ...state,
            toggleDarkmode,
            onLogOutHandler,
            onLogInHandler,
            addRekemHandler,
            getSummarizedRekemList,
            getRekemListByGdud,
            removeByCarNumber
        }}>
            {props.children}
        </SiteContext.Provider>
    )
}

export default SiteContextProvider; 
