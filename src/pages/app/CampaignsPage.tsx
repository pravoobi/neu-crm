import { useState, useMemo } from 'react'
import type { ColumnDef } from '@practics/ui'
import {
  DataTable,
  Badge,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Input,
  Select,
} from '@practics/ui'
import { Plus } from 'lucide-react'

type CampaignStatus = 'Draft' | 'Active' | 'Paused' | 'Completed'
type CampaignType   = 'Email' | 'SMS' | 'Push'

type Campaign = {
  id: number
  name: string
  status: CampaignStatus
  type: CampaignType
  contacts: number
  openRate: string
  startDate: string
}

const SEED_CAMPAIGNS: Campaign[] = [
  { id: 1, name: 'Spring Promo',   status: 'Active',    type: 'Email', contacts: 1240, openRate: '32.4%', startDate: 'May 1, 2026'  },
  { id: 2, name: 'Q1 Nurture',     status: 'Completed', type: 'Email', contacts: 850,  openRate: '28.1%', startDate: 'Mar 1, 2026'  },
  { id: 3, name: 'Re-engagement',  status: 'Active',    type: 'SMS',   contacts: 420,  openRate: '61.0%', startDate: 'May 10, 2026' },
  { id: 4, name: 'Product Launch', status: 'Draft',     type: 'Email', contacts: 0,    openRate: '—',     startDate: '—'            },
  { id: 5, name: 'Win-back 2026',  status: 'Paused',    type: 'Push',  contacts: 300,  openRate: '18.7%', startDate: 'Apr 15, 2026' },
  { id: 6, name: 'Welcome Series', status: 'Active',    type: 'Email', contacts: 680,  openRate: '44.2%', startDate: 'May 15, 2026' },
]

const statusVariant = (s: CampaignStatus) => {
  if (s === 'Active')    return 'default'     as const
  if (s === 'Completed') return 'secondary'   as const
  return 'outline' as const
}

const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: 'name',
    header: 'Campaign',
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const s = getValue() as CampaignStatus
      return <Badge variant={statusVariant(s)}>{s}</Badge>
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    meta: { hideBelow: 'sm' } as Record<string, unknown>,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'contacts',
    header: 'Contacts',
    meta: { hideBelow: 'md' } as Record<string, unknown>,
    cell: ({ getValue }) => (
      <span>{(getValue() as number).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'openRate',
    header: 'Open Rate',
    meta: { hideBelow: 'lg' } as Record<string, unknown>,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    meta: { hideBelow: 'lg' } as Record<string, unknown>,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground text-sm">{getValue() as string}</span>
    ),
  },
]

const EMPTY_FORM = { name: '', type: 'Email' as CampaignType }

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(SEED_CAMPAIGNS)
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | 'All'>('All')
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  const filtered = useMemo(() =>
    statusFilter === 'All'
      ? campaigns
      : campaigns.filter(c => c.status === statusFilter),
    [campaigns, statusFilter]
  )

  function handleAdd() {
    if (!form.name.trim()) return
    const newCampaign: Campaign = {
      id: Date.now(),
      name: form.name.trim(),
      status: 'Draft',
      type: form.type,
      contacts: 0,
      openRate: '—',
      startDate: '—',
    }
    setCampaigns(prev => [newCampaign, ...prev])
    setForm(EMPTY_FORM)
    setAddOpen(false)
  }

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Campaigns</h1>
          <p className="text-sm text-muted-foreground mt-1">{campaigns.length} total campaigns</p>
        </div>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Campaign</DialogTitle>
              <DialogDescription>
                Create a new campaign to start reaching your contacts.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Campaign name *"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              <Select
                value={form.type}
                onValueChange={v => setForm(f => ({ ...f, type: v as CampaignType }))}
                placeholder="Type"
                options={[
                  { value: 'Email', label: 'Email' },
                  { value: 'SMS', label: 'SMS' },
                  { value: 'Push', label: 'Push' },
                ]}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAdd}>Create Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-2">
        {(['All', 'Active', 'Draft', 'Paused', 'Completed'] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              statusFilter === s
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={filtered} />
        </CardContent>
      </Card>

    </div>
  )
}
