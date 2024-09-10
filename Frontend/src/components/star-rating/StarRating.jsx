import "./Star.css";

export const Star = ({ filled }) => {
  return <span className={filled ? "star filled" : "star"}>&#9733;</span>;
};

export default Star;