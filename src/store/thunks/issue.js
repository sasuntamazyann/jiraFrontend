
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createIssue, deleteIssue, getProjectsIssue, updateIssue } from "../../services";

export const getIssuesThunk = createAsyncThunk(
  "issue/getissues",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProjectsIssue(id);
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createIssueThunk = createAsyncThunk(
  "issue/createIssue",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createIssue(data);
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateIssueThunk = createAsyncThunk(
  "issue/updateIssueById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateIssue(data);
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteIssueThunk = createAsyncThunk(
  "delete/deleteissue",
  async (data, { rejectWithValue }) => {
    try {
      const response = await deleteIssue(data);
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

