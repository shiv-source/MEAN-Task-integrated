import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  objdata: {};
  editedData: {};
  filterForm: FormGroup;
  userId: String;
  formTitle = "";
  editedUserID: String;
  listUser: any;
  userRole: any = ['Artist', 'Designer', 'Art manager'];
  newRow: boolean = false;
  editExitingRow: boolean = false;
  filterRole = ['All', 'Artist', 'Designer', 'Art manager'];
  selectedFilterdRole: any;
  filterData: any = [];
  searchQuerry = "";


  constructor(private svc: TestService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.svc.getAllUser().subscribe(data => {
      this.listUser = data;
      this.filterData = this.listUser;
    });

    this.filterForm = this.formBuilder.group({
      filteredRole: ['', Validators.required],
      search: ['', Validators.required],
    });

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      role: ['', Validators.required],

    })
  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.objdata = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      role: this.registerForm.value.role

    }
    this.svc.addUser(this.objdata);
    this.svc.getAllUser().subscribe(data => {
      this.listUser = data;
      this.filterData = this.listUser;

    });
    if (this.registerForm.value) {
      this.onReset();
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  changeRole(e) {
    this.registerForm.get('role').setValue(e.target.value, {
      onlySelf: true
    });

  }

  addRow() {
    if (this.newRow) {
      this.newRow = false;
    }
    else {
      this.newRow = true;
      this.formTitle = "Add New User";
    }
  }

  editRow() {
    if (this.editExitingRow) {
      this.editExitingRow = false;
    }
    else {
      this.editExitingRow = true;

    }
  }


  changeFilteredRole(e) {
    this.filterForm.get('filteredRole').setValue(e.target.value, {
      onlySelf: true
    });
    this.selectedFilterdRole = this.filterForm.value.filteredRole

    if (this.selectedFilterdRole.trim() === "All") {
      this.filterData = this.listUser;
    }
    else if (this.selectedFilterdRole.trim() === "Artist") {


      this.filterData = this.listUser.filter(data => data.role === "Artist");

    }
    else if (this.selectedFilterdRole.trim() === "Designer") {
      this.filterData = this.listUser.filter(data => data.role === "Designer");

    }
    else if (this.selectedFilterdRole.trim() === "Art manager") {
      this.filterData = this.listUser.filter(data => data.role === "Art manager");

    }

  }


  deleteUser(user) {
    this.userId = user._id
    this.svc.deleteUserbyId(this.userId);
    this.svc.getAllUser().subscribe(data => {
      this.listUser = data;
      this.filterData = this.listUser;

    });


  }

  editedUserId(user) {
    this.editedUserID = user._id;

  }

  onSubmitEditUser() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.editedData = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      role: this.registerForm.value.role

    }

    this.svc.updateUserbyId(this.editedData, this.editedUserID);
    this.svc.getAllUser().subscribe(data => {
      this.listUser = data;
      this.filterData = this.listUser;

    });
    if (this.registerForm.value) {
      this.onReset();
    }
  }

}
