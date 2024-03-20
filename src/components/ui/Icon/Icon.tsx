import React from "react";
import { icons } from "lucide-react";

interface Props {
  name: keyof typeof icons;
  color?: string;
  size?: number;
}

function Icon({ name, color = "black", size = 24 }: Props) {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
}

export default Icon;
