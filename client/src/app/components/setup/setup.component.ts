import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from 'src/app/animations';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Setup } from '../../models/setup.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class SetupComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  setup: Setup;
  validatingForm: FormGroup;
  validation_messages = {
    'recoveryMail': [
      { type: 'required', message: 'El correo electrónico es obligatorio.'},
      { type: 'email', message: 'Correo electrónico no válido.'}
    ],
    'recoveryMailPassword': [
      { type: 'required', message: 'La contraseña nueva es obligatoria.'}
    ]
  }

  constructor(
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  canDeactivate(): Observable<boolean> | boolean {
    const me = this;

    return me.validatingForm.pristine;
  }

  // Buttons actions
  onClickRefresh() {
    const me = this;

    me.rebuildForm();
  }

  onClickSave() {
  }

  // FormModel Methods
  createForm() {
    const me = this;

    me.validatingForm = me.fb.group({
      recoveryMail: new FormControl ('' , {
        validators: Validators.compose ([
          Validators.required,
          Validators.email
        ]),
        updateOn: 'blur'
      }),
      recoveryMailPassword: new FormControl ('' , {
        validators: Validators.compose ([
          Validators.required
        ]),
        updateOn: 'blur'
      })
    });
  }

  rebuildForm() {
    const me = this;

    me.validatingForm.reset({
      recoveryMail: me.setup.recoveryMail,
      recoveryMailPassword: me.setup.recoveryMailPassword
    });
  }

  getFormData(): Setup {
    const me = this,
          formModel = me.validatingForm.value,
          newSetup: Setup = me.setup;

    newSetup.recoveryMail = '';
    newSetup.recoveryMailPassword = '';

    return newSetup;
  }

}
