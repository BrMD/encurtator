import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { ApiService } from '../../../service/api.service';
import { AuthService } from '../../../service/auth.service';
import { EncurtatorResult } from '../../../models/encurtator';
import { NgForOf } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { PopupComponent } from '../../../components/popup/popup.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';

@Component({
  selector: 'app-shortened-list',
  standalone: true,
  imports: [
    PageLayoutComponent,
    NgForOf,
    ModalComponent,
    PopupComponent,
    SpinnerComponent,
  ],
  templateUrl: './shortened-list.component.html',
  styleUrl: './shortened-list.component.css',
})
export class ShortenedListComponent implements OnInit {
  messageError: string | null = null;
  modal: EncurtatorResult | null = null;
  encurtators: EncurtatorResult[] = [];
  loading = false;
  constructor(private service: ApiService, private authService: AuthService) {}

  onModal(encurtator: EncurtatorResult) {
    this.modal = encurtator;
  }

  onConfirmationDelete(result: boolean) {
    if (result === true && this.modal) {
      this.onDelete(this.modal.id);
      this.ngOnInit();
    }
    this.modal = null;
  }

  onDelete(id: String) {
    this.service.deleteEncurtator(id).subscribe({});
  }

  ngOnInit(): void {
    const loggedAccount = this.authService.getAccount();
    if (loggedAccount !== null) {
      this.loading = true;
      this.service.getEncurtatorsbyId(loggedAccount).subscribe({
        next: (arrayEnc) => (
          (this.encurtators = arrayEnc), (this.loading = false)
        ),
        error: (err) => ((this.messageError = err), (this.loading = false)),
      });
    }
  }

  onClickCopy(url: string) {
    navigator.clipboard.writeText('localhost:4200/r/' + url);
  }
}
