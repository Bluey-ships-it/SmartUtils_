import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import ScreenHeader from "../components/ScreenHeader";
import UtilityTabs from "../components/UtilityTabs";
import type { Tab } from "../components/UtilityTabs";

import StopwatchTab from "../components/time/StopwatchTab";
import CountdownTab from "../components/time/CountdownTab";

const TABS: Tab[] = [
	{ key: "stopwatch", label: "Stopwatch" },
	{ key: "countdown", label: "Countdown" },
];

export default function TimeScreen() {
	const { theme } = useTheme();
	const [activeTab, setActiveTab] = useState(TABS[0].key);

	return (
		<ScreenWrapper>
			<ScreenHeader title="Time Tools" />
			<UtilityTabs tabs={TABS} activeKey={activeTab} onChange={setActiveTab} />
			<View style={{ flex: 1, paddingBottom: theme.spacing.xl }}>
				{activeTab === "stopwatch" && <StopwatchTab />}
				{activeTab === "countdown" && <CountdownTab />}
			</View>
		</ScreenWrapper>
	);
}
