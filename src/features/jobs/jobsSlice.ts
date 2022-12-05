import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import axios from 'axios'
import { useAppSelector } from '../../app/hooks'

export interface Job {
    _id: string
    title: string
    description: string
    budget?: number
    applications: string[]
}

export interface JobsState {
  jobs: Job[]
  fetching: boolean
	creating: boolean
}

const initialState: JobsState = {
	jobs: [],
	fetching: false,
	creating: false
}

const fetchJobs = createAsyncThunk(
	'jobs/fetchJobs',
	async () => {
		const response = await axios.get('/api/jobs')
		return response.data.data
	}
)

const createJob = createAsyncThunk(
	'jobs/createJob',
	async ({ accessToken, jobData } : { accessToken: string, jobData: {title: string, description: string, budget: number, category: string}}) => {
		const response = await axios.post('/api/jobs/create', jobData, { headers: { authorisation: `Bearer: ${accessToken}` } })
		return response.data.data
	}
)
export const jobsSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {
	},
	extraReducers: builder => {
		builder
			.addCase(fetchJobs.pending, (state) => {
				state.fetching = true
				state.jobs = []
			})
			.addCase(fetchJobs.fulfilled, (state, action) => {
				state.fetching = false
				state.jobs = action.payload
			})
			.addCase(fetchJobs.rejected, (state) => {
				state.fetching = false
			})
			.addCase(createJob.pending, (state) => {
				state.creating = true
			})
			.addCase(createJob.fulfilled, (state) => {
				state.creating = false
			})
			.addCase(createJob.rejected, (state) => {
				state.creating = false
			})
	},
})

export const selectJobs = (state: RootState) => state.jobs

export const useJobs = () => ({
	...useAppSelector(selectJobs),
	...jobsSlice.actions,
	fetchJobs,
	createJob
})

export default jobsSlice.reducer
