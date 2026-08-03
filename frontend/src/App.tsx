import { useEffect, useState, type FormEvent } from 'react'
import './index.css'

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
  titleEn?: string | null
  titleNe?: string | null
  bodyEn?: string | null
  bodyNe?: string | null
  summaryEn?: string | null
  summaryNe?: string | null
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
  nameEn?: string | null
  nameNe?: string | null
  positionEn?: string | null
  positionNe?: string | null
  descriptionEn?: string | null
  descriptionNe?: string | null
  sortOrder: number
  isActive: boolean
}

type SiteImage = {
  id: number
  category: string
  title: string
  description?: string | null
  imageUrl: string
  titleEn?: string | null
  titleNe?: string | null
  descriptionEn?: string | null
  descriptionNe?: string | null
  sortOrder: number
  isActive: boolean
}

type AuthUser = {
  email: string
  fullName: string
  roles?: string[]
}

type AuthMode = 'login' | 'register'
type Language = 'en' | 'ne'

type ContentForm = {
  category: string
  title: string
  body: string
  summary: string
  titleEn: string
  titleNe: string
  bodyEn: string
  bodyNe: string
  summaryEn: string
  summaryNe: string
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
  nameEn: string
  nameNe: string
  positionEn: string
  positionNe: string
  descriptionEn: string
  descriptionNe: string
  sortOrder: number
  isActive: boolean
}

type ImageForm = {
  category: string
  title: string
  description: string
  imageUrl: string
  titleEn: string
  titleNe: string
  descriptionEn: string
  descriptionNe: string
  sortOrder: number
  isActive: boolean
}

type RoleForm = {
  name: string
  permissions: string[]
}

const getLocalizedValue = (language: Language, english?: string | null, nepali?: string | null, fallback?: string | null) => {
  if (language === 'ne') {
    return nepali?.trim() || english?.trim() || fallback?.trim() || ''
  }

  return english?.trim() || fallback?.trim() || ''
}

