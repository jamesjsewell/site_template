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
	UPLOAD_PROFILE_IMAGE
} from "./types.js"

import filestack from "filestack-js"

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
			{ success: false },
			true,
			`/user/${userId}`,
			dispatch,
			updatedInfo,
			{ updating: false, success: true, error: undefined }
		)

		dispatch({
			type: UPLOAD_PROFILE_IMAGE,
			payload: {
				status: "in action",
				success: undefined,
				failure: undefined,
				url: undefined
			}
		})
	}
}

export function resetStatusOfUpdate() {
	return function(dispatch) {
		dispatch({
			type: UPDATE_USER_PROFILE,
			payload: {
				success: undefined
			}
		})
	}
}

export function uploadProfileImage(apiKey) {
	return function(dispatch) {
		dispatch({
			type: UPLOAD_PROFILE_IMAGE,
			payload: {
				status: "in action",
				success: undefined,
				failure: undefined,
				url: undefined
			}
		})

		const client = filestack.init(apiKey)

		client
			.pick({
				accept: ["image/*"],
				maxSize: 2 * 1024 * 1024,
				transformations: {
					crop: { aspectRatio: 1 / 1, circle: true },
					minDimensions: [200, 200]
				}
			})
			.then(function(result) {
				var theJson = JSON.parse(JSON.stringify(result.filesUploaded))
				var theUrl = theJson[0].url
				if (theUrl) {
					dispatch({
						type: UPLOAD_PROFILE_IMAGE,
						payload: {
							status: "complete",
							success: true,
							failure: false,
							url: theUrl
						}
					})
				} else {
					dispatch({
						type: UPLOAD_PROFILE_IMAGE,
						payload: {
							status: "failure",
							success: false,
							failure: true,
							url: undefined
						}
					})
				}
			})
	}
}


