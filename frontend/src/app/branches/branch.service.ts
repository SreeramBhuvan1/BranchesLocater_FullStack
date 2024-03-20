import { Injectable } from "@angular/core";
import { Branch } from "./branch.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class BranchService {
    private Branches: Branch[];

    constructor(private http: HttpClient) { }

    getBranches() {
        this.http.get<Branch[]>('https://localhost:7207/api/Branches').subscribe({
            next: res => {
                this.Branches = res;
            }
        })

        return this.Branches.slice();
    }
}