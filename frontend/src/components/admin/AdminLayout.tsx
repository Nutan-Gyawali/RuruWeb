import { Outlet } from 'react-router-dom'
import { AdminSidebar } from './AdminSidebar'
import { LogOut } from 'lucide-react'
import { clearAuthToken } from '../../api/adminApi'
import { useNavigate } from 'react-router-dom'

export const AdminLayout = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        clearAuthToken()
        navigate('/admin/login')
    }

    return (
        <div className="flex min-h-screen bg-paper-muted">
            <AdminSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b border-line bg-paper px-6">
                    <h1 className="text-lg font-medium text-ink">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-ink-faint hover:text-ink transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </header>
                <main className="flex-1 overflow-auto p-6">
                    <div className="mx-auto max-w-6xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
