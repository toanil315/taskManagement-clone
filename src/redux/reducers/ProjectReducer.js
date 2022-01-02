import {SET_PROJECT_CATEGORY} from '../types/ProjectType';

const stateDefault = {
    categories: []
}

const ProjectReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_PROJECT_CATEGORY:{
            return {...state, categories: [...action.categories]};
        }
        default: {
            return state;
        }
    }
}

export default ProjectReducer;