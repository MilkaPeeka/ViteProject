const mappings = {

    /// GENERAL RELATED ////
    INVALID_FIELDS: "שדה אחד או יותר אינו תקין",

    //// AUTH RELATED ////
    UNAUTHENTICATED: "משתמש לא מאומת",
    NOTMANAGER: "משתמש לא מנהל, אין הרשאות מתאימות",

    //// USER RELATED ////
    INVALID_CREDENTIALS: "משתמש הכניס פרטים מזהים לא נכונים",
    SERVER_ERROR: (errMsg) => `תקלה בשרת: ${errMsg}`,
    SUCCESSFULL_SIGN_IN: "התחבר בהצלחה",
    LOGOUT_ERROR: (errMsg) => `תקלה בהתנתקות: ${errMsg}`,
    SUCCESSFULL_LOG_OUT: "התנתק בהצלחה",

};

module.exports = mappings;