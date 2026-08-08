import { useState, useEffect } from 'react'
import { adminApi } from '../../api/adminApi'
import { Plus, Loader2, X } from 'lucide-react'

type MemberDto = {
    id: number
    fullName: string
    email: string
    phone: string
    address: string
    membershipType: string
    createdAt: string
}

export const MemberManagement = () => {
    const [items, setItems] = useState<MemberDto[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [formData, setFormData] = useState<Partial<MemberDto>>({})

    const loadData = async () => {
        setLoading(true)
        try {
            const res = await adminApi.get('/Members')
            if (res.ok) setItems(await res.json())
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleOpenForm = () => {
        setFormData({ membershipType: 'General' })
        setIsFormOpen(true)
    }

    const handleCloseForm = () => {
        setIsFormOpen(false)
        setFormData({})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await adminApi.post('/Members', formData)
            handleCloseForm()
            loadData()
        } catch (e) {
            console.error('Save failed', e)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-ink">Foundation Members</h2>
                <button onClick={handleOpenForm} className="flex items-center gap-2 rounded bg-brand px-4 py-2 text-sm font-medium text-brand-on hover:bg-brand-muted transition-colors">
                    <Plus className="h-4 w-4" /> Add Member
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-brand" /></div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-line bg-paper shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-paper-muted border-b border-line">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-ink">Name</th>
                                <th className="px-4 py-3 font-semibold text-ink">Email</th>
                                <th className="px-4 py-3 font-semibold text-ink">Phone</th>
                                <th className="px-4 py-3 font-semibold text-ink">Type</th>
                                <th className="px-4 py-3 font-semibold text-ink">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {items.map(item => (
                                <tr key={item.id} className="hover:bg-paper-muted/50 transition-colors">
                                    <td className="px-4 py-3 text-ink font-medium">{item.fullName}</td>
                                    <td className="px-4 py-3 text-ink-faint">{item.email}</td>
                                    <td className="px-4 py-3 text-ink-faint">{item.phone}</td>
                                    <td className="px-4 py-3 text-ink-faint">
                                        <span className="inline-block rounded-full bg-[var(--color-brand-muted)] px-2 py-0.5 text-xs text-brand">{item.membershipType}</span>
                                    </td>
                                    <td className="px-4 py-3 text-ink-faint">{new Date(item.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {items.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-ink-faint">No members found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            )}

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
                    <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-paper shadow-lg">
                        <div className="flex items-center justify-between border-b border-line p-4 sticky top-0 bg-paper">
                            <h3 className="text-lg font-semibold text-ink">Add Member</h3>
                            <button onClick={handleCloseForm} className="p-1 text-ink-faint hover:text-ink"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-ink mb-1">Full Name</label>
                                <input required type="text" value={formData.fullName || ''} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="w-full rounded border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ink mb-1">Email</label>
                                <input required type="email" value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full rounded border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ink mb-1">Phone</label>
                                <input type="text" value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ink mb-1">Membership Type</label>
                                <select required value={formData.membershipType || ''} onChange={e => setFormData({ ...formData, membershipType: e.target.value })} className="w-full rounded border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none">
                                    <option value="General">General</option>
                                    <option value="Lifetime">Lifetime</option>
                                    <option value="Honorary">Honorary</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-line">
                                <button type="button" onClick={handleCloseForm} className="px-4 py-2 text-sm font-medium text-ink hover:bg-paper-muted rounded transition-colors">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium bg-brand text-brand-on hover:bg-brand-muted rounded transition-colors">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
