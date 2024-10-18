import { Component, input } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmUrlValidator } from './customValidatorUrl';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { AuthService } from '../../service/auth.service';
import { EncurtatorPost } from '../../models/encurtator';
import { SpinnerComponent } from '../spinner/spinner.component';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor, SpinnerComponent, PopupComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  loading = false;
  messageError: string | null = null;
  constructor(
    private apiService: ApiService,
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService
  ) {}

  formInputLink = this.formBuilder.group(
    {
      inputLink: ['', [Validators.required]],
    },
    { validators: confirmUrlValidator }
  );

  get inputLink() {
    return this.formInputLink.get('inputLink') as FormControl;
  }
  shortened: String | null = null;
  onSubmitUrlForm() {
    if (!this.formInputLink.valid) return;
    const sessionId = this.authService.getAccount();
    const inputLinkaux = this.formInputLink.get('inputLink')?.value;
    if (sessionId && inputLinkaux) {
      this.loading = true;
      const encurtatorReq: EncurtatorPost = {
        sessionId: sessionId,
        longUrl: inputLinkaux,
      };
      this.apiService.createEncurtator(encurtatorReq).subscribe({
        next: (encurted) => (
          (this.shortened = encurted.shortUrl), (this.loading = false)
        ),
        error: (error) => (console.error(error), (this.loading = false)),
      });
    }
  }
}
