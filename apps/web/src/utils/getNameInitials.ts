export const getNameInitials = (name: string) => {
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu"); // eslint-disable-line

  const initials = [...name.matchAll(rgx)] || [];

  const parsedInitials = `${initials.shift()?.[1] || ""}${initials.pop()?.[1] || ""}`.toUpperCase(); // eslint-disable-line

  return parsedInitials;
};
