import { useState, useEffect, useCallback } from "react";
import { loadTasks, saveTasks } from "../utils/storage";
import type { Task, TaskPriority, TaskStatus } from "../types/tasks";

type FilterType = "all" | "active" | "completed";

type UseTasksReturn = {
	tasks: Task[];
	filteredTasks: Task[];
	filter: FilterType;
	isLoading: boolean;
	setFilter: (filter: FilterType) => void;
	addTask: (
		title: string,
		description: string | undefined,
		priority: TaskPriority,
	) => Promise<void>;
	editTask: (
		id: string,
		title: string,
		description: string | undefined,
		priority: TaskPriority,
	) => Promise<void>;
	toggleTask: (id: string) => Promise<void>;
	deleteTask: (id: string) => Promise<void>;
};

export function useTasks(): UseTasksReturn {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [filter, setFilter] = useState<FilterType>("all");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function init() {
			const stored = await loadTasks();
			setTasks(stored);
			setIsLoading(false);
		}
		init();
	}, []);

	async function persist(updated: Task[]) {
		setTasks(updated);
		await saveTasks(updated);
	}

	const addTask = useCallback(
		async (
			title: string,
			description: string | undefined,
			priority: TaskPriority,
		) => {
			const newTask: Task = {
				id: Date.now().toString(),
				title: title.trim(),
				description: description?.trim() || undefined,
				priority,
				status: "active",
				createdAt: new Date().toISOString(),
			};
			await persist([newTask, ...tasks]);
		},
		[tasks],
	);

	const editTask = useCallback(
		async (
			id: string,
			title: string,
			description: string | undefined,
			priority: TaskPriority,
		) => {
			const updated = tasks.map((task) =>
				task.id === id
					? {
							...task,
							title: title.trim(),
							description: description?.trim() || undefined,
							priority,
						}
					: task,
			);
			await persist(updated);
		},
		[tasks],
	);

	const toggleTask = useCallback(
		async (id: string) => {
			const updated = tasks.map((task) => {
				if (task.id !== id) return task;
				const isCompleting = task.status === "active";
				return {
					...task,
					status: (isCompleting ? "completed" : "active") as TaskStatus,
					completedAt: isCompleting ? new Date().toISOString() : undefined,
				};
			});
			await persist(updated);
		},
		[tasks],
	);

	const deleteTask = useCallback(
		async (id: string) => {
			const updated = tasks.filter((task) => task.id !== id);
			await persist(updated);
		},
		[tasks],
	);

	const filteredTasks = tasks.filter((task) => {
		if (filter === "all") return true;
		return task.status === filter;
	});

	return {
		tasks,
		filteredTasks,
		filter,
		isLoading,
		setFilter,
		addTask,
		editTask,
		toggleTask,
		deleteTask,
	};
}
