import { useEffect, useState, type FormEvent } from 'react'
import './App.css'

type Member = {
  id: number
  fullName: string
  email: string
  phone: string
  address: string
  membershipType: string
  createdAt: string
}

type SiteContent = {
  id: number
  category: string
  title: string
  body: string
  summary?: string | null
  sortOrder: number
  isActive: boolean
}

type PersonProfile = {
  id: number
  category: string
  name: string
  position?: string | null
  description?: string | null
  imageUrl?: string | null
  externalLink?: string | null
}

type SiteImage = {
  id: number
  category: string
  title: string
  description?: string | null
  imageUrl: string
}

type AuthUser = {
  email: string
  fullName: string
  roles?: string[]
}

type AuthMode = 'login' | 'register'

type ContentForm = {
  category: string
  title: string
  body: string
  summary: string
  sortOrder: number
  isActive: boolean
}

type PersonForm = {
  category: string
  name: string
  position: string
  description: string
  imageUrl: string
  externalLink: string
  sortOrder: number
  isActive: boolean
}

type ImageForm = {
  category: string
  title: string
  description: string
  imageUrl: string
  sortOrder: number
  isActive: boolean
}

type RoleForm = {
  name: string
  permissions: string[]
}

function App() {
  const [members, setMembers] = useState<Member[]>([])
  const [loadingMembers, setLoadingMembers] = useState(true)
  const [, setSiteLoading] = useState(true)
  const [siteMessage, setSiteMessage] = useState('')
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [user, setUser] = useState<AuthUser | null>(null)
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const [content, setContent] = useState<Record<string, SiteContent[]>>({})
  const [people, setPeople] = useState<Record<string, PersonProfile[]>>({})
  const [images, setImages] = useState<SiteImage[]>([])
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [contentForm, setContentForm] = useState<ContentForm>({ category: 'Introduction', title: '', body: '', summary: '', sortOrder: 0, isActive: true })
  const [personForm, setPersonForm] = useState<PersonForm>({ category: 'Current Members', name: '', position: '', description: '', imageUrl: '', externalLink: '', sortOrder: 0, isActive: true })
  const [imageForm, setImageForm] = useState<ImageForm>({ category: 'Gallery', title: '', description: '', imageUrl: '', sortOrder: 0, isActive: true })
  const [roleForm, setRoleForm] = useState<RoleForm>({ name: '', permissions: [] })
  const [roles, setRoles] = useState<string[]>([])
  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>({})
  const [availablePermissions] = useState(['content.write', 'roles.read', 'roles.write', 'members.read'])

  const fetchJson = async (path: string) => {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Unable to load ${path}`)
    }
    return response.json()
  }

  const loadSiteContent = async () => {
    try {
      const [intro, publication, works, others, hometown, aims, rules] = await Promise.all([
        fetchJson('/api/SiteContent/content?category=Introduction'),
        fetchJson('/api/SiteContent/content?category=Publication'),
        fetchJson('/api/SiteContent/content?category=Works%20Done'),
        fetchJson('/api/SiteContent/content?category=Others'),
        fetchJson('/api/SiteContent/content?category=Hometown%20Introduction'),
        fetchJson('/api/SiteContent/content?category=Aims'),
        fetchJson('/api/SiteContent/content?category=Rules'),
      ])

      const [board, currentMembers, pastMembers, advisors, currentAdvisors, pastAdvisors, lifetimeMembers] = await Promise.all([
        fetchJson('/api/SiteContent/people?category=Board%20of%20Members'),
        fetchJson('/api/SiteContent/people?category=Current%20Members'),
        fetchJson('/api/SiteContent/people?category=Past%20Members'),
        fetchJson('/api/SiteContent/people?category=Advisors'),
        fetchJson('/api/SiteContent/people?category=Current%20Advisors'),
        fetchJson('/api/SiteContent/people?category=Past%20Advisors'),
        fetchJson('/api/SiteContent/people?category=Lifetime%20Members'),
      ])

      const gallery = await fetchJson('/api/SiteContent/images?category=Gallery')

      setContent({
        introduction: intro as SiteContent[],
        publication: publication as SiteContent[],
        worksDone: works as SiteContent[],
        others: others as SiteContent[],
        hometownIntroduction: hometown as SiteContent[],
        aims: aims as SiteContent[],
        rules: rules as SiteContent[],
      })

      setPeople({
        boardOfMembers: board as PersonProfile[],
        currentMembers: currentMembers as PersonProfile[],
        pastMembers: pastMembers as PersonProfile[],
        advisors: advisors as PersonProfile[],
        currentAdvisors: currentAdvisors as PersonProfile[],
        pastAdvisors: pastAdvisors as PersonProfile[],
        lifetimeMembers: lifetimeMembers as PersonProfile[],
      })

      setImages(gallery as SiteImage[])
    } catch {
      setSiteMessage('The site content API is not reachable yet. Please start the backend first.')
    } finally {
      setSiteLoading(false)
    }
  }

  const fetchMembers = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('/api/members', {
        headers: {
          Authorization: `Bearer ${token ?? ''}`,
        },
      })

      if (!response.ok) {
        throw new Error('Unable to load members')
      }

      const data = (await response.json()) as Member[]
      setMembers(Array.isArray(data) ? data : [])
    } catch {
      setMembers([])
    } finally {
      setLoadingMembers(false)
    }
  }

  const loadUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoadingMembers(false)
      return
    }

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Session expired')
      }

      const data = (await response.json()) as AuthUser & { id: string; roles?: string[] }
      setUser({ email: data.email, fullName: data.fullName, roles: data.roles ?? [] })
      await fetchMembers()
    } catch {
      localStorage.removeItem('token')
      setUser(null)
      setLoadingMembers(false)
    }
  }

  useEffect(() => {
    void loadSiteContent()
    void loadUser()
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')

    const endpoint = authMode === 'register' ? '/api/auth/register' : '/api/auth/login'
    const payload = authMode === 'register'
      ? { fullName: form.fullName, email: form.email, password: form.password }
      : { email: form.email, password: form.password }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Authentication failed')
      }

      localStorage.setItem('token', data.token)
      setUser({ email: data.email, fullName: data.fullName, roles: data.roles ?? [] })
      setMessage(authMode === 'register' ? 'Registration successful.' : 'Login successful.')
      await fetchMembers()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Authentication failed')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setMembers([])
    setLoadingMembers(false)
    setMessage('You have been logged out.')
  }

  const requestWithAuth = async (path: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token')
    const response = await fetch(path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data?.message || 'Request failed')
    }

    return response.json().catch(() => ({}))
  }

  const loadAdminData = async () => {
    if (!user || !(user.roles?.some((role) => ['admin', 'superadmin', 'executive', 'executive members'].includes(role)))) {
      return
    }

    try {
      const roleData = await requestWithAuth('/api/roles')
      setRoles((roleData as Array<{ name: string }>).map((item) => item.name))
      const permissionMap: Record<string, string[]> = {}
      for (const role of (roleData as Array<{ name: string }>)) {
        const perms = await requestWithAuth(`/api/roles/permissions/${encodeURIComponent(role.name)}`)
        permissionMap[role.name] = perms as string[]
      }
      setRolePermissions(permissionMap)
    } catch {
      setMessage('Unable to load role management data.')
    }
  }

  useEffect(() => {
    void loadAdminData()
  }, [user])

  const submitContent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await requestWithAuth('/api/SiteContent/content', {
        method: 'POST',
        body: JSON.stringify({
          category: contentForm.category,
          title: contentForm.title,
          body: contentForm.body,
          summary: contentForm.summary,
          sortOrder: contentForm.sortOrder,
          isActive: contentForm.isActive,
        }),
      })
      setMessage('Content created successfully.')
      setContentForm({ category: 'Introduction', title: '', body: '', summary: '', sortOrder: 0, isActive: true })
      void loadSiteContent()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create content.')
    }
  }

  const submitPerson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await requestWithAuth('/api/SiteContent/people', {
        method: 'POST',
        body: JSON.stringify({
          category: personForm.category,
          name: personForm.name,
          position: personForm.position,
          description: personForm.description,
          imageUrl: personForm.imageUrl,
          externalLink: personForm.externalLink,
          sortOrder: personForm.sortOrder,
          isActive: personForm.isActive,
        }),
      })
      setMessage('Person record created successfully.')
      setPersonForm({ category: 'Current Members', name: '', position: '', description: '', imageUrl: '', externalLink: '', sortOrder: 0, isActive: true })
      void loadSiteContent()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create person.')
    }
  }

  const submitImage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await requestWithAuth('/api/SiteContent/images', {
        method: 'POST',
        body: JSON.stringify({
          category: imageForm.category,
          title: imageForm.title,
          description: imageForm.description,
          imageUrl: imageForm.imageUrl,
          sortOrder: imageForm.sortOrder,
          isActive: imageForm.isActive,
        }),
      })
      setMessage('Image created successfully.')
      setImageForm({ category: 'Gallery', title: '', description: '', imageUrl: '', sortOrder: 0, isActive: true })
      void loadSiteContent()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create image.')
    }
  }

  const submitRole = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await requestWithAuth('/api/roles', {
        method: 'POST',
        body: JSON.stringify({ name: roleForm.name }),
      })
      await requestWithAuth('/api/roles/permissions', {
        method: 'POST',
        body: JSON.stringify({ roleName: roleForm.name, permissions: roleForm.permissions }),
      })
      setMessage('Role created successfully.')
      setRoleForm({ name: '', permissions: [] })
      void loadAdminData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create role.')
    }
  }

  const introduction = content.introduction?.[0]
  const publication = content.publication?.[0]
  const works = content.worksDone?.[0]
  const others = content.others?.[0]
  const hometown = content.hometownIntroduction?.[0]
  const aims = content.aims?.[0]
  const rules = content.rules?.[0]

  const boardMembers = people.boardOfMembers ?? []
  const currentMembers = people.currentMembers ?? []
  const pastMembers = people.pastMembers ?? []
  const advisors = people.advisors ?? []
  const currentAdvisors = people.currentAdvisors ?? []
  const pastAdvisors = people.pastAdvisors ?? []
  const lifetimeMembers = people.lifetimeMembers ?? []

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home">
          <div className="brand-mark">⛰</div>
          <div>
            <strong>थोर्गा काठमाडौं</strong>
            <span>सम्पर्क तथा विकास मञ्च</span>
          </div>
        </a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#activites">Activities</a>
          <a href="#publications">Publications</a>
          <a href="#team">Leadership</a>
          <a href="#gallery">Gallery</a>
          <a href="#membership">Join</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero-card">
          <div className="hero-copy">
            <p className="eyebrow">A connected civic platform for Thorga and Kathmandu</p>
            <h1>Connecting culture, community and meaningful development.</h1>
            <p className="hero-text">
              This portal brings together the foundation’s mission, leadership, publications, projects, and gallery for members and visitors alike.
            </p>
            <div className="hero-actions">
              <a href="#about" className="button primary">Explore the organization</a>
              <a href="#membership" className="button secondary">Member access</a>
            </div>
          </div>
          <div className="hero-panel">
            <div className="panel-block">
              <h3>Mission focus</h3>
              <p>{aims?.body || 'Cultural preservation, community development and education.'}</p>
            </div>
            <div className="panel-block">
              <h3>Guiding rules</h3>
              <p>{rules?.body || 'Shared values, discipline and responsibility for all members.'}</p>
            </div>
          </div>
        </section>

        <section id="about" className="section-grid">
          <div className="card large-card">
            <p className="eyebrow">Organization profile</p>
            <h2>{introduction?.title || 'Introduction'}</h2>
            <p>{introduction?.body || 'The foundation is a non-profit platform that brings together Thorga-origin people in Kathmandu.'}</p>
            {introduction?.summary && <p className="muted">{introduction.summary}</p>}
          </div>
          <div className="card">
            <p className="eyebrow">Hometown introduction</p>
            <h3>{hometown?.title || 'Hometown'}</h3>
            <p>{hometown?.body || 'The heritage and culture of Thorga continue to shape the organization’s identity.'}</p>
          </div>
        </section>

        <section className="section-grid three-up">
          <div className="card">
            <p className="eyebrow">Objectives</p>
            <h3>Purpose and priorities</h3>
            <p>{aims?.body || 'The foundation focuses on culture, community welfare, education, and social development.'}</p>
          </div>
          <div className="card">
            <p className="eyebrow">Rules</p>
            <h3>Governance principles</h3>
            <p>{rules?.body || 'The foundation operates with transparency, responsibility, and collective service.'}</p>
          </div>
          <div className="card">
            <p className="eyebrow">Other initiatives</p>
            <h3>Community collaborations</h3>
            <p>{others?.body || 'The organization continues to support outreach, partnerships, and civic initiatives.'}</p>
          </div>
        </section>

        <section id="activites" className="section-grid two-up">
          <div className="card large-card">
            <p className="eyebrow">Works done</p>
            <h2>{works?.title || 'Works done'}</h2>
            <p>{works?.body || 'The organization has carried out community-oriented programs and social initiatives.'}</p>
          </div>
          <div className="card">
            <p className="eyebrow">Publications</p>
            <h3>{publication?.title || 'Publication'}</h3>
            <p>{publication?.body || 'Publications and notices are shared with members and the community.'}</p>
          </div>
        </section>

        <section id="publications" className="section-grid three-up">
          {content.publication?.slice(0, 3).map((item) => (
            <div key={item.id} className="card">
              <p className="eyebrow">Publication item</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </section>

        <section id="team" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Leadership and members</p>
            <h2>Board, community members and advisors</h2>
          </div>

          <div className="section-grid three-up">
            <div className="card">
              <h3>Board of members</h3>
              {boardMembers.length === 0 ? <p>No records yet.</p> : boardMembers.map((person) => (
                <div key={person.id} className="person-card">
                  <strong>{person.name}</strong>
                  {person.position && <span>{person.position}</span>}
                </div>
              ))}
            </div>
            <div className="card">
              <h3>Current members</h3>
              {currentMembers.length === 0 ? <p>No records yet.</p> : currentMembers.map((person) => (
                <div key={person.id} className="person-card">
                  <strong>{person.name}</strong>
                  {person.position && <span>{person.position}</span>}
                </div>
              ))}
            </div>
            <div className="card">
              <h3>Past members</h3>
              {pastMembers.length === 0 ? <p>No records yet.</p> : pastMembers.map((person) => (
                <div key={person.id} className="person-card">
                  <strong>{person.name}</strong>
                  {person.position && <span>{person.position}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="section-grid three-up mt-16">
            <div className="card">
              <h3>Advisors</h3>
              {advisors.length === 0 ? <p>No records yet.</p> : advisors.map((person) => (
                <div key={person.id} className="person-card">
                  <strong>{person.name}</strong>
                  {person.position && <span>{person.position}</span>}
                </div>
              ))}
            </div>
            <div className="card">
              <h3>Current advisors</h3>
              {currentAdvisors.length === 0 ? <p>No records yet.</p> : currentAdvisors.map((person) => (
                <div key={person.id} className="person-card">
                  <strong>{person.name}</strong>
                  {person.position && <span>{person.position}</span>}
                </div>
              ))}
            </div>
            <div className="card">
              <h3>Past advisors</h3>
              {pastAdvisors.length === 0 ? <p>No records yet.</p> : pastAdvisors.map((person) => (
                <div key={person.id} className="person-card">
                  <strong>{person.name}</strong>
                  {person.position && <span>{person.position}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="card mt-16">
            <h3>Lifetime members</h3>
            <div className="pill-row">
              {lifetimeMembers.length === 0 ? <p>No records yet.</p> : lifetimeMembers.map((person) => (
                <span key={person.id} className="pill">{person.name}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Gallery</p>
            <h2>Moments from the community</h2>
          </div>
          <div className="gallery-grid">
            {images.length === 0 ? <p className="empty-state">No gallery images have been added yet.</p> : images.map((image) => (
              <div key={image.id} className="gallery-card">
                <img src={image.imageUrl} alt={image.title} />
                <div>
                  <h3>{image.title}</h3>
                  {image.description && <p>{image.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="membership" className="membership-section">
          <div className="card auth-card">
            <div className="section-heading">
              <p className="eyebrow">Member access</p>
              <h2>{user ? `Welcome back, ${user.fullName || user.email}` : 'Join or sign in'}</h2>
            </div>

            {!user ? (
              <>
                <div className="auth-toggle">
                  <button type="button" className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Login</button>
                  <button type="button" className={authMode === 'register' ? 'active' : ''} onClick={() => setAuthMode('register')}>Register</button>
                </div>
                <form className="auth-form" onSubmit={handleSubmit}>
                  {authMode === 'register' && (
                    <input placeholder="Full name" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required />
                  )}
                  <input type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
                  <input type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
                  <button type="submit">{authMode === 'register' ? 'Create account' : 'Sign in'}</button>
                </form>
              </>
            ) : (
              <div className="member-panel">
                <p>You can now access the protected members list.</p>
                {loadingMembers ? <p>Loading protected members...</p> : members.length === 0 ? <p>No members found yet.</p> : <ul>{members.map((member) => <li key={member.id}>{member.fullName} — {member.email}</li>)}</ul>}
                <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}

            {user && ['admin', 'superadmin', 'executive'].some((role) => user.roles?.includes(role)) && (
              <div className="admin-panel">
                <div className="section-heading">
                  <p className="eyebrow">Management</p>
                  <h3>Site content and role management</h3>
                </div>
                <button type="button" className="logout-btn" onClick={() => setShowAdminPanel((value) => !value)}>
                  {showAdminPanel ? 'Hide admin tools' : 'Show admin tools'}
                </button>

                {showAdminPanel && (
                  <div className="admin-forms">
                    <form className="auth-form" onSubmit={submitContent}>
                      <h4>Add content</h4>
                      <input placeholder="Category" value={contentForm.category} onChange={(event) => setContentForm({ ...contentForm, category: event.target.value })} required />
                      <input placeholder="Title" value={contentForm.title} onChange={(event) => setContentForm({ ...contentForm, title: event.target.value })} required />
                      <textarea placeholder="Body" value={contentForm.body} onChange={(event) => setContentForm({ ...contentForm, body: event.target.value })} required />
                      <input placeholder="Summary" value={contentForm.summary} onChange={(event) => setContentForm({ ...contentForm, summary: event.target.value })} />
                      <input type="number" placeholder="Sort order" value={contentForm.sortOrder} onChange={(event) => setContentForm({ ...contentForm, sortOrder: Number(event.target.value) })} />
                      <label><input type="checkbox" checked={contentForm.isActive} onChange={(event) => setContentForm({ ...contentForm, isActive: event.target.checked })} /> Active</label>
                      <button type="submit">Save content</button>
                    </form>

                    <form className="auth-form" onSubmit={submitPerson}>
                      <h4>Add person</h4>
                      <input placeholder="Category" value={personForm.category} onChange={(event) => setPersonForm({ ...personForm, category: event.target.value })} required />
                      <input placeholder="Name" value={personForm.name} onChange={(event) => setPersonForm({ ...personForm, name: event.target.value })} required />
                      <input placeholder="Position" value={personForm.position} onChange={(event) => setPersonForm({ ...personForm, position: event.target.value })} />
                      <textarea placeholder="Description" value={personForm.description} onChange={(event) => setPersonForm({ ...personForm, description: event.target.value })} />
                      <input placeholder="Image URL" value={personForm.imageUrl} onChange={(event) => setPersonForm({ ...personForm, imageUrl: event.target.value })} />
                      <input placeholder="External link" value={personForm.externalLink} onChange={(event) => setPersonForm({ ...personForm, externalLink: event.target.value })} />
                      <input type="number" placeholder="Sort order" value={personForm.sortOrder} onChange={(event) => setPersonForm({ ...personForm, sortOrder: Number(event.target.value) })} />
                      <label><input type="checkbox" checked={personForm.isActive} onChange={(event) => setPersonForm({ ...personForm, isActive: event.target.checked })} /> Active</label>
                      <button type="submit">Save person</button>
                    </form>

                    <form className="auth-form" onSubmit={submitImage}>
                      <h4>Add gallery image</h4>
                      <input placeholder="Category" value={imageForm.category} onChange={(event) => setImageForm({ ...imageForm, category: event.target.value })} required />
                      <input placeholder="Title" value={imageForm.title} onChange={(event) => setImageForm({ ...imageForm, title: event.target.value })} required />
                      <textarea placeholder="Description" value={imageForm.description} onChange={(event) => setImageForm({ ...imageForm, description: event.target.value })} />
                      <input placeholder="Image URL" value={imageForm.imageUrl} onChange={(event) => setImageForm({ ...imageForm, imageUrl: event.target.value })} required />
                      <input type="number" placeholder="Sort order" value={imageForm.sortOrder} onChange={(event) => setImageForm({ ...imageForm, sortOrder: Number(event.target.value) })} />
                      <label><input type="checkbox" checked={imageForm.isActive} onChange={(event) => setImageForm({ ...imageForm, isActive: event.target.checked })} /> Active</label>
                      <button type="submit">Save image</button>
                    </form>

                    <form className="auth-form" onSubmit={submitRole}>
                      <h4>Create role</h4>
                      <input placeholder="Role name" value={roleForm.name} onChange={(event) => setRoleForm({ ...roleForm, name: event.target.value })} required />
                      <div className="pill-row">
                        {availablePermissions.map((permission) => (
                          <label key={permission} className="pill-checkbox">
                            <input type="checkbox" checked={roleForm.permissions.includes(permission)} onChange={(event) => {
                              const next = event.target.checked
                                ? [...roleForm.permissions, permission]
                                : roleForm.permissions.filter((item) => item !== permission)
                              setRoleForm({ ...roleForm, permissions: next })
                            }} /> {permission}
                          </label>
                        ))}
                      </div>
                      <button type="submit">Save role</button>
                    </form>

                    <div className="card">
                      <h4>Existing roles</h4>
                      {roles.length === 0 ? <p>No roles yet.</p> : roles.map((role) => (
                        <div key={role} className="person-card">
                          <strong>{role}</strong>
                          <span>{(rolePermissions[role] ?? []).join(', ') || 'No permissions assigned'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {message && <p className="message">{message}</p>}
            {siteMessage && <p className="message error">{siteMessage}</p>}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
