import {fetchUser, errorHandler, postData, getData, putData, deleteData} from './index.js'
import {FETCH_USER, UPDATE_USER_ERROR, UPDATED_USER}

export function updatePersonalInfo(userId, updatedInfo) {

	return function(dispatch) {

		putData(UPDATED_USER, UPDATE_USER_ERROR, true, `/user/${userId}`, dispatch, updatedInfo)

	}

}
