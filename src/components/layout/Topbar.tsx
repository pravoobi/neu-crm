import { useLocation } from 'react-router-dom'
import { Input, Badge, Avatar } from '@practics/ui'
import { Menu, Bell, Search } from 'lucide-react'

const pageTitles: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/contacts':  'Contacts',
  '/app/campaigns': 'Campaigns',
  '/app/settings':  'Settings',
}

const MOCK_USER = { name: 'Jane Smith', initials: 'JS' }
const NOTIFICATION_COUNT = 3

interface TopbarProps {
  onMenuClick: () => void
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? 'NeuCRM'

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-4 sm:px-6">

      {/* Left — mobile menu + page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-1.5 text-muted-foreground hover:text-foreground md:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base font-semibold text-foreground">{title}</h1>
      </div>

      {/* Right — search + notifications + avatar */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:block w-48">
          <Input
            placeholder="Search…"
            iconLeft={<Search size={15} className="text-muted-foreground" />}
            className="h-8 text-sm"
          />
        </div>

        {/* Notification bell */}
        <div className="relative">
          <button
            className="rounded-md p-1.5 text-muted-foreground hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
          {NOTIFICATION_COUNT > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]"
            >
              {NOTIFICATION_COUNT}
            </Badge>
          )}
        </div>

        <Avatar fallback={MOCK_USER.initials} size="sm" />
      </div>
    </header>
  )
}
