import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { IDetailIdea } from '../../../core/interfaces/i-detail-idea';
import { DetailService } from '../../../core/services/detail.service';
import Swal from 'sweetalert2';
import { UserService } from '../../../core/services/user.service';
import { FileService } from '../../../core/services/file.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-approve-entry',
  templateUrl: './approve-entry.component.html',
  styleUrls: ['./approve-entry.component.css'],
})
export class ApproveEntryComponent {
  details: IDetailIdea[] = [];
  filteredDetails: IDetailIdea[] = []; // Data yang difilter berdasarkan pencarian
  pageNumber: number = 0;
  totalPages: number = 0;
  pageSize: number = 3;
  value: string = 'New Entry';
  previewUrl: string | null = null;
  selectedItemId: number | null = null;
  searchQuery: string = ''; // Query pencarian yang dimasukkan pengguna

  modalTitle: string = '';
  modalContent: string = '';
  modalContentType: 'text' | 'file' = 'text';

  // For feedback and users
  feedback: string = '';
  selectedPenguji: number = 0; // To store the selected user ID for penguji
  users: any[] = []; // To store the list of users for dropdown
  selectedExaminerIds: { [key: string]: number } = {
    examiner1: 0,
    examiner2: 0,
    examiner3: 0,
  };

  constructor(
    private detailService: DetailService,
    private userService: UserService,
    private fileService: FileService,
    private modalservice: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadDetails();
    this.loadUsers(); // Load users for the dropdown
  }

  loadDetails(): void {
    this.detailService
      .getDetails(
        this.pageNumber,
        this.pageSize,
        'asc',
        'id',
        'status',
        this.value
      )
      .subscribe((response) => {
        this.details = response.content;
        this.filteredDetails = this.details; // Initialize filtered details with all data
        this.updatePagination(); // Update pagination based on full details
      });
  }

