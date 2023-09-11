import uuid from "react-uuid";

export const sidebarNames = [
  {
    id: uuid(),
    sidebarName: "Notes",
    iconName: "lightbulb",
    path: "/",
  },
  {
    id: uuid(),
    sidebarName: "Reminders",
    iconName: "notifications",
    path: "*",
  },
  {
    id: uuid(),
    sidebarName: "Edit labels",
    iconName: "mode_edit",
    path: "*",
  },
  {
    id: uuid(),
    sidebarName: "Archive",
    iconName: "archive",
    path: "/archive",
  },
  {
    id: uuid(),
    sidebarName: "Bin",
    iconName: "delete_forever",
    path: "/bin",
  },
];
