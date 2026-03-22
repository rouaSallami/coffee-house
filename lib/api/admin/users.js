export async function getUsersFromStorage() {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      return [];
    }

    return [storedUser];
  } catch {
    return [];
  }
}

export async function saveCurrentUserToStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("authChanged"));
}

export async function removeCurrentUserFromStorage() {
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
  window.dispatchEvent(new Event("authChanged"));
}