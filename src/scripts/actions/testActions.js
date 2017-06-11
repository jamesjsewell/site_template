import { LOADING_DATA } from "./types"

export function dataIsLoading(trueOrFalse) {
	return function(dispatch) {
		dispatch({ type:LOADING_DATA, payload: trueOrFalse })
	}
}

