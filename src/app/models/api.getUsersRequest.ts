import { IUser } from ".";

export interface IApiGetUsersRequest {
    incomplete_list: boolean;
    items: IUser[];
    total_count: number;
}