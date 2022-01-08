import {SET_LIST_PROJECT, SET_PROJECT_CATEGORY, SET_PROJECT_DETAIL, SET_PROJECT_UPDATE} from '../types/ProjectType';

const stateDefault = {
    projects: [],
    categories: [],
    projectUpdate: {},
    projectDetail: {},
}

const ProjectReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_LIST_PROJECT: {
            return {...state, projects: [...action.projects]};
        }

        case SET_PROJECT_CATEGORY:{
            return {...state, categories: [...action.categories]};
        }

        case SET_PROJECT_UPDATE: {
            return {...state, projectUpdate: {...action.projectUpdate}};
        }

        case SET_PROJECT_DETAIL: {
            return {...state, projectDetail: {...action.projectDetail}};
        }

        default: {
            return state;
        }
    }
}

export default ProjectReducer;