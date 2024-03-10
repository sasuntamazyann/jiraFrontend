import axios from "axios";


export const api = axios.create({
    baseURL:  import.meta.env.VITE_BASE_URL,
    headers: {
            Accept: 'application/json',
          },
 
});

export const getProjects = () => {
    return api.get('projects');
}

export const createIssue = (data) => {

    return api.post(`projects/${data.pid}/issues`, {summary:data.summary,description:data.description,type:data.type,parent:data.parent}, {
        headers: {
            Accept: 'application/json',
          },
    });
}
export const getProjectsIssue = (id) => {
    return api.get(`projects/${id}/issues?perPage=150`);
}

export const getProjectsIssueTypes = (id) => {
    return api.get(`projects/${id}/issue-types`);
}

export const updateIssue = (data) => {  
    return api.patch(`projects/${data.pid}/issues/${data.id}`, {summary:data.summary,description:data.description});
}

export const deleteIssue = (data) => {
    return api.delete(`projects/${data.pid}/issues/${data.id}`);
}