import NotificationBellIcon from "../../features/notifications/components/ui/NotificationBellIcon";

const Header = () => {

  return (
    <header className="w-full border-b border-border p-4 bg-surface px-8">
      <div className="flex justify-end items-center gap-4">
        <NotificationBellIcon />
        <div className="rounded-full w-11 h-11 border border-blue-300 bg-blue-400 flex justify-center items-center font-semibold">XY</div>
      </div>
    </header>
  );
};

export default Header;
