"use client";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-[#f3ede6]">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#2f1c14] text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <nav className="flex flex-col gap-3 text-sm">
          <a href="/admin" className="hover:opacity-80">
            Dashboard
          </a>

          <a href="/admin/cafes" className="hover:opacity-80">
            Cafés
          </a>

          <a href="/admin/addons" className="hover:opacity-80">
            Addons
          </a>

          <a href="/admin/commandes" className="hover:opacity-80">
            Commandes
          </a>

          <a href="/admin/utilisateurs" className="hover:opacity-80">
            Utilisateurs
          </a>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}