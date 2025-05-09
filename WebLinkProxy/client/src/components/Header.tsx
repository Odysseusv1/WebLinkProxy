import { useState } from "react";
import { Globe, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Globe className="text-primary h-6 w-6 mr-2" />
            <h1 className="text-xl font-semibold text-gray-800">WebProxy</h1>
          </div>
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-gray-500 hover:text-gray-700"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
