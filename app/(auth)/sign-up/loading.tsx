import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-muted" />
          <div className="mx-auto mt-4 h-6 w-48 animate-pulse rounded bg-muted" />
          <div className="mx-auto mt-2 h-4 w-56 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
          </div>
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="h-4 w-48 animate-pulse rounded bg-muted" />
        </CardFooter>
      </Card>
    </div>
  )
}
