
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CustomCardProps {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  gradient?: boolean;
  glassEffect?: boolean;
  hoverEffect?: boolean;
}

const CustomCard: React.FC<CustomCardProps> = ({
  className,
  title,
  description,
  children,
  footer,
  gradient = false,
  glassEffect = false,
  hoverEffect = false,
}) => {
  return (
    <Card
      className={cn(
        "overflow-hidden",
        gradient && "bg-gradient-to-br from-background to-muted border-none",
        glassEffect && "glass-card",
        hoverEffect && "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      
      {children && <CardContent>{children}</CardContent>}
      
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default CustomCard;
