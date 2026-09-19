import * as Icons from "lucide-react";
import React from "react";

export type IconComponent = React.ComponentType<{ className?: string; size?: number | string }>;

/**
 * Dynamically resolves a Lucide icon component by name string.
 * Falls back to HelpCircle / CircleHelp icon if the name is not found.
 */
export function getIconComponent(iconName: string): IconComponent {
  const Icon = (Icons as unknown as Record<string, IconComponent>)[iconName];

  if (Icon) {
    return Icon;
  }

  // Fallback icon
  const Fallback = Icons.CircleHelp || Icons.HelpCircle || Icons.Circle;
  return Fallback as unknown as IconComponent;
}
