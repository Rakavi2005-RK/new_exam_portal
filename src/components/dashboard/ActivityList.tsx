
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  time: string;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  status?: 'completed' | 'pending' | 'failed';
  type: 'assessment' | 'user' | 'system';
  description?: string;
}

interface ActivityListProps {
  className?: string;
  activities: Activity[];
  title?: string;
  description?: string;
}

const ActivityList: React.FC<ActivityListProps> = ({
  className,
  activities,
  title = "Recent Activity",
  description = "Latest activities across the platform"
}) => {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assessment':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'user':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'system':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {activities.map((activity, index) => (
            <div 
              key={activity.id}
              className={cn(
                "flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors",
                index < activities.length - 1 && "border-b"
              )}
            >
              {activity.user && (
                <Avatar className="h-9 w-9">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <Badge variant="outline" className={cn("text-xs", getTypeColor(activity.type))}>
                      {activity.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {activity.status && getStatusIcon(activity.status)}
                    <time className="text-xs text-muted-foreground">{activity.time}</time>
                  </div>
                </div>
                {activity.description && (
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityList;
