import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import ScreenHeader from "../components/ScreenHeader";
import UtilityTabs from "../components/UtilityTabs";
import type { Tab } from "../components/UtilityTabs";

import UnitConverterTab from "../components/conversion/UnitConverterTab";
import TemperatureConverterTab from "../components/conversion/TemperatureConverterTab";
import CurrencyConverterTab from "../components/conversion/CurrencyConverterTab";

const TABS: Tab[] = [
	{ key: "unit", label: "Unit" },
	{ key: "temperature", label: "Temperature" },
	{ key: "currency", label: "Currency" },
];

export default function ConversionScreen() {
	const { theme } = useTheme();
	const [activeTab, setActiveTab] = useState(TABS[0].key);

	return (
		<ScreenWrapper>
			<ScreenHeader title="Conversion" />
			<UtilityTabs tabs={TABS} activeKey={activeTab} onChange={setActiveTab} />
			<ScrollView
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>
				<View style={{ paddingBottom: theme.spacing.xl }}>
					{activeTab === "unit" && <UnitConverterTab />}
					{activeTab === "temperature" && <TemperatureConverterTab />}
					{activeTab === "currency" && <CurrencyConverterTab />}
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
