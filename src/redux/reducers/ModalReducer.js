import { DISPLAY_MODAL, HIDE_MODAL } from "../types/ModalType";

const stateDefault = {
    modalTask: {
        visible: false,
        taskId: "",
        projectId: "",
    }
}

const ModalReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DISPLAY_MODAL: {
            return {...state, modalTask: {...action.payload}};
        }

        case HIDE_MODAL: {
            return {...state, modalTask: {...state.modalTask, visible: false}};
        }
            
        default:
            return state;
    }
}

export default ModalReducer;