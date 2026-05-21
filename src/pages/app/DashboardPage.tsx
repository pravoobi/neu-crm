import { StatCard, Card, CardHeader, CardTitle, CardContent, Badge } from '@practics/ui'
import { Users, Megaphone, DollarSign, TrendingUp, ArrowRight } from 'lucide-react'

const kpis = [
  {
    label: 'Total Contacts',
    value: '2,847',
    change: '+12% from last month',
    trend: 'up' as const,
    icon: <Users size={20} />,
  },
  {
    label: 'Active Campaigns',
    value: '5',
    change: '2 new this week',
    trend: 'up' as const,
    icon: <Megaphone size={20} />,
  },
  {
    label: 'Revenue Tracked',
    value: '$148,200',
    change: '+8.3% from last month',
    trend: 'up' as const,
    icon: <DollarSign size={20} />,
  },
  {
    label: 'Conversion Rate',
    value: '3.6%',
    change: '−0.4% from last month',
    trend: 'down' as const,
    icon: <TrendingUp size={20} />,
  },
]

const recentActivity = [
  { id: 1, type: 'contact',  text: 'New contact Sarah Chen added',          time: '2 min ago',  badge: 'New'      },
  { id: 2, type: 'campaign', text: 'Campaign "Spring Promo" went live',      time: '1 hr ago',   badge: 'Live'     },
  { id: 3, type: 'contact',  text: 'Marcus Williams moved to Qualified',     time: '3 hrs ago',  badge: 'Updated'  },
  { id: 4, type: 'campaign', text: 'Campaign "Q1 Nurture" completed',        time: '5 hrs ago',  badge: 'Done'     },
  { id: 5, type: 'contact',  text: '14 contacts imported from CSV',          time: 'Yesterday',  badge: 'Import'   },
]

const badgeVariant = (badge: string) => {
  if (badge === 'New' || badge === 'Live') return 'default' as const
  if (badge === 'Done') return 'secondary' as const
  return 'outline' as const
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back — here's what's happening today.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            icon={kpi.icon}
          />
        ))}
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Activity</CardTitle>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            View all <ArrowRight size={12} />
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <ul>
            {recentActivity.map((item, index) => (
              <li
                key={item.id}
                className={`flex items-center justify-between px-6 py-3 ${
                  index < recentActivity.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <span className="text-sm text-foreground">{item.text}</span>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <Badge variant={badgeVariant(item.badge)}>{item.badge}</Badge>
                  <span className="text-xs text-muted-foreground w-16 text-right">
                    {item.time}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

    </div>
  )
}
