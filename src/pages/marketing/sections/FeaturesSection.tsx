import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Container,
} from '@practics/ui'
import { Users, Target, Mail, TrendingUp, Zap, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  tag: string
}

const features: Feature[] = [
  {
    icon: Users,
    title: 'Contact Management',
    description:
      'Organize all your leads and customers in one searchable, filterable database with full activity history.',
    tag: 'Core',
  },
  {
    icon: Target,
    title: 'Pipeline Tracking',
    description:
      'Visualize your sales pipeline and move deals through stages. Never lose track of an opportunity again.',
    tag: 'Core',
  },
  {
    icon: Mail,
    title: 'Email Campaigns',
    description:
      'Design, schedule, and send personalized email campaigns to segmented audiences with one click.',
    tag: 'Marketing',
  },
  {
    icon: TrendingUp,
    title: 'Analytics & Reports',
    description:
      'Track conversion rates, campaign ROI, and revenue attribution in real time with clear dashboards.',
    tag: 'Analytics',
  },
  {
    icon: Zap,
    title: 'Automation',
    description:
      'Build workflows that automatically nurture leads based on their behavior, stage, and engagement score.',
    tag: 'Pro',
  },
  {
    icon: Shield,
    title: 'Team Permissions',
    description:
      'Role-based access controls and audit logs keep sensitive pipeline data in the right hands.',
    tag: 'Enterprise',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-muted/40 py-24">
      <Container size="xl">

        {/* Section header */}
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">Features</Badge>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Everything your team needs
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From first contact to closed deal, NeuCRM handles every step of your
            marketing and sales workflow.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} variant="default">
              <CardHeader>
                {/* Icon */}
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon size={20} className="text-primary" />
                </div>
                {/* Title + tag */}
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {feature.tag}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
