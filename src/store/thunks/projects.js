
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProjects, getProjectsIssueTypes } from "../../services";

export const getProjectsThunk = createAsyncThunk(
  "projects/getprojects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProjects();  
      return Promise.resolve(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProjectsIssueTypesThunk = createAsyncThunk(
  "projects/getprojectIssuesTypes",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getProjectsIssueTypes(data);  
      return Promise.resolve(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);