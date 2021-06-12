import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { calculateErrors } from 'src/app/form-validators/validators';
import { Session } from 'src/app/models/session/session.model';
import { CommonComponentService } from 'src/app/shared/common-component/common-component.service';
import { SessionService } from 'src/app/shared/session/session.service';
import { YogasService } from 'src/app/shared/yogas/yogas.service';

@Component({
  selector: 'app-create-yoga',
  templateUrl: './create-yoga.page.html',
  styleUrls: ['./create-yoga.page.scss'],
})
export class CreateYogaPage implements OnInit, OnDestroy {
  createYoga: FormGroup;
  constructor(
    private fb: FormBuilder,
    private common: CommonComponentService,
    private session: SessionService,
    private yogaService: YogasService
  ) {
    this.createYoga = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      details: ['', Validators.required],
      pose: ['', Validators.required],
      benifit: ['', Validators.required],
      minutes: [0, Validators.required],
      repeatation: [0, Validators.required],
      recomandedTime: ['', Validators.required],
      imageUrl: ['', Validators.required],
      createdAt: [Date, Validators.required],
      updatedAt: [Date, Validators.required],
      isFavourite: [false, Validators.required],
    });
  }
  // get reactive form error
  get f() {
    return this.createYoga.controls;
  }
  // oninit
  ngOnInit() {
    this.setNewYogaId();
  }
  //ondestry
  ngOnDestroy() {
    this.session.watch().unsubscribe();
  }

  // some init value
  public setNewYogaId(): void {
    let date = new Date();
    this.createYoga.patchValue({
      id: 'yoga_' + date.getMilliseconds(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isFavourite: false,
    });
  }

  // submit
  public submit(): void {
    if (this.createYoga.invalid) {
      let error = calculateErrors(this.createYoga);
      this.common.errorAlert(error, 'danger');
    } else {
      this.yogaService.createYoga(this.createYoga.value).then((res) => {
        res ? this.successMsg() : this.errorHandler;
      });
    }
  }

  // reset form
  public resetForm(): void {
    this.createYoga.reset;
  }

  // creste successfull
  successMsg() {
    this.common.sucessAlert(
      'This yoga create successfully. You can update and delete it later.'
    );
    this.resetForm();
  }
  // err handler
  errorHandler() {
    this.common.errorAlert(
      ['Please Check and try again. Something went wrong'],
      'danger'
    );
  }
}
