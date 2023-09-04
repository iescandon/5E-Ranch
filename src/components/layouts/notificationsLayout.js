export default function NotificationsLayout({
  show,
  notificationType,
  children,
}) {
  return (
    <section className={`visible ${!show && "invisible"}`}>
      {children}
      <div
        className={`absolute h-screen w-screen inset-0 bg-black bg-opacity-70 ${
          notificationType && "bg-opacity-80 backdrop-blur-sm"
        } z-10`}
      ></div>
    </section>
  );
}
