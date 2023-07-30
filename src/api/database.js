/*
Just one file for whole project because it is small, 
usually should be splitted into different categories,
for example "auth.js", "userRetrival.js" etc
*/

import axios from 'axios';
import mappings from '../mappings';

/*
Recieves as an argument: pernum (string)
data sent to the server: {pernum: pernum}
data recieved back: 
    {error: boolean,
    error_message: string (optional), 
    user: userObject (optional),
    sessionExpiry: Date (optional)}
*/

export const userLogIn = async (pernum) => {
    try {
        const response = await axios.post(mappings.API_login, {pernum});
        const sessionExpiryDate = new Date(response.data.sessionExpiry);
        return {...response.data,
                sessionExpiry: sessionExpiryDate};
    }
    catch (err) {
        return {
            error: true,
            error_message: err.message
        };
    }
};

export const userLogOut = async () => {
    
};

export const retrieveRekemsByGdud = async (rekemMakat) => {

};


