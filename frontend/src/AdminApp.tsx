import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { getAuthToken } from './api/adminApi'
import { AdminLayout } from './components/admin/AdminLayout'
import { Login } from './pages/admin/Login'
import { Dashboard } from './pages/admin/Dashboard'
import { SiteContentManagement } from './pages/admin/SiteContentManagement'
import { PeopleManagement } from './pages/admin/PeopleManagement'
import { ImageManagement } from './pages/admin/ImageManagement'
import { MemberManagement } from './pages/admin/MemberManagement'
import { RoleManagement } from './pages/admin/RoleManagement'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = getAuthToken()
    const location = useLocation()

    if (!token) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />
    }

    return <>{children}</>
}

export const AdminApp = () => {
    return (
        <div className="min-h-screen bg-paper text-ink font-sans antialiased">
            <Routes>
                <Route path="login" element={<Login />} />
                <Route
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="content" element={<SiteContentManagement />} />
                    <Route path="people" element={<PeopleManagement />} />
                    <Route path="images" element={<ImageManagement />} />
                    <Route path="members" element={<MemberManagement />} />
                    <Route path="roles" element={<RoleManagement />} />
                </Route>
            </Routes>
        </div>
    )
}
