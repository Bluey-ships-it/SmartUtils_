import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import StopwatchDisplay from "../stopwatch/StopWatchDisplay";
import StopwatchControls from "../stopwatch/StopWatchControls";

export default function StopwatchTab() {
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
		<View style={styles.container}>
			<StopwatchDisplay elapsed={elapsed} />
			<StopwatchControls
				isRunning={isRunning}
				hasStarted={hasStarted}
				onStart={handleStart}
				onPause={handlePause}
				onReset={handleReset}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
});
