import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import axios from 'axios'
export interface Application {
    _id: string
    title: string
    description: string
    salary: number
	estimatedDays: number
	createdAt: string
}

interface ApplicationState {
    creating: boolean
}

const initialState: ApplicationState = {
	creating: false
}

const createApplication = createAsyncThunk(
	'application/postApplication',
	async ({ accessToken, jobId, salary, estimatedDays, description }: {salary: number, estimatedDays: number, description: string,accessToken: string, jobId:  string} ) => {
		const response = await axios.post(
			`/api/jobs/${jobId}/add-application`,
			{ description, estimatedDays, salary },
			{ headers: { authorisation: `Bearer ${accessToken}` } })

		return response.data.data
	}
)

export const applicationSlice = createSlice({
	name: 'application',
	initialState,
	reducers: {
	},
	extraReducers: builder => {
		builder
			.addCase(createApplication.pending, (state) => {
				state.creating = true
			})
			.addCase(createApplication.fulfilled, (state) => {
				state.creating = false
				// state.value = action.payload;
			})
			.addCase(createApplication.rejected, (state) => {
				state.creating = false
			})
	},
})

export const useApplications = () => ({
	...useSelector((state: RootState) => state.application),
	...applicationSlice.actions,
	createApplication
})

export default applicationSlice.reducer
