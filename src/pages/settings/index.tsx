import {
	Box,
	Container,
	Typography,
} from "@mui/material";
import { DashboardLayout } from "../../components/DashboardSidebar/dashboard-layout";
import { SettingsNotifications } from "../../components/settings/settings-notifications";
import { SettingsPassword } from "../../components/settings/settings-password";
import { parseCookies } from "nookies";
import {
	GetServerSideProps,
	NextPage,
} from "next";
import HeadComponent from "../../components/Head";

const Settings: NextPage = () => {


	return (
		<DashboardLayout>
			<HeadComponent title="Configurações" />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="lg">
					<Typography
						sx={{ mb: 3 }}
						variant="h4"
					>
						Configurações
					</Typography>
					<SettingsNotifications />
					<Box sx={{ pt: 3 }}>
						<SettingsPassword />
					</Box>
				</Container>
			</Box>
		</DashboardLayout>
	);
};

export default Settings;


