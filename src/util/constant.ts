const Constant = {
    BASE_URL: process.env.REACT_APP_BASE_URL,
    CALENDLY_URL: 'https://calendly.com/developerdex123',
    REGEX: {
        EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        SPECIALCHARACTERS: /[!@#$%^&*)(+=._-]/g,
        NUMBER: /[0-9]/,
        NAME: /^[a-zA-Z.'\- ]+$/,
        ALPHABETCOMMA: /^[ a-zA-Z0-9.]+$/i,
        ADDRESS: /^[a-zA-Z0-9\s.,#-]+$/,
        ALPHANUMERIC: /^[a-zA-Z0-9\s\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+$/i,
        LOWERCASEUPPERCASE: /[a-z].*[A-Z]|[A-Z].*[a-z]/,
        NUMERIC: /^\d*\.?\d*$/,
        NUMONLY: /^\d*$/,
        QUANTITY: /^[0-9]{8}$/,
        PERCENTAGE: /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/,
        POSITIVENUMBERS: /^[1-9][0-9]*$/,
        URL: /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[A-Za-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
        LOWERCASE: /[a-z]/,
        UPPERCASE: /[A-Z]/,
        SPECIALCHARSREGEX: /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?\\/~`|-]+$/,
        PAYNUMBER: /^\d{5}$/
    },
    SESSIONSTORAGEKEYS: {
        REMEMBER_ME: 'scooply_rememberMe',
        SCOOPLY_REMEMBER_ME_EMAIL: 'scooply_rememberMe_email',
        SCOOPLY_REMEMBER_ME_PASSWORD: 'scooply_rememberMe_password',
        OTP: 'otp',
        RESENDOTP: 'resendOtp',
        RESET_TOKEN: 'resetToken',
        EXPIRE_TIME: 'expireTime',
        EMAIL:'email',
        FULLNAME:'fullName',
        ACCESSTOKEN: 'accessToken',
        REFRESHTOKEN: 'refreshToken',
    },
    LOCALSTORAGEKEYS: {
        ACCESSTOKEN: 'accessToken',
        RESET_PASS: 'resetPass',
        REFRESHTOKEN: 'refreshToken',
        TRIP_ID: 'TripId',
        CUSTOMERNAME: 'customerName',
        DRIVERNAME: 'driverName',
        CURRENTAB: 'currentTab',
        DRIVERSEARCHVALUE: 'driverSearchValue',
        SEARCHVALUE: 'searchValue',
        CUSTOMERSEARCHVALUE: 'customerSearchValue'
        // REFRESHTOKEN: 'refreshToken'
    },
};
export default Constant;
