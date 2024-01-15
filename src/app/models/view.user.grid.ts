import { MatTableDataSource } from "@angular/material/table";
import { IUser } from ".";

export interface IViewUserGrid {
    users: MatTableDataSource<IUser>;
    totalCount: number;
}