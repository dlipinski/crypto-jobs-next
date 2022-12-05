import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import axios from 'axios'
import { useAppSelector } from '../../app/hooks'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const getItem = (key: string) => cookies.get(key)
const setItem = (key: string, value: string) => cookies.set(key, value)
const removeItem = (key: string) => cookies.set(key, '', { expires: new Date(0) })

interface AuthState {
    accessToken: string
	expiresAt: string
	loading: boolean
}

const initialState: AuthState = {
	accessToken: getItem('accessToken') || '',
	expiresAt: getItem('expiresAt') || '',
	loading: false,
}

const signIn = createAsyncThunk(
	'auth/signIn',
	async (data: { message:  string, signedMessage: string }): Promise<{accessToken: string, expiresIn: number}> => {
		const response = await axios.post('/api/auth/sign-in', data)
		return response.data
	}
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signOut: (state) => {
			state.accessToken = ''
			state.expiresAt = new Date().toString()
			removeItem('accessToken')
			removeItem('expiresAt')
		}
	},
	extraReducers: builder => {
		builder
			.addCase(signIn.pending, (state) => {
				state.loading = true
			})
			.addCase(signIn.fulfilled, (state, action) => {
				const { accessToken, expiresIn } = action.payload
				state.loading = false
				state.accessToken = accessToken
				state.expiresAt = new Date(Date.now() + expiresIn).toString()
				setItem('accessToken', state.accessToken)
				setItem('expiresAt', state.expiresAt.toString())

			})
			.addCase(signIn.rejected, (state) => {
				state.loading = false
			})
	},
})

export const useAuth = () => ({
	...useAppSelector((state: RootState) => state.auth),
	...authSlice.actions,
	signIn
})

export default authSlice.reducer
