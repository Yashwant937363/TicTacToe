import PropTypes from "prop-types";
import "./PopUpWindow.css";

function YesNoPopUpWindow({ str, trueFunction, falseFunction }) {
  return (
    <div className="askyesno popup">
      <span>{str}</span>
      <button className="button" onClick={trueFunction}>
        Yes
      </button>
      <button className="button" onClick={falseFunction}>
        No
      </button>
    </div>
  );
}

YesNoPopUpWindow.propTypes = {
  str: PropTypes.string.isRequired,
  trueFunction: PropTypes.func.isRequired,
  falseFunction: PropTypes.func.isRequired,
};

export default YesNoPopUpWindow;
