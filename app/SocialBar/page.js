import Link from "next/link";
import { Instagram, Facebook, MapPin, MessageCircle, Music2 } from "lucide-react";

export default function SocialBar() {
  return (
    <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-3">
      <Link
        href="https://instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        title="Instagram"
        className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center
                   hover:bg-accent/20 hover:border-accent/40 transition"
      >
        <Instagram className="text-white/80 hover:text-accent transition-colors" size={18} />
      </Link>

      <Link
        href="https://facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        title="Facebook"
        className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center
                   hover:bg-accent/20 hover:border-accent/40 transition"
      >
        <Facebook className="text-white/80 hover:text-accent transition-colors" size={18} />
      </Link>

      <Link
        href="https://tiktok.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        title="TikTok"
        className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center
                   hover:bg-accent/20 hover:border-accent/40 transition"
      >
        <Music2 className="text-white/80 hover:text-accent transition-colors" size={18} />
      </Link>

      <Link
        href="https://wa.me/21600000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        title="WhatsApp"
        className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center
                   hover:bg-accent/20 hover:border-accent/40 transition"
      >
        <MessageCircle className="text-white/80 hover:text-accent transition-colors" size={18} />
      </Link>

      <Link
        href="https://maps.google.com/?q=Coffee+House+Tunis"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Google Maps"
        title="Localisation"
        className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center
                   hover:bg-accent/20 hover:border-accent/40 transition"
      >
        <MapPin className="text-white/80 hover:text-accent transition-colors" size={18} />
      </Link>
    </div>
  );
}
