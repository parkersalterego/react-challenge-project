import { SET_EDIT_ORDER, CLEAR_EDIT_ORDER } from './types';
import { SERVER_IP } from '../../private'

export const setEditOrder = order => ({ type: SET_EDIT_ORDER,payload: order });
export const clearEditOrder = () => ({ type: CLEAR_EDIT_ORDER, payload: null });
export const editOrder = order => {
    return () => {
        return fetch(`${SERVER_IP}/api/edit-order`, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
        .then(response => ({ success: response.success }))
    };
}
export const deleteOrder = id => {
    return () => {
        return fetch(`${SERVER_IP}/api/delete-order`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
        .then(response => ({ success: response.success }))
    }
}