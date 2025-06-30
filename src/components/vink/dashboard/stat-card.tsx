import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
    className?: string;
};

export function StatCard({ title, icon: Icon, children, className }: StatCardProps) {
  return (
    <Card className={cn("glass-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
