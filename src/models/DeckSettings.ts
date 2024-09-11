
// src/models/DeckSettings.ts

export enum DeckDifficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
}

export enum ReviewPerformance {
    Difficult = 'difficult',
    Medium = 'medium',
    Easy = 'easy'
}

// In src/models/DeckSettings.ts

export interface DeckSettings {
    easyInterval: number; // in days
    mediumInterval: number; // in days
    difficultInterval: number; // in days
    maximumInterval: number; // in days
    reviewsPerDay: number;
    difficultyFactor: number;
}

export function createDefaultSettings(daysUntilDue: number, difficulty: DeckDifficulty): DeckSettings {
    let baseFactor: number;
    switch (difficulty) {
        case DeckDifficulty.Easy: baseFactor = 1.2; break;
        case DeckDifficulty.Medium: baseFactor = 1.0; break;
        case DeckDifficulty.Hard: baseFactor = 0.8; break;
    }

    return {
        easyInterval: 4,
        mediumInterval: 2,
        difficultInterval: 1,
        maximumInterval: Math.min(daysUntilDue, 365), // Cap at 365 days or days until due
        reviewsPerDay: 20,
        difficultyFactor: baseFactor
    };
}