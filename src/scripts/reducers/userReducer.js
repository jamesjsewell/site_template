import {
    FETCH_USER,
    UPDATE_USER_PROFILE,
    UNAUTH_USER,
    UPLOAD_PROFILE_IMAGE
} from "../actions/types.js"
import _ from "underscore"

const INITIAL_STATE = {
    username: undefined,
    profile: undefined,
    message: "",
    updatingProfile: undefined,
    updateProfileSuccess: undefined,
    updateProfileError: undefined,
    receivedUrl: undefined,
    statusOfUpload: undefined,
    uploadSuccess: undefined,
    uploadFailure: undefined

}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_USER:
            return _.extend({}, state, {
                username: action.payload.username,
                profile: action.payload.profile
            })
        case UPDATE_USER_PROFILE:
            console.log(action.payload)
            return _.extend({}, state, {
                username: action.payload.username,
                profile: action.payload.profile,
                updatingProfile: action.payload.updating,
                updateProfileSuccess: action.payload.success,
                updateProfileError: action.payload.error
            })
        case UNAUTH_USER:
            return _.extend({}, state, { profile: undefined })
        case UPLOAD_PROFILE_IMAGE:
            return _.extend({}, state, { statusOfUpload: action.payload.status, uploadSuccess: action.payload.success, uploadFailure: action.payload.failure, receivedUrl: action.payload.url})
    }

    return state
}
