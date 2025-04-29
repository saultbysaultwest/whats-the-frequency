import { FiHeadphones } from "react-icons/fi";
import { ModeToggle } from "./theme/modeToggle";

const Header = () => {
  return (
    <header className="flex items-center justify-center space-x-6 py-4" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="flex items-center space-x-2 group cursor-pointer transition-all duration-300 hover:scale-105">
        <FiHeadphones className="text-2xl" />
        <span className="text-xl font-mono" style={{ color: "var(--color-primary)" }}>
          What's the Frequency?
        </span>
      </div>
      <ModeToggle />
    </header>
  );
};

export default Header;
