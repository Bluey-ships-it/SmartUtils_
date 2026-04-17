import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import type { Task, TaskPriority } from "../../types/tasks";

type Props = {
	task: Task;
	onToggle: (id: string) => void;
	onEdit: (task: Task) => void;
	onDelete: (id: string) => void;
	onViewDetails: (task: Task) => void;
};

const PRIORITY_COLORS = {
	low: {
		bg: "#EFF6FF",
		border: "#BFDBFE",
		badge: "#3B82F6",
		badgeBg: "#DBEAFE",
	},
	medium: {
		bg: "#FFFBEB",
		border: "#FDE68A",
		badge: "#D97706",
		badgeBg: "#FEF3C7",
	},
	high: {
		bg: "#FEF2F2",
		border: "#FECACA",
		badge: "#DC2626",
		badgeBg: "#FEE2E2",
	},
};

const PRIORITY_LABELS: Record<TaskPriority, string> = {
	low: "Low",
	medium: "Medium",
	high: "High",
};

function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

export default function TaskCard({
	task,
	onToggle,
	onEdit,
	onDelete,
	onViewDetails,
}: Props) {
	const { theme } = useTheme();
	const [confirmDelete, setConfirmDelete] = useState(false);
	const colors = PRIORITY_COLORS[task.priority];
	const isCompleted = task.status === "completed";

	function handleDeletePress() {
		if (confirmDelete) {
			onDelete(task.id);
		} else {
			setConfirmDelete(true);
			setTimeout(() => setConfirmDelete(false), 3000);
		}
	}

	return (
		<View
			style={[
				styles.card,
				{
					backgroundColor: colors.bg,
					borderColor: colors.border,
					borderRadius: theme.radius.lg,
					padding: theme.spacing.md,
					marginBottom: theme.spacing.sm,
				},
			]}
		>
			{/* Top Row */}
			<View style={styles.topRow}>
				{/* Checkbox + Title */}
				<View style={styles.checkRow}>
					<TouchableOpacity
						onPress={() => onToggle(task.id)}
						style={[
							styles.checkbox,
							{
								backgroundColor: isCompleted
									? theme.colors.primary
									: "transparent",
								borderColor: isCompleted
									? theme.colors.primary
									: theme.colors.border,
								borderRadius: theme.radius.sm,
							},
						]}
						activeOpacity={0.7}
					>
						{isCompleted && (
							<Ionicons name="checkmark-outline" size={14} color="#fff" />
						)}
					</TouchableOpacity>
					<TouchableOpacity
						onLongPress={() => onViewDetails(task)}
						delayLongPress={300}
						activeOpacity={0.9}
						style={styles.titleWrapper}
					>
						<AppText
							variant="body"
							style={[
								styles.title,
								isCompleted && {
									textDecorationLine: "line-through",
									color: theme.colors.textMuted,
								},
							]}
						>
							{task.title}
						</AppText>
					</TouchableOpacity>
				</View>

				{/* Actions */}
				<View style={styles.actions}>
					<TouchableOpacity
						onPress={() => onEdit(task)}
						style={[
							styles.actionBtn,
							{
								backgroundColor: "rgba(255,255,255,0.6)",
								borderRadius: theme.radius.sm,
							},
						]}
					>
						<Ionicons
							name="pencil-outline"
							size={16}
							color={theme.colors.textSecondary}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={handleDeletePress}
						style={[
							styles.actionBtn,
							{
								backgroundColor: confirmDelete
									? theme.colors.error
									: "rgba(255,255,255,0.6)",
								borderRadius: theme.radius.sm,
							},
						]}
					>
						<Ionicons
							name={confirmDelete ? "warning-outline" : "trash-outline"}
							size={16}
							color={confirmDelete ? "#fff" : theme.colors.textSecondary}
						/>
					</TouchableOpacity>
				</View>
			</View>

			{/* Description */}
			{task.description && (
				<TouchableOpacity
					onLongPress={() => onViewDetails(task)}
					delayLongPress={300}
					activeOpacity={0.9}
				>
					<AppText
						variant="caption"
						color={theme.colors.textSecondary}
						style={styles.description}
						numberOfLines={2}
					>
						{task.description}
					</AppText>
				</TouchableOpacity>
			)}

			{/* Bottom Row */}
			<View style={styles.bottomRow}>
				{/* Priority Badge */}
				<View
					style={[
						styles.priorityBadge,
						{
							backgroundColor: colors.badgeBg,
							borderRadius: theme.radius.full,
						},
					]}
				>
					<AppText variant="caption" color={colors.badge}>
						{PRIORITY_LABELS[task.priority]}
					</AppText>
				</View>

				{/* Status Badge */}
				<View
					style={[
						styles.statusBadge,
						{
							backgroundColor: isCompleted
								? theme.colors.successLight
								: theme.colors.primaryLight,
							borderRadius: theme.radius.full,
						},
					]}
				>
					<AppText
						variant="caption"
						color={isCompleted ? theme.colors.success : theme.colors.primary}
					>
						{isCompleted ? "Completed" : "Active"}
					</AppText>
				</View>

				{/* Date */}
				<AppText variant="caption" color={theme.colors.textMuted}>
					{isCompleted && task.completedAt
						? `Done ${formatDate(task.completedAt)}`
						: formatDate(task.createdAt)}
				</AppText>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		gap: 10,
	},
	topRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		gap: 8,
	},
	checkRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		flex: 1,
	},
	checkbox: {
		width: 22,
		height: 22,
		borderWidth: 1.5,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		flex: 1,
		lineHeight: 22,
	},
	titleWrapper: {
		flex: 1,
	},
	actions: {
		flexDirection: "row",
		gap: 6,
	},
	actionBtn: {
		width: 30,
		height: 30,
		alignItems: "center",
		justifyContent: "center",
	},
	description: {
		paddingLeft: 32,
		lineHeight: 20,
	},
	bottomRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		paddingLeft: 32,
		flexWrap: "wrap",
	},
	priorityBadge: {
		paddingHorizontal: 10,
		paddingVertical: 3,
	},
	statusBadge: {
		paddingHorizontal: 10,
		paddingVertical: 3,
	},
});
