import { useState } from 'react'
  import { useNavigate, Link } from 'react-router-dom'
  import {
    Button,
    Input,
    Alert,
    AlertDescription,
    Stack,
  } from '@practics/ui'
  import { Eye, EyeOff } from 'lucide-react'
  import AuthLayout from './components/AuthLayout'

  export default function LoginPage() {
    const navigate = useNavigate()

    const [email, setEmail]       = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading]   = useState(false)
    const [error, setError]       = useState('')

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      setError('')

      if (!email || !password) {
        setError('Please fill in all fields.')
        return
      }

      setLoading(true)

      // Simulating an API call with a 1 second delay
      setTimeout(() => {
        setLoading(false)
        navigate('/app/dashboard')
      }, 1000)
    }

    return (
      <AuthLayout>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back</h1>
          <p className="text-muted-foreground text-sm">Sign in to your NeuCRM account</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Stack direction="column" gap={4}>

            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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

            <div className="flex justify-end">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" loading={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>

          </Stack>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Create one free
          </Link>
        </p>
      </AuthLayout>
    )
  }