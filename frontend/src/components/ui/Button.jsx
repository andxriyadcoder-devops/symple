const Button = ({
  children,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full rounded-lg bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;