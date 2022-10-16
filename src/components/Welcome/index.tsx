import {
	Avatar,
	Box,
	Card,
	CardContent,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import { Fragment } from "react";
const notifications = [
	"3 artigos pendentes precisam de sua atenção.",
	"1 notas da equipe no Natalie Rusell.",
	"3 pedidos pendentes precisam de sua atenção."
]
export const AllNotifications = (
	props: any,
) => (
	<Card {...props}>
		<CardContent sx={{ padding: '0px 0px' }}>
			<Grid
				container
				//spacing={3}
				sx={{
					justifyContent:
						"space-between",
					alignItems: 'center',
					padding: '10px 20px',
					border: '1px solid rgb(234, 236, 240)'
				}}
			>
				<Grid item >
					<Typography
						color="textSecondary"
						gutterBottom
						variant="overline"
					>
						Notifications
					</Typography>
				</Grid>
				<Grid item>
					<FormControl fullWidth size="small">
						{/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
						<Select
							// labelId="demo-simple-select-label"
							// label="Age"
							defaultValue={10}
						>
							<MenuItem value={10}>Mês passado</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			{notifications.map((item, key: number) =>
				<Box
					sx={{
						alignItems:
							"center",
						display: "flex",
						justifyContent: 'space-between',
						padding: '10px 20px',
					}}
					key={key}>
					<Box display={"flex"} gap={1} >
						<AllInboxIcon color="success" />
						<Typography
							variant="body2"
							sx={{
								mr: 1,
							}}
						>
							{item}
						</Typography>
					</Box>
					<ArrowForwardIcon color="success" />
				</Box>
			)}
		</CardContent>
	</Card>
);
