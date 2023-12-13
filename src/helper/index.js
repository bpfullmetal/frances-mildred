const sortMenuItemsByOrder = (menuItems) => {
  return menuItems.sort((a, b) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  });
};

export default {
  sortMenuItemsByOrder,
};
