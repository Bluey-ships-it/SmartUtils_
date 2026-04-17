import React, { useState } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	Modal,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import type { TaskPriority } from "../../types/tasks";

type Props = {
	visible: boolean;
	onClose: () => void;
	onAdd: (
		title: string,
		description: string | undefined,
		priority: TaskPriority,
	) => void;
};

const PRIORITIES: { key: TaskPriority; label: string; color: string }[] = [
	{ key: "low", label: "Low", color: "#3B82F6" },
	{ key: "medium", label: "Medium", color: "#D97706" },
	{ key: "high", label: "High", color: "#DC2626" },
];

export default function AddTaskModal({ visible, onClose, onAdd }: Props) {
	const { theme } = useTheme();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState<TaskPriority>("medium");
	const [touched, setTouched] = useState(false);

	const isValid = title.trim().length > 0;

	function handleAdd() {
		setTouched(true);
		if (!isValid) return;
		onAdd(title, description || undefined, priority);
		handleClose();
	}

	function handleClose() {
		setTitle("");
		setDescription("");
		setPriority("medium");
		setTouched(false);
		onClose();
	}

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent
			onRequestClose={handleClose}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.overlay}
			>
				<View
					style={[
						styles.sheet,
						{
							backgroundColor: theme.colors.background,
						},
					]}
				>
					<ScrollView showsVerticalScrollIndicator={false}>
						{/* Handle */}
						<View style={styles.handleWrapper}>
							<View
								style={[
									styles.handle,
									{ backgroundColor: theme.colors.border },
								]}
							/>
						</View>

						<AppText variant="subheading" style={styles.modalTitle}>
							Create Task
						</AppText>

						{/* Title */}
						<AppText variant="label" style={styles.fieldLabel}>
							Title
						</AppText>
						<View
							style={[
								styles.inputWrapper,
								{
									backgroundColor: theme.colors.surface,
									borderColor:
										touched && !isValid
											? theme.colors.error
											: theme.colors.border,
									borderRadius: theme.radius.md,
								},
							]}
						>
							<TextInput
								value={title}
								onChangeText={setTitle}
								placeholder="Enter task title"
								placeholderTextColor={theme.colors.textMuted}
								style={[
									styles.input,
									{ color: theme.colors.text, fontSize: theme.fontSizes.md },
								]}
							/>
						</View>
						{touched && !isValid && (
							<AppText
								variant="caption"
								color={theme.colors.error}
								style={styles.errorText}
							>
								Title is required
							</AppText>
						)}

						{/* Description */}
						<AppText variant="label" style={styles.fieldLabel}>
							Description (optional)
						</AppText>
						<View
							style={[
								styles.inputWrapper,
								{
									backgroundColor: theme.colors.surface,
									borderColor: theme.colors.border,
									borderRadius: theme.radius.md,
									minHeight: 100,
								},
							]}
						>
							<TextInput
								value={description}
								onChangeText={setDescription}
								placeholder="Add a description..."
								placeholderTextColor={theme.colors.textMuted}
								multiline
								style={[
									styles.input,
									styles.textArea,
									{ color: theme.colors.text, fontSize: theme.fontSizes.md },
								]}
							/>
						</View>

						{/* Priority */}
						<AppText variant="label" style={styles.fieldLabel}>
							Priority
						</AppText>
						<View style={styles.priorityRow}>
							{PRIORITIES.map((p) => {
								const active = p.key === priority;
								return (
									<TouchableOpacity
										key={p.key}
										onPress={() => setPriority(p.key)}
										style={[
											styles.priorityBtn,
											{
												backgroundColor: active
													? p.color
													: theme.colors.surface,
												borderColor: active ? p.color : theme.colors.border,
												borderRadius: theme.radius.md,
											},
										]}
									>
										<AppText
											variant="label"
											color={active ? "#fff" : theme.colors.text}
										>
											{p.label}
										</AppText>
									</TouchableOpacity>
								);
							})}
						</View>

						{/* Buttons */}
						<TouchableOpacity
							onPress={handleAdd}
							style={[
								styles.createBtn,
								{
									backgroundColor: theme.colors.primary,
									borderRadius: theme.radius.md,
								},
							]}
						>
							<AppText variant="label" color={theme.colors.textOnPrimary}>
								Create Task
							</AppText>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={handleClose}
							style={[
								styles.cancelBtn,
								{
									borderColor: theme.colors.border,
									borderRadius: theme.radius.md,
								},
							]}
						>
							<AppText variant="label" color={theme.colors.textSecondary}>
								Cancel
							</AppText>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	sheet: {
		maxHeight: "85%",
		paddingHorizontal: 20,
		paddingBottom: 32,
	},
	handleWrapper: {
		alignItems: "center",
		paddingVertical: 12,
	},
	handle: {
		width: 40,
		height: 4,
		borderRadius: 999,
	},
	modalTitle: {
		marginBottom: 24,
	},
	fieldLabel: {
		marginBottom: 8,
	},
	inputWrapper: {
		borderWidth: 1,
		paddingHorizontal: 14,
		marginBottom: 4,
	},
	input: {
		paddingVertical: 12,
	},
	textArea: {
		textAlignVertical: "top",
		minHeight: 80,
	},
	errorText: {
		marginBottom: 4,
	},
	priorityRow: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 28,
	},
	priorityBtn: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 12,
		borderWidth: 1,
	},
	createBtn: {
		alignItems: "center",
		paddingVertical: 14,
		marginBottom: 12,
	},
	cancelBtn: {
		alignItems: "center",
		paddingVertical: 14,
		borderWidth: 1,
	},
});
