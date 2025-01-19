
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/message';
import { DataService } from '../../Service/data.service';
import { LoaderComponent } from "../loader/loader.component";
import { DynamicDialogConfig } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, InputTextModule, FloatLabel, Select, ButtonModule, ReactiveFormsModule, CommonModule, Message, LoaderComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  status = [{ statusVal: 1, status: "Active" }, { statusVal: 0, status: "In-Active" },]
  userData;
  userFrom: FormGroup;
  isUpdate: boolean = false;
  constructor(public data: DataService, public config: DynamicDialogConfig) {
    this.userFrom = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      userStatus: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ])
    }
    )
    data.isLoading = false;
    if (this.config.data) {
      if (this.config.data.type == 'update') {
        this.isUpdate = true;
        this.userData = this.config.data.Userdata
        this.userFrom.get('username')?.setValue(this.userData?.username);
        this.userFrom.get('firstName')?.setValue(this.userData?.firstName);
        this.userFrom.get('lastName')?.setValue(this.userData?.lastName);
        this.userFrom.get('email')?.setValue(this.userData?.email);
        this.userFrom.get('password')?.setValue(this.userData?.password);
        this.userFrom.get('userStatus')?.setValue(this.userData?.userStatus);
        this.userFrom.get('phone')?.setValue(this.userData?.phone);
        console.log(this.userData, "update")
      }
    }
  }

  isNewUser() {
    if (this.userFrom.valid) {
      this.data.CreateNewUser(this.userFrom.value);
      this.userFrom.reset()
    }
  }
  isUserUpdate()
  {
    this.data.UpdateUser(this.userFrom.controls['username'].value,this.userFrom.value)
    this.isUpdate=false;
  }
}
