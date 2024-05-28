import React from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'

export const metadata = {
    title: "Mercatura Admin",
    description: "Mercatura Admin Dashboard"
}

const AdminLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className='flex gap-3'>
            <AdminSidebar />
            { children }
        </div>
    )
}

export default AdminLayout