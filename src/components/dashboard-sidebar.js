import {
	useEffect,
	useState,
} from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
	Box,
	Button,
	Divider,
	Drawer,
	Typography,
	useMediaQuery,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Selector as SelectorIcon } from "../icons/selector";
import { NavItem } from "./nav-item";
import { parseCookies } from "nookies";
import LockClockIcon from "@mui/icons-material/LockClock";
import ArticleIcon from "@mui/icons-material/Article";
import BallotIcon from "@mui/icons-material/Ballot";

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
		href: "/articles",
		icon: (
			<ArticleIcon fontSize="small" />
		),
		title: "Artigos",
	},
	{
		href: "/accessControl",
		icon: (
			<LockClockIcon fontSize="small" />
		),
		title: "Controle de acesso",
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
								{/* <Logo
                                    sx={{
                                        height: 42,
                                        width: 42,
                                    }}
                                /> */}

								<Typography
									variant="h4"
									//textAlign={'center'}
									sx={{
										color: "#ffffff",
									}}
								>
									{/* <AccountBalanceIcon
                                    fontSize="large"
                                    sx={{
                                      mr: 1,
                                     transform: 'translateY(5.2px)',
                                    }}
                                  /> */}
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
										Titulação
										:
										Revisor
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
					<Box
						sx={{
							px: 2,
							py: 3,
						}}
					>
						<Typography
							color="neutral.100"
							variant="subtitle2"
						>
							Novo
						</Typography>
						<Typography
							color="neutral.500"
							variant="body2"
						>
							Novo item em
							desenvolvimento
						</Typography>
						<Box
							sx={{
								display:
									"flex",
								mt: 2,
								mx: "auto",
								width: "160px",
								"& img":
									{
										width: "100%",
									},
							}}
						>
							{/* eslint-disable-next-line @next/next/no-img-element*/}
							<img
								alt="Go to pro"
								src="/static/images/sidebar_pro.png"
							/>
						</Box>
						<NextLink
							href="/"
							passHref
						>
							<Button
								color="secondary"
								component="a"
								endIcon={
									<OpenInNewIcon />
								}
								fullWidth
								sx={{
									mt: 2,
								}}
								variant="contained"
							>
								Em
								desenvolvimento
							</Button>
						</NextLink>
					</Box>
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
