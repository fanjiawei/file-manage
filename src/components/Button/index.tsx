import {ButtonHTMLAttributes, forwardRef} from "react";

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<Element>>(({
                                                                                 className = '',
                                                                                 children,
                                                                                 ...props
                                                                             }, ref) => {
    return <button ref={ref} className={'p-4 hover:text-blue-400' + className} {...props}>
        {children}
    </button>
});

export default Button;
