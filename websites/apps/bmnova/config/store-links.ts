type StoreLink = { googlePlay: string; appStore?: string };

export const storeLinks = {
  pali: {
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.gaft.dietpal",
    appStore:
      "https://apps.apple.com/app/apple-store/id6756529135?pt=122695218&ct=bmnova-web&mt=8",
  },
  fitvibe: {
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.gaft.fitvibe",
    appStore:
      "https://apps.apple.com/app/apple-store/id6756529188?pt=122695218&ct=bmnova-web&mt=8",
  },
  offer: {
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.offerizm.offer",
  },
  roompace: {
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.intyx.roompace",
    appStore:
      "https://apps.apple.com/app/apple-store/id6762028069?pt=128592002&ct=bmnova-web&mt=8",
  },
  haki: {
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.intyx.haki",
    appStore:
      "https://apps.apple.com/app/apple-store/id6795980533?pt=128592002&ct=bmnova-web&mt=8",
  },
} as const satisfies Record<string, StoreLink>;

export type StoreKey = keyof typeof storeLinks;
