import React, { useState, useRef, useEffect } from "react";
import { View,  StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import StopwatchDisplay from "../components/stopwatch/StopWatchDisplay";
import StopwatchControls from "../components/stopwatch/StopWatchControls";
import ScreenHeader from "../components/ScreenHeader";

export default function StopwatchScreen() {
	const { theme } = useTheme();
	const navigation = useNavigation();

	const [elapsed, setElapsed] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [hasStarted, setHasStarted] = useState(false);

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const startTimeRef = useRef<number>(0);
	const accumulatedRef = useRef<number>(0);

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	function handleStart() {
		startTimeRef.current = Date.now();
		intervalRef.current = setInterval(() => {
			setElapsed(accumulatedRef.current + Date.now() - startTimeRef.current);
		}, 10);
		setIsRunning(true);
		setHasStarted(true);
	}

	function handlePause() {
		if (intervalRef.current) clearInterval(intervalRef.current);
		accumulatedRef.current += Date.now() - startTimeRef.current;
		setIsRunning(false);
	}

	function handleReset() {
		if (intervalRef.current) clearInterval(intervalRef.current);
		accumulatedRef.current = 0;
		startTimeRef.current = 0;
		setElapsed(0);
		setIsRunning(false);
		setHasStarted(false);
	}

	return (
		<ScreenWrapper>
			{/* Header */}
			<ScreenHeader title="Stopwatch"/>

			{/* Display */}
			<View style={styles.displayContainer}>
				<StopwatchDisplay elapsed={elapsed} />
				<StopwatchControls
					isRunning={isRunning}
					hasStarted={hasStarted}
					onStart={handleStart}
					onPause={handlePause}
					onReset={handleReset}
				/>
			</View>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 16,
		paddingBottom: 24,
	},
	backBtn: {
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
	},
	displayContainer: {
		flex: 1,
		justifyContent: "center",
	},
});
