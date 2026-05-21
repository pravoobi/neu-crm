import { useNavigate } from 'react-router-dom'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
} from '@practics/ui'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Plan {
  name: string
  price: string
  period: string
  description: string
  badge: string | null
  features: string[]
  cta: string
  highlighted: boolean
  route: string
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for small teams just getting started with CRM.',
    badge: null,
    features: [
      'Up to 500 contacts',
      '1 campaign / month',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Get Started Free',
    highlighted: false,
    route: '/register',
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For growing teams that need more power and automation.',
    badge: 'Most Popular',
    features: [
      'Unlimited contacts',
      'Unlimited campaigns',
      'Advanced analytics',
      'Automation workflows',
      'Priority support',
      'Team collaboration',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
    route: '/register',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations that need custom solutions.',
    badge: null,
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'SSO & SAML',
      'Custom contracts',
    ],
    cta: 'Talk to Sales',
    highlighted: false,
    route: '/login',
  },
]

export default function PricingSection() {
  const navigate = useNavigate()

  return (
    <section id="pricing" className="bg-muted/40 py-24">
      <Container size="xl">

        {/* Section header */}
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">Pricing</Badge>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Start free, scale when you're ready. No hidden fees, no long-term contracts.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              variant={plan.highlighted ? 'default' : 'outline'}
              className={cn(plan.highlighted && 'ring-2 ring-primary shadow-xl')}
            >
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.badge && <Badge variant="default">{plan.badge}</Badge>}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <Check size={15} className="shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  variant={plan.highlighted ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => navigate(plan.route)}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
