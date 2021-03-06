import { Domain } from '../util/constant';
import BaseServices from './BaseServices';

class ProjectServices extends BaseServices {
    getAllProject = () => {
        return this.get(`${Domain}/Project/getAllProject`);
    }

    getProjectCategory = () => {
        return this.get(`${Domain}/ProjectCategory`);
    }

    createProject = (model) => {
        return this.post(`${Domain}/Project/createProjectAuthorize`, model);
    }

    deleteProject = (projectId) => {
        return this.delete(`${Domain}/Project/deleteProject?projectId=${projectId}`);
    }

    assignUserToProject = (model) => {
        return this.post(`${Domain}/Project/assignUserProject`, model);
    }

    updateProject = (model) => {
        return this.put(`${Domain}/Project/updateProject?projectId=${model.id}`, model)
    }

    getProjectDetail = (projectId) => {
        return this.get(`${Domain}/Project/getProjectDetail?id=${projectId}`);
    }

    getUserByProjectId = (projectId) => {
        return this.get(`${Domain}/Users/getUserByProjectId?idProject=${projectId}`)
    }

    getStatus = () => {
        return this.getWithoutHeader(`${Domain}/Status/getAll`);
    }

    getType = () => {
        return this.getWithoutHeader(`${Domain}/TaskType/getAll`);
    }

    getPrority = () => {
        return this.getWithoutHeader(`${Domain}/Priority/getAll?id=0`);
    }

    createTask = (modelTask) => {
        return this.post(`${Domain}/Project/createTask`, modelTask);
    }

    getTaskDetail = (taskId) => {
        return this.get(`${Domain}/Project/getTaskDetail?taskId=${taskId}`);
    }

    getComment = (taskId) => {
        return this.getWithoutHeader(`${Domain}/Comment/getAll?taskId=${taskId}`);
    }

    updateTask = (modelTask) => {
        return this.post(`${Domain}/Project/updateTask`, modelTask);
    }

    updateTaskStatus = (model) => {
        return this.put(`${Domain}/Project/updateStatus`, model);
    }

    deleteTask = (taskId) => {
        return this.delete(`${Domain}/Project/removeTask?taskId=${taskId}`);
    }

    insertComment = (modalComment) => {
        return this.post(`${Domain}/Comment/insertComment`, modalComment);
    }
}

export const projectServices = new ProjectServices();