import { useNavigate } from 'react-router-dom'
import { Button, Badge, Container, Stack } from '@practics/ui'
import { ArrowRight, Play } from 'lucide-react'

const stats = [
  { value: '10,000+', label: 'Companies' },
  { value: '99.9%', label: 'Uptime' },
  { value: '$2B+', label: 'Revenue Tracked' },
  { value: '4.9 / 5', label: 'Customer Rating' },
]

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="bg-primary py-24 text-primary-foreground sm:py-32">
      <Container size="xl">
        <div className="mx-auto max-w-3xl text-center">

          {/* Announcement badge */}
          <div className="mb-6 flex justify-center">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
              New &nbsp;·&nbsp; Campaign Analytics 2.0 is live
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Close More Deals.
            <br />
            Grow Faster.
          </h1>

          {/* Subtext */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/75 sm:text-xl">
            NeuCRM helps marketing teams track leads, run campaigns, and convert
            prospects into loyal customers — all in one place.
          </p>

          {/* CTAs */}
          <Stack direction="row" gap={4} justify="center" wrap>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/register')}
              iconRight={<ArrowRight size={18} />}
            >
              Start Free Trial
            </Button>
            <button
              onClick={() => {}}
              className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <Play size={16} />
              Watch Demo
            </button>
          </Stack>

          {/* Social proof strip */}
          <div className="mt-16 border-t border-primary-foreground/20 pt-10">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="mt-1 text-sm text-primary-foreground/65">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
