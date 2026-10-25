import React from 'react';
import { PostType, PostStatus, UrgencyLevel } from '../../types';
import { 
  HelpCircle, 
  HandHeart, 
  BookOpen, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

interface BadgePillProps {
  type?: PostType;
  status?: PostStatus;
  urgency?: UrgencyLevel;
  text?: string;
  className?: string;
}

export const BadgePill: React.FC<BadgePillProps> = ({ 
  type, 
  status, 
  urgency, 
  text, 
  className = '' 
}) => {
  // Post Type Badges
  if (type) {
    switch (type) {
      case 'request':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-terracotta/15 text-terracotta border border-terracotta/30 ${className}`}>
            <HelpCircle className="w-3.5 h-3.5" />
            {text || 'Help Request'}
          </span>
        );
      case 'offer':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-lavender/20 text-lavender-dark dark:text-lavender border border-lavender/30 ${className}`}>
            <HandHeart className="w-3.5 h-3.5" />
            {text || 'Skill Offer'}
          </span>
        );
      case 'resource':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-lavender/15 text-content-primary border border-lavender/30 ${className}`}>
            <BookOpen className="w-3.5 h-3.5 text-lavender" />
            {text || 'Study Resource'}
          </span>
        );
      case 'team':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success/15 text-success border border-success/30 ${className}`}>
            <Users className="w-3.5 h-3.5" />
            {text || 'Teammates'}
          </span>
        );
      case 'lost-found':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-subtle text-content-secondary border border-borderSubtle ${className}`}>
            <MapPin className="w-3.5 h-3.5 text-terracotta" />
            {text || 'Lost & Found'}
          </span>
        );
    }
  }

  // Status Badges
  if (status) {
    switch (status) {
      case 'open':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-lavender/15 text-lavender-dark dark:text-lavender border border-lavender/25 ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-lavender animate-pulse" />
            {text || 'Open'}
          </span>
        );
      case 'help_offered':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-terracotta/20 text-terracotta border border-terracotta/30 ${className}`}>
            <Clock className="w-3 h-3 text-terracotta" />
            {text || 'Help Offered'}
          </span>
        );
      case 'resolved':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-success/20 text-success border border-success/30 ${className}`}>
            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
            {text || 'Resolved'}
          </span>
        );
      case 'closed':
        return (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-surface-subtle text-content-muted border border-borderSubtle ${className}`}>
            Closed
          </span>
        );
    }
  }

  // Urgency Badges
  if (urgency) {
    switch (urgency) {
      case 'urgent':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-error/15 text-error border border-error/30 animate-soft-pulse ${className}`}>
            <AlertCircle className="w-3 h-3 text-error" />
            {text || 'Urgent'}
          </span>
        );
      case 'high':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-terracotta/15 text-terracotta border border-terracotta/30 ${className}`}>
            {text || 'Priority'}
          </span>
        );
      case 'normal':
        return null;
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-subtle text-content-secondary border border-borderSubtle ${className}`}>
      {text}
    </span>
  );
};
