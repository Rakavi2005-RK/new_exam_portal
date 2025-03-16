
import React from 'react';
import { cn } from '@/lib/utils';
import { Brain, Target, Users, Calendar, Award, BookOpen } from 'lucide-react';
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

interface DashboardStatsProps {
  className?: string;
  role?: 'admin' | 'faculty' | 'student';
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  className,
  role = 'admin'
}) => {
  // Conditionally render stats based on user role
  let stats: StatCardProps[] = [];
  
  switch (role) {
    case 'admin':
      stats = [
        {
          title: 'Total Students',
          value: '2,543',
          description: '142 new this month',
          icon: <Users className="h-5 w-5" />,
          trend: { value: 12, isPositive: true }
        },
        {
          title: 'Active Assessments',
          value: '128',
          description: 'Across all departments',
          icon: <Target className="h-5 w-5" />,
          trend: { value: 8, isPositive: true }
        },
        {
          title: 'AI Generated',
          value: '756',
          description: 'Assessments created with AI',
          icon: <Brain className="h-5 w-5" />,
          trend: { value: 24, isPositive: true }
        },
        {
          title: 'Completion Rate',
          value: '87%',
          description: 'Of assigned assessments',
          icon: <Award className="h-5 w-5" />,
          trend: { value: 3, isPositive: true }
        }
      ];
      break;
      
    case 'faculty':
      stats = [
        {
          title: 'My Students',
          value: '124',
          description: 'In your classes',
          icon: <Users className="h-5 w-5" />,
        },
        {
          title: 'Active Assessments',
          value: '16',
          description: 'Created by you',
          icon: <BookOpen className="h-5 w-5" />,
          trend: { value: 4, isPositive: true }
        },
        {
          title: 'Average Score',
          value: '72%',
          description: 'Across all assessments',
          icon: <Target className="h-5 w-5" />,
          trend: { value: 2, isPositive: true }
        },
        {
          title: 'Due This Week',
          value: '5',
          description: 'Assessments closing soon',
          icon: <Calendar className="h-5 w-5" />,
        }
      ];
      break;
      
    case 'student':
      stats = [
        {
          title: 'Pending Assessments',
          value: '4',
          description: 'Due this week',
          icon: <Calendar className="h-5 w-5" />,
        },
        {
          title: 'Completed',
          value: '28',
          description: 'Assessments this semester',
          icon: <Award className="h-5 w-5" />,
          trend: { value: 6, isPositive: true }
        },
        {
          title: 'Average Score',
          value: '76%',
          description: 'Across all subjects',
          icon: <Target className="h-5 w-5" />,
          trend: { value: 5, isPositive: true }
        },
        {
          title: 'Self Practice',
          value: '12',
          description: 'AI assessments generated',
          icon: <Brain className="h-5 w-5" />,
          trend: { value: 3, isPositive: true }
        }
      ];
      break;
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
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