  loadUsers(): void {
    this.userService.getUsers(0, 10).subscribe((response) => {
      this.users = response.content; // Adjust according to your API response
    });
  }

  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.filteredDetails = this.details; // If search is empty, show all details
    } else {
      this.filteredDetails = this.details.filter(
        (detail) =>
          detail.idea.judul
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) || // Match by title
          detail.idea.user.nip
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) || // Match by NIP
          detail.idea.user.username
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) // Match by creator/username
      );
    }
    this.pageNumber = 0; // Reset halaman ke 0 setiap kali pencarian dilakukan
    this.updatePagination(); // Update pagination based on filtered data
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredDetails.length / this.pageSize); // Adjust total pages based on filtered details and page size
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageNumber = page;
      this.updatePagination();
      this.loadPaginatedDetails(); // Load paginated data
    }
  }

  loadPaginatedDetails(): void {
    // Paginate filtered data manually
    const startIndex = this.pageNumber * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredDetails = this.details.slice(startIndex, endIndex); // Slicing the filtered data for pagination
  }

  approveIdea(detail: IDetailIdea): void {
    // Check if the ID exists in the detail object
    if (!detail?.id) {
      console.error('Detail ID is missing');
      Swal.fire('Error', 'The detail idea ID is missing!', 'error');
      return; // Stop execution if the ID is not available
    }

    // Show SweetAlert modal with input fields for feedback and penguji
    Swal.fire({
      title: `Approve "${detail.idea.judul}"?`,
      icon: 'question',
      html: `
        <div>

    <input id="examiner1Input" class="swal2-input" placeholder="Type or select Penguji 1" />
    <div id="examiner1List" class="user-list" style="max-height: 200px; overflow-y: auto; margin-top: 5px; padding: 0; list-style-type: none;">
    </div>
  </div>
  <div>

    <input id="examiner2Input" class="swal2-input" placeholder="Type or select Penguji 2" />
    <div id="examiner2List" class="user-list" style="max-height: 200px; overflow-y: auto; margin-top: 5px; padding: 0; list-style-type: none;">
    </div>
  </div>
  <div>
    <input id="examiner3Input" class="swal2-input" placeholder="Type or select Penguji 3" />
    <div id="examiner3List" class="user-list" style="max-height: 200px; overflow-y: auto; margin-top: 5px; padding: 0; list-style-type: none;">
    </div>
  </div>
  <div>
    <textarea id="feedback" class="swal2-textarea" placeholder="Enter your feedback..."></textarea>
  </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        // Now you can safely access the input elements
        const examiner1Input = document.getElementById(
          'examiner1Input'
        ) as HTMLInputElement;
        const examiner2Input = document.getElementById(
          'examiner2Input'
        ) as HTMLInputElement;
        const examiner3Input = document.getElementById(
          'examiner3Input'
        ) as HTMLInputElement;

        // You can now add event listeners
        examiner1Input.addEventListener('input', () =>
          this.filterUsers('examiner1')
        );
        examiner2Input.addEventListener('input', () =>
          this.filterUsers('examiner2')
        );
        examiner3Input.addEventListener('input', () =>
          this.filterUsers('examiner3')
        );
      },
      preConfirm: () => {
        const pengujiPertama = this.selectedExaminerIds['examiner1'];
        const pengujiKedua = this.selectedExaminerIds['examiner2'];
        const pengujiKetiga = this.selectedExaminerIds['examiner3'];
        const feedback = (
          document.getElementById('feedback') as HTMLTextAreaElement
        ).value;

        // Log the values to check if they are being picked correctly
        console.log(pengujiPertama, pengujiKedua, pengujiKetiga, feedback);

        if (!pengujiPertama || !pengujiKedua || !pengujiKetiga || !feedback) {
          Swal.showValidationMessage(
            'Please provide feedback and select all penguji!'
          );
          return false;
        }

        return { feedback, pengujiPertama, pengujiKedua, pengujiKetiga };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { feedback, pengujiPertama, pengujiKedua, pengujiKetiga } =
          result.value;

        // Proceed with approval logic (e.g., call service to approve idea)
        const approvalData = {
          feedback,
          pengujiPertama, // This is now the ID, not username
          pengujiKedua, // Same for pengujiKedua
          pengujiKetiga, // Same for pengujiKetiga
        };

        console.log(approvalData);

        this.detailService.approveIdea(detail.id, approvalData).subscribe(
          (response) => {
            console.log('Idea approved:', response);
            Swal.fire(
              'Approved!',
              'The idea has been approved.',
              'success'
            ).then(() => {
              // Reload the page after approval to refresh the data
              this.loadDetails(); // This will re-fetch the data and update the list
            });
          },
          (error) => {
            console.error('Error approving idea:', error);
            Swal.fire(
              'Error',
              'There was an error approving the idea.',
              'error'
            );
          }
        );
      }
    });
  }

  // Filter users based on input
  filterUsers(examiner: string): void {
    const inputElement = document.getElementById(
      `${examiner}Input`
    ) as HTMLInputElement;
    const listElement = document.getElementById(
      `${examiner}List`
    ) as HTMLDivElement;

    const filter = inputElement.value.toLowerCase();
    const filteredUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(filter)
    );

    // Clear previous list and populate with filtered users
    listElement.innerHTML = filteredUsers
      .map(
        (user) =>
          `<div class="user-option" data-id="${user.id}">${user.username}</div>`
      )
      .join('');

    // Add event listeners for selection
    const userOptions = listElement.querySelectorAll('.user-option');
    userOptions.forEach((option) => {
      option.addEventListener('click', () => {
        inputElement.value = option.textContent!;
        // Store the selected user's ID in the selectedExaminerIds object
        this.selectedExaminerIds[examiner] = +option.getAttribute('data-id')!;
        listElement.innerHTML = ''; // Clear the list after selection
      });
    });
  }

  openRejectModal(detail: IDetailIdea): void {
    Swal.fire({
      title: 'Reject Idea?',
      input: 'textarea',
      inputPlaceholder: 'Enter your comment here...',
      showCancelButton: true,
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to provide a comment!'; // Error message when the input is empty
        }
        return null; // Return null when the input is valid (i.e., not empty)
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const rejectComment = result.value;
        console.log('Rejecting idea:', detail, 'with comment:', rejectComment);

        // Call the backend service to reject the idea
        this.detailService.rejectIdea(detail.id, rejectComment).subscribe(
          (response) => {
            console.log('Idea rejected:', response);
            Swal.fire('Rejected!', 'The idea has been rejected.', 'error').then(
              () => {
                // Reload the page after rejection to refresh the data
                this.loadDetails(); // This will re-fetch the data and update the list
              }
            );
          },
          (error) => {
            console.error('Error rejecting idea:', error);
            Swal.fire(
              'Error',
              'There was an error rejecting the idea.',
              'error'
            );
          }
        );
      }
    });
  }

  // Membuka modal dan menampilkan preview file
  previewFile(ideaId: number, content: any): void {
    this.fileService.getFilePreviewLink(ideaId).subscribe({
      next: (response) => {
        this.previewUrl = response.url; // URL untuk ditampilkan di modal
        this.selectedItemId = ideaId; // Simpan ID item yang dipilih
        this.modalservice.open(content, { size: 'xl', backdrop: 'static' }); // Buka modal
      },
      error: (err) => {
        console.error('Error fetching preview URL', err);
      },
    });
  }

  // Open modal for full text
  openFullTextModal(content: string, title: string, modal: any): void {
    this.modalTitle = title;
    this.modalContent = content;
    this.modalContentType = 'text';
    this.modalservice.open(modal, { size: 'lg' });
  }
}
