import { House, SunMedium, Moon, Settings } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useTheme } from "@/contexts/themeProvider";
import { Link } from "react-router-dom";

function Navigation() {
  const { theme, setTheme } = useTheme();

  const middleItems = [
    {
      icon: House,
      name: "home",
      href: "/",
    },
    {
      icon: Settings,
      name: "settings",
      href: "/settings",
    },
  ];

  return (
    <div
      className="fixed z-50 bottom-0 left-0 w-full h-14 flex items-center justify-center bg-muted 
      border-t lg:top-0 lg:h-screen lg:w-14 lg:flex-col lg:justify-between lg:border-t-0 lg:border-r"
    >
      <div className="hidden lg:flex flex-col items-center gap-4 mt-3">
        <Link to="/" className="p-2 rounded-md hover:bg-accent">
          <img src="/logo.png" className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex flex-row items-center gap-6 lg:flex-col lg:gap-4">
        {middleItems.map((item, idx) => {
          const Icon = item.icon;

          return (
            <HoverCard key={idx} openDelay={100} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Link to={item.href} className="p-2 rounded-md hover:bg-accent">
                  <Icon className="w-5 h-5" />
                </Link>
              </HoverCardTrigger>

              <HoverCardContent
                className="sm:hidden md:hidden w-auto px-4 py-1 text-xs"
                side="top"
              >
                {item.name}
              </HoverCardContent>
            </HoverCard>
          );
        })}

        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-md hover:bg-accent"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <SunMedium className="w-5 h-5" />
              )}
            </button>
          </HoverCardTrigger>

          <HoverCardContent
            className="sm:hidden md:hidden w-auto px-4 py-1 text-xs"
            side="top"
          >
            theme
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="hidden lg:block mb-3" />
    </div>
  );
}

export default Navigation;
