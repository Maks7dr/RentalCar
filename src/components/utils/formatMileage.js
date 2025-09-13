export const formatMileage = (mileage) => {
  return new Intl.NumberFormat("uk-UA").format(mileage);
};
