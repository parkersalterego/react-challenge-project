import { SET_EDIT_ORDER, CLEAR_EDIT_ORDER } from '../actions/types'

const INITIAL_STATE = { email: null, token: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_EDIT_ORDER:
            return action.payload
        case CLEAR_EDIT_ORDER:
        return null
        default:
            return state;
    }
}