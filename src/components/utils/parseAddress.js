export const parseAddress = (address) => {
  let country = "";
  let city = "";

  if (address) {
    const parts = address.split(",").map((p) => p.trim());
    if (parts.length >= 3) {
      country = parts[2];
      city = parts[1];
    }
  }

  return { country, city };
};
