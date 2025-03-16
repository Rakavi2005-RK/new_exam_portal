
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  description?: string;
  className?: string;
  actions?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  className,
  actions,
}) => {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4",
      className
    )}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Assessment
        </Button>
        
        {actions}
      </div>
    </div>
  );
};

export default DashboardHeader;
