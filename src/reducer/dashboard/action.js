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

export function setSnackBar(snackBar, timout) {
    if (timout != null) {
        setTimeout(function() {
            store.dispatch(setSnackBar(null));
        }, timout);
    }
    
    return {
        type: SET_SHOW_SNACK_BAR,
        snackBar
    }
}
