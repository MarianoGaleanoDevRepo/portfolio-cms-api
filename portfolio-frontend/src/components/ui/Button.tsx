type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

function Button({ children, onClick, className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl bg-violet-600 py-3 text-white transition hover:bg-violet-500 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;