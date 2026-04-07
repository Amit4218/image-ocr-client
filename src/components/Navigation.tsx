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
    <div className="fixed left-0 top-0 flex flex-col justify-between items-center h-screen  p-3 bg-muted ">
      <div className="flex flex-col items-center gap-4">
        <Link to="/" className="p-2 rounded-md hover:bg-accent">
          <img src="/logo.png" className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex flex-col items-center gap-4">
        {middleItems.map((item, idx) => {
          const Icon = item.icon;

          return (
            <HoverCard key={idx} openDelay={100} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Link to={item.href} className="p-2 rounded-md hover:bg-accent">
                  <Icon className="w-4 h-4" />
                </Link>
              </HoverCardTrigger>

              <HoverCardContent
                className="w-auto px-4 py-1 text-xs"
                side="right"
              >
                {item.name}
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4">
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-md hover:bg-accent"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <SunMedium className="w-4 h-4" />
              )}
            </button>
          </HoverCardTrigger>

          <HoverCardContent className="w-auto px-4 py-1 text-xs" side="right">
            theme
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}

export default Navigation;
