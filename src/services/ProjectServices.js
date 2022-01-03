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
}

export const projectServices = new ProjectServices();