import MagicBell, {
  FloatingNotificationInbox,
} from "@magicbell/magicbell-react";

const theme = {
  icon: { borderColor: "#6113A3", width: "40px" },
  unseenBadge: { backgroundColor: "#DF4759" },
  header: {
    backgroundColor: "#6113A3",
    textColor: "#ffffff",
    borderRadius: "16px",
  },
  footer: {
    backgroundColor: "#6113A3",
    textColor: "#ffffff",
    borderRadius: "16px",
  },
  notification: {
    default: {
      textColor: "#15091F",
      borderRadius: "8px",
      backgroundColor: "#6113A3",
    },
    unseen: {
      backgroundColor: "#6113A3",
      textColor: "#15091F",
      borderRadius: "8px",
    },
    unread: {
      backgroundColor: "#6113A3",
      textColor: "#15091F",
      borderRadius: "8px",
    },
  },
};
const images = {
  emptyInboxUrl:
    "https://cdn.dribbble.com/users/1590794/screenshots/5822231/blank_inbox_email.png",
};

const Notification = () => {
  return (
    <MagicBell
      apiKey={process.env.REACT_APP_MAGICBELL_API_KEY}
      userEmail={process.env.REACT_APP_MAGICBELL_USER_EMAIL}
      theme={theme}
      locale="en"
      images={images}
    >
      {(props) => <FloatingNotificationInbox {...props} />}
    </MagicBell>
  );
};

export default Notification;
