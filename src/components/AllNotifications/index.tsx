import {
	Box,
	// FormControl,
	Grid,
	// MenuItem,
	// Select,
	Button,
	Typography,
} from "@mui/material";
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const notifications = [
	"3 artigos pendentes precisam de sua atenção.",
	"1 notas da equipe no Natalie Rusell.",
	"3 pedidos pendentes precisam de sua atenção.",
	"1 notas da equipe no Natalie Rusell.",
]

export const AllNotifications = (props: any) => (
	<Box border={'1px solid rgb(234, 236, 240)'} pt={1}>
		<Grid
			container
			sx={{
				justifyContent: "space-between",
				alignItems: 'center',
				padding: '0px 20px',
				pb: 1,
				borderBottom: '1px solid rgb(234, 236, 240)',

			}}
		>
			<Grid item >
				<Typography
					color="neutral.900"
					fontWeight={600}
					gutterBottom
					variant="subtitle1"
				>
					Notifications
				</Typography>
			</Grid>
			<Grid item>
				<Button
					endIcon={
						<ArrowDropDownIcon fontSize="small" />
					}
					size="small"
				>
					Últimos 7 dias
				</Button>
				{/* <FormControl fullWidth size="small">
					<InputLabel id="demo-simple-select-label">Age</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						label="Age"
						defaultValue={10}
					>
						<MenuItem
							value={10}
							color="success"
							sx={{ color: 'success' }}
						>
							Últimos 7 dias
						</MenuItem>
					</Select>
				</FormControl> */}
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
					borderBottom: '1px solid rgb(234, 236, 240)',

				}}
				key={key}>
				<Box display={"flex"} gap={1} >
					<AllInboxIcon sx={{ color: "action.active" }} />
					<Typography
						variant="body2"
					>
						{item}
					</Typography>
				</Box>
				<ArrowForwardIcon sx={{ color: "action.active" }} />
			</Box>
		)}
		<Box
			display={"flex"}
			alignItems={"center"}
			pt={1}
			border={'1px solid rgb(234, 236, 240)'}
		>
			<Typography
				variant="body1"
				sx={{
					mr: 1,
					padding: '10px 20px',
					color: "primary.main",
				}}
			>
				Ver todas as notificações
			</Typography>
			<ArrowForwardIcon sx={{ color: "primary.main" }} />
		</Box>

	</Box>
);
