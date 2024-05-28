import React from 'react'
import LoginClient from '../components/auth/LoginClient'
import { getCurrentUser } from '../actions/getCurrentUser'
import PageContainer from '../components/containers/PageContainer'

const Login = async () => {
    const currentUser = await getCurrentUser()
    return (
        <PageContainer>
            <div>
                <LoginClient currentUser={currentUser} />
            </div>
        </PageContainer>
    )
}

export default Login