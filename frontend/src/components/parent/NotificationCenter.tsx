import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  transactionId?: string;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onNotificationClick: (transactionId: string) => void;
  onMarkAsRead: (notificationId: string) => void;
}

export default function NotificationCenter({
  notifications = [],
  onNotificationClick,
  onMarkAsRead,
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        variant="outline"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
          <ScrollArea className="h-96">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={onNotificationClick}
                  onMarkAsRead={onMarkAsRead}
                />
              ))
            ) : (
              <p className="p-4 text-center text-gray-500">No notifications</p>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onClick: (transactionId: string) => void;
  onMarkAsRead: (notificationId: string) => void;
}

function NotificationItem({
  notification,
  onClick,
  onMarkAsRead,
}: NotificationItemProps) {
  return (
    <div
      className={`p-4 border-b last:border-b-0 ${
        notification.read ? "bg-gray-100" : "bg-white"
      }`}
    >
      <p className="text-sm mb-1">{notification.message}</p>
      <p className="text-xs text-gray-500 mb-2">{notification.timestamp}</p>
      <div className="flex justify-between">
        {notification.transactionId && (
          <Button
            onClick={() => onClick(notification.transactionId!)}
            variant="link"
            className="text-xs p-0"
          >
            View Transaction
          </Button>
        )}
        {!notification.read && (
          <Button
            onClick={() => onMarkAsRead(notification.id)}
            variant="link"
            className="text-xs p-0"
          >
            Mark as Read
          </Button>
        )}
      </div>
    </div>
  );
}
