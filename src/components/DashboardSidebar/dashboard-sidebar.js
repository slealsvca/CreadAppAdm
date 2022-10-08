import {
	useEffect,
	useState,
} from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import CategoryIcon from '@mui/icons-material/Category';

import {
	Box,
	Divider,
	Drawer,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { Selector as SelectorIcon } from "../../icons/selector";
import { NavItem } from "./nav-item";
import { parseCookies } from "nookies";
import BallotIcon from "@mui/icons-material/Ballot";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

const items = [
	{
		href: "/",
		icon: (
			<ChartBarIcon fontSize="small" />
		),
		title: "Dashboard",
	},
	{
		href: "/publication",
		icon: (
			<BallotIcon fontSize="small" />
		),
		title: "Publicações",
	},
	{
		href: "/category",
		icon: (
			<CategoryIcon fontSize="small" />
		),
		title: "Categorias",
	},
	{
		href: "/banners",
		icon: (
			<ViewCarouselIcon fontSize="small" />
		),
		title: "Banners",
	},
];

export const DashboardSidebar =
	props => {
		const { open, onClose } = props;
		const [user, setUser] =
			useState(null);
		const router = useRouter();
		const lgUp = useMediaQuery(
			theme =>
				theme.breakpoints.up(
					"lg",
				),
			{
				defaultMatches: true,
				noSsr: false,
			},
		);

		useEffect(
			() => {
				if (!router.isReady) {
					return;
				}

				if (open) {
					onClose?.();
				}
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[router.asPath],
		);

		useEffect(() => {
			const {
				["rica-adm.user"]: user,
			} = parseCookies();
			try {
				setUser(
					JSON.parse(user),
				);
			} catch (e) {
				setUser(null);
			}
		}, []);

		const content = (
			<>
				<Box
					sx={{
						display: "flex",
						flexDirection:
							"column",
						height: "100%",
					}}
				>
					<div>
						<Box
							sx={{
								p: 3,
							}}
						>
							<NextLink
								href="/"
								passHref
							>								

								<Typography
									variant="h4"
									sx={{
										color: "#ffffff",
									}}
								>
									INTERFIN
								</Typography>
							</NextLink>
						</Box>
						<Box
							sx={{
								px: 2,
							}}
						>
							<Box
								sx={{
									alignItems:
										"center",
									backgroundColor:
										"rgba(255, 255, 255, 0.04)",
									cursor: "pointer",
									display:
										"flex",
									justifyContent:
										"space-between",
									px: 3,
									py: "11px",
									borderRadius: 1,
								}}
							>
								<div>
									<Typography
										color="inherit"
										variant="subtitle1"
									>
										{
											user?.name
										}
									</Typography>
									<Typography
										color="neutral.400"
										variant="body2"
									>
										Função 
										:
										Administrador
									</Typography>
								</div>
								<SelectorIcon
									sx={{
										color: "neutral.500",
										width: 14,
										height: 14,
									}}
								/>
							</Box>
						</Box>
					</div>
					<Divider
						sx={{
							borderColor:
								"#2D3748",
							my: 3,
						}}
					/>
					<Box
						sx={{
							flexGrow: 1,
						}}
					>
						{items.map(
							item => (
								<NavItem
									key={
										item.title
									}
									icon={
										item.icon
									}
									href={
										item.href
									}
									title={
										item.title
									}
								/>
							),
						)}
					</Box>
					<Divider
						sx={{
							borderColor:
								"#2D3748",
						}}
					/>					
				</Box>
			</>
		);

		if (lgUp) {
			return (
				<Drawer
					anchor="left"
					open
					PaperProps={{
						sx: {
							backgroundColor:
								"neutral.900",
							//backgroundImage: 'url(https://gerministore.blob.core.windows.net/images/4effb1ce-8a3d-41c8-9196-86f5a308b3e9.jpg)',
							color: "#FFFFFF",
							width: 280,
						},
					}}
					variant="permanent"
				>
					{content}
				</Drawer>
			);
		}

		return (
			<Drawer
				anchor="left"
				onClose={onClose}
				open={open}
				PaperProps={{
					sx: {
						backgroundColor:
							"neutral.900",
						color: "#FFFFFF",
						width: 280,
					},
				}}
				sx={{
					zIndex: theme =>
						theme.zIndex
							.appBar +
						100,
				}}
				variant="temporary"
			>
				{content}
			</Drawer>
		);
	};

DashboardSidebar.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool,
};
