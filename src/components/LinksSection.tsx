import { Link2 } from "lucide-react";
import { links } from "@/config/data";

interface LinksSectionProps {
  theme: "light" | "dark";
}

export function LinksSection({ theme }: LinksSectionProps) {
  const isDarkMode = theme === "dark";

  return (
    <section key="links" className="space-y-12">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative block rounded-[2rem] overflow-hidden transition-all active:scale-[0.98] ${isDarkMode ? "bg-gradient-to-br from-white/10 to-white/5" : "border bg-white border-gray-100 shadow-sm"}`}
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={link.image}
              alt={link.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
            <div className="absolute top-5 left-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-black text-lg mb-1 text-white tracking-tight">
                {link.title}
              </h3>
              {link.description && (
                <p className="text-xs text-white/70 font-bold opacity-90">
                  {link.description}
                </p>
              )}
            </div>
          </div>
        </a>
      ))}
    </section>
  );
}
