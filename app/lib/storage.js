export function getCurrentUser() {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function getUserStorageKey(baseKey) {
  const user = getCurrentUser();

  if (!user || !user.email) {
    return baseKey;
  }

  return `${baseKey}_${user.email}`;
}

export function getUserData(baseKey, fallback = []) {
  const key = getUserStorageKey(baseKey);
  const data = sessionStorage.getItem(key);

  return data ? JSON.parse(data) : fallback;
}

export function setUserData(baseKey, value) {
  const key = getUserStorageKey(baseKey);
  sessionStorage.setItem(key, JSON.stringify(value));
}