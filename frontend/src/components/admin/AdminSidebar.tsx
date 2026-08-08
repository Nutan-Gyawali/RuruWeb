import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, Users, Image as ImageIcon, UserCheck, ShieldCheck } from 'lucide-react'

export const AdminSidebar = () => {
    const navItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
        { path: '/admin/content', icon: FileText, label: 'Site Content' },
        { path: '/admin/people', icon: Users, label: 'People' },
        { path: '/admin/images', icon: ImageIcon, label: 'Images' },
        { path: '/admin/members', icon: UserCheck, label: 'Members' },
        { path: '/admin/roles', icon: ShieldCheck, label: 'Roles & Users' },
    ]

    return (
        <aside className="w-64 shrink-0 border-r border-line bg-paper flex flex-col">
            <div className="flex h-16 items-center px-6 border-b border-line">
                <span className="text-xl font-bold text-brand">Admin Panel</span>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.exact}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-[var(--color-brand-muted)] text-brand'
                                        : 'text-ink-faint hover:bg-paper-muted hover:text-ink'
                                }`
                            }
                        >
                            <Icon className="h-5 w-5" />
                            {item.label}
                        </NavLink>
                    )
                })}
            </nav>
        </aside>
    )
}