function App() {
  const [members, setMembers] = useState<Member[]>([])
  const [loadingMembers, setLoadingMembers] = useState(true)
  const [, setSiteLoading] = useState(true)
  const [, setSiteMessage] = useState('')
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [language, setLanguage] = useState<Language>('ne')
  const [user, setUser] = useState<AuthUser | null>(null)
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const [content, setContent] = useState<Record<string, SiteContent[]>>({})
  const [people, setPeople] = useState<Record<string, PersonProfile[]>>({})
  const [images, setImages] = useState<SiteImage[]>([])
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [contentForm, setContentForm] = useState<ContentForm>({ category: 'Introduction', title: '', body: '', summary: '', titleEn: '', titleNe: '', bodyEn: '', bodyNe: '', summaryEn: '', summaryNe: '', sortOrder: 0, isActive: true })
  const [personForm, setPersonForm] = useState<PersonForm>({ category: 'Current Members', name: '', position: '', description: '', imageUrl: '', externalLink: '', nameEn: '', nameNe: '', positionEn: '', positionNe: '', descriptionEn: '', descriptionNe: '', sortOrder: 0, isActive: true })
  const [imageForm, setImageForm] = useState<ImageForm>({ category: 'Gallery', title: '', description: '', imageUrl: '', titleEn: '', titleNe: '', descriptionEn: '', descriptionNe: '', sortOrder: 0, isActive: true })
  const [roleForm, setRoleForm] = useState<RoleForm>({ name: '', permissions: [] })
  const [roles, setRoles] = useState<string[]>([])
  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>({})
  const [availablePermissions] = useState(['content.write', 'roles.read', 'roles.write', 'members.read'])
  const [editingContentId, setEditingContentId] = useState<number | null>(null)
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null)
  const [editingImageId, setEditingImageId] = useState<number | null>(null)
  const [editingRoleName, setEditingRoleName] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const resetContentForm = () => {
    setContentForm({ category: 'Introduction', title: '', body: '', summary: '', titleEn: '', titleNe: '', bodyEn: '', bodyNe: '', summaryEn: '', summaryNe: '', sortOrder: 0, isActive: true })
    setEditingContentId(null)
  }

  const resetPersonForm = () => {
    setPersonForm({ category: 'Current Members', name: '', position: '', description: '', imageUrl: '', externalLink: '', nameEn: '', nameNe: '', positionEn: '', positionNe: '', descriptionEn: '', descriptionNe: '', sortOrder: 0, isActive: true })
    setEditingPersonId(null)
  }

  const resetImageForm = () => {
    setImageForm({ category: 'Gallery', title: '', description: '', imageUrl: '', titleEn: '', titleNe: '', descriptionEn: '', descriptionNe: '', sortOrder: 0, isActive: true })
    setEditingImageId(null)
  }

  const resetRoleForm = () => {
    setRoleForm({ name: '', permissions: [] })
    setEditingRoleName(null)
  }

  const startEditingContent = (item: SiteContent) => {
    setContentForm({
      category: item.category,
      title: item.title,
      body: item.body,
      summary: item.summary ?? '',
      titleEn: item.titleEn ?? '',
      titleNe: item.titleNe ?? '',
      bodyEn: item.bodyEn ?? '',
      bodyNe: item.bodyNe ?? '',
      summaryEn: item.summaryEn ?? '',
      summaryNe: item.summaryNe ?? '',
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    })
    setEditingContentId(item.id)
  }

  const startEditingPerson = (item: PersonProfile) => {
    setPersonForm({
      category: item.category,
      name: item.name,
      position: item.position ?? '',
      description: item.description ?? '',
      imageUrl: item.imageUrl ?? '',
      externalLink: item.externalLink ?? '',
      nameEn: item.nameEn ?? '',
      nameNe: item.nameNe ?? '',
      positionEn: item.positionEn ?? '',
      positionNe: item.positionNe ?? '',
      descriptionEn: item.descriptionEn ?? '',
      descriptionNe: item.descriptionNe ?? '',
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    })
    setEditingPersonId(item.id)
  }

  const startEditingImage = (item: SiteImage) => {
    setImageForm({
      category: item.category,
      title: item.title,
      description: item.description ?? '',
      imageUrl: item.imageUrl,
      titleEn: item.titleEn ?? '',
      titleNe: item.titleNe ?? '',
      descriptionEn: item.descriptionEn ?? '',
      descriptionNe: item.descriptionNe ?? '',
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    })
    setEditingImageId(item.id)
  }

  const startEditingRole = (roleName: string) => {
    setRoleForm({
      name: roleName,
      permissions: rolePermissions[roleName] ?? [],
    })
    setEditingRoleName(roleName)
  }

  const submitContent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const payload = {
        category: contentForm.category,
        title: contentForm.title,
        body: contentForm.body,
        summary: contentForm.summary,
        titleEn: contentForm.titleEn,
        titleNe: contentForm.titleNe,
        bodyEn: contentForm.bodyEn,
        bodyNe: contentForm.bodyNe,
        summaryEn: contentForm.summaryEn,
        summaryNe: contentForm.summaryNe,
        sortOrder: contentForm.sortOrder,
        isActive: contentForm.isActive,
      }

      if (editingContentId) {
        await requestWithAuth(`/api/SiteContent/content/${editingContentId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
        setMessage('Content updated successfully.')
      } else {
        await requestWithAuth('/api/SiteContent/content', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        setMessage('Content created successfully.')
      }

      resetContentForm()
      void loadSiteContent()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save content.')
    }
  }

  const submitPerson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const payload = {
        category: personForm.category,
        name: personForm.name,
        position: personForm.position,
        description: personForm.description,
        imageUrl: personForm.imageUrl,
        externalLink: personForm.externalLink,
        nameEn: personForm.nameEn,
        nameNe: personForm.nameNe,
        positionEn: personForm.positionEn,
        positionNe: personForm.positionNe,
        descriptionEn: personForm.descriptionEn,
        descriptionNe: personForm.descriptionNe,
        sortOrder: personForm.sortOrder,
        isActive: personForm.isActive,
      }

      if (editingPersonId) {
        await requestWithAuth(`/api/SiteContent/people/${editingPersonId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
        setMessage('Person record updated successfully.')
      } else {
        await requestWithAuth('/api/SiteContent/people', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        setMessage('Person record created successfully.')
      }

      resetPersonForm()
      void loadSiteContent()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save person.')
    }
  }

  const submitImage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const payload = {
        category: imageForm.category,
        title: imageForm.title,
        description: imageForm.description,
        imageUrl: imageForm.imageUrl,
        titleEn: imageForm.titleEn,
        titleNe: imageForm.titleNe,
        descriptionEn: imageForm.descriptionEn,
        descriptionNe: imageForm.descriptionNe,
        sortOrder: imageForm.sortOrder,
        isActive: imageForm.isActive,
      }

      if (editingImageId) {
        await requestWithAuth(`/api/SiteContent/images/${editingImageId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
        setMessage('Image updated successfully.')
      } else {
        await requestWithAuth('/api/SiteContent/images', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        setMessage('Image created successfully.')
      }

      resetImageForm()
      void loadSiteContent()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save image.')
    }
  }

  const deleteContent = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;
    try {
      await requestWithAuth(`/api/SiteContent/content/${id}`, { method: 'DELETE' })
      setMessage('Content deleted successfully.')
      void loadSiteContent()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to delete content.')
    }
  }

  const deletePerson = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return;
    try {
      await requestWithAuth(`/api/SiteContent/people/${id}`, { method: 'DELETE' })
      setMessage('Person deleted successfully.')
      void loadSiteContent()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to delete person.')
    }
  }

  const deleteImage = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      await requestWithAuth(`/api/SiteContent/images/${id}`, { method: 'DELETE' })
      setMessage('Image deleted successfully.')
      void loadSiteContent()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to delete image.')
    }
  }

  const deleteRole = async (roleName: string) => {
    if (!window.confirm('Are you sure you want to delete this role?')) return;
    try {
      await requestWithAuth(`/api/roles/${roleName}`, { method: 'DELETE' })
      setMessage('Role deleted successfully.')
      void loadAdminData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to delete role.')
    }
  }

  const submitRole = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (editingRoleName) {
        await requestWithAuth('/api/roles/permissions', {
          method: 'PUT',
          body: JSON.stringify({ roleName: editingRoleName, permissions: roleForm.permissions }),
        })
        setMessage('Role updated successfully.')
      } else {
        await requestWithAuth('/api/roles', {
          method: 'POST',
          body: JSON.stringify({ name: roleForm.name }),
        })
        await requestWithAuth('/api/roles/permissions', {
          method: 'POST',
          body: JSON.stringify({ roleName: roleForm.name, permissions: roleForm.permissions }),
        })
        setMessage('Role created successfully.')
      }

      resetRoleForm()
      void loadAdminData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save role.')
    }
  }

  const getLocalizedContent = (item?: SiteContent) => ({
    title: getLocalizedValue(language, item?.titleEn, item?.titleNe, item?.title),
    body: getLocalizedValue(language, item?.bodyEn, item?.bodyNe, item?.body),
    summary: getLocalizedValue(language, item?.summaryEn, item?.summaryNe, item?.summary),
  })

  const getLocalizedPerson = (item?: PersonProfile) => ({
    name: getLocalizedValue(language, item?.nameEn, item?.nameNe, item?.name),
    position: getLocalizedValue(language, item?.positionEn, item?.positionNe, item?.position),
    description: getLocalizedValue(language, item?.descriptionEn, item?.descriptionNe, item?.description),
  })

  const getLocalizedImage = (item?: SiteImage) => ({
    title: getLocalizedValue(language, item?.titleEn, item?.titleNe, item?.title),
    description: getLocalizedValue(language, item?.descriptionEn, item?.descriptionNe, item?.description),
  })

  const introduction = content.introduction?.[0]
  const hometown = content.hometownIntroduction?.[0]
  const aims = content.aims?.[0]
  const rules = content.rules?.[0]

  const introText = getLocalizedContent(introduction)
  const hometownText = getLocalizedContent(hometown)
  const aimsText = getLocalizedContent(aims)
  const rulesText = getLocalizedContent(rules)

  const boardMembers = people.boardOfMembers ?? []
  const currentMembers = people.currentMembers ?? []
  const pastMembers = people.pastMembers ?? []
  const advisors = people.advisors ?? []
  const currentAdvisors = people.currentAdvisors ?? []
  const pastAdvisors = people.pastAdvisors ?? []
  const lifetimeMembers = people.lifetimeMembers ?? []

  const renderPeopleGrid = (items: PersonProfile[]) => {
      if (!items || items.length === 0) return <p className="col-span-full text-center text-slate-400 font-light">No records found.</p>;
      return items.map((person) => {
          const localized = getLocalizedPerson(person)
          return (
              <div key={person.id} className="text-center group">
                  <div className="w-28 h-28 mx-auto mb-4 overflow-hidden rounded-full border border-slate-200 group-hover:border-brand-gold/50 transition-colors">
                      {person.imageUrl ? (
                          <img src={person.imageUrl} alt={localized.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                              <i className="fa-solid fa-user text-3xl"></i>
                          </div>
                      )}
                  </div>
                  <h4 className="text-lg font-medium text-brand-navy font-nepali">{localized.name}</h4>
                  <p className="text-slate-500 text-xs mt-1 font-nepali">{localized.position}</p>
                  {localized.description && <p className="text-slate-400 text-[10px] mt-1 font-nepali">{localized.description}</p>}
              </div>
          )
      })
  }

  return (
    <div className={`text-slate-700 antialiased selection:bg-brand-gold selection:text-white scroll-smooth ${language === 'ne' ? 'font-nepali' : ''}`}>
      <nav id="navbar" className="fixed w-full z-50 transition-all duration-500 glass-nav py-2 bg-white/95 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex-shrink-0 flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
                    <div className="w-10 h-10 border-2 border-brand-navy rounded-full flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-colors duration-300">
                        <i className="fa-solid fa-mountain-sun text-lg"></i>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-brand-navy tracking-tight font-nepali leading-none">
                            {language === 'ne' ? 'थोर्गा काठमाडौं' : 'Thorga Kathmandu'}
                        </h1>
                        <p className="text-[11px] text-slate-500 font-medium tracking-widest uppercase mt-1 font-nepali">
                            {language === 'ne' ? 'सम्पर्क तथा विकास मञ्च' : 'Contact & Development Forum'}
                        </p>
                    </div>
                </div>

                <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-600">
                    <div className="relative dropdown py-4">
                        <button className="flex items-center gap-1.5 hover:text-brand-navy transition font-nepali">
                            {language === 'ne' ? 'संस्था परिचय' : 'About'} <i className="fa-solid fa-chevron-down text-[10px] opacity-70"></i>
                        </button>
                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-3 dropdown-menu z-50 font-nepali">
                            <a href="#about" className="block px-5 py-2 hover:bg-slate-50 hover:text-brand-gold transition">{language === 'ne' ? 'थोर्गाको परिचय' : 'Introduction'}</a>
                            <a href="#objectives" className="block px-5 py-2 hover:bg-slate-50 hover:text-brand-gold transition">{language === 'ne' ? 'उद्देश्य' : 'Objectives'}</a>
                            
                            <div className="relative nested-dropdown px-5 py-2 hover:bg-slate-50 transition cursor-pointer flex justify-between items-center group/nested">
                                <span className="group-hover/nested:text-brand-gold">{language === 'ne' ? 'पदाधिकारी' : 'Board Members'}</span>
                                <i className="fa-solid fa-chevron-right text-[10px] opacity-50"></i>
                                <div className="absolute nested-dropdown-menu w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-3">
                                    <a href="#team" className="block px-5 py-2 hover:bg-slate-50 hover:text-brand-gold transition">{language === 'ne' ? 'वर्तमान समिति' : 'Current Committee'}</a>
                                </div>
                            </div>
                            
                            <div className="relative nested-dropdown px-5 py-2 hover:bg-slate-50 transition cursor-pointer flex justify-between items-center group/nested">
                                <span className="group-hover/nested:text-brand-gold">{language === 'ne' ? 'सल्लाहकार' : 'Advisors'}</span>
                                <i className="fa-solid fa-chevron-right text-[10px] opacity-50"></i>
                                <div className="absolute nested-dropdown-menu w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-3">
                                    <a href="#advisors" className="block px-5 py-2 hover:bg-slate-50 hover:text-brand-gold transition">{language === 'ne' ? 'वर्तमान सल्लाहकारहरु' : 'Current Advisors'}</a>
                                </div>
                            </div>

                            <div className="my-2 border-t border-slate-100"></div>
                            <a href="#membership" className="block px-5 py-2 hover:bg-slate-50 hover:text-brand-gold transition text-brand-blue">{language === 'ne' ? 'आजीवन सदस्य' : 'Life Members'}</a>
                        </div>
                    </div>

                    <a href="#activities" className="hover:text-brand-navy transition font-nepali py-4">{language === 'ne' ? 'गतिविधि' : 'Activities'}</a>
                    <a href="#publications" className="hover:text-brand-navy transition font-nepali py-4">{language === 'ne' ? 'प्रकाशन' : 'Publications'}</a>
                    
                    <div className="relative dropdown py-4">
                        <button className="flex items-center gap-1.5 hover:text-brand-navy transition font-nepali">
                            {language === 'ne' ? 'अन्य' : 'Others'} <i className="fa-solid fa-chevron-down text-[10px] opacity-70"></i>
                        </button>
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-3 dropdown-menu z-50 font-nepali">
                            <a href="#organizations" className="block px-5 py-2 hover:bg-slate-50 hover:text-brand-gold transition">{language === 'ne' ? 'थोर्गेली संस्थाहरु' : 'Affiliated'}</a>
                        </div>
                    </div>

                    <a href="#gallery" className="hover:text-brand-navy transition font-nepali py-4">{language === 'ne' ? 'फोटो ग्यालरी' : 'Gallery'}</a>
                    <button onClick={() => setLanguage(language === 'en' ? 'ne' : 'en')} className="hover:text-brand-gold transition font-bold py-4 text-brand-blue">
                        {language === 'en' ? 'नेपाली' : 'English'}
                    </button>
                </div>

                <div className="hidden lg:flex items-center">
                    <a href="#membership" className="bg-brand-navy hover:bg-brand-blue text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 font-nepali hover:shadow-lg hover:shadow-brand-navy/20">
                        {language === 'ne' ? 'सदस्य बन्नुहोस्' : 'Become a member'}
                    </a>
                </div>

                <div className="lg:hidden flex items-center">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-brand-navy focus:outline-none p-2">
                        <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-xl`}></i>
                    </button>
                </div>
            </div>
        </div>

        {mobileMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full shadow-2xl transition-all font-nepali">
                <div className="px-6 py-8 space-y-4 max-h-[80vh] overflow-y-auto">
                    <div className="space-y-3 pb-4 border-b border-slate-100">
                        <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">{language === 'ne' ? 'संस्था परिचय' : 'About'}</p>
                        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 pl-2">{language === 'ne' ? 'थोर्गाको परिचय' : 'Introduction'}</a>
                        <a href="#objectives" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 pl-2">{language === 'ne' ? 'उद्देश्य' : 'Objectives'}</a>
                        <a href="#team" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 pl-2">{language === 'ne' ? 'पदाधिकारी' : 'Board Members'}</a>
                        <a href="#advisors" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 pl-2">{language === 'ne' ? 'सल्लाहकार' : 'Advisors'}</a>
                    </div>
                    <a href="#activities" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-brand-navy border-b border-slate-100 pb-2">{language === 'ne' ? 'गतिविधि' : 'Activities'}</a>
                    <a href="#publications" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-brand-navy border-b border-slate-100 pb-2">{language === 'ne' ? 'प्रकाशन' : 'Publications'}</a>
                    <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-brand-navy border-b border-slate-100 pb-2">{language === 'ne' ? 'फोटो ग्यालरी' : 'Gallery'}</a>
                    
                    <button onClick={() => { setLanguage(language === 'en' ? 'ne' : 'en'); setMobileMenuOpen(false); }} className="block w-full text-left text-lg font-medium text-brand-blue border-b border-slate-100 pb-2">
                        {language === 'en' ? 'Switch to नेपाली' : 'Switch to English'}
                    </button>
                    <div className="pt-6">
                        <a href="#membership" onClick={() => setMobileMenuOpen(false)} className="flex justify-center w-full bg-brand-navy text-white px-6 py-4 rounded-xl font-medium">
                            {language === 'ne' ? 'सदस्य बन्नुहोस्' : 'Become a member'}
                        </a>
                    </div>
                </div>
            </div>
        )}
      </nav>

      <section className="hero-pattern min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-20">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                    <span className="text-white/80 text-xs font-medium tracking-widest uppercase font-nepali">
                        {language === 'ne' ? 'स्थापना २०६०' : 'Est. 2003'}
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-light text-white mb-6 leading-[1.1] tracking-tight">
                    Connecting <span className="font-bold">Thorga</span>,<br />
                    Empowering <span className="text-brand-gold italic font-medium">Communities.</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl font-light leading-relaxed font-nepali">
                    {introText.summary || (language === 'ne' ? 'थोर्गा र काठमाडौं बीचको बलियो सेतु। हाम्रो मौलिक संस्कृति, शिक्षा र दिगो विकासका लागि एकताबद्ध प्रयास।' : 'A strong bridge between Thorga and Kathmandu. A united effort for our original culture, education, and sustainable development.')}
                </p>

                <div className="flex flex-col sm:flex-row gap-5">
                    <a href="#about" className="inline-flex items-center justify-center bg-brand-gold hover:bg-[#b07a38] text-white px-8 py-4 rounded-full font-medium transition-colors font-nepali">
                        {language === 'ne' ? 'हाम्रो बारेमा' : 'About Us'} <i className="fa-solid fa-arrow-right-long ml-3 text-sm"></i>
                    </a>
                    <a href="#membership" className="inline-flex items-center justify-center bg-transparent border border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-medium transition-colors font-nepali">
                        {language === 'ne' ? 'सम्पर्क गर्नुहोस्' : 'Contact Us'}
                    </a>
                </div>
            </div>
        </div>
      </section>

      <section id="objectives" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="max-w-2xl">
                    <h2 className="text-brand-gold font-medium tracking-[0.2em] uppercase text-xs mb-3 font-nepali">
                        {language === 'ne' ? 'हाम्रा लक्ष्यहरु (Objectives)' : 'Objectives'}
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-light text-brand-navy tracking-tight">Key <span className="font-bold">Objectives</span></h3>
                </div>
                <p className="text-slate-500 max-w-md text-sm leading-relaxed font-nepali md:text-right">
                    {aimsText.summary || (language === 'ne' ? 'समाज रुपान्तरण र विकासको लागि हामीले तय गरेका प्रमुख कार्यदिशाहरु।' : 'Our main objectives set for social transformation and development.')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-slate-100">
                <div className="p-10 border-b border-r border-slate-100 group elegant-hover hover:bg-brand-sand transition-colors duration-500">
                    <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center mb-8 group-hover:border-brand-gold group-hover:text-brand-gold transition-colors">
                        <i className="fa-solid fa-om text-lg text-slate-400 group-hover:text-brand-gold transition-colors"></i>
                    </div>
                    <h4 className="text-xl font-medium text-brand-navy mb-4">Cultural Preservation</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-nepali">
                        {aimsText.body || (language === 'ne' ? 'हाम्रो मौलिक संस्कृति, परम्परा, र सम्पदाको संरक्षण तथा प्रवर्द्धन गर्दै भावी पुस्तामा हस्तान्तरण गर्ने महत्वपूर्ण दायित्व।' : 'Preserving our culture and passing it to next generations.')}
                    </p>
                </div>

                <div className="p-10 border-b border-r border-slate-100 group elegant-hover hover:bg-brand-sand transition-colors duration-500">
                    <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center mb-8 group-hover:border-brand-gold group-hover:text-brand-gold transition-colors">
                        <i className="fa-solid fa-hands-holding-circle text-lg text-slate-400 group-hover:text-brand-gold transition-colors"></i>
                    </div>
                    <h4 className="text-xl font-medium text-brand-navy mb-4">Community Development</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-nepali">
                        {rulesText.body || (language === 'ne' ? 'थोर्गा र काठमाडौंमा रहेका सदस्यहरु बीच समन्वय गरी पूर्वाधार, क्षमता अभिवृद्धि र समग्र सामाजिक विकासमा योगदान।' : 'Connecting people for collective community development.')}
                    </p>
                </div>

                <div className="p-10 border-b border-r border-slate-100 group elegant-hover hover:bg-brand-sand transition-colors duration-500">
                    <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center mb-8 group-hover:border-brand-gold group-hover:text-brand-gold transition-colors">
                        <i className="fa-solid fa-book-medical text-lg text-slate-400 group-hover:text-brand-gold transition-colors"></i>
                    </div>
                    <h4 className="text-xl font-medium text-brand-navy mb-4">Education & Health</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-nepali">
                        {language === 'ne' ? 'शिक्षा र स्वास्थ्य क्षेत्रमा सहज पहुँच बढाउन विभिन्न छात्रवृत्ति, नि:शुल्क स्वास्थ्य शिविर, तथा सचेतना कार्यक्रम।' : 'Enhancing education and health with scholarships and free camps.'}
                    </p>
                </div>
            </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-brand-sand relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-pattern-dot"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                <div className="lg:w-1/2 relative w-full">
                    <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1629731454530-58c0c00ceee7?q=80&w=2070&auto=format&fit=crop"
                            alt="Nepal Village" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-brand-navy/10 mix-blend-multiply"></div>
                    </div>
                </div>

                <div className="lg:w-1/2 pt-10 lg:pt-0">
                    <h2 className="text-brand-gold font-medium tracking-[0.2em] uppercase text-xs mb-4 font-nepali">
                        {language === 'ne' ? 'संस्था परिचय (About Organization)' : 'About Organization'}
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-light text-brand-navy mb-8 leading-[1.1] tracking-tight">
                        {introText.title || 'Our Story'} & <span className="font-bold italic">Mission</span>
                    </h3>

                    <div className="space-y-6 text-slate-600 font-nepali text-lg leading-relaxed font-light mb-8">
                        <p>
                            {introText.body || (language === 'ne' ? 'थोर्गाबाट काठमाडौं आई विभिन्न पेशा, व्यवसाय, र अध्ययनमा संलग्न महानुभावहरुलाई एकताबद्ध गर्ने विशुद्ध गैर-नाफामूलक सामाजिक संस्था हो।' : 'A non-profit organization uniting people from Thorga in Kathmandu.')}
                        </p>
                    </div>

                    {hometownText.body && (
                        <div className="p-6 bg-white border border-slate-100 rounded-xl mb-8">
                            <h4 className="font-medium text-brand-navy mb-2">{hometownText.title}</h4>
                            <p className="text-sm text-slate-500 font-nepali">{hometownText.body}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </section>

      <section id="activities" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex justify-between items-end mb-16 border-b border-slate-100 pb-8">
                <div>
                    <h2 className="text-brand-gold font-medium tracking-[0.2em] uppercase text-xs mb-3 font-nepali">
                        {language === 'ne' ? 'गतिविधि (Activities)' : 'Activities'}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-light text-brand-navy tracking-tight">Recent <span className="font-bold">Activities</span></h3>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {content.worksDone?.map((item) => {
                    const localized = getLocalizedContent(item)
                    return (
                        <div key={item.id} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-6 bg-slate-100">
                                <div className="absolute inset-0 bg-brand-navy/5 group-hover:bg-brand-navy/10 transition-colors duration-500"></div>
                            </div>
                            <h4 className="text-xl font-medium text-brand-navy mb-3 group-hover:text-brand-gold transition-colors font-nepali leading-snug">
                                {localized.title}
                            </h4>
                            <p className="text-slate-500 text-sm font-light font-nepali line-clamp-2">{localized.body}</p>
                        </div>
                    )
                })}
            </div>
        </div>
      </section>

      <section id="publications" className="py-24 bg-brand-gray relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex justify-between items-end mb-16 border-b border-slate-200 pb-8">
                <div>
                    <h2 className="text-brand-gold font-medium tracking-[0.2em] uppercase text-xs mb-3 font-nepali">
                        {language === 'ne' ? 'प्रकाशन (Publications)' : 'Publications'}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-light text-brand-navy tracking-tight">Our <span className="font-bold">Publications</span></h3>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {content.publication?.map((item) => {
                    const localized = getLocalizedContent(item)
                    return (
                        <div key={item.id} className="bg-white p-6 rounded-2xl flex gap-6 items-center shadow-sm elegant-hover border border-slate-100">
                            <div className="w-24 h-32 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center border border-slate-200 overflow-hidden relative group">
                                <div className="absolute inset-0 bg-brand-navy/5"></div>
                                <i className="fa-solid fa-book-open text-3xl text-brand-gold"></i>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-brand-navy font-nepali mb-2">{localized.title}</h4>
                                <p className="text-sm text-slate-500 font-nepali font-light mb-4 line-clamp-2">{localized.body}</p>
                                <a href="#" className="text-sm text-brand-gold hover:text-brand-navy transition font-medium font-nepali flex items-center gap-2">
                                    {language === 'ne' ? 'थप पढ्नुहोस्' : 'Read more'} <i className="fa-solid fa-arrow-right-long text-xs"></i>
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
      </section>

      <section id="team" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-20">
                <h2 className="text-brand-gold font-medium tracking-[0.2em] uppercase text-xs mb-3 font-nepali">
                    {language === 'ne' ? 'पदाधिकारी (Office Bearers)' : 'Office Bearers'}
                </h2>
                <h3 className="text-3xl md:text-5xl font-light text-brand-navy tracking-tight mb-6">Executive <span className="font-bold">Committee</span></h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 max-w-5xl mx-auto border-b border-slate-100 pb-20">
                {renderPeopleGrid(boardMembers)}
            </div>

            <div className="mt-20">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-brand-navy tracking-tight mb-2">Current <span className="font-bold">Members</span></h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 max-w-5xl mx-auto border-b border-slate-100 pb-20">
                    {renderPeopleGrid(currentMembers)}
                </div>
            </div>

            <div className="mt-20">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-brand-navy tracking-tight mb-2">Past <span className="font-bold">Members</span></h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 max-w-5xl mx-auto border-b border-slate-100 pb-20">
                    {renderPeopleGrid(pastMembers)}
                </div>
            </div>

            <div id="advisors" className="pt-20">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-brand-navy tracking-tight mb-2">Our <span className="font-bold">Advisors</span></h3>
                </div>

                <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto mb-12">
                    {advisors.length > 0 ? advisors.map((person) => {
                        const localized = getLocalizedPerson(person)
                        return (
                            <div key={person.id} className="flex items-center gap-4 bg-brand-gray/50 px-6 py-4 rounded-full border border-slate-100 elegant-hover">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100 flex items-center justify-center">
                                    {person.imageUrl ? (
                                        <img src={person.imageUrl} alt={localized.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <i className="fa-solid fa-user text-slate-300"></i>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-medium text-brand-navy text-sm font-nepali">{localized.name}</h4>
                                    <p className="text-xs text-slate-500 font-nepali">{localized.position}</p>
                                </div>
                            </div>
                        )
                    }) : <p className="text-slate-400">No advisors found.</p>}
                </div>

                <div className="text-center max-w-2xl mx-auto mb-12 border-t border-slate-100 pt-12">
                    <h3 className="text-2xl md:text-3xl font-light text-brand-navy tracking-tight mb-2">Current <span className="font-bold">Advisors</span></h3>
                </div>
                <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto mb-12">
                    {currentAdvisors.map((person) => {
                        const localized = getLocalizedPerson(person)
                        return (
                            <div key={person.id} className="flex items-center gap-4 bg-brand-gray/50 px-6 py-4 rounded-full border border-slate-100 elegant-hover">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100 flex items-center justify-center">
                                    {person.imageUrl ? (
                                        <img src={person.imageUrl} alt={localized.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <i className="fa-solid fa-user text-slate-300"></i>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-medium text-brand-navy text-sm font-nepali">{localized.name}</h4>
                                    <p className="text-xs text-slate-500 font-nepali">{localized.position}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="text-center max-w-2xl mx-auto mb-12 border-t border-slate-100 pt-12">
                    <h3 className="text-2xl md:text-3xl font-light text-brand-navy tracking-tight mb-2">Past <span className="font-bold">Advisors</span></h3>
                </div>
                <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
                    {pastAdvisors.map((person) => {
                        const localized = getLocalizedPerson(person)
                        return (
                            <div key={person.id} className="flex items-center gap-4 bg-brand-gray/50 px-6 py-4 rounded-full border border-slate-100 elegant-hover">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100 flex items-center justify-center">
                                    {person.imageUrl ? (
                                        <img src={person.imageUrl} alt={localized.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <i className="fa-solid fa-user text-slate-300"></i>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-medium text-brand-navy text-sm font-nepali">{localized.name}</h4>
                                    <p className="text-xs text-slate-500 font-nepali">{localized.position}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
      </section>

      <section id="lifetime" className="py-24 bg-brand-gray relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-brand-gold font-medium tracking-[0.2em] uppercase text-xs mb-3 font-nepali">
                    {language === 'ne' ? 'आजीवन सदस्य (Life Members)' : 'Life Members'}
                </h2>
                <h3 className="text-3xl md:text-5xl font-light text-brand-navy tracking-tight">Our <span className="font-bold">Life Members</span></h3>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                {lifetimeMembers.length > 0 ? lifetimeMembers.map((person) => {
                    const localized = getLocalizedPerson(person)
                    return (
                        <div key={person.id} className="bg-white px-5 py-3 rounded-full border border-slate-200 shadow-sm text-brand-navy font-medium font-nepali elegant-hover">
                            {localized.name} {localized.position ? <span className="text-slate-400 font-light text-sm ml-1">({localized.position})</span> : ''}
                        </div>
                    )
                }) : <p className="text-slate-500">No lifetime members found.</p>}
            </div>
        </div>
      </section>

      <section id="organizations" className="py-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-brand-gold font-medium tracking-[0.2em] uppercase text-xs mb-3 font-nepali">
                    {language === 'ne' ? 'अन्य (Others)' : 'Others'}
                </h2>
                <h3 className="text-2xl md:text-3xl font-light text-brand-navy tracking-tight">
                    {language === 'ne' ? 'सम्बद्ध संस्थाहरु' : 'Affiliated Organizations'}
                </h3>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
                {content.others?.map((item) => {
                    const localized = getLocalizedContent(item)
                    return (
                        <div key={item.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <h4 className="text-lg font-medium text-brand-navy mb-2">{localized.title}</h4>
                            <p className="text-slate-600 font-light">{localized.body}</p>
                            {localized.summary && <p className="text-sm text-brand-gold mt-2">{localized.summary}</p>}
                        </div>
                    )
                })}
            </div>
        </div>
      </section>

      <section id="gallery" className="py-24 bg-brand-navy relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-brand-gold font-medium tracking-[0.2em] uppercase text-xs mb-3 font-nepali">
                    {language === 'ne' ? 'फोटो ग्यालरी (Photo Gallery)' : 'Gallery'}
                </h2>
                <h3 className="text-3xl md:text-5xl font-light text-white tracking-tight">Memories & <span className="font-bold">Moments</span></h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {images.map((image) => {
                    const localized = getLocalizedImage(image)
                    return (
                        <div key={image.id} className="aspect-square rounded-xl overflow-hidden group cursor-pointer">
                            <img src={image.imageUrl} alt={localized.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-80 group-hover:opacity-100" />
                        </div>
                    )
                })}
            </div>
        </div>
      </section>

      <section id="membership" className="py-24 relative bg-brand-sand overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 bg-brand-navy p-10 text-white flex flex-col justify-center">
                    <h3 className="text-2xl font-light mb-4">{user ? `Welcome back, ${user.fullName}` : 'Join or sign in'}</h3>
                    <p className="text-brand-gold font-light opacity-90 mb-8">{user ? 'Manage your account and access admin tools.' : 'Access member directories and administration.'}</p>
                    
                    {!user && (
                        <div className="flex bg-white/10 rounded-lg p-1 mb-8">
                            <button type="button" className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${authMode === 'login' ? 'bg-white text-brand-navy shadow' : 'text-white/70 hover:text-white'}`} onClick={() => setAuthMode('login')}>Login</button>
                            <button type="button" className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${authMode === 'register' ? 'bg-white text-brand-navy shadow' : 'text-white/70 hover:text-white'}`} onClick={() => setAuthMode('register')}>Register</button>
                        </div>
                    )}
                </div>

                <div className="w-full md:w-2/3 p-10">
                    {!user ? (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {authMode === 'register' && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition" placeholder="Full name" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition" type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <input className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
                            </div>
                            <button className="w-full bg-brand-gold hover:bg-[#b07a38] text-white font-medium py-3 rounded-xl transition shadow-lg shadow-brand-gold/30 mt-4" type="submit">
                                {authMode === 'register' ? 'Create Account' : 'Sign In'}
                            </button>
                            {message && <p className="text-sm text-center text-red-500 mt-4">{message}</p>}
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-medium text-brand-navy border-b pb-2 mb-4">Member Directory</h4>
                                {loadingMembers ? <p className="text-slate-500">Loading protected members...</p> : members.length === 0 ? <p className="text-slate-500">No members found.</p> : (
                                    <ul className="space-y-2 max-h-48 overflow-y-auto pr-4">
                                        {members.map((member) => (
                                            <li key={member.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                <span className="font-medium text-brand-navy">{member.fullName}</span>
                                                <span className="text-xs text-slate-500">{member.email}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <button onClick={handleLogout} className="text-sm text-red-500 font-medium hover:text-red-700 transition">Log out</button>

                            {user && ['admin', 'superadmin', 'executive'].some((role) => user.roles?.includes(role)) && (
                                <div className="mt-8 pt-8 border-t border-slate-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="text-xl font-medium text-brand-navy">Administration</h4>
                                        <button onClick={() => setShowAdminPanel(!showAdminPanel)} className="bg-brand-navy text-white px-4 py-2 rounded-lg text-sm hover:bg-brand-blue transition">
                                            {showAdminPanel ? 'Hide Tools' : 'Show Tools'}
                                        </button>
                                    </div>

                                    {showAdminPanel && (
                                        <div className="space-y-12">
                                            {/* Content Form */}
                                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                                <h5 className="font-bold text-brand-navy mb-4">{editingContentId ? 'Edit Content' : 'Add Content'}</h5>
                                                <form onSubmit={submitContent} className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <input className="w-full px-3 py-2 rounded-lg border border-slate-300" placeholder="Category" value={contentForm.category} onChange={e => setContentForm({...contentForm, category: e.target.value})} required />
                                                        <input className="w-full px-3 py-2 rounded-lg border border-slate-300" type="number" placeholder="Sort Order" value={contentForm.sortOrder} onChange={e => setContentForm({...contentForm, sortOrder: Number(e.target.value)})} />
                                                    </div>
                                                    
                                                    {/* Generic Fallback / Optional */}
                                                    <input className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white" placeholder="Fallback Title" value={contentForm.title} onChange={e => setContentForm({...contentForm, title: e.target.value})} required />
                                                    
                                                    {/* English Fields */}
                                                    <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
                                                        <p className="text-xs font-bold text-blue-800 uppercase">English Content</p>
                                                        <input className="w-full px-3 py-2 rounded-lg border border-blue-200" placeholder="Title (English)" value={contentForm.titleEn} onChange={e => setContentForm({...contentForm, titleEn: e.target.value})} />
                                                        <textarea className="w-full px-3 py-2 rounded-lg border border-blue-200 h-24" placeholder="Body (English)" value={contentForm.bodyEn} onChange={e => setContentForm({...contentForm, bodyEn: e.target.value})} />
                                                        <input className="w-full px-3 py-2 rounded-lg border border-blue-200" placeholder="Summary (English)" value={contentForm.summaryEn} onChange={e => setContentForm({...contentForm, summaryEn: e.target.value})} />
                                                    </div>

                                                    {/* Nepali Fields */}
                                                    <div className="p-4 bg-red-50/50 rounded-xl border border-red-100 space-y-3">
                                                        <p className="text-xs font-bold text-red-800 uppercase font-nepali">नेपाली सामग्री</p>
                                                        <input className="w-full px-3 py-2 rounded-lg border border-red-200 font-nepali" placeholder="Title (Nepali)" value={contentForm.titleNe} onChange={e => setContentForm({...contentForm, titleNe: e.target.value})} />
                                                        <textarea className="w-full px-3 py-2 rounded-lg border border-red-200 h-24 font-nepali" placeholder="Body (Nepali)" value={contentForm.bodyNe} onChange={e => setContentForm({...contentForm, bodyNe: e.target.value})} />
                                                        <input className="w-full px-3 py-2 rounded-lg border border-red-200 font-nepali" placeholder="Summary (Nepali)" value={contentForm.summaryNe} onChange={e => setContentForm({...contentForm, summaryNe: e.target.value})} />
                                                    </div>

                                                    <label className="flex items-center gap-2"><input type="checkbox" checked={contentForm.isActive} onChange={e => setContentForm({...contentForm, isActive: e.target.checked})} /> Active</label>
                                                    <div className="flex gap-2">
                                                        <button type="submit" className="bg-brand-navy text-white px-4 py-2 rounded-lg text-sm hover:bg-brand-blue">{editingContentId ? 'Update' : 'Save'}</button>
                                                        {editingContentId && <button type="button" onClick={resetContentForm} className="bg-slate-200 px-4 py-2 rounded-lg text-sm">Cancel</button>}
                                                    </div>
                                                </form>
                                                
                                                <div className="mt-6 max-h-40 overflow-y-auto space-y-2">
                                                    {Object.values(content).flat().map(item => (
                                                        <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded border border-slate-200 text-sm">
                                                            <span className="font-medium truncate mr-2">{item.title} <span className="text-xs text-slate-400">({item.category})</span></span>
                                                            <div className="flex gap-3">
                                                                <button onClick={() => startEditingContent(item)} className="text-brand-gold hover:underline whitespace-nowrap">Edit</button>
                                                                <button onClick={() => deleteContent(item.id)} className="text-red-500 hover:underline whitespace-nowrap">Delete</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Person Form */}
                                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                                <h5 className="font-bold text-brand-navy mb-4">{editingPersonId ? 'Edit Person' : 'Add Person'}</h5>
                                                <form onSubmit={submitPerson} className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <input className="w-full px-3 py-2 rounded-lg border border-slate-300" placeholder="Category" value={personForm.category} onChange={e => setPersonForm({...personForm, category: e.target.value})} required />
                                                        <input className="w-full px-3 py-2 rounded-lg border border-slate-300" type="number" placeholder="Sort Order" value={personForm.sortOrder} onChange={e => setPersonForm({...personForm, sortOrder: Number(e.target.value)})} />
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <input className="w-full px-3 py-2 rounded-lg border border-slate-300" placeholder="Image URL" value={personForm.imageUrl} onChange={e => setPersonForm({...personForm, imageUrl: e.target.value})} />
                                                        <input className="w-full px-3 py-2 rounded-lg border border-slate-300" placeholder="External Link" value={personForm.externalLink} onChange={e => setPersonForm({...personForm, externalLink: e.target.value})} />
                                                    </div>
                                                    
                                                    <input className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white" placeholder="Fallback Name" value={personForm.name} onChange={e => setPersonForm({...personForm, name: e.target.value})} required />
                                                    
                                                    <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
                                                        <p className="text-xs font-bold text-blue-800 uppercase">English Details</p>
                                                        <input className="w-full px-3 py-2 rounded-lg border border-blue-200" placeholder="Name (English)" value={personForm.nameEn} onChange={e => setPersonForm({...personForm, nameEn: e.target.value})} />
                                                        <input className="w-full px-3 py-2 rounded-lg border border-blue-200" placeholder="Position (English)" value={personForm.positionEn} onChange={e => setPersonForm({...personForm, positionEn: e.target.value})} />
                                                        <textarea className="w-full px-3 py-2 rounded-lg border border-blue-200" placeholder="Description (English)" value={personForm.descriptionEn} onChange={e => setPersonForm({...personForm, descriptionEn: e.target.value})} />
                                                    </div>

                                                    <div className="p-4 bg-red-50/50 rounded-xl border border-red-100 space-y-3">
                                                        <p className="text-xs font-bold text-red-800 uppercase font-nepali">नेपाली विवरण</p>
                                                        <input className="w-full px-3 py-2 rounded-lg border border-red-200 font-nepali" placeholder="Name (Nepali)" value={personForm.nameNe} onChange={e => setPersonForm({...personForm, nameNe: e.target.value})} />
                                                        <input className="w-full px-3 py-2 rounded-lg border border-red-200 font-nepali" placeholder="Position (Nepali)" value={personForm.positionNe} onChange={e => setPersonForm({...personForm, positionNe: e.target.value})} />
                                                        <textarea className="w-full px-3 py-2 rounded-lg border border-red-200 font-nepali" placeholder="Description (Nepali)" value={personForm.descriptionNe} onChange={e => setPersonForm({...personForm, descriptionNe: e.target.value})} />
                                                    </div>

                                                    <label className="flex items-center gap-2"><input type="checkbox" checked={personForm.isActive} onChange={e => setPersonForm({...personForm, isActive: e.target.checked})} /> Active</label>
                                                    <div className="flex gap-2">
                                                        <button type="submit" className="bg-brand-navy text-white px-4 py-2 rounded-lg text-sm hover:bg-brand-blue">{editingPersonId ? 'Update' : 'Save'}</button>
                                                        {editingPersonId && <button type="button" onClick={resetPersonForm} className="bg-slate-200 px-4 py-2 rounded-lg text-sm">Cancel</button>}
                                                    </div>
                                                </form>

                                                <div className="mt-6 max-h-40 overflow-y-auto space-y-2">
                                                    {Object.values(people).flat().map(item => (
                                                        <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded border border-slate-200 text-sm">
                                                            <span className="font-medium truncate mr-2">{item.name} <span className="text-xs text-slate-400">({item.category})</span></span>
                                                            <div className="flex gap-3">
                                                                <button onClick={() => startEditingPerson(item)} className="text-brand-gold hover:underline whitespace-nowrap">Edit</button>
                                                                <button onClick={() => deletePerson(item.id)} className="text-red-500 hover:underline whitespace-nowrap">Delete</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Image Form */}
                                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                                <h5 className="font-bold text-brand-navy mb-4">{editingImageId ? 'Edit Image' : 'Add Image'}</h5>
                                                <form onSubmit={submitImage} className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <input className="w-full px-3 py-2 rounded-lg border border-slate-300" placeholder="Category" value={imageForm.category} onChange={e => setImageForm({...imageForm, category: e.target.value})} required />
                                                        <input className="w-full px-3 py-2 rounded-lg border border-slate-300" type="number" placeholder="Sort Order" value={imageForm.sortOrder} onChange={e => setImageForm({...imageForm, sortOrder: Number(e.target.value)})} />
                                                    </div>
                                                    <input className="w-full px-3 py-2 rounded-lg border border-slate-300" placeholder="Image URL" value={imageForm.imageUrl} onChange={e => setImageForm({...imageForm, imageUrl: e.target.value})} required />
                                                    <input className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white" placeholder="Fallback Title" value={imageForm.title} onChange={e => setImageForm({...imageForm, title: e.target.value})} required />
                                                    
                                                    <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
                                                        <p className="text-xs font-bold text-blue-800 uppercase">English Details</p>
                                                        <input className="w-full px-3 py-2 rounded-lg border border-blue-200" placeholder="Title (English)" value={imageForm.titleEn} onChange={e => setImageForm({...imageForm, titleEn: e.target.value})} />
                                                        <textarea className="w-full px-3 py-2 rounded-lg border border-blue-200" placeholder="Description (English)" value={imageForm.descriptionEn} onChange={e => setImageForm({...imageForm, descriptionEn: e.target.value})} />
                                                    </div>

                                                    <div className="p-4 bg-red-50/50 rounded-xl border border-red-100 space-y-3">
                                                        <p className="text-xs font-bold text-red-800 uppercase font-nepali">नेपाली विवरण</p>
                                                        <input className="w-full px-3 py-2 rounded-lg border border-red-200 font-nepali" placeholder="Title (Nepali)" value={imageForm.titleNe} onChange={e => setImageForm({...imageForm, titleNe: e.target.value})} />
                                                        <textarea className="w-full px-3 py-2 rounded-lg border border-red-200 font-nepali" placeholder="Description (Nepali)" value={imageForm.descriptionNe} onChange={e => setImageForm({...imageForm, descriptionNe: e.target.value})} />
                                                    </div>

                                                    <label className="flex items-center gap-2"><input type="checkbox" checked={imageForm.isActive} onChange={e => setImageForm({...imageForm, isActive: e.target.checked})} /> Active</label>
                                                    <div className="flex gap-2">
                                                        <button type="submit" className="bg-brand-navy text-white px-4 py-2 rounded-lg text-sm hover:bg-brand-blue">{editingImageId ? 'Update' : 'Save'}</button>
                                                        {editingImageId && <button type="button" onClick={resetImageForm} className="bg-slate-200 px-4 py-2 rounded-lg text-sm">Cancel</button>}
                                                    </div>
                                                </form>

                                                <div className="mt-6 max-h-40 overflow-y-auto space-y-2">
                                                    {images.map(item => (
                                                        <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded border border-slate-200 text-sm">
                                                            <span className="font-medium truncate mr-2">{item.title} <span className="text-xs text-slate-400">({item.category})</span></span>
                                                            <div className="flex gap-3">
                                                                <button onClick={() => startEditingImage(item)} className="text-brand-gold hover:underline whitespace-nowrap">Edit</button>
                                                                <button onClick={() => deleteImage(item.id)} className="text-red-500 hover:underline whitespace-nowrap">Delete</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Role Form */}
                                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                                <h5 className="font-bold text-brand-navy mb-4">{editingRoleName ? 'Edit Role' : 'Add Role'}</h5>
                                                <form onSubmit={submitRole} className="space-y-4">
                                                    <input className="w-full px-3 py-2 rounded-lg border border-slate-300" placeholder="Role Name" value={roleForm.name} onChange={e => setRoleForm({...roleForm, name: e.target.value})} required />
                                                    <div className="flex flex-wrap gap-2">
                                                        {availablePermissions.map(permission => (
                                                            <label key={permission} className="flex items-center gap-1 text-sm bg-white px-2 py-1 rounded border border-slate-200">
                                                                <input type="checkbox" checked={roleForm.permissions.includes(permission)} onChange={e => {
                                                                    const next = e.target.checked ? [...roleForm.permissions, permission] : roleForm.permissions.filter(p => p !== permission);
                                                                    setRoleForm({...roleForm, permissions: next});
                                                                }} /> {permission}
                                                            </label>
                                                        ))}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button type="submit" className="bg-brand-navy text-white px-4 py-2 rounded-lg text-sm hover:bg-brand-blue">{editingRoleName ? 'Update' : 'Save'}</button>
                                                        {editingRoleName && <button type="button" onClick={resetRoleForm} className="bg-slate-200 px-4 py-2 rounded-lg text-sm">Cancel</button>}
                                                    </div>
                                                </form>

                                                <div className="mt-6 max-h-40 overflow-y-auto space-y-2">
                                                    {roles.map(role => (
                                                        <div key={role} className="flex justify-between items-center bg-white p-2 rounded border border-slate-200 text-sm">
                                                            <span className="font-medium truncate mr-2">{role}</span>
                                                            <div className="flex gap-3">
                                                                <button onClick={() => startEditingRole(role)} className="text-brand-gold hover:underline whitespace-nowrap">Edit</button>
                                                                <button onClick={() => deleteRole(role)} className="text-red-500 hover:underline whitespace-nowrap">Delete</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#07101C] text-slate-400 pt-20 pb-8 font-nepali">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                <div className="lg:pr-8">
                    <div className="flex items-center gap-3 mb-6 opacity-90">
                        <div className="w-8 h-8 border border-slate-600 rounded-full flex items-center justify-center text-white">
                            <i className="fa-solid fa-mountain-sun text-xs"></i>
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-white tracking-wide">थोर्गा काठमाडौं</h2>
                        </div>
                    </div>
                    <p className="text-sm font-light leading-relaxed mb-8 text-slate-500">
                        काठमाडौंमा रहेका थोर्गेलीहरुलाई एकताबद्ध गर्दै सामाजिक विकास र संस्कृतिको संरक्षणमा समर्पित संस्था।
                    </p>
                </div>
            </div>
        </div>
      </footer>
    </div>
  )
}

export default App
