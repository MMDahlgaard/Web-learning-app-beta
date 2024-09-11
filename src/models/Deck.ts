

import { DeckDifficulty, DeckSettings } from './DeckSettings';

export interface Deck {
    id: string;
    title: string;
    description?: string;
    dueDate: Date;
    difficulty: DeckDifficulty;
    settings: DeckSettings;
    createdDate: Date;
    modifiedDate: Date;
    userId: string;
}