"use client"
import AdminSidebarItem from "./AdminSidebarItem"
import { MdSpaceDashboard, MdOutlineCreate } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { usePathname } from "next/navigation";


const AdminSidebar = () => {
    const pathname = usePathname();
    const adminPanel = [
        {
            name: "Özetler",
            icon: MdSpaceDashboard,
            url: "/admin"
        },
        {
            name: "Ürün Oluştur",
            icon: MdOutlineCreate,
            url: "/admin/create"
        },
        {
            name: "Siparişlerim",
            icon: AiOutlineUnorderedList,
            url: "/admin/order"
        },
    ]
    return (
        <div className="w-1/6 border-r border-slate-400 h-screen bg-white">
            <div className="space-y-4">
                {
                    adminPanel.map((admin, i) => (
                        <AdminSidebarItem key={i} selected={pathname == admin.url} icon={admin.icon} name={admin.name} url={admin.url} />
                    ))
                }
            </div>
        </div>
    )
}

export default AdminSidebar