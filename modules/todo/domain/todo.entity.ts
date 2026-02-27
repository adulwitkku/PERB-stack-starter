export class TodoEntity {
    constructor(
        public readonly id: string,
        public title: string,
        public completed: boolean,
        public readonly userId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static create(params: { id: string; title: string; userId: string }): TodoEntity {
        return new TodoEntity(
            params.id,
            params.title,
            false,
            params.userId,
            new Date(),
            new Date(),
        )
    }

    markComplete(): void {
        this.completed = true
    }

    markIncomplete(): void {
        this.completed = false
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            completed: this.completed,
            userId: this.userId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }

    rename(newTitle: string): void {
        if (!newTitle.trim()) {
            throw new TodoValidationError("Title cannot be empty")
        }
        this.title = newTitle
    }
}

export class TodoValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "TodoValidationError"
    }
}

export class TodoNotFoundError extends Error {
    constructor(id: string) {
        super(`Todo with id "${id}" not found`)
        this.name = "TodoNotFoundError"
    }
}
