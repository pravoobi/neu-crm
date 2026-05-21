import { Container } from '@practics/ui'

const links: Record<string, string[]> = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Support: ['Documentation', 'System Status', 'Contact Us', 'Privacy Policy'],
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <Container size="xl">

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <span className="text-xs font-bold text-primary-foreground">N</span>
              </div>
              <span className="font-bold text-foreground">NeuCRM</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              The modern CRM for marketing teams that want to close more deals
              and grow faster.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 NeuCRM. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with React 19 + @practics/ui
          </p>
        </div>
      </Container>
    </footer>
  )
}
