import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import ScreenHeader from "../components/ScreenHeader";
import UtilityTabs from "../components/UtilityTabs";
import type { Tab } from "../components/UtilityTabs";

import BMITab from "../components/calculator/BMITab";
import TipCalculatorTab from "../components/calculator/TipCalculatorTab";
import BillSplitTab from "../components/calculator/BillSplitTab";

const TABS: Tab[] = [
	{ key: "bmi", label: "BMI" },
	{ key: "tip", label: "Tip Calculator" },
	{ key: "bill", label: "Bill Split" },
];

export default function CalculatorScreen() {
	const { theme } = useTheme();
	const [activeTab, setActiveTab] = useState(TABS[0].key);

	return (
		<ScreenWrapper>
			<ScreenHeader title="Calculator" />
			<UtilityTabs tabs={TABS} activeKey={activeTab} onChange={setActiveTab} />
			<ScrollView
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>
				<View style={{ paddingBottom: theme.spacing.xl }}>
					{activeTab === "bmi" && <BMITab />}
					{activeTab === "tip" && <TipCalculatorTab />}
					{activeTab === "bill" && <BillSplitTab />}
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
