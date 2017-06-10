import { SET_ACTIVE_NAV_LINK, ACTIVATE_SIDEBAR } from "../actions/types.js"
import _ from "underscore"
import { ROUTES } from "../routes.js"
console.log(ROUTES)
const INITIAL_STATE = { routes: ROUTES, activeItem: "", sideBarVisible: false }

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_ACTIVE_NAV_LINK: {
			return _.extend({}, state, { activeItem: action.payload })
		}

		case ACTIVATE_SIDEBAR: {
			return _.extend({}, state, { sidebarVisible: action.payload })
		}
	}

	return state
}
