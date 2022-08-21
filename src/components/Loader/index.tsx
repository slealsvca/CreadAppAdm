import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import { type } from "os";

type Props = {
	loading: boolean;
	children?: React.ReactNode;
};

export const Loader = ({
	loading,
	children,
}: Props) => {
	return (
		<Backdrop
			sx={{
				color: "primary",
				zIndex: theme =>
					theme.zIndex
						.drawer + 1,
			}}
			open={loading}
		>
			<CircularProgress
				color="primary"
				size={50}
			/>
		</Backdrop>
	);
};
