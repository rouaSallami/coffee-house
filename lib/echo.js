import Echo from "laravel-echo";
import Pusher from "pusher-js";

if (typeof window !== "undefined") {
  window.Pusher = Pusher;
}

const echo =
  typeof window !== "undefined"
    ? new Echo({
        broadcaster: "reverb",
        key: "umecjt0oolnjk9wdtcaq",
        wsHost: "localhost",
        wsPort: 8080,
        wssPort: 8080,
        forceTLS: false,
        enabledTransports: ["ws", "wss"],
      })
    : null;

export default echo;