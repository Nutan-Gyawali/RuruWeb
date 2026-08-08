import { useState, useEffect } from 'react'
import { adminApi } from '../../api/adminApi'
import { Plus, Edit2, Trash2, Loader2, X } from 'lucide-react'
import type { SiteImage } from '../../types'

export const ImageManagement = () => {
    const [items, setItems] = useState<SiteImage[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [formData, setFormData] = useState<Partial<SiteImage>>({})
    const [uploading, setUploading] = useState(false)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        try {
            const url = await adminApi.uploadImage(file)
            setFormData(prev => ({ ...prev, imageUrl: url }))
        } catch (error) {
            console.error('Upload failed', error)
            alert('Failed to upload image')
        } finally {
            setUploading(false)
        }
    }

    const loadData = async () => {
        setLoading(true)
        try {
            const res = await adminApi.get('/SiteContent/images')
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

    const handleOpenForm = (item?: SiteImage) => {
        if (item) {
            setEditingId(item.id)
            setFormData(item)
        } else {
            setEditingId(null)
            setFormData({ category: 'Gallery', isActive: true, sortOrder: 0 })
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
                await adminApi.put(`/SiteContent/images/${editingId}`, formData)
            } else {
                await adminApi.post('/SiteContent/images', formData)
            }
            handleCloseForm()
            loadData()
        } catch (e) {
            console.error('Save failed', e)
        }
    }

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this image?')) {
            try {
                await adminApi.delete(`/SiteContent/images/${id}`)
                loadData()
            } catch (e) {
                console.error('Delete failed', e)
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-ink">Image Management</h2>
                <button onClick={() => handleOpenForm()} className="flex items-center gap-2 bg-brand px-4 py-2 text-sm font-medium text-on-brand tactile hover:opacity-90 transition-colors">
                    <Plus className="h-4 w-4" /> Add Image
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-brand" /></div>
            ) : (
                <div className="overflow-hidden border border-line bg-paper">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-paper-muted border-b border-line">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-ink">Preview</th>
                                <th className="px-4 py-3 font-semibold text-ink">Title</th>
                                <th className="px-4 py-3 font-semibold text-ink">Category</th>
                                <th className="px-4 py-3 font-semibold text-ink text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {items.map(item => (
                                <tr key={item.id} className="hover:bg-paper-muted/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="h-12 w-16 overflow-hidden border border-line bg-line">
                                            {item.imageUrl && <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-ink">{item.title}</td>
                                    <td className="px-4 py-3 text-ink-faint">{item.category}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button onClick={() => handleOpenForm(item)} className="p-1.5 text-brand hover:bg-brand-muted mr-2 inline-block"><Edit2 className="h-4 w-4" /></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-1.5 text-danger hover:bg-warn-muted inline-block"><Trash2 className="h-4 w-4" /></button>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-ink-faint">No images found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            )}

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
                    <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-paper">
                        <div className="flex items-center justify-between border-b border-line p-4 sticky top-0 bg-paper">
                            <h3 className="text-lg font-semibold text-ink">{editingId ? 'Edit Image' : 'Add Image'}</h3>
                            <button onClick={handleCloseForm} className="p-1 text-ink-faint hover:text-ink"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-ink mb-1">Category</label>
                                <select required value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none">
                                    <option value="Gallery">Gallery</option>
                                    <option value="Certificates">Certificates</option>
                                    <option value="Past Members">Past Members</option>
                                    <option value="Past Advisors">Past Advisors</option>
                                    <option value="Company's Intro">Company's Intro</option>
                                    <option value="Thorga's Intro">Thorga's Intro</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ink mb-1">Title (EN)</label>
                                <input required type="text" value={formData.titleEn || formData.title || ''} onChange={e => setFormData({ ...formData, titleEn: e.target.value, title: e.target.value })} className="w-full border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ink mb-1">Image URL</label>
                                <div className="flex gap-2">
                                    <input required type="text" value={formData.imageUrl || ''} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="flex-1 border border-line px-3 py-2 bg-transparent text-ink focus:border-brand focus:outline-none" placeholder="https://... or /uploads/..." />
                                    <label className={`flex cursor-pointer items-center justify-center bg-brand px-4 text-sm font-medium text-on-brand transition-colors hover:opacity-90 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Browse'}
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                                    </label>
                                </div>
                            </div>
                            {formData.imageUrl && (
                                <div className="mt-2 h-32 border border-line overflow-hidden bg-line">
                                    <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                                </div>
                            )}

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
