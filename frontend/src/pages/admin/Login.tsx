import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { adminApi, setAuthToken } from '../../api/adminApi'
import { Loader2 } from 'lucide-react'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/admin'

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await adminApi.post('/Auth/login', { email, password })
            if (res.ok) {
                const data = await res.json()
                setAuthToken(data.token)
                navigate(from, { replace: true })
            } else {
                const errData = await res.json().catch(() => ({}))
                setError(errData.message || 'Login failed. Please check your credentials.')
            }
        } catch (err) {
            setError('An error occurred. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-paper-muted px-4">
            <div className="w-full max-w-md border border-line bg-paper p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-ink">Admin Login</h1>
                    <p className="mt-2 text-sm text-ink-faint">Sign in to access the admin dashboard</p>
                </div>

                {error && (
                    <div className="mb-6 bg-warn-muted p-3 text-sm text-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-ink mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-line bg-transparent px-3 py-2 text-ink focus:border-brand focus:outline-none"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-ink mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-line bg-transparent px-3 py-2 text-ink focus:border-brand focus:outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 flex w-full items-center justify-center gap-2 bg-brand px-4 py-2 font-medium text-on-brand tactile hover:opacity-90 disabled:opacity-70 transition-colors"
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}
