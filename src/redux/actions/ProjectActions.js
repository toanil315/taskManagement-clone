import { projectServices } from "../../services/ProjectServices";
import { HIDE_DRAWER } from "../types/DrawerType";
import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingType";
import { SET_LIST_PROJECT, SET_PROJECT_CATEGORY, SET_PROJECT_DETAIL } from "../types/ProjectType";
import { SHOW_TOAST } from "../types/ToastType";

export const getAllProjectAction = () => {
    return async (dispatch) => {
        try {
            dispatch({type: DISPLAY_LOADING});
            const {data, status} = await projectServices.getAllProject();
            if(status === 200) {
                dispatch({
                    type: SET_LIST_PROJECT,
                    projects: data.content
                });
                setTimeout(() => {
                    dispatch({type: HIDE_LOADING});
                }, 500);
                return true;
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
                dispatch({
                    type: SHOW_TOAST,
                    toast: {
                        id: Date.now(),
                        type: "success",
                        title: "Yay! Everything worked.",
                        description: "Create project successfull!"
                    }
                })
                return true;
            }
        }
        catch(error) {
            console.log("error: ", {...error});
            dispatch({
                type: SHOW_TOAST,
                toast: {
                    id: Date.now(),
                    type: "error",
                    title: "Opps! Something went wrong.",
                    description: "Sorry! There were a problem with your request."
                }
            })
            return false;
        }
    }
}

export const deleteProjectAction = (projectId) => {
    return async (dispatch) => {
        try {
            const {data, status} = await projectServices.deleteProject(projectId);
            if(status === 200) {
                dispatch({
                    type: SHOW_TOAST,
                    toast: {
                        id: Date.now(),
                        type: "success",
                        title: "Yay! Everything worked.",
                        description: "Delete project successfull!"
                    }
                })
                return true;
            }
        }
        catch(error){
            console.log("error: ", {...error});
            dispatch({
                type: SHOW_TOAST,
                toast: {
                    id: Date.now(),
                    type: "error",
                    title: "Opps! Something went wrong.",
                    description: "Sorry! There were a problem with your request."
                }
            })
            return false;
        }
    }
}

export const assignUserToProjectAction = (model) => {
    return async (dispatch) => {
        try {
            const {data, status} = await projectServices.assignUserToProject(model);
            if(status === 200) {
                dispatch({
                    type: SHOW_TOAST,
                    toast: {
                        id: Date.now(),
                        type: "success",
                        title: "Yay! Everything worked.",
                        description: "Assign member to project successfull!"
                    }
                })
                return true;
            }
        }
        catch(error) {
            console.log("error: ", {...error});
            dispatch({
                type: SHOW_TOAST,
                toast: {
                    id: Date.now(),
                    type: "error",
                    title: "Opps! Something went wrong.",
                    description: "Sorry! There were a problem with your request."
                }
            })
            return false;
        }
    }
}

export const updateProjectAction = (model) => {
    return async (dispatch) => {
        try {
            const {data, status} = await projectServices.updateProject(model);
            if(status === 200) {
                dispatch(getAllProjectAction());
                return true;
            }
        }
        catch(error) {
            console.log("error: ", {...error});
            return false;
        }
    }
}

export const getProjectDetailAction = (projectId) => {
    return async (dispatch) => {
        try {
            const {data, status} = await projectServices.getProjectDetail(projectId);
            if(status === 200) {
                dispatch({
                    type: SET_PROJECT_DETAIL,
                    projectDetail: data.content,
                })
                setTimeout(() => {
                    dispatch({type: HIDE_LOADING});
                }, 500);
            }
        }
        catch(error) {
            console.log("error: ", {...error});
        }
    }
}

export const createTaskAction = (modelTask, projectId) => {
    return async (dispatch) => {
        try {
            dispatch({type: DISPLAY_LOADING});
            const {data, status} = await projectServices.createTask(modelTask);
            if(status === 200) {
                dispatch(getProjectDetailAction(projectId));
                dispatch({
                    type: HIDE_DRAWER
                })
                dispatch({
                    type: SHOW_TOAST,
                    toast: {
                        id: Date.now(),
                        type: "success",
                        title: "Yay! Everything worked.",
                        description: "Create task successfull!"
                    }
                })
            }
        }
        catch(error) {
            console.log("error: ", {...error});
            dispatch({
                type: SHOW_TOAST,
                toast: {
                    id: Date.now(),
                    type: "error",
                    title: "Opps! Something went wrong.",
                    description: "Sorry! There were a problem with your request."
                }
            })
            return false;
        }
    }
}

export const updateTaskAction = (modelTask) => {
    return async (dispatch) => {
        try {
            const {data, status} = await projectServices.updateTask(modelTask);
            if(status === 200) {
                dispatch(getProjectDetailAction(modelTask.projectId));
            }
        }
        catch(error) {
            console.log("error: ", {...error});
        }
    }
}

export const updateTaskStatusAction = (model, projectId) => {
    return async (dispatch) => {
        try {
            const {data, status} = await projectServices.updateTaskStatus(model);
            if(status === 200) {
                // dispatch(getProjectDetailAction(projectId));
            }
        }
        catch(error) {
            console.log("error: ", {...error});
        }
    }
}