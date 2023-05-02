export interface TimeEntity {
    hours: number;
    minutes: number;
}

export interface CardEntity {
    date: Date;
    isFinished: boolean;
    totalTime: TimeEntity;
}
