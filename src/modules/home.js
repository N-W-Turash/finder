import axios from 'axios';
import { getBaseUrl } from '../helpers';
const baseUrl = getBaseUrl();

export const FORM_FIELD_CHANGE = "auth/FORM_FIELD_CHANGE";

export const REMOVE_SUCCESS_MESSAGE = "auth/REMOVE_SUCCESS_MESSAGE";
export const CLEAR_FORM_DATA = "auth/CLEAR_FORM_DATA";

export const SUBMIT_LOGIN_FORM = "auth/SUBMIT_LOGIN_FORM";
export const SUBMIT_LOGIN_FORM_SUCCESS = "auth/SUBMIT_LOGIN_FORM_SUCCESS";
export const SUBMIT_LOGIN_FORM_FAILURE = "auth/SUBMIT_LOGIN_FORM_FAILURE";

export const SIGN_OUT_USER = "auth/SIGN_OUT_USER";

export const CLEAR_ERRORS = "auth/CLEAR_ERRORS";

export const OPEN_PASSWORD_RESET_MODAL = "users/OPEN_PASSWORD_RESET_MODAL";
export const CLOSE_PASSWORD_RESET_MODAL = "users/CLOSE_PASSWORD_RESET_MODAL";

export const SUBMIT_FORGOT_PASSWORD_FORM = "auth/SUBMIT_FORGOT_PASSWORD_FORM";
export const SUBMIT_FORGOT_PASSWORD_FORM_SUCCESS = "auth/SUBMIT_FORGOT_PASSWORD_FORM_SUCCESS";
export const SUBMIT_FORGOT_PASSWORD_FORM_FAILURE = "auth/SUBMIT_FORGOT_PASSWORD_FORM_FAILURE";

export const SUBMIT_RESET_PASSWORD_FORM = "auth/SUBMIT_RESET_PASSWORD_FORM";
export const SUBMIT_RESET_PASSWORD_FORM_SUCCESS = "auth/SUBMIT_RESET_PASSWORD_FORM_SUCCESS";
export const SUBMIT_RESET_PASSWORD_FORM_FAILURE = "auth/SUBMIT_RESET_PASSWORD_FORM_FAILURE";

const initialState = {
    user: null,
    registerUserObj:{},
    loginUserObj:{},
    errors: null,
    isLoading: false,
    isAuthenticated: false,
    isRegistered: false,
    successMessage: '',
    authError: {},
    showPasswordResetModal: false,
    forgetPasswordObj: {},
    isForgetPasswordFormSubmitting: false,
    forgetPasswordMessages: {
        success: '',
        error: '',
        validationError: ''
    },
    password_reset_token: '',
    resetPasswordObject: {},
    isResetPasswordFormSubmitting: false,
    resetPasswordMessages: {
        success: '',
        error: '',
        validationErrors: ''
    }
};

export default (state = initialState, action) => {

    switch (action.type) {

        case FORM_FIELD_CHANGE:

            let newObj ={ ...state[action.payload.obj] };
            newObj[action.payload.field] = action.payload.value;

            return {
                ...state,
                [action.payload.obj]: newObj
            };

        case SUBMIT_LOGIN_FORM:
            return{
                ...state,
                isLoading: true,
            };

        case SUBMIT_LOGIN_FORM_SUCCESS:
            localStorage.setItem("gtr_token", action.payload.response.token);
            localStorage.setItem('gtr_user', JSON.stringify(action.payload.response.user));

            return {
                ...state,
                isLoading: false,
                errors: {},
                isAuthenticated: true,
                user: action.payload.response.user
            };

        case SUBMIT_LOGIN_FORM_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload.response.errors,
                authError: action.payload.response.error
            };

        case SIGN_OUT_USER:
            localStorage.removeItem('gtr_token');
            localStorage.removeItem('gtr_user');
            return {
                ...state,
                user: null,
                isAuthenticated: false
            };

        case REMOVE_SUCCESS_MESSAGE:
            return{
                ...state,
                successMessage: ''
            };

        case CLEAR_FORM_DATA:
            return{
                ...state,
                [action.payload.dataObj]: {}
            };

        case CLEAR_ERRORS:
            return{
                ...state,
                errors: {}
            };

        case OPEN_PASSWORD_RESET_MODAL:
            return {
                ...state,
                showPasswordResetModal: true
            };

        case CLOSE_PASSWORD_RESET_MODAL:
            return {
                ...state,
                showPasswordResetModal: false,
                forgetPasswordMessages: {
                    success: '',
                    error: '',
                    validationError: ''
                },
                forgetPasswordObj: {}
            };

        case SUBMIT_FORGOT_PASSWORD_FORM:
            return {
                ...state,
                isForgetPasswordFormSubmitting: true,
            };

        case SUBMIT_FORGOT_PASSWORD_FORM_SUCCESS:

            return {
                ...state,
                isForgetPasswordFormSubmitting: false,
                forgetPasswordMessages: {
                    success: action.payload.response.message,
                    error: '',
                    validationError: ''
                }
            };

        case SUBMIT_FORGOT_PASSWORD_FORM_FAILURE:
            let { errorMessage, errors } = action.payload.response;
            let msg;
            if(errors) {
                msg = errors.email.msg;
            }
            return {
                ...state,
                isForgetPasswordFormSubmitting: false,
                forgetPasswordMessages: {
                    success: '',
                    error: errorMessage,
                    validationError: msg
                }
            };

        case SUBMIT_RESET_PASSWORD_FORM:
            return {
                ...state,
                isResetPasswordFormSubmitting: true,
            };

        case SUBMIT_RESET_PASSWORD_FORM_SUCCESS:

            return {
                ...state,
                isResetPasswordFormSubmitting: false,
                resetPasswordMessages: {
                    success: action.payload.response.message,
                    error: '',
                    validationError: ''
                }
            };

        case SUBMIT_RESET_PASSWORD_FORM_FAILURE:
            let errorMsg = action.payload.response.errorMessage;
            let errorsObj = action.payload.response.errors;

            return {
                ...state,
                isResetPasswordFormSubmitting: false,
                resetPasswordMessages: {
                    success: '',
                    error: errorMsg,
                    validationErrors: errorsObj
                }
            };

        default:
            return state
    }
}

