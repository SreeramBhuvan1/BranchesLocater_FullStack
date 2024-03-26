import { Injectable } from "@angular/core";
import { Branch, CreateBranch } from "./branch.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { NgForm } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class BranchService {
    public branches: Branch[];

    constructor(private http: HttpClient) { }

    loadBranches() {
        return this.http.get<Branch[]>('https://localhost:7207/api/Branches');
    }

    getBranch(code: string) {
        var index = this.branches.findIndex(x => x.bU_Codes === code);
        return this.branches[index];
    }

    addBranch(branch: CreateBranch) {
        return this.http.post('https://localhost:7207/api/Branches', branch);
    }

    deleteBranch(Id: number) {
        return this.http.delete('https://localhost:7207/api/Branches/' + Id);
    }

    updateBranch(Id: number, code: string, businessHours: string, form: NgForm) {
        return this.http.put('https://localhost:7207/api/Branches/' + Id, {
            id: Id,
            bU_Codes: code,
            status: form.value.status,
            address: form.value.address,
            phone: form.value.phone,
            business_Hours: businessHours
        });
    }
}