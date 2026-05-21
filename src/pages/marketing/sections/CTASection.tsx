import { useNavigate } from 'react-router-dom'
import { Button, Container, Stack } from '@practics/ui'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="bg-primary py-24 text-primary-foreground">
      <Container size="md">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to grow your business?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-primary-foreground/75">
            Join 10,000+ companies using NeuCRM to close more deals and run
            better campaigns. Get started in minutes, no card required.
          </p>

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
              onClick={() => navigate('/login')}
              className="inline-flex items-center rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Sign In
            </button>
          </Stack>
        </div>
      </Container>
    </section>
  )
}
