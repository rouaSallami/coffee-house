import toast from "react-hot-toast";

export function handleInactiveAccount(responseData) {
  if (responseData?.message !== "Compte inactif") return false;

  sessionStorage.removeItem("isAuthenticated");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");

  window.dispatchEvent(new Event("authChanged"));
  window.dispatchEvent(new Event("cartUpdated"));
  window.dispatchEvent(new Event("favoritesUpdated"));

  toast.error("Votre compte a été désactivé");

  setTimeout(() => {
    window.location.href = "/login";
  }, 1200);

  return true;
}