import "./Button.css";

const Button = ({className, onClick, value, color, size, solid}) => {
    return (
        <button className={`${className || ""} button-${color}-${solid ? 'solid' : 'open'} button-${size}`} onClick={onClick}>
            {value}
        </button>
    );
};

export default Button;