import { IUser } from "./user";

export interface ISearchResponse {
    users?: IUser[];
    totalCount?: number;
    isListIncomplete?: boolean;
    error?: string;
}