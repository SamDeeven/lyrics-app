import React from "react";
import { Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

// Font-free icons: every icon is drawn from SVG paths (24x24 grid),
// so nothing depends on an icon font being bundled or loaded.
// Names match the Ionicons / MaterialIcons names already used in the app.

const CIRCLE = "M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0";
const CLOSE = ["M6 6l12 12", "M18 6L6 18"];
const TRASH = [
  "M3 6h18",
  "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
  "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  "M10 11v6",
  "M14 11v6",
];
const HEART =
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z";
const NOTE = ["M9 18V5l12-2v13", "M3 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0", "M15 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"];

const ICONS = {
  add: { d: ["M12 5v14", "M5 12h14"] },
  remove: { d: ["M5 12h14"] },
  close: { d: CLOSE },
  "close-sharp": { d: CLOSE },
  "close-circle-sharp": { d: [CIRCLE, "M15 9l-6 6", "M9 9l6 6"] },
  "refresh-outline": {
    d: ["M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", "M21 3v5h-5"],
  },
  heart: { d: [HEART], fill: true },
  "heart-outline": { d: [HEART] },
  "information-circle-outline": {
    d: [CIRCLE, "M12 16v-5", "M12 8h.01"],
  },
  pencil: { d: ["M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z", "M15 5l4 4"] },
  "musical-note": { d: NOTE },
  "musical-notes": { d: NOTE },
  "save-outline": {
    d: [
      "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",
      "M17 21v-8H7v8",
      "M7 3v5h8",
    ],
  },
  "search-outline": { d: ["M3 11a8 8 0 1 0 16 0a8 8 0 1 0 -16 0", "M21 21l-4.3-4.3"] },
  "chevron-up": { d: ["M18 15l-6-6-6 6"] },
  "chevron-down": { d: ["M6 9l6 6 6-6"] },
  "chevron-back-sharp": { d: ["M15 18l-6-6 6-6"] },
  "ellipsis-vertical-sharp": {
    d: ["M12 5h.01", "M12 12h.01", "M12 19h.01"],
    sw: 3.4,
  },
  "home-sharp": {
    d: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"],
  },
  "mail-outline": {
    d: [
      "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
      "M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
    ],
  },
  download: {
    d: [
      "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
      "M7 10l5 5 5-5",
      "M12 15V3",
    ],
  },
  delete: { d: TRASH },
  "delete-forever": { d: TRASH },
  shuffle: {
    d: [
      "M16 3h5v5",
      "M4 20L21 3",
      "M21 16v5h-5",
      "M15 15l6 6",
      "M4 4l5 5",
    ],
  },
  time: { d: [CIRCLE, "M12 6v6l4 2"] },
  "time-outline": { d: [CIRCLE, "M12 6v6l4 2"] },
};

const FALLBACK = { d: [CIRCLE, "M12 8h.01", "M12 12v4"] };

const AppIcons = ({ name, size = 24, color = "#000000", style, onPress }) => {
  const icon = ICONS[name] || FALLBACK;

  const svg = (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={onPress ? undefined : style}
    >
      {icon.d.map((d, index) => (
        <Path
          key={index}
          d={d}
          stroke={color}
          strokeWidth={icon.sw || 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={icon.fill ? color : "none"}
        />
      ))}
    </Svg>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} hitSlop={10} style={style}>
        {svg}
      </Pressable>
    );
  }

  return svg;
};

export default AppIcons;