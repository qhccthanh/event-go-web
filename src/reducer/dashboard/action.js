/**
 * Created by thanhqhc on 3/31/17.
 */
import {store} from '../../storeConfigure';

export const SET_SHOW_MENU = 'SET_SHOW_MENU';
export const SET_SHOW_SNACK_BAR = "SET_SHOW_SNACK_BAR";

export function setShowMenu() {
    const show = !store.getState().dashboard.isShowMenu;
    return {
        type: SET_SHOW_MENU,
        show
    }
}

export function setSnackBarMessage(message, autoHideDuration) {
    if (autoHideDuration !== undefined) {
        setTimeout(() => {
            store.dispatch({
                type: SET_SHOW_SNACK_BAR,
                snackBar: null
            });
        }, autoHideDuration);
    }

    return {
        type: SET_SHOW_SNACK_BAR,
        snackBar: {
            message,
            autoHideDuration
        }
    }
}
