import React from 'react'
import RegisterClient from '../components/auth/RegisterClient'
import { getCurrentUser } from '../actions/getCurrentUser'
import PageContainer from '../components/containers/PageContainer'

const Register = async () => {
  const currentUser = await getCurrentUser()
  return (
    <PageContainer>
      <div>
        <RegisterClient currentUser={currentUser} />
      </div>
    </PageContainer>
  )
}

export default Register
