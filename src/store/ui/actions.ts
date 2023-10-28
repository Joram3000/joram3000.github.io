export const MenuToggle = (Payload: boolean) => ({
  type: "MENUTOGGLE",
  payload: Payload,
});

export const DrawerToggle = (Payload: boolean) => ({
  type: "DRAWERTOGGLE",
  payload: Payload,
});
