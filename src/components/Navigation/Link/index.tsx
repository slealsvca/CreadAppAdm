import PropTypes from "prop-types";
import NextLink from "next/link";
import { Typography } from "@mui/material";

interface LinkProps {
	href: string;
	children: React.ReactNode;
	color?:
		| "inherit"
		| "primary"
		| "secondary";
	fontSize?:
		| "inherit"
		| "small"
		| "medium"
		| "large";
	underline?:
		| "none"
		| "always"
		| "hover"
		| "focus";
	size?: "small" | "medium" | "large";
}

export const Link = (
	props: LinkProps,
) => {
	const {
		href,
		children,
		color,
		size,
	} = props;
	return (
		<NextLink
			href={href}
			color={color}
		>
			<Typography
				variant="overline"
				color={color}
				size={size}
				align="center"
				sx={{
					cursor: "pointer",
					alignItems:
						"center",
					display: "flex",
					justifContent:
						"center",
				}}
				{...props}
			>
				{children}
			</Typography>
		</NextLink>
	);
};
