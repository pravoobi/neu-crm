import { useState, useMemo } from 'react'
import type { ColumnDef } from '@practics/ui'
import {
  DataTable,
  Badge,
  Button,
  Input,
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
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@practics/ui'
import { Search, UserPlus } from 'lucide-react'

type ContactStatus = 'Lead' | 'Qualified' | 'Customer' | 'Churned'

type Contact = {
  id: number
  name: string
  email: string
  company: string
  status: ContactStatus
  lastContacted: string
}

const SEED_CONTACTS: Contact[] = [
  { id: 1, name: 'Sarah Chen',      email: 'sarah.chen@acme.co',    company: 'Acme Corp',  status: 'Customer',  lastContacted: 'May 17, 2026' },
  { id: 2, name: 'Marcus Williams', email: 'm.williams@globex.io',   company: 'Globex',     status: 'Qualified', lastContacted: 'May 15, 2026' },
  { id: 3, name: 'Priya Nair',      email: 'p.nair@initech.com',     company: 'Initech',    status: 'Lead',      lastContacted: 'May 12, 2026' },
  { id: 4, name: 'James Okafor',    email: 'j.okafor@umbrella.dev',  company: 'Umbrella',   status: 'Churned',   lastContacted: 'Apr 30, 2026' },
  { id: 5, name: 'Elena Vasquez',   email: 'e.vasquez@hooli.net',    company: 'Hooli',      status: 'Lead',      lastContacted: 'May 18, 2026' },
  { id: 6, name: 'Tom Bradley',     email: 't.bradley@pied.io',      company: 'Pied Piper', status: 'Qualified', lastContacted: 'May 10, 2026' },
]

const statusVariant = (s: ContactStatus) => {
  if (s === 'Customer')  return 'default'     as const
  if (s === 'Qualified') return 'secondary'   as const
  if (s === 'Churned')   return 'destructive' as const
  return 'outline' as const
}

const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: { hideBelow: 'sm' } as Record<string, unknown>,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'company',
    header: 'Company',
    meta: { hideBelow: 'md' } as Record<string, unknown>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const s = getValue() as ContactStatus
      return <Badge variant={statusVariant(s)}>{s}</Badge>
    },
  },
  {
    accessorKey: 'lastContacted',
    header: 'Last Contacted',
    meta: { hideBelow: 'lg' } as Record<string, unknown>,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground text-sm">{getValue() as string}</span>
    ),
  },
]

const EMPTY_FORM = { name: '', email: '', company: '', phone: '', status: 'Lead' as ContactStatus }

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(SEED_CONTACTS)
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return contacts
    return contacts.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q)
    )
  }, [contacts, search])

  function handleAdd() {
    if (!form.name.trim()) return
    const newContact: Contact = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      status: form.status,
      lastContacted: new Date().toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      }),
    }
    setContacts(prev => [newContact, ...prev])
    setForm(EMPTY_FORM)
    setAddOpen(false)
  }

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Contacts</h1>
          <p className="text-sm text-muted-foreground mt-1">{contacts.length} total contacts</p>
        </div>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus size={16} className="mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Contact</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new contact.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Full name *"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
              <Input
                placeholder="Company"
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
              />
              <Input
                placeholder="Phone"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              />
              <Select
                value={form.status}
                onValueChange={v => setForm(f => ({ ...f, status: v as ContactStatus }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Churned">Churned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAdd}>Add Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search contacts…"
          className="pl-9"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
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
