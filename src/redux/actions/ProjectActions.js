import { projectServices } from "../../services/ProjectServices";
import { SET_PROJECT_CATEGORY } from "../types/ProjectType";

export const getAllProjectAction = () => {
    return async (dispatch) => {
        try {
            const {data, status} = await projectServices.getAllProject();
            if(status === 200) {
                return data.content;
            }
        }
        catch(error) {
            console.log("error: ", {...error});
        }
    }
}

export const getProjectCategoryAction = () => {
    return async (dispatch) => {
        try {
            const {data, status} = await projectServices.getProjectCategory();
            if(status === 200) {
                dispatch({
                    type: SET_PROJECT_CATEGORY,
                    categories: data.content
                })
            }
        }
        catch(error) {
            console.log("error: ", {...error});
        }
    }
}

export const createProjectAction = (model) => {
    return async (dispatch) => {
        try {
            const {data, status} = await projectServices.createProject(model);
            if(status === 200) {
                return true;
            }
        }
        catch(error) {
            console.log("error: ", {...error});
            return false;
        }
    }
}

export const deleteProjectAction = (projectId) => {
    return async (dispatch) => {
        try {
            const {data, status} = await projectServices.deleteProject(projectId);
            if(status === 200) {
                return true;
            }
        }
        catch(error){
            console.log("error: ", {...error});
            return false;
        }
    }
}

export const assignUserToProjectAction = (model) => {
    return async (dispatch) => {
        try {
            console.log(model);
            const {data, status} = await projectServices.assignUserToProject(model);
            if(status === 200) {
                return true;
            }
        }
        catch(error) {
            console.log("error: ", {...error});
            return false;
        }
    }
}