import mappings from "../mappings";
/*
returns a valid session data stored in localStorage
*/
export const retrieveContextDataFromStorage = () => {
  const isInDarkMode = localStorage.getItem(mappings.darkMode) === '1';

  const savedSessionData = localStorage.getItem(mappings.sessionData);
  if (!savedSessionData)
    return {isInDarkMode};


  let sessionData = JSON.parse(savedSessionData)

  // Check if the saved session is still valid based on the expiry date
  const currentTime = new Date().getTime();
  const sessionExpiryTime = new Date(sessionData.sessionExpiryDate).getTime();
  const isValidSession = currentTime < sessionExpiryTime;

  if (!isValidSession)
    return {isInDarkMode};

  const userData = JSON.parse(localStorage.getItem(mappings.userData))

  return { sessionData, userData, isInDarkMode };
  };