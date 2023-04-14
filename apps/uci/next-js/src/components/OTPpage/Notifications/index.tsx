import MagicBell, {
  FloatingNotificationInbox,
} from "@magicbell/magicbell-react";

const theme = {
  icon: { borderColor: "white", width: "40px" },
  unseenBadge: { backgroundColor: "var(--red)" },
  header: {
    backgroundColor: "var(--darkblue)",
    textColor: "white",
    borderRadius: "16px",
  },
  footer: {
    backgroundColor: "var(--darkblue)",
    textColor: "white",
    borderRadius: "16px",
  },
  notification: {
    default: {
      textColor: "black",
      borderRadius: "8px",
      backgroundColor: "var(--darkblue)",
    },
    unseen: {
      backgroundColor: "var(--darkblue)",
      textColor: "black",
      borderRadius: "8px",
    },
    unread: {
      backgroundColor: "var(--darkblue)",
      textColor: "black",
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
