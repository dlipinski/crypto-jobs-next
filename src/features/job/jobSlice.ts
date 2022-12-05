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

export interface JobState {
  job: Job | null
  fetching: boolean
}

const initialState: JobState = {
	job: null,
	fetching: false
}

const fetchJob = createAsyncThunk(
	'job/fetchJob',
	async (jobId:  string): Promise<Job> => {
		const response = await axios.get(`/api/jobs/${jobId}`)
		return response.data.data
	}
)

export const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
	},
	extraReducers: builder => {
		builder
			.addCase(fetchJob.pending, (state) => {
				state.fetching = true
			})
			.addCase(fetchJob.fulfilled, (state, action) => {
				state.fetching = false
				state.job = action.payload
			})
			.addCase(fetchJob.rejected, (state) => {
				state.fetching = false
			})
	},
})

const selectJob = (state: RootState) => state.job

export const useJob = () => ({
	...useAppSelector((state: RootState) => selectJob(state)),
	...jobSlice.actions,
	fetchJob
})
export default jobSlice.reducer
