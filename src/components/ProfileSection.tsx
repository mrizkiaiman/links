import { m, useScroll, useTransform } from "framer-motion";
import { Linkedin, Instagram, Music2, Globe, Mail, Github } from "lucide-react";
import { profile } from "@/config/data";

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  Linkedin,
  Instagram,
  Music2,
  Globe,
  Mail,
  Github,
};

interface ProfileSectionProps {
  theme: "light" | "dark";
}

export function ProfileSection({ theme }: ProfileSectionProps) {
  const { scrollY } = useScroll();
  const profileScale = useTransform(scrollY, [0, 150], [1, 0.85]);
  const profileOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  const isDarkMode = theme === "dark";

  return (
    <section className="text-center mb-10 pt-4">
      <m.div
        style={{ scale: profileScale, opacity: profileOpacity }}
        className="relative w-full h-32 rounded-[2rem] overflow-hidden mb-6 shadow-2xl"
      >
        <img
          src={profile.banner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? "from-[#0a0a0a]" : "from-gray-50"} via-transparent to-transparent`}
        />
      </m.div>

      <div className="relative -mt-16 mb-4 flex justify-center">
        <div
          className={`w-24 h-24 rounded-full border-[6px] shadow-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 ${isDarkMode ? "border-[#0a0a0a]" : "border-gray-50"} glow`}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mb-4">
        <h1
          className={`text-2xl font-black mb-0.5 tracking-tighter ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          {profile.name}
        </h1>
        <p
          className={`text-sm font-bold opacity-60 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {profile.handle}
        </p>
      </div>

      <div className="flex justify-center gap-3.5 mb-6">
        {profile.socials.map((social) => {
          const Icon = iconMap[social.icon] || Music2;
          return (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${isDarkMode ? "bg-zinc-800 border border-zinc-700 hover:bg-zinc-700" : "bg-white border border-gray-200 shadow-sm hover:bg-gray-50"}`}
            >
              <Icon
                className="w-5 h-5"
                style={{
                  color:
                    isDarkMode && social.color === "#000000"
                      ? "#FFFFFF"
                      : social.color,
                }}
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}
