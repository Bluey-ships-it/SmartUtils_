import type { RootStackParamList } from "./navigation";
import type { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

export type ToolRoute = keyof RootStackParamList;
export type IoniconName = ComponentProps<typeof Ionicons>["name"];

export type Tool = {
	id: string;
	name: string;
	description: string;
	icon: IoniconName;
	route: ToolRoute;
};
