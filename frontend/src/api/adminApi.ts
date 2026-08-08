export const getAuthToken = () => localStorage.getItem('adminToken')
export const setAuthToken = (token: string) => localStorage.setItem('adminToken', token)
export const clearAuthToken = () => localStorage.removeItem('adminToken')

export const adminApi = {
    async fetch(endpoint: string, options: RequestInit = {}) {
        const token = getAuthToken()
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string> || {})
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(`/api${endpoint}`, {
            ...options,
            headers
        })

        if (response.status === 401) {
            clearAuthToken()
            window.location.href = '/admin/login'
        }

        return response
    },

    async get(endpoint: string) {
        return this.fetch(endpoint, { method: 'GET' })
    },

    async post(endpoint: string, data: any) {
        return this.fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    },

    async put(endpoint: string, data: any) {
        return this.fetch(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
    },

    async delete(endpoint: string) {
        return this.fetch(endpoint, { method: 'DELETE' })
    },

    async uploadImage(file: File) {
        const formData = new FormData()
        formData.append('file', file)
        
        const token = getAuthToken()
        const headers: Record<string, string> = {}
        if (token) headers['Authorization'] = `Bearer ${token}`

        const response = await fetch('/api/Upload', {
            method: 'POST',
            headers,
            body: formData
        })

        if (response.status === 401) {
            clearAuthToken()
            window.location.href = '/admin/login'
        }

        if (!response.ok) throw new Error('Upload failed')
        const data = await response.json()
        return data.url as string
    }
}
