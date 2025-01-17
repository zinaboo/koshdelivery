import { useTheme } from "@emotion/react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import PlaceIcon from "@mui/icons-material/Place";
import { alpha, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { t } from "i18next";
import { useRouter } from "next/router";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import CustomDivider from "../CustomDivider";
import TrackOrder from "./index";

const TrackOrderDetails = ({
	showOrderDetails,
	trackOrderFormik,
	trackOrderData,
}) => {
	const theme = useTheme();
	const router = useRouter();
	const handleClick = () => {
		router.push(
			{
				pathname: "/profile",
				query: { orderId: trackOrderData?.id, page: "my-orders" },
			},
			undefined,
			{ shallow: true }
		);
	};
	return (
		<CustomStackFullWidth paddingTop="30px" spacing={2}>
			<Stack direction="row" justifyContent="space-between">
				<Typography fontSize="18px" fontWeight="600">
					{t("order")}{" "}
					<Typography
						component="span"
						fontSize="18px"
						fontWeight="600"
						marginLeft="3px"
					>
						#{trackOrderData?.id}
					</Typography>
				</Typography>
				<Typography fontSize="18px" fontWeight="600">
					{getAmountWithSign(trackOrderData?.order_amount)}
				</Typography>
			</Stack>
			<CustomDivider border="2px" width="100%" />
			<CustomStackFullWidth
				direction={{ xs: "column", md: "row" }}
				gap={{ xs: "10px", md: "70px" }}
				//paddingX={{ xs: "10px", md: "90px" }}
				paddingTop="20px"
				justifyContent="space-between"
			>
				<Stack
					direction="row"
					spacing={1}
					alignItems="center"
					padding="1rem"
					minWidth={{ xs: "200px", md: "320px" }}
					backgroundColor={alpha(theme.palette.primary.deep, 0.1)}
					borderRadius="8px"
				>
					<AddBusinessIcon color="primary" />
					<Typography fontSize="12px">
						{trackOrderData?.module_type !== "parcel"
							? trackOrderData?.store?.name
							: trackOrderData?.receiver_details?.address}
					</Typography>
				</Stack>
				<Stack
					direction="row"
					spacing={1}
					alignItems="center"
					padding="1rem"
					backgroundColor={alpha(theme.palette.primary.deep, 0.1)}
					minWidth={{ xs: "200px", md: "320px" }}
					borderRadius="8px"
				>
					<PlaceIcon color="primary" />
					<Typography fontSize="12px">
						{trackOrderData?.delivery_address?.address}
					</Typography>
				</Stack>
				<Button onClick={handleClick} variant="outlined">
					{t("View Order Details")}
				</Button>
			</CustomStackFullWidth>
			<CustomStackFullWidth sx={{ paddingTop: { xs: "10px", md: "40px" } }}>
				<TrackOrder trackOrderData={trackOrderData} />
			</CustomStackFullWidth>
		</CustomStackFullWidth>
	);
};

export default TrackOrderDetails;
