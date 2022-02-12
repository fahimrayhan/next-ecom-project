const valid = (name,email,password, cf_password) => {
    if (!name || !email || !password) {
        return "Please add all the fields"
    }
    if (!validateEmail(email)) {
        return "Invalid email"
    }
    if (password.length < 6) {
        return "Password must be at least 6 characters"
    }
    if (password!==cf_password) {
        return "Confirm Password did not match"
    }
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default valid;