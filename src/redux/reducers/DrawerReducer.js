import { DISPLAY_DRAWER, HIDE_DRAWER, SET_COMPONENT } from "../types/DrawerType";

const stateDefault = {
    component: <p>Hello</p>,
    title: 'Update Project',
    visible: false,
}

const DrawerReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_COMPONENT: {
            return {...state, component: action.payload.component, title: action.payload.title};
        }

        case DISPLAY_DRAWER: {
            return {...state, visible: true};
        }

        case HIDE_DRAWER: {
            return {...state, visible: false};
        }
            
        default: 
            return state;
    }
}

export default DrawerReducer;