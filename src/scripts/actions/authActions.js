import axios from "axios"
import { browserHistory } from "react-router"
import Cookies from "universal-cookie"
import {
    API_URL,
    CLIENT_ROOT_URL,
    LOADING_DATA,
    DATA_LOADED,
    errorHandler
} from "./index"
import {
    AUTH_USER,
    AUTH_ERROR,
    LOGIN_ERROR,
    REGISTER_ERROR,
    UNAUTH_USER,
    FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST,
    PROTECTED_TEST
} from "./types"

//= ===============================
// Authentication actions
//= ===============================

const cookies = new Cookies()

// TO-DO: Add expiration to cookie
export function loginUser({ email, password }) {
    return function(dispatch) {
        axios
            .post(`${API_URL}/auth/login`, { email, password })
            .then(response => {
                console.log(response)
                cookies.set("token", response.data.token, { path: "/" })
                cookies.set("user", response.data.user, { path: "/" })
                dispatch({ type: AUTH_USER, payload: response.data.user })

                //window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
            })
            .catch(error => {
                console.log(error)
                errorHandler(dispatch, error.response, LOGIN_ERROR)
            })
    }
}
//

//
export function registerUser({ email, firstName, lastName, password }) {
    return function(dispatch) {
        axios
            .post('https://template-website.herokuapp.com/api/auth/register', {
                email,
                firstName,
                lastName,
                password
            })
            .then(response => {
                console.log(response)
                console.log(response.data)
                cookies.set("token", response.data.token, { path: "/" })
                cookies.set("user", response.data.user, { path: "/" })
                dispatch({ type: AUTH_USER })
                //window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
            })
            .catch(error => {
                errorHandler(dispatch, error.response, REGISTER_ERROR)
            })
    }
}

export function logoutUser(error) {
    return function(dispatch) {
        dispatch({ type: UNAUTH_USER, payload: error || "" })
        cookies.remove("token", { path: "/" })
        cookies.remove("user", { path: "/" })

        //window.location.href = `${CLIENT_ROOT_URL}/login`;
    }
}

export function getForgotPasswordToken({ email }) {
    return function(dispatch) {
        axios
            .post(`${API_URL}/auth/forgot-password`, { email })
            .then(response => {
                dispatch({
                    type: FORGOT_PASSWORD_REQUEST,
                    payload: response.data.message
                })
            })
            .catch(error => {
                errorHandler(dispatch, error.response, AUTH_ERROR)
            })
    }
}

export function resetPassword(token, { password }) {
    return function(dispatch) {
        axios
            .post(`${API_URL}/auth/reset-password/${token}`, { password })
            .then(response => {
                dispatch({
                    type: RESET_PASSWORD_REQUEST,
                    payload: response.data.message
                })
                // Redirect to login page on successful password reset
                //browserHistory.push('/login');
            })
            .catch(error => {
                errorHandler(dispatch, error.response, AUTH_ERROR)
            })
    }
}

export function protectedTest(user) {
    return function(dispatch) {
        axios
            .get(`${API_URL}/protected`, {
                headers: { Authorization: cookies.get("token") }
            })
            .then(response => {
                if (response.data) {
                    if (response.data.authenticated) {
                        dispatch({
                            type: AUTH_USER,
                            payload: user
                        })
                    }
                }
            })
            .catch(error => {
                errorHandler(dispatch, error.response, AUTH_ERROR)
            })
    }
}
