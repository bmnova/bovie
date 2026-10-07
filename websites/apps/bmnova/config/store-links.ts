type StoreLink = { googlePlay: string; appStore?: string };

export const storeLinks = {
  pali: {
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.gaft.dietpal",
    appStore: "https://apps.apple.com/app/6756529135",
  },
  fitvibe: {
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.gaft.fitvibe",
    appStore: "https://apps.apple.com/app/6756529188",
  },
  offer: {
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.offerizm.offer",
  },
  roompace: {
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.intyx.roompace",
    appStore: "https://apps.apple.com/app/6762028069",
  },
  haki: {
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.intyx.haki",
    appStore: "https://apps.apple.com/app/6795980533",
  },
} as const satisfies Record<string, StoreLink>;

export type StoreKey = keyof typeof storeLinks;
