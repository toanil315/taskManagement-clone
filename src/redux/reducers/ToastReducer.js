import { DELETE_TOAST, SHOW_TOAST } from "../types/ToastType";

const stateDefault = {
    toastList: []
}

const ToastReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SHOW_TOAST: {
            return {...state, toastList: [...state.toastList, action.toast]};
        }

        case DELETE_TOAST: {
            const toastListClone = [...state.toastList];
            let index = toastListClone.findIndex((toast) => (toast.id === action.toastId));
            if(index === toastListClone.length - 1) {
                return {...state, toastList: []};
            }
            return state;
        }
    
        default: {
            return state;
        }
    }
}

export default ToastReducer;