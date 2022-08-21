import {
	Avatar,
	Card,
	CardContent,
	Grid,
	Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

export const TotalProfit = (
	props: any,
) => (
	<Card {...props}>
		<CardContent>
			<Grid
				container
				spacing={3}
				sx={{
					justifyContent:
						"space-between",
				}}
			>
				<Grid item>
					<Typography
						color="textSecondary"
						gutterBottom
						variant="overline"
					>
						TOTAL DE
						VISUALIZAÇÕES
					</Typography>
					<Typography
						color="textPrimary"
						variant="h4"
					>
						24k
					</Typography>
				</Grid>
				<Grid item>
					<Avatar
						sx={{
							backgroundColor:
								"primary.main",
							height: 56,
							width: 56,
						}}
					>
						<SupervisedUserCircleIcon />
					</Avatar>
				</Grid>
			</Grid>
		</CardContent>
	</Card>
);
