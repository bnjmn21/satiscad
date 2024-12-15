import {
	type ButtonHTMLAttributes,
	type ForwardedRef,
	forwardRef,
	type ReactNode,
	useRef,
	useState,
} from "react";
import {
	arrow,
	autoUpdate,
	flip,
	FloatingArrow,
	offset,
	type Placement,
	shift,
	useFloating,
	useHover,
	useInteractions,
	useRole,
	useTransitionStyles,
} from "@floating-ui/react";
import mergeRefs from "merge-refs";

export type TooltipButtonProps = {
	children: ReactNode;
	tooltip: string;
	placement?: Placement;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const TooltipButton = forwardRef<HTMLButtonElement | null, TooltipButtonProps>(
	_TooltipButton,
);
export default TooltipButton;
function _TooltipButton(
	{ children, tooltip, placement, ...buttonProps }: TooltipButtonProps,
	ref: ForwardedRef<HTMLButtonElement>,
) {
	const [isOpen, setIsOpen] = useState(false);
	const arrowRef = useRef(null);
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [
			offset(10),
			flip(),
			shift(),
			arrow({
				element: arrowRef,
			}),
		],
		whileElementsMounted: autoUpdate,
		placement,
	});
	const hover = useHover(context, {
		move: false,
		delay: { open: 1000, close: 0 },
	});
	const role = useRole(context, {
		role: "label",
	});

	const { getReferenceProps, getFloatingProps } = useInteractions([
		hover,
		role,
	]);
	const { isMounted, styles: animStyles } = useTransitionStyles(context, {
		duration: 250,
	});

	return (
		<>
			{isMounted && (
				<div
					ref={refs.setFloating}
					style={floatingStyles}
					{...getFloatingProps()}
				>
					<span className="tooltip" style={animStyles}>
						{tooltip}
						<FloatingArrow
							ref={arrowRef}
							context={context}
							fill="#222"
							stroke="#333"
							strokeWidth={1}
						/>
					</span>
				</div>
			)}

			<button
				ref={mergeRefs<HTMLButtonElement>(refs.setReference, ref)}
				{...buttonProps}
				{...getReferenceProps()}
			>
				{children}
			</button>
		</>
	);
}
