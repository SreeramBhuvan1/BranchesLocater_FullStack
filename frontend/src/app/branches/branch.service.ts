import { Injectable } from "@angular/core";
import { Branch, CreateBranch } from "./branch.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { NgForm } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class BranchService {
    public Branches: Branch[];

    constructor(private http: HttpClient) { }

    loadBranches() {
        this.http.get<Branch[]>('https://localhost:7207/api/Branches').subscribe({
            next: res => {
                this.Branches = res;
            }
        })
    }

    getBranch(code: string) {
        var index = this.Branches.findIndex(x => x.buCode === code);
        return this.Branches[index];
    }

    addBranch(branch: CreateBranch) {
        return this.http.post('https://localhost:7207/api/Branches', branch);
    }

    deleteBranch(Id: number) {
        console.log(Id);
        return this.http.delete('https://localhost:7207/api/Branches/' + Id);
    }

    updateBranch(Id: number, form: NgForm) {
        return this.http.put('https://localhost:7207/api/Branches/' + Id, {
            id: Id,
            buCode: form.value.buCode,
            status: form.value.status,
            address: form.value.address,
            phone: form.value.phone,
            businessHours: form.value.businessHours
        });
    }
}