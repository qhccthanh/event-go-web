/**
 * Created by thanhqhc on 3/31/17.
 */
import {store} from '../../storeConfigure';

export const SET_SHOW_MENU = 'SET_SHOW_MENU';

export function setShowMenu() {
    const show = !store.getState().dashboard.isShowMenu;
    return {
        type: SET_SHOW_MENU,
        show
    }
}