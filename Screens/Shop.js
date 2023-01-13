/* eslint-disable no-console */
/* eslint-disable no-tabs */

/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
	FlatList,
	Image,
	SafeAreaView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import {
	NavigationActions,
	createStackNavigator,
	useNavigation,
} from "@react-navigation/native";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import SignUp from "./SignUp";
import Trash from "./Trash";
import Scan from "./Scan";

const Shop = () => {
	// THESE ARE THE PROMOTIONS FOR DISCOUNTS
	const specialPromoData = [
		{
			id: 1,
			img: images.usFlag,
			title: "Bonus Cashback1",
			description: "Don't miss it. Grab it now!",
		},
		{
			id: 2,
			img: images.wallieLogo,
			title: "Bonus Cashback2",
			description: "Don't miss it. Grab it now!",
		},
		{
			id: 3,
			img: images.focus,
			title: "Bonus Cashback3",
			description: "Don't miss it. Grab it now!",
		},
		{
			id: 4,
			img: images.promoBanner,
			title: "Bonus Cashback4",
			description: "Don't miss it. Grab it now!",
		},
		{
			id: 5,
			img: images.youtube,
			title: "Youtube Cashback",
			description: "Don't miss it. Grab it now!",
		},
	];

	const [specialPromos, setSpecialPromos] = React.useState(specialPromoData);

	function renderPromos() {
		const HeaderComponent = () => <View>{renderPromoHeader()}</View>;

		const renderPromoHeader = () => (
			<View
				style={{
					flexDirection: "row",
					marginBottom: SIZES.padding,
				}}
			>
				<View style={{ flex: 1 }}>
					<Text style={{ ...FONTS.h3, marginBottom: 40 }}>
						Special Promos
					</Text>
				</View>
				<TouchableOpacity onPress={() => console.log("View All")}>
					<Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
						View All
					</Text>
				</TouchableOpacity>
			</View>
		);

		const renderItem = ({ item }) => (
			<View>
				<TouchableOpacity
					style={{
						marginVertical: SIZES.base,
						width: SIZES.width / 2.5,
					}}
					onPress={() => console.log(item.title)}
				>
					<View
						style={{
							height: 80,
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
							backgroundColor: COLORS.primary,
						}}
					>
						<Image
							source={item.img}
							resizeMode="cover"
							style={{
								width: "100%",
								height: "100%",
								borderTopLeftRadius: 20,
								borderTopRightRadius: 20,
							}}
						/>
					</View>

					<View
						style={{
							padding: SIZES.padding,
							backgroundColor: COLORS.lightGray,
							borderBottomLeftRadius: 20,
							borderBottomRightRadius: 20,
						}}
					>
						<Text style={{ ...FONTS.h4 }}>{item.title}</Text>
						<Text style={{ ...FONTS.body4 }}>
							{item.description}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		);

		return (
			<FlatList
				ListHeaderComponent={HeaderComponent}
				contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
				numColumns={2}
				columnWrapperStyle={{ justifyContent: "space-between" }}
				data={specialPromos}
				keyExtractor={(item) => `${item.id}`}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={<View style={{ marginBottom: 80 }}></View>}
			/>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			{renderPromos()}
			<StatusBar backgroundColor={"white"} />
		</SafeAreaView>
	);
};

export default Shop;
