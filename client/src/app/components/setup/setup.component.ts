import { Component, OnInit, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { slideInDownAnimation } from 'src/app/animations';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Setup } from '../../models/setup.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/services/setup/setup.service';
import { GlobalsService } from 'src/app/globals/globals.service';


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
    protected globals: GlobalsService,
    private location: Location,
    private setupService: SetupService,
    private fb: FormBuilder,
    public toastr: ToastrService
  ) {
   this.createForm();
  }

  ngOnInit() {
    const me = this;

    me.setup = me.getSetup();
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  canDeactivate(): Observable<boolean> | boolean {
    const me = this;

    return me.validatingForm.pristine;
  }

  // Buttons actions
  onClickGoBack() {
    this.location.back();
  }

  onClickRefresh() {
    const me = this;

    me.rebuildForm();
  }

  onClickSave() {
    const me = this;

    if (me.validatingForm.invalid) return;

    me.setup = this.getFormData();
    me.setupService.updateSetup(me.setup)
      .subscribe( () => {
          me.rebuildForm();
          me.toastr.success('Successfully saved.');
        }
      );
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

    newSetup.recoveryMail = formModel.recoveryMail;
    newSetup.recoveryMailPassword = formModel.recoveryMailPassword;

    return newSetup;
  }

  //Private methods
  getSetup() : Setup {
    const me = this,
          actualSetup = new Setup();

    actualSetup.recoveryMail = me.globals.setup.recoveryMail;
    actualSetup.recoveryMailPassword = me.globals.setup.recoveryMailPassword;

    return actualSetup;
  }

}
