"use client"
import AdminSidebarItem from "./AdminSidebarItem"
import { MdSpaceDashboard, MdOutlineCreate, MdFormatListBulleted, MdDns } from "react-icons/md";
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
            name: "Ürünleri Yönet",
            icon: MdDns,
            url: "/admin/manage"
        },
        {
            name: "Siparişler",
            icon: MdFormatListBulleted,
            url: "/admin/order"
        },
    ]
    return (
        <div className="w-1/6 p-3 border-r border-slate-400 h-screen bg-zinc-500">
            <div className="space-y-6">
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