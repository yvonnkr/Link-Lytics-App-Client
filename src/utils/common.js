import toast from "react-hot-toast";

export const toastSuccess = (message) => {
  return toast.error(message, {
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "#fff",
      fontWeight: "bold",
    },
    icon: "🌟",
  });
};

export const toastError = (message, duration) => {
  return toast.error(message, {
    style: {
      background: "linear-gradient(to right, #a14848, #cf6363)",
      color: "#fff",
      fontWeight: "bold",
    },
    icon: "❌",
    duration: duration ? duration : 5000,
  });
};

export const sessionExpiredToast = () => {
  toastError(
    "Your session has expired, Please login again to view your dashboard.",
    10000
  );
};
