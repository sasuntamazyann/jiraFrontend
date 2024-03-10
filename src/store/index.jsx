// store.js
import { configureStore } from '@reduxjs/toolkit';
import { ProjectsSlice } from './slices/projects';
import { IssuesSlice } from './slices/issue';

const store = configureStore({
    reducer:{
        projects: ProjectsSlice.reducer,
        issues: IssuesSlice.reducer
    }
}
);

export default store;