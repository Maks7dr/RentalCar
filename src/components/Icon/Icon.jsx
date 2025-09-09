import sprite from "../../../public/sprite.svg";

const Icon = ({ name, className = "", ...props }) => {
  return (
    <svg className={className} {...props}>
      <use href={`${sprite}#icon-${name}`} />
    </svg>
  );
};

export default Icon;
