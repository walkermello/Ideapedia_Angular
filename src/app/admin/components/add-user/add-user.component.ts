import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { UnitService } from '../../../core/services/unit.service';
import { IUnitKerja } from '../../../core/interfaces/i-unit-kerja';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  units: IUnitKerja[] = []; // List of units
  filteredUnits: IUnitKerja[] = []; // Filtered units for search
  selectedUnitId: number | null = null; // ID of the selected unit

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private unitService: UnitService,
    private router: Router // Inject the Router service
  ) {
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      nip: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      noHp: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      unitKerja: ['', Validators.required], // Unit kerja must be selected
    });
  }

  ngOnInit(): void {
    // Fetch the units from the service
    this.unitService.getUnits().subscribe((units) => {
      this.units = units.content;
      this.filteredUnits = this.units; // Initialize filteredUnits with all units
    });
  }

  // Function to filter units based on user input
  onUnitKerjaInput(event: any): void {
    const filterValue = event.target.value.toLowerCase();
    this.filteredUnits = this.units.filter((unit) =>
      unit.unitName.toLowerCase().includes(filterValue)
    );
  }

  // Function to handle unit selection
  selectUnit(unit: IUnitKerja) {
    // Set the unit name for the form to display, but save the unit ID
    this.addUserForm.get('unitKerja')?.setValue(unit.unitName);
    this.selectedUnitId = unit.id; // Save the ID of the selected unit

    // Mark the form as touched and dirty for validation
    this.addUserForm.get('unitKerja')?.markAsTouched();
    this.addUserForm.get('unitKerja')?.markAsDirty();

    // Hide the unit list after selection
    this.filteredUnits = [];
  }

  // Function to handle form submission
  onSubmit(): void {
    if (this.addUserForm.valid && this.selectedUnitId !== null) {
      // Prepare the form data
      const formData = {
        username: this.addUserForm.value.username,
        nip: this.addUserForm.value.nip,
        email: this.addUserForm.value.email,
        password: this.addUserForm.value.password,
        noHp: this.addUserForm.value.noHp,
        unitKerja: {
          id: this.selectedUnitId, // Send only the unit ID
        },
      };

      // Call the service to add the user
      this.userService.addUser(formData).subscribe(
        (response) => {
          console.log('User added successfully', response);
          // SweetAlert2 success message
          Swal.fire({
            icon: 'success',
            title: 'User added successfully!',
            text: 'The new user has been successfully added.',
          }).then(() => {
            // Redirect to the 'list-user' path after successful submission
            this.router.navigate(['list-user']); // Add the path for the user list page
          });
          // Optionally, reset the form after successful submission
          this.addUserForm.reset();
          this.selectedUnitId = null;
        },
        (error) => {
          console.error('Error adding user', error);
          // SweetAlert2 error message
          Swal.fire({
            icon: 'error',
            title: 'Error adding user',
            text: 'There was an issue adding the user. Please try again.',
          });
        }
      );
    } else {
      // SweetAlert2 validation error message
      Swal.fire({
        icon: 'warning',
        title: 'Form incomplete',
        text: 'Please complete all fields before submitting.',
      });
    }
  }
}
