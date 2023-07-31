import mappings from "../mappings";


/*
A helper function to retrieve the session and user data from the local storage.
If those keys were found, then we will check that the session is still valid by comparing the cookie date and the session date
and return the data if it is.
*/
export const retrieveContextDataFromStorage = (defaultUserData, defaultSessionData) => {
  const isInDarkMode = localStorage.getItem(mappings.darkMode) === '1';

  const savedSessionData = localStorage.getItem(mappings.sessionData);
  let sessionData = savedSessionData
    ? JSON.parse(savedSessionData)
    : defaultSessionData;

  // Check if the saved session is still valid based on the expiry date
  const currentTime = new Date().getTime();
  const sessionExpiryTime = new Date(sessionData.sessionExpiryDate).getTime();
  const isValidSession = currentTime < sessionExpiryTime;

  const userData = isValidSession
    ? JSON.parse(localStorage.getItem(mappings.userData))
    : defaultUserData;

    sessionData = isValidSession ? sessionData : defaultSessionData;

    return { sessionData, userData, isInDarkMode };
  };