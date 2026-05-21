 import { useState } from 'react'
  import { useNavigate, Link } from 'react-router-dom'
  import {
    Button,
    Input,
    Checkbox,
    Alert,
    AlertDescription,
    Stack,
  } from '@practics/ui'
  import { Eye, EyeOff } from 'lucide-react'
  import AuthLayout from './components/AuthLayout'

  export default function RegisterPage() {
    const navigate = useNavigate()

    const [firstName, setFirstName]     = useState('')
    const [lastName, setLastName]       = useState('')
    const [email, setEmail]             = useState('')
    const [password, setPassword]       = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword]       = useState(false)
    const [agreed, setAgreed]           = useState(false)
    const [loading, setLoading]         = useState(false)
    const [error, setError]             = useState('')

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      setError('')

      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        setError('Please fill in all fields.')
        return
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
      }

      if (password.length < 8) {
        setError('Password must be at least 8 characters.')
        return
      }

      if (!agreed) {
        setError('You must agree to the Terms of Service.')
        return
      }

      setLoading(true)

      setTimeout(() => {
        setLoading(false)
        navigate('/app/dashboard')
      }, 1000)
    }

    return (
      <AuthLayout>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Create your account</h1>
          <p className="text-muted-foreground text-sm">Start your free trial — no credit card required</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Stack direction="column" gap={4}>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First name"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                label="Last name"
                placeholder="Smith"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <Input
              label="Work email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRight={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            <Input
              label="Confirm password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Checkbox
              label="I agree to the Terms of Service and Privacy Policy"
              checked={agreed}
              onCheckedChange={(val) => setAgreed(val === true)}
            />

            <Button type="submit" className="w-full" loading={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>

          </Stack>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </AuthLayout>
    )
  }