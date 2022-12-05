import React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useAuth } from './authSlice'
import { Button } from '@nextui-org/react'
import { Dropdown } from '@nextui-org/react'
import { Lock, User } from 'react-iconly'

declare global {
    interface Window {
        ethereum?: any;
    }
}


const SignInButton = () => {
	const { accessToken, signIn } = useAuth()
	const dispatch = useAppDispatch()
	const onSignIn = async () => {
		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts'
		})
		const account = accounts[ 0 ]
		const message = 'crypto-jobs.com'
		const signedMessage = await window.ethereum.request({
			method: 'personal_sign',
			params: [ message, account, 'Random text' ]
		})
		dispatch(signIn({ message, signedMessage }))
	}

	/*const onSignOut = () => {
		dispatch(signOut())
	}*/

	if (accessToken) {
		return (
			<Dropdown>
				<Dropdown.Trigger>
					<Button
						auto
						color={'default'}
						icon={<User set={'bulk'} />}
					/>
				</Dropdown.Trigger>
				<Dropdown.Menu>
					<Dropdown.Item icon={<User size={22} set={'bulk'}/>}>
						My account
					</Dropdown.Item>
					<Dropdown.Item withDivider color="error" icon={<Lock size={22} primaryColor="currentColor" set={'bulk'}/>}>
						Sign Out
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		)
	}

	return (
		<Button flat onClick={onSignIn}>SignIn with MetaMask</Button>
	)
}

export default  SignInButton
