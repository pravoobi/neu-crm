import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Input,
  Button,
  Checkbox,
} from '@practics/ui'

type Profile = {
  name: string
  email: string
  role: string
}

type NotifPrefs = {
  newContact: boolean
  campaignLive: boolean
  campaignComplete: boolean
  weeklyDigest: boolean
}

const DEFAULT_PROFILE: Profile = {
  name: 'Jane Smith',
  email: 'jane.smith@neucrm.io',
  role: 'Admin',
}

const DEFAULT_NOTIFS: NotifPrefs = {
  newContact: true,
  campaignLive: true,
  campaignComplete: false,
  weeklyDigest: true,
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE)
  const [notifs, setNotifs] = useState<NotifPrefs>(DEFAULT_NOTIFS)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function toggle(key: keyof NotifPrefs) {
    setNotifs(n => ({ ...n, [key]: !n[key] }))
  }

  return (
    <div className="space-y-6 max-w-2xl">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your profile and notification preferences.</p>
      </div>

      {/* Profile card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="settings-name">
              Full name
            </label>
            <Input
              id="settings-name"
              value={profile.name}
              onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="settings-email">
              Email
            </label>
            <Input
              id="settings-email"
              type="email"
              value={profile.email}
              onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
            />
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="settings-role">
              Role
            </label>
            <Input
              id="settings-role"
              value={profile.role}
              disabled
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          {saved && (
            <span className="text-sm text-muted-foreground">Saved!</span>
          )}
          <Button onClick={handleSave}>Save changes</Button>
        </CardFooter>
      </Card>

      {/* Notifications card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {([
            { key: 'newContact',        label: 'New contact added'         },
            { key: 'campaignLive',      label: 'Campaign goes live'        },
            { key: 'campaignComplete',  label: 'Campaign completes'        },
            { key: 'weeklyDigest',      label: 'Weekly digest email'       },
          ] as const).map(({ key, label }) => (
            <div key={key} className="flex items-center gap-3">
              <Checkbox
                id={`notif-${key}`}
                checked={notifs[key]}
                onCheckedChange={() => toggle(key)}
              />
              <label
                htmlFor={`notif-${key}`}
                className="text-sm text-foreground cursor-pointer"
              >
                {label}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  )
}
