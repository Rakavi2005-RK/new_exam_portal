import React from 'react';
import { cn } from '@/lib/utils';
import { Target, Award } from 'lucide-react';
import CustomCard from '@/components/ui/CustomCard';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  style?: React.CSSProperties;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
  style,
}) => {
  return (
    <CustomCard
      className={cn("flex flex-col h-full", className)}
      glassEffect
      style={style}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend && (
              <span className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </CustomCard>
  );
};

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Active Assessments',
      value: '128',
      description: 'Across all departments',
      icon: <Target className="h-5 w-5" />,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Completion Rate',
      value: '87%',
      description: 'Of assigned assessments',
      icon: <Award className="h-5 w-5" />,
      trend: { value: 3, isPositive: true }
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          trend={stat.trend}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
