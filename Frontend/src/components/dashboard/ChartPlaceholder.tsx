import { BarChart3 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ChartPlaceholderProps {
  title: string
  description?: string
  className?: string
}

/** Reusable chart slot — replace inner content with real chart library */
export function ChartPlaceholder({ title, description, className }: ChartPlaceholderProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20">
          <BarChart3 className="mb-2 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">Chart visualization</p>
          <p className="text-xs text-muted-foreground/70">Connect analytics API</p>
        </div>
      </CardContent>
    </Card>
  )
}
