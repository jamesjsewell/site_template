import {
	fetchUser,
	errorHandler,
	postData,
	getData,
	putData,
	deleteData
} from "./index.js"
import {
	FETCH_USER,
	UPDATE_USER_PROFILE,
	UPLOAD_FILE
} from "./types.js"

export function updatePersonalInfo(userId, updatedInfo) {
	return function(dispatch) {

		dispatch({
			type: UPDATE_USER_PROFILE,
			payload: {
				updating: true,
				success: undefined,
				error: undefined
			}
		})

		putData(
			UPDATE_USER_PROFILE,
			{success: false},
			true,
			`/user/${userId}`,
			dispatch,
			updatedInfo,
			{updating: false, success: true, error: undefined}
		)

		
	}
}

export function resetStatusOfUpdate(){
	return function(dispatch){
		dispatch({
			type: UPDATE_USER_PROFILE,
			payload:{
				success: undefined
			}
		})
	}
}

export function uploadFile(){
	return function(dispatch){
		
		postData(UPLOAD_FILE, '', true, `/auth/upload-file`, dispatch, '')
	}
}
