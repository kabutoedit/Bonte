import './Button.scss'

interface ButtonProps {
	children: React.ReactNode
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset'
	className?: string
}

export default function Button({
	children,
	onClick,
	type = 'button',
	className = '',
}: ButtonProps) {
	return (
		<button type={type} className={`button ${className}`} onClick={onClick}>
			{children}
		</button>
	)
}
