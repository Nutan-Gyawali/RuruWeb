import { useState, useEffect } from 'react'
import { adminApi } from '../../api/adminApi'
import { Shield, Users, Loader2 } from 'lucide-react'

type RoleDto = { id: string, name: string }
type UserDto = { id: string, email: string, fullName: string }

export const RoleManagement = () => {
    const [roles, setRoles] = useState<RoleDto[]>([])
    const [users, setUsers] = useState<UserDto[]>([])
    const [loading, setLoading] = useState(true)
    const [newRoleName, setNewRoleName] = useState('')
    
    // Assign Role State
    const [assignEmail, setAssignEmail] = useState('')
    const [assignRoleName, setAssignRoleName] = useState('')

    const loadData = async () => {
        setLoading(true)
        try {
            const [rolesRes, usersRes] = await Promise.all([
                adminApi.get('/Roles'),
                adminApi.get('/Roles/users')
            ])
            if (rolesRes.ok) setRoles(await rolesRes.json())
            if (usersRes.ok) setUsers(await usersRes.json())
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleCreateRole = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newRoleName) return
        try {
            await adminApi.post('/Roles', { name: newRoleName })
            setNewRoleName('')
            loadData()
        } catch (e) {
            console.error(e)
        }
    }

    const handleAssignRole = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!assignEmail || !assignRoleName) return
        try {
            await adminApi.post('/Roles/assign', { email: assignEmail, roleName: assignRoleName })
            setAssignEmail('')
            setAssignRoleName('')
            alert('Role assigned successfully!')
        } catch (e) {
            console.error(e)
        }
    }

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-brand" /></div>
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-ink mb-6">Roles & Users Management</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Roles Panel */}
                    <div className="rounded-lg border border-line bg-paper shadow-sm">
                        <div className="flex items-center gap-2 border-b border-line p-4 bg-paper-muted">
                            <Shield className="h-5 w-5 text-brand" />
                            <h3 className="font-semibold text-ink">System Roles</h3>
                        </div>
                        <div className="p-4">
                            <ul className="space-y-2 mb-4">
                                {roles.map(r => (
                                    <li key={r.id} className="flex items-center justify-between rounded bg-paper-muted px-3 py-2 text-sm text-ink font-medium">
                                        {r.name}
                                    </li>
                                ))}
                            </ul>
                            <form onSubmit={handleCreateRole} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="New role name..."
                                    value={newRoleName}
                                    onChange={e => setNewRoleName(e.target.value)}
                                    className="flex-1 rounded border border-line px-3 py-2 text-sm bg-transparent text-ink focus:border-brand focus:outline-none"
                                />
                                <button type="submit" className="rounded bg-brand px-3 py-2 text-sm font-medium text-brand-on hover:bg-brand-muted transition-colors">
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Users Panel */}
                    <div className="rounded-lg border border-line bg-paper shadow-sm">
                        <div className="flex items-center gap-2 border-b border-line p-4 bg-paper-muted">
                            <Users className="h-5 w-5 text-brand" />
                            <h3 className="font-semibold text-ink">Assign Role to User</h3>
                        </div>
                        <div className="p-4">
                            <form onSubmit={handleAssignRole} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">User Email</label>
                                    <select
                                        required
                                        value={assignEmail}
                                        onChange={e => setAssignEmail(e.target.value)}
                                        className="w-full rounded border border-line px-3 py-2 text-sm bg-transparent text-ink focus:border-brand focus:outline-none"
                                    >
                                        <option value="">Select a user...</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.email}>{u.fullName} ({u.email})</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">Role</label>
                                    <select
                                        required
                                        value={assignRoleName}
                                        onChange={e => setAssignRoleName(e.target.value)}
                                        className="w-full rounded border border-line px-3 py-2 text-sm bg-transparent text-ink focus:border-brand focus:outline-none"
                                    >
                                        <option value="">Select a role...</option>
                                        {roles.map(r => (
                                            <option key={r.id} value={r.name}>{r.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="w-full rounded bg-brand px-4 py-2 text-sm font-medium text-brand-on hover:bg-brand-muted transition-colors">
                                    Assign Role
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="rounded-lg border border-line bg-paper shadow-sm">
                <div className="flex items-center gap-2 border-b border-line p-4 bg-paper-muted">
                    <h3 className="font-semibold text-ink">Registered Users</h3>
                </div>
                <div className="p-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-line text-ink">
                                <th className="pb-2 font-semibold">Name</th>
                                <th className="pb-2 font-semibold">Email</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {users.map(u => (
                                <tr key={u.id} className="text-ink-faint">
                                    <td className="py-2 text-ink">{u.fullName}</td>
                                    <td className="py-2">{u.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
