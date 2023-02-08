import MagicBell, {
  FloatingNotificationInbox,
} from "@magicbell/magicbell-react";

const theme = {
  icon: { borderColor: "#ffffff", width: "40px" },
  unseenBadge: { backgroundColor: "#DF4759" },
  header: {
    backgroundColor: "#000080",
    textColor: "#ffffff",
    borderRadius: "16px",
  },
  footer: {
    backgroundColor: "#000080",
    textColor: "#ffffff",
    borderRadius: "16px",
  },
  notification: {
    default: {
      textColor: "#15091F",
      borderRadius: "8px",
      backgroundColor: "#000080",
    },
    unseen: {
      backgroundColor: "#000080",
      textColor: "#15091F",
      borderRadius: "8px",
    },
    unread: {
      backgroundColor: "#000080",
      textColor: "#15091F",
      borderRadius: "8px",
    },
  },
};
const images: {
  emptyInboxUrl: string;
} = {
  emptyInboxUrl:
    "https://cdn.dribbble.com/users/1590794/screenshots/5822231/blank_inbox_email.png",
};

const Notification: React.FC = () => {
  return (
    <MagicBell
      apiKey={process.env.NEXT_APP_MAGICBELL_API_KEY}
      userEmail={process.env.NEXT_APP_MAGICBELL_USER_EMAIL}
      theme={theme}
      locale="en"
      images={images}
    >
      {(props) => <FloatingNotificationInbox {...props} />}
    </MagicBell>
  );
};

export default Notification;
