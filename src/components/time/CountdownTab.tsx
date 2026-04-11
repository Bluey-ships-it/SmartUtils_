import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CountdownPresets from "./countdown/CountdownPresets";
import CountdownDisplay from "./countdown/CountdownDisplay";
import CountdownControls from "./countdown/CountdownControls";
import type { CountdownState } from "../../utils/countdown";

export default function CountdownTab() {
	const [totalSeconds, setTotalSeconds] = useState(300);
	const [remaining, setRemaining] = useState(300);
	const [state, setState] = useState<CountdownState>("idle");

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const endTimeRef = useRef<number>(0);

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	useEffect(() => {
		if (state === "finished") {
			if (intervalRef.current) clearInterval(intervalRef.current);
		}
	}, [state]);

	function handlePreset(seconds: number) {
		if (intervalRef.current) clearInterval(intervalRef.current);
		setTotalSeconds(seconds);
		setRemaining(seconds);
		setState("idle");
	}

	function handleStart() {
		endTimeRef.current = Date.now() + remaining * 1000;
		intervalRef.current = setInterval(() => {
			const left = Math.round((endTimeRef.current - Date.now()) / 1000);
			if (left <= 0) {
				setRemaining(0);
				setState("finished");
			} else {
				setRemaining(left);
			}
		}, 500);
		setState("running");
	}

	function handlePause() {
		if (intervalRef.current) clearInterval(intervalRef.current);
		setState("paused");
	}

	function handleReset() {
		if (intervalRef.current) clearInterval(intervalRef.current);
		setRemaining(totalSeconds);
		setState("idle");
	}

	return (
		<View style={styles.container}>
			<CountdownPresets selected={totalSeconds} onChange={handlePreset} />
			<CountdownDisplay
				remaining={remaining}
				total={totalSeconds}
				state={state}
			/>
			<CountdownControls
				state={state}
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
		paddingTop: 8,
	},
});
