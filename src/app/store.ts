import {
	Action,
	configureStore,
	ThunkAction,
} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import jobsReducer from '../features/jobs/jobsSlice'
import jobReducer from '../features/job/jobSlice'
import applicationReducer from '../features/application/applicationSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		job: jobReducer,
		jobs: jobsReducer,
		application: applicationReducer
	}
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
	Action<string>
    >
