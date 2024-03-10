
import { createSlice } from "@reduxjs/toolkit";
import { getProjectsIssueTypesThunk, getProjectsThunk } from "../thunks/projects";
import { getProjectsIssueTypes } from "../../services";
const initialState = {
    success: false,
    message: "",
    errors: [],
    statusCode: 0,
    statusName: "",
    loading: false,
    projects: [],
    types: []
    
  };

export const ProjectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getProjectsThunk.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(
        getProjectsThunk.fulfilled,
        (state, { payload }) => {        
          state.success = true;
          state.loading = false;
          state.projects = payload.data;        
          state.isCreated = false;
          state.isDeleted = false;
          state.isUpdated = false;
        }
      );
      builder.addCase(getProjectsThunk.rejected, (state, { payload }) => {
        state.error = payload?.error || "";
        state.success = false;
        state.loading = false;
      }); 
      
      
      builder.addCase(getProjectsIssueTypesThunk.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(
        getProjectsIssueTypesThunk.fulfilled,
        (state, { payload }) => {        
          state.success = true;
          state.loading = false;
          state.types = payload.data;     
          
        }
      );
      builder.addCase(getProjectsIssueTypesThunk.rejected, (state, { payload }) => {
        state.error = payload?.error || "";
        state.success = false;
        state.loading = false;
      });
    },
  });
  