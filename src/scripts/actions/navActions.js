import { SET_ACTIVE_NAV_LINK, ACTIVATE_SIDEBAR, LOADING_DATA, DATA_LOADED } from "./types"

export function setActiveNavLink(selectedItemName) {
	return function(dispatch) {
		dispatch({ type: SET_ACTIVE_NAV_LINK, payload: selectedItemName })
	}
}

export function activateSidebar() {
	return function(dispatch) {
		dispatch({ type: ACTIVATE_SIDEBAR, payload: true })
	}
}

export function hideSidebar() {
	return function(dispatch) {
		dispatch({ type: ACTIVATE_SIDEBAR, payload: false })
	}
}

