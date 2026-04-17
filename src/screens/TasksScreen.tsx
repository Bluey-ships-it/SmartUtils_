import React, { useState } from "react";
import {
	View,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Modal,
	Pressable,
	ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import ScreenHeader from "../components/ScreenHeader";
import AppText from "../components/AppText";
import TaskCard from "../components/tasks/TaskCard";
import TaskFilter from "../components/tasks/TaskFilter";
import AddTaskModal from "../components/tasks/AddTaskModal";
import EditTaskModal from "../components/tasks/EditTaskModal";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types/tasks";
import type { FilterType } from "../components/tasks/TaskFilter";

export default function TasksScreen() {
	const { theme } = useTheme();
	const {
		tasks,
		filteredTasks,
		filter,
		isLoading,
		setFilter,
		addTask,
		editTask,
		toggleTask,
		deleteTask,
	} = useTasks();

	const [showAdd, setShowAdd] = useState(false);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);

	const counts = {
		all: tasks.length,
		active: tasks.filter((t) => t.status === "active").length,
		completed: tasks.filter((t) => t.status === "completed").length,
	};

	function handleEdit(task: Task) {
		setEditingTask(task);
	}

	function handleEditClose() {
		setEditingTask(null);
	}

	function handleTaskPreview(task: Task) {
		setSelectedTask(task);
	}

	return (
		<ScreenWrapper>
			<ScreenHeader title="My Tasks" />

			{/* Summary Row */}
			<View style={styles.summaryRow}>
				<View
					style={[
						styles.summaryCard,
						{
							backgroundColor: theme.colors.primaryLight,
							borderRadius: theme.radius.md,
							borderColor: theme.colors.primary,
						},
					]}
				>
					<AppText variant="heading" color={theme.colors.primary}>
						{counts.active}
					</AppText>
					<AppText variant="caption" color={theme.colors.primary}>
						Active
					</AppText>
				</View>
				<View
					style={[
						styles.summaryCard,
						{
							backgroundColor: theme.colors.successLight,
							borderRadius: theme.radius.md,
							borderColor: theme.colors.success,
						},
					]}
				>
					<AppText variant="heading" color={theme.colors.success}>
						{counts.completed}
					</AppText>
					<AppText variant="caption" color={theme.colors.success}>
						Completed
					</AppText>
				</View>
				<View
					style={[
						styles.summaryCard,
						{
							backgroundColor: theme.colors.surfaceSecondary,
							borderRadius: theme.radius.md,
							borderColor: theme.colors.border,
						},
					]}
				>
					<AppText variant="heading" color={theme.colors.text}>
						{counts.all}
					</AppText>
					<AppText variant="caption" color={theme.colors.textMuted}>
						Total
					</AppText>
				</View>
			</View>

			{/* Filter */}
			<TaskFilter
				active={filter as FilterType}
				onChange={setFilter}
				counts={counts}
			/>

			{/* List */}
			{isLoading ? (
				<View style={styles.emptyState}>
					<AppText variant="caption" color={theme.colors.textMuted}>
						Loading tasks...
					</AppText>
				</View>
			) : filteredTasks.length === 0 ? (
				<View style={styles.emptyState}>
					<Ionicons
						name="clipboard-outline"
						size={48}
						color={theme.colors.textMuted}
					/>
					<AppText
						variant="body"
						color={theme.colors.textMuted}
						align="center"
						style={styles.emptyText}
					>
						{filter === "completed"
							? "No completed tasks yet"
							: filter === "active"
								? "No active tasks"
								: "No tasks yet. Tap + to create one."}
					</AppText>
				</View>
			) : (
				<FlatList
					data={filteredTasks}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<TaskCard
							task={item}
							onToggle={toggleTask}
							onEdit={handleEdit}
							onDelete={deleteTask}
							onViewDetails={handleTaskPreview}
						/>
					)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: theme.spacing.xxl,
					}}
				/>
			)}

			{/* FAB */}
			<TouchableOpacity
				onPress={() => setShowAdd(true)}
				style={[
					styles.fab,
					{
						backgroundColor: theme.colors.primary,
						borderRadius: theme.radius.full,
					},
				]}
			>
				<Ionicons name="add" size={28} color={theme.colors.textOnPrimary} />
			</TouchableOpacity>

			{/* Modals */}
			<AddTaskModal
				visible={showAdd}
				onClose={() => setShowAdd(false)}
				onAdd={addTask}
			/>
			<EditTaskModal
				visible={editingTask !== null}
				task={editingTask}
				onClose={handleEditClose}
				onEdit={editTask}
			/>
			<Modal
				visible={selectedTask !== null}
				transparent
				animationType="slide"
				onRequestClose={() => setSelectedTask(null)}
			>
				<Pressable
					style={styles.previewOverlay}
					onPress={() => setSelectedTask(null)}
				>
					<Pressable
						style={[
							styles.previewSheet,
							{
								backgroundColor: theme.colors.background,
								borderTopLeftRadius: theme.radius.xl,
								borderTopRightRadius: theme.radius.xl,
							},
						]}
					>
						<View style={styles.previewHandleWrap}>
							<View
								style={[
									styles.previewHandle,
									{ backgroundColor: theme.colors.border },
								]}
							/>
						</View>
						<ScrollView
							showsVerticalScrollIndicator={false}
							contentContainerStyle={styles.previewScrollContent}
						>
							<AppText variant="subheading" style={styles.previewTitle}>
								{selectedTask?.title}
							</AppText>
							<AppText
								variant="caption"
								color={theme.colors.textMuted}
								style={styles.previewHint}
							>
								Full task content
							</AppText>
							<AppText variant="body" color={theme.colors.textSecondary}>
								{selectedTask?.description?.trim() ||
									"No additional description provided for this task."}
							</AppText>
							<TouchableOpacity
								onPress={() => setSelectedTask(null)}
								style={[
									styles.previewCloseBtn,
									{
										backgroundColor: theme.colors.primary,
										borderRadius: theme.radius.md,
									},
								]}
							>
								<AppText variant="label" color={theme.colors.textOnPrimary}>
									Close
								</AppText>
							</TouchableOpacity>
						</ScrollView>
					</Pressable>
				</Pressable>
			</Modal>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	summaryRow: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 20,
	},
	summaryCard: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 12,
		borderWidth: 1,
		gap: 2,
	},
	emptyState: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
		paddingBottom: 80,
	},
	emptyText: {
		maxWidth: 220,
	},
	fab: {
		position: "absolute",
		bottom: 24,
		right: 24,
		width: 56,
		height: 56,
		alignItems: "center",
		justifyContent: "center",
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	previewOverlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	previewSheet: {
		maxHeight: "80%",
		paddingHorizontal: 20,
		paddingBottom: 24,
	},
	previewHandleWrap: {
		alignItems: "center",
		paddingVertical: 12,
	},
	previewHandle: {
		width: 40,
		height: 4,
		borderRadius: 999,
	},
	previewScrollContent: {
		paddingBottom: 8,
	},
	previewTitle: {
		marginBottom: 4,
	},
	previewHint: {
		marginBottom: 16,
	},
	previewCloseBtn: {
		marginTop: 20,
		alignItems: "center",
		paddingVertical: 12,
	},
});
