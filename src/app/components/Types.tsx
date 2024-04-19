export enum Priority {
    HIGH = "High",
    MEDIUM = "Medium",
    LOW = "Low"
}

export enum Category {
    GENERAL = "General",
    WORK = "Work",
    PERSONAL = "Personal",
    SHOPPING = "Shopping",
    OTHER = "Other"
}

export type TaskProps = {
    taskId: number;
    text: string;
    isDone?: boolean;
    priority?: Priority;
    category?: Category;
    onDelete?: (taskId: number) => void;
    onUpdate?: (updatedTask: TaskProps) => void;
};