export const formFieldChange = (obj, field, value) => {
    return {
        type: FORM_FIELD_CHANGE,
        payload: {obj, field, value}
    }
};

export const submitLoginFormSuccess = (response) => {
    return {
        type: SUBMIT_LOGIN_FORM_SUCCESS,
        payload : {
            response
        }
    }
};

export const submitLoginFormFailure = (response) => {
    return {
        type: SUBMIT_LOGIN_FORM_FAILURE,
        payload : {
            response
        }
    }
};

export const submitLoginForm = (userData) => {

    return dispatch => {
        return axios.post(`${baseUrl}/api/auth/login`, userData)
            .then(response => {
                dispatch(submitLoginFormSuccess(response.data));
            })
            .catch((error) => {

                if(error.response){
                    let errors = error.response.data;
                    dispatch(submitLoginFormFailure(errors));
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log('Error', error.message);
                }
            });
    }
};

export const clearFormData = (dataObj) => {
    return {
        type: CLEAR_FORM_DATA,
        payload: { dataObj }
    }
};

export const signOutUser = () => {
    return {
        type: SIGN_OUT_USER,
        payload: { }
    }
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
        payload: { }
    }
};

export function passwordResetModalOpen() {
    return {
        type: OPEN_PASSWORD_RESET_MODAL
    }
}

export function passwordResetModalClose() {
    return {
        type: CLOSE_PASSWORD_RESET_MODAL
    }
}

export const submitForgotPasswordFormSuccess = (response) => {
    return {
        type: SUBMIT_FORGOT_PASSWORD_FORM_SUCCESS,
        payload : {
            response
        }
    }
};

export const submitForgotPasswordFormFailure = (response) => {
    return {
        type: SUBMIT_FORGOT_PASSWORD_FORM_FAILURE,
        payload : {
            response
        }
    }
};

export const submitForgotPasswordForm = (data) => {

    return dispatch => {
        return axios.post(`${baseUrl}/api/password/forgot`, data)
            .then(response => {
                dispatch(submitForgotPasswordFormSuccess(response.data));
            })
            .catch((error) => {

                if(error.response){
                    let errors = error.response.data;
                    dispatch(submitForgotPasswordFormFailure(errors));
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log('Error', error.message);
                }
            });
    }
};

export const submitResetPasswordFormSuccess = (response) => {
    return {
        type: SUBMIT_RESET_PASSWORD_FORM_SUCCESS,
        payload : {
            response
        }
    }
};

export const submitResetPasswordFormFailure = (response) => {
    return {
        type: SUBMIT_RESET_PASSWORD_FORM_FAILURE,
        payload : {
            response
        }
    }
};

export const submitResetPasswordForm = (data, password_reset_token) => {

    let dataObject = {
        ...data,
        password_reset_token
    };

    return dispatch => {
        return axios.put(`${baseUrl}/api/password/reset`, dataObject)
            .then(response => {
                dispatch(submitResetPasswordFormSuccess(response.data));
            })
            .catch((error) => {

                if(error.response){
                    let errors = error.response.data;
                    dispatch(submitResetPasswordFormFailure(errors));
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log('Error', error.message);
                }
            });
    }
};

