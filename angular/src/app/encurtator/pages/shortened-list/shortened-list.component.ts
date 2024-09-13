import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { ApiService } from '../../../service/api.service';
import { AuthService } from '../../../service/auth.service';
import { EncurtatorResult } from '../../../models/encurtator';
import { NgForOf } from '@angular/common';
import { ModalComponent } from '../../../modal/modal.component';
import { PopupComponent } from '../../../popup/popup.component';

@Component({
  selector: 'app-shortened-list',
  standalone: true,
  imports: [PageLayoutComponent, NgForOf, ModalComponent, PopupComponent],
  templateUrl: './shortened-list.component.html',
  styleUrl: './shortened-list.component.css',
})
export class ShortenedListComponent implements OnInit {
  modal: EncurtatorResult | null = null;
  encurtators: EncurtatorResult[] = [];
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
    this.service.deleteEncurtator(id).subscribe({
      next: () => console.log('aooo'),
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {
    const loggedAccount = this.authService.getAccount();
    if (loggedAccount !== null) {
      this.service.getEncurtatorsbyId(loggedAccount).subscribe({
        next: (arrayEnc) => (this.encurtators = arrayEnc),
        error: (err) => console.error(err),
      });
    }
  }

  onClickCopy(url: string) {
    navigator.clipboard.writeText('encurtator.com/' + url);
  }
}
