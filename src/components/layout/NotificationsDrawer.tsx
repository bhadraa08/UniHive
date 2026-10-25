import React from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { UserAvatar } from '../common/UserAvatar';
import { 
  Bell, 
  CheckCheck, 
  X, 
  HelpCircle, 
  Sparkles, 
  Users, 
  BookOpen, 
  Info 
} from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    unreadNotificationsCount, 
    markNotificationRead, 
    markAllNotificationsRead,
    setSelectedPost,
    posts 
  } = useUniHive();

  const { isDark } = useTheme();

  if (!isOpen) return null;

  const handleNotificationClick = (notif: any) => {
    markNotificationRead(notif.id);
    if (notif.postId) {
      const target = posts.find(p => p.id === notif.postId);
      if (target) {
        setSelectedPost(target);
        onClose();
      }
    }
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'help_offer':
        return <HelpCircle className="w-4 h-4 text-terracotta" />;
      case 'resolved':
        return <Sparkles className="w-4 h-4 text-success" />;
      case 'team_applied':
        return <Users className="w-4 h-4 text-lavender" />;
      case 'resource_download':
        return <BookOpen className="w-4 h-4 text-lavender" />;
      default:
        return <Info className="w-4 h-4 text-content-secondary" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className={`relative z-10 w-full max-w-md h-full shadow-float flex flex-col border-l transition-all animate-scaleUp ${
          isDark 
            ? 'bg-plum-surface border-plum-border text-parchment' 
            : 'bg-surface border-borderSubtle text-plum'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-borderSubtle/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-lavender/20 flex items-center justify-center text-lavender">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg">
                Campus Activity
              </h2>
              <span className="text-[11px] text-content-secondary">
                {unreadNotificationsCount} unread notifications
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {unreadNotificationsCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="flex items-center gap-1 text-[11px] font-semibold text-lavender hover:underline px-2 py-1"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-content-muted hover:text-content-primary hover:bg-lavender/10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-borderSubtle/50 p-2 sm:p-3">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-content-secondary">
              <Bell className="w-10 h-10 text-content-muted mb-2 stroke-[1.2]" />
              <p className="text-sm font-semibold">No notifications yet</p>
              <p className="text-xs text-content-muted mt-1 max-w-xs">
                When peers offer help on your questions or apply for your teams, you'll see alerts here.
              </p>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-3 sm:p-3.5 rounded-2xl cursor-pointer transition-all my-1 flex items-start gap-3 ${
                  !notif.read
                    ? isDark
                      ? 'bg-plum-elevated/80 border border-lavender/30'
                      : 'bg-lavender/10 border border-lavender/30'
                    : 'hover:bg-lavender/5'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {notif.actorAvatar ? (
                    <UserAvatar
                      src={notif.actorAvatar}
                      name={notif.title}
                      size="md"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center border border-borderSubtle">
                      {getNotifIcon(notif.type)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xs font-bold text-content-primary truncate">
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-content-muted shrink-0">
                      {notif.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] text-content-secondary mt-0.5 line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                  {notif.postId && (
                    <span className="inline-block mt-1 text-[10px] font-semibold text-lavender hover:underline">
                      View post discussion →
                    </span>
                  )}
                </div>

                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-terracotta shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
