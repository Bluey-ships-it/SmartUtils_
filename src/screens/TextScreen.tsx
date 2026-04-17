import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import ScreenHeader from "../components/ScreenHeader";
import UtilityTabs from "../components/UtilityTabs";
import type { Tab } from "../components/UtilityTabs";

import WordCountTab from "../components/text/WordCountTab";
import CharCountTab from "../components/text/CharCountTab";
import CaseConverterTab from "../components/text/CaseConverterTab";

const TABS: Tab[] = [
	{ key: "word", label: "Word Count" },
	{ key: "char", label: "Char Count" },
	{ key: "case", label: "Case Converter" },
];

export default function TextScreen() {
	const { theme } = useTheme();
	const [activeTab, setActiveTab] = useState(TABS[0].key);

	return (
		<ScreenWrapper>
			<ScreenHeader title="Text Tools" />
			<UtilityTabs tabs={TABS} activeKey={activeTab} onChange={setActiveTab} />
			<ScrollView
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>
				<View style={{ paddingBottom: theme.spacing.xl }}>
					{activeTab === "word" && <WordCountTab />}
					{activeTab === "char" && <CharCountTab />}
					{activeTab === "case" && <CaseConverterTab />}
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
}
