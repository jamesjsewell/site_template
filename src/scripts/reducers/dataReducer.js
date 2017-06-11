import { LOADING_DATA } from "../actions/types.js"
import _ from "underscore"

const INITIAL_STATE = {loadingData: false}

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {

		case LOADING_DATA: {
			return _.extend({}, state, {loadingData: action.payload})
		}
	}

	return state
}
