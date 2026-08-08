export const Dashboard = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-ink">Welcome to Admin Panel</h2>
            <p className="text-ink-faint">
                Use the sidebar to manage site content, people profiles, gallery images, members, and roles.
            </p>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-line bg-paper p-6 shadow-sm">
                    <h3 className="font-semibold text-ink">Site Content</h3>
                    <p className="mt-2 text-sm text-ink-faint">Manage homepage content, publications, and works done.</p>
                </div>
                <div className="rounded-lg border border-line bg-paper p-6 shadow-sm">
                    <h3 className="font-semibold text-ink">People</h3>
                    <p className="mt-2 text-sm text-ink-faint">Manage board members, advisors, and general members profiles.</p>
                </div>
                <div className="rounded-lg border border-line bg-paper p-6 shadow-sm">
                    <h3 className="font-semibold text-ink">Members</h3>
                    <p className="mt-2 text-sm text-ink-faint">View and manage registered foundation members.</p>
                </div>
            </div>
        </div>
    )
}
