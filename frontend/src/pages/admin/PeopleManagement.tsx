import { useState, useEffect } from 'react'
import { adminApi } from '../../api/adminApi'
import { Plus, Edit2, Trash2, Loader2, X } from 'lucide-react'
import type { PersonProfile } from '../../types'

export const PeopleManagement = () => {
    const [items, setItems] = useState<PersonProfile[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [formData, setFormData] = useState<Partial<PersonProfile>>({})

    const loadData = async () => {
        setLoading(true)
        try {
            const res = await adminApi.get('/SiteContent/people')
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

    const handleOpenForm = (item?: PersonProfile) => {
        if (item) {
            setEditingId(item.id)
            setFormData(item)
        } else {
            setEditingId(null)
            setFormData({ category: 'Board of Members', isActive: true, sortOrder: 0 })
        }
        setIsFormOpen(true)
    }

    const handleCloseForm = () => {
        setIsFormOpen(false)
        setEditingId(null)
        setFormData({})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editingId) {
                await adminApi.put(`/SiteContent/people/${editingId}`, formData)
            } else {
                await adminApi.post('/SiteContent/people', formData)
            }
            handleCloseForm()
            loadData()
        } catch (e) {
            console.error('Save failed', e)
        }
    }

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this person?')) {
            try {
                await adminApi.delete(`/SiteContent/people/${id}`)
                loadData()
            } catch (e) {
                console.error('Delete failed', e)
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-ink">People Management</h2>
                <button onClick={() => handleOpenForm()} className="flex items-center gap-2 rounded bg-brand px-4 py-2 text-sm font-medium text-brand-on hover:bg-brand-muted transition-colors">
                    <Plus className="h-4 w-4" /> Add Person
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
                                <th className="px-4 py-3 font-semibold text-ink">Category</th>
                                <th className="px-4 py-3 font-semibold text-ink">Position</th>
                                <th className="px-4 py-3 font-semibold text-ink text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {items.map(item => (
                                <tr key={item.id} className="hover:bg-paper-muted/50 transition-colors">
                                    <td className="px-4 py-3 text-ink flex items-center gap-3">
                                        {item.imageUrl ? <img src={item.imageUrl} className="w-8 h-8 rounded-full object-cover bg-line" alt="" /> : <div className="w-8 h-8 rounded-full bg-line" />}
                                        {item.name}
                                    </td>
                                    <td className="px-4 py-3 text-ink-faint">{item.category}</td>
                                    <td className="px-4 py-3 text-ink-faint">{item.position || '-'}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button onClick={() => handleOpenForm(item)} className="p-1.5 text-brand hover:bg-[var(--color-brand-muted)] rounded mr-2 inline-block"><Edit2 className="h-4 w-4" /></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-1.5 text-[var(--color-on-warning)] hover:bg-[var(--color-warning-muted)] rounded inline-block"><Trash2 className="h-4 w-4" /></button>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-ink-faint">No people found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            )}

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-paper shadow-lg">
                        <div className="flex items-center justify-between border-b border-line p-4 sticky top-0 bg-paper">
                            <h3 className="text-lg font-semibold text-ink">{editingId ? 'Edit Person' : 'Add Person'}</h3>
                            <button onClick={handleCloseForm} className="p-1 text-ink-faint hover:text-ink"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">Name (EN)</label>
                                    <input required type="text" value={formData.nameEn || formData.name || ''} onChange={e => setFormData({ ...formData, nameEn: e.target.value, name: e.target.value })} className="w-full rounded border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">Name (NE)</label>
                                    <input type="text" value={formData.nameNe || ''} onChange={e => setFormData({ ...formData, nameNe: e.target.value })} className="w-full rounded border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">Category</label>
                                    <input required type="text" value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full rounded border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">Position (EN)</label>
                                    <input type="text" value={formData.positionEn || formData.position || ''} onChange={e => setFormData({ ...formData, positionEn: e.target.value, position: e.target.value })} className="w-full rounded border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-ink mb-1">Image URL</label>
                                <input type="url" value={formData.imageUrl || ''} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full rounded border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" placeholder="https://..." />
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
