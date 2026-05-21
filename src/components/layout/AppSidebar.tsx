import { useLocation, useNavigate } from 'react-router-dom'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  NavItem,
  Avatar,
  Button,
} from '@practics/ui'
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Settings,
  LogOut,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItemLinkProps {
  to: string
  icon: LucideIcon
  label: string
  onNavigate?: () => void
}

function NavItemLink({ to, icon: Icon, label, onNavigate }: NavItemLinkProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return (
    <NavItem
      href={to}
      icon={<Icon size={18} />}
      isActive={pathname.startsWith(to)}
      onClick={(e) => {
        e.preventDefault()
        navigate(to)
        onNavigate?.()
      }}
    >
      {label}
    </NavItem>
  )
}

const navItems = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/contacts',  icon: Users,           label: 'Contacts'  },
  { to: '/app/campaigns', icon: Megaphone,        label: 'Campaigns' },
  { to: '/app/settings',  icon: Settings,         label: 'Settings'  },
]

const MOCK_USER = { name: 'Jane Smith', role: 'Admin', initials: 'JS' }

interface AppSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const navigate = useNavigate()

  return (
    <Sidebar isOpen={isOpen} onClose={onClose}>

      {/* Logo */}
      <SidebarHeader>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <span className="text-xs font-bold text-primary-foreground">N</span>
          </div>
          <span className="font-bold text-foreground">NeuCRM</span>
        </button>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarNav>
          {navItems.map((item) => (
            <NavItemLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              onNavigate={onClose}
            />
          ))}
        </SidebarNav>
      </SidebarContent>

      {/* User profile */}
      <SidebarFooter>
        <div className="flex items-center gap-3">
          <Avatar fallback={MOCK_USER.initials} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {MOCK_USER.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {MOCK_USER.role}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/login')}
            aria-label="Sign out"
          >
            <LogOut size={16} />
          </Button>
        </div>
      </SidebarFooter>

    </Sidebar>
  )
}
