import { Card, CardContent, Container } from '@practics/ui'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  rating: number
  initials: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'VP of Marketing',
    company: 'Apex Ventures',
    quote:
      'NeuCRM cut our lead response time in half. The campaign builder alone saved us 10 hours a week and our conversion rate jumped significantly.',
    rating: 5,
    initials: 'SC',
  },
  {
    name: 'Marcus Williams',
    role: 'Head of Sales',
    company: 'Orbit SaaS',
    quote:
      'The pipeline view is incredibly intuitive. Our whole team adopted it in a day and our close rate climbed 23% within the first quarter.',
    rating: 5,
    initials: 'MW',
  },
  {
    name: 'Priya Patel',
    role: 'Founder & CEO',
    company: 'GrowthStack',
    quote:
      'We tried four CRMs before NeuCRM. The automation workflows are best-in-class and the customer support team is genuinely outstanding.',
    rating: 5,
    initials: 'PP',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-background py-24">
      <Container size="xl">

        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Trusted by growing teams
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our customers say about NeuCRM.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} variant="outline">
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
                    <span className="text-xs font-semibold text-primary-foreground">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
