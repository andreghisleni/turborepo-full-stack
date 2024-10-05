import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import { InputSkeleton } from './input-skeleton';

export function CardCreateProductSkeleton() {
  return (
    <Card className="w-[960px]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8 w-56" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex w-full flex-row gap-8">
          <InputSkeleton className="w-96" />
          <InputSkeleton />
        </div>
        <Separator />
        <div className="flex w-full flex-row gap-8">
          <InputSkeleton className="w-96" />
        </div>
        <Separator />

        <div className="grid grid-cols-3 gap-8">
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
        </div>
        <Separator />

        <div className="grid grid-cols-3 gap-8">
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
        </div>
        <Separator />

        <Skeleton className="h-20 w-full" />

        <CardFooter>
          <div className="flex w-full justify-between">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
