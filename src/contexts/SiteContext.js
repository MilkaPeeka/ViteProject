import {userLogIn} from '../api/database';
import { createContext, useState } from 'react';

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
Recieves as an argument: pernum (string)
sends a request to the server to authenticate using the pernum
on success: updates the states of: sessionData, userData, rekemsInGdud
*/
const onLogInHandler = async (pernum) => {
    const result = await userLogIn(pernum);

};

const onLogOutHandler = async () => {

};

const toggleDarkmode = async () => {

};

const refreshRekemList = async () => {

};


/*
If we are logged in, we update the session expiry
else, we reset the session data
*/
const checkIsLoggedIn = async () => {

};

const addRekemHandler = async (rekemData) => {

};

const mappings = {
    userData: defaultUserData,
    sessionData: defaultSessionData,
    isInDarkMode: false,
    rekemsList: [],
    toggleDarkmode,
    onLogOutHandler,
    onLogInHandler,
    addRekemHandler,
    checkIsLoggedIn,
};
const SiteContext = createContext(mappings);


const SiteContextProvider = (props) => {
    return (
        <SiteContext.Provider value={mappings}>
            {props.children}
        </SiteContext.Provider>
    )
}