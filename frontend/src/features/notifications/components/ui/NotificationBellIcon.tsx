import { Bell } from "lucide-react";

const NotificationBellIcon = () => {
  return (
    <button
      type="button"
      aria-label="Notifications"
      className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface text-text-muted`}
    >
      <Bell size={18} />
    </button>
  );
};

export default NotificationBellIcon;
