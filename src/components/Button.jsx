import "./Button.css";

const Button = ({className, onClick, value="button", color="primary", size="large", solid=true}) => {
    return (
        <button className={`${className || ""} button-${color}-${solid ? 'solid' : 'open'} button-${size}`} onClick={onClick}>
            {value}
        </button>
    );
};

export default Button;