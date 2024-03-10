
import { createSlice } from "@reduxjs/toolkit";
import { createIssueThunk, deleteIssueThunk, getIssuesThunk, updateIssueThunk } from "../thunks/issue";
import { getProjectsIssue } from "../../services";

const initialState = {   
    message: "",
    errors: [],
    statusCode: 0,
    statusName: "",
    loading: false,
    issues: [],
    isCreated: false,
    isDeleted: false,
    isUpdated: false,
    issueByID: {},
};

export const IssuesSlice = createSlice({
    name: "issues",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getIssuesThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            getIssuesThunk.fulfilled,
            (state, { payload }) => {
                state.success = true;
                state.loading = false;
                state.issues = payload.data;
                state.isCreated = false;
                state.isDeleted = false;
                state.isUpdated = false;
            }
        );
        builder.addCase(getIssuesThunk.rejected, (state, { payload }) => {
            state.error = payload?.error || "";
            state.success = false;
            state.loading = false;
        });

        builder.addCase(createIssueThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            createIssueThunk.fulfilled,
            (state, { payload }) => {
                state.success = true;
                state.loading = false;               
                state.isCreated = true;
                state.isDeleted = false;
                state.isUpdated = false;
            }
        );
        builder.addCase(createIssueThunk.rejected, (state, { payload }) => {
            state.error = payload?.error || "";
            state.success = false;
            state.loading = false;
        });


        builder.addCase(updateIssueThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            updateIssueThunk.fulfilled,
            (state, { payload }) => {
                state.success = true;
                state.loading = false;
                state.issues = payload.data;
                state.isCreated = false;
                state.isDeleted = false;
                state.isUpdated = true;
            }
        );
        builder.addCase(updateIssueThunk.rejected, (state, { payload }) => {
            state.error = payload?.error || "";
            state.success = false;
            state.loading = false;
        });



        builder.addCase(deleteIssueThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            deleteIssueThunk.fulfilled,
            (state, { payload }) => {
                state.success = true;
                state.loading = false;
                state.issues = payload.data;
                state.isCreated = false;
                state.isDeleted = true;
                state.isUpdated = false;
            }
        );
        builder.addCase(deleteIssueThunk.rejected, (state, { payload }) => {
            state.error = payload?.error || "";
            state.success = false;
            state.loading = false;
        });

    },
});
