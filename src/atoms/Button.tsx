type ButtonProps = {
    action?: () => void
    children: string
}

const Button = ({ action, children }: ButtonProps) => (
    <button className="button" onClick={action && action}>
        {children}
    </button>
)

export default Button
