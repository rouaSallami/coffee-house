import Link from "next/link";
import { Instagram, Facebook, MapPin, MessageCircle, Music2 } from "lucide-react";

const links = [
  {
    href: "https://instagram.com/",
    label: "Instagram",
    title: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://facebook.com/",
    label: "Facebook",
    title: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://tiktok.com/",
    label: "TikTok",
    title: "TikTok",
    icon: Music2,
  },
  {
    href: "https://wa.me/21600000000",
    label: "WhatsApp",
    title: "WhatsApp",
    icon: MessageCircle,
  },
  {
    href: "https://maps.google.com/?q=Coffee+House+Tunis",
    label: "Google Maps",
    title: "Localisation",
    icon: MapPin,
  },
];

export default function SocialBar() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-3">
        {links.map(({ href, label, title, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={title}
            className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center hover:bg-accent/20 hover:border-accent/40 transition"
          >
            <Icon className="text-white/80 hover:text-accent transition-colors" size={18} />
          </Link>
        ))}
      </div>

      {/* Mobile / Tablet */}
      <div className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex flex-row gap-3">
        {links.map(({ href, label, title, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={title}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/50 flex items-center justify-center hover:bg-accent/20 hover:border-accent/40 transition"
          >
            <Icon className="text-white/80 hover:text-accent transition-colors" size={17} />
          </Link>
        ))}
      </div>
    </>
  );
}