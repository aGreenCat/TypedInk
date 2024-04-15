import "./Button.css";

const Button = ({className, value, color, size, solid}) => {
    return (
        <button className={`${className} button-${color}-${solid ? 'solid' : 'open'} button-${size}`}>
            {value}
        </button>
    );
};

export default Button;