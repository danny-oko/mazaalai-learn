// zurag baihgui ved ashiglagdah heseg,, bainga zuragtai bna
export function getAvatarPictureUrl(name: string) {
  const safeName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${safeName}&background=000000&color=FFFFFF`;
}
