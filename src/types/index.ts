export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  status: 'lead' | 'prospect' | 'customer' | 'churned'
  createdAt: string
}

export interface Campaign {
  id: string
  name: string
  status: 'draft' | 'active' | 'paused' | 'completed'
  type: 'email' | 'sms' | 'social' | 'ads'
  startDate?: string
  endDate?: string
  budget?: number
  leads: number
  conversions: number
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'agent'
  avatarUrl?: string
}
