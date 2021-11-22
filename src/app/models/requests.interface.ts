import { IUser } from ".";

export interface IApiGetUsersRequest {
    incomplete_results: boolean;
    items: IUser[];
    total_count: number;
}