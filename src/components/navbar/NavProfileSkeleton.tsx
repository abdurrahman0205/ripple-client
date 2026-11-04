import { Skeleton } from "@/components/ui/skeleton"

export function NavProfileSkeleton() {
  return (
    <div className="flex items-center flex-row gap-4">
      <Skeleton className="h-4 w-23" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  )
}
