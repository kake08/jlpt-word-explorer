import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'My Vocab', to: '/my-vocab' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-linen/90 backdrop-blur">
      <nav className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <NavLink
          to="/"
          className="text-sm font-semibold tracking-[0.08em] text-ink transition hover:text-clay"
        >
          Japanese Knowledge Explorer
        </NavLink>
        <div className="flex items-center gap-1 rounded-[8px] border border-stone-200 bg-paper p-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-[6px] px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-ink text-linen'
                    : 'text-stone-600 hover:bg-linen hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
