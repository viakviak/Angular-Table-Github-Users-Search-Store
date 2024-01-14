import { IUser } from "./user";

export interface ISearchResponse {
    users?: IUser[];
    totalCount?: number;
    error?: string;
}