import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EncurtatorResult } from '../../models/encurtator';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() item: EncurtatorResult = {
    id: '',
    shortUrl: '',
    encryptedUrl: '',
    userId: '',
    createAt: new Date(),
  };
  @Output() confirmation: EventEmitter<boolean> = new EventEmitter<boolean>();

  onConfirmTrue() {
    this.confirmation.emit(true);
  }

  onConfirmFalse() {
    this.confirmation.emit(false);
    console.log(this.item);
  }
}
