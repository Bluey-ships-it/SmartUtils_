import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Task } from "../types/tasks";

const TASKS_KEY = "smart_utils_tasks";

export async function loadTasks(): Promise<Task[]> {
	try {
		const raw = await AsyncStorage.getItem(TASKS_KEY);
		if (!raw) return [];
		return JSON.parse(raw) as Task[];
	} catch {
		return [];
	}
}

export async function saveTasks(tasks: Task[]): Promise<void> {
	try {
		await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
	} catch {
		// 
	}
}
