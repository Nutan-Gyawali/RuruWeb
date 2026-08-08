import { useState, useEffect } from 'react'
import { adminApi } from '../../api/adminApi'
import { Plus, Edit2, Trash2, Loader2, X } from 'lucide-react'
import type { SiteContent } from '../../types'

export const SiteContentManagement = () => {
    const [items, setItems] = useState<SiteContent[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [formData, setFormData] = useState<Partial<SiteContent>>({})

    const loadData = async () => {
        setLoading(true)
        try {
            const res = await adminApi.get('/SiteContent/content')
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

    const handleOpenForm = (item?: SiteContent) => {
        if (item) {
            setEditingId(item.id)
            setFormData(item)
        } else {
            setEditingId(null)
            setFormData({ category: 'Introduction', isActive: true, sortOrder: 0 })
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
                await adminApi.put(`/SiteContent/content/${editingId}`, formData)
            } else {
                await adminApi.post('/SiteContent/content', formData)
            }
            handleCloseForm()
            loadData()
        } catch (e) {
            console.error('Save failed', e)
        }
    }

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await adminApi.delete(`/SiteContent/content/${id}`)
                loadData()
            } catch (e) {
                console.error('Delete failed', e)
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-ink">Site Content Management</h2>
                <button
                    onClick={() => handleOpenForm()}
                    className="flex items-center gap-2 bg-brand px-4 py-2 text-sm font-medium text-on-brand tactile hover:opacity-90 transition-colors"
                >
                    <Plus className="h-4 w-4" /> Add New
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-brand" /></div>
            ) : (
                <div className="overflow-hidden border border-line bg-paper">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-paper-muted border-b border-line">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-ink">Category</th>
                                <th className="px-4 py-3 font-semibold text-ink">Title</th>
                                <th className="px-4 py-3 font-semibold text-ink">Sort Order</th>
                                <th className="px-4 py-3 font-semibold text-ink text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {items.map(item => (
                                <tr key={item.id} className="hover:bg-paper-muted/50 transition-colors">
                                    <td className="px-4 py-3 text-ink-faint">{item.category}</td>
                                    <td className="px-4 py-3 text-ink">{item.title}</td>
                                    <td className="px-4 py-3 text-ink-faint">{item.sortOrder}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button onClick={() => handleOpenForm(item)} className="p-1.5 text-brand hover:bg-brand-muted mr-2 inline-block">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="p-1.5 text-danger hover:bg-warn-muted inline-block">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-ink-faint">No content found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-paper">
                        <div className="flex items-center justify-between border-b border-line p-4 sticky top-0 bg-paper">
                            <h3 className="text-lg font-semibold text-ink">{editingId ? 'Edit Content' : 'Add Content'}</h3>
                            <button onClick={handleCloseForm} className="p-1 text-ink-faint hover:text-ink"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">Category</label>
                                    <input required type="text" value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">Sort Order</label>
                                    <input required type="number" value={formData.sortOrder || 0} onChange={e => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })} className="w-full border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">Title (EN)</label>
                                    <input required type="text" value={formData.titleEn || formData.title || ''} onChange={e => setFormData({ ...formData, titleEn: e.target.value, title: e.target.value })} className="w-full border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">Title (NE)</label>
                                    <input type="text" value={formData.titleNe || ''} onChange={e => setFormData({ ...formData, titleNe: e.target.value })} className="w-full border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">Body (EN)</label>
                                    <textarea required rows={4} value={formData.bodyEn || formData.body || ''} onChange={e => setFormData({ ...formData, bodyEn: e.target.value, body: e.target.value })} className="w-full border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">Body (NE)</label>
                                    <textarea rows={4} value={formData.bodyNe || ''} onChange={e => setFormData({ ...formData, bodyNe: e.target.value })} className="w-full border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-line">
                                <button type="button" onClick={handleCloseForm} className="px-4 py-2 text-sm font-medium text-ink hover:bg-paper-muted transition-colors">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium bg-brand text-on-brand tactile hover:opacity-90 transition-colors">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
