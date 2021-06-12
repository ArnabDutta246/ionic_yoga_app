import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { calculateErrors } from 'src/app/form-validators/validators';
import { Yoga } from 'src/app/models/yoga/yoga.model';
import { CommonComponentService } from 'src/app/shared/common-component/common-component.service';
import { YogasService } from 'src/app/shared/yogas/yogas.service';

@Component({
  selector: 'app-update-yoga',
  templateUrl: './update-yoga.page.html',
  styleUrls: ['./update-yoga.page.scss'],
})
export class UpdateYogaPage implements OnInit, OnDestroy {
  // values
  yoga: Yoga = null;
  updateYoga: FormGroup;
  // constructor
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private yogaService: YogasService,
    private common: CommonComponentService
  ) {}
  // init
  ngOnInit() {
    // update yoga form
    this.updateYoga = this.fb.group({
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
    this.yoga = history.state.data.yoga;

    if (!this.yoga) {
      this.router.navigate(['/home/yogas']);
    } else {
      this.setValueForm();
    }
  }
  // set value
  public setValueForm(): void {
    if (this.yoga) {
      let {
        id,
        name,
        details,
        pose,
        benifit,
        minutes,
        repeatation,
        recomandedTime,
        imageUrl,
        createdAt,
        isFavourite,
      } = this.yoga;
      this.updateYoga.patchValue({
        id: id,
        name: name,
        details: details,
        pose: pose,
        benifit: benifit,
        minutes: minutes,
        repeatation: repeatation,
        recomandedTime: recomandedTime,
        imageUrl: imageUrl,
        createdAt: createdAt ? createdAt : new Date(),
        updatedAt: new Date(),
        isFavourite: isFavourite,
      });
    }
  }

  // on destroy
  ngOnDestroy() {}

  // ionViewDidEnter
  ionViewDidEnter() {
    this.yoga = history.state.data?.yoga ? history.state.data.yoga : this.yoga;
    if (!this.yoga) {
      this.router.navigate(['/home/yogas']);
    } else {
      this.setValueForm();
    }
  }
  // submit
  public submit(): void {
    if (this.updateYoga.invalid) {
      let error = calculateErrors(this.updateYoga);
      this.common.errorAlert(error, 'danger');
    } else {
      this.yogaService.updateYoga(this.updateYoga.value).then((res) => {
        res ? this.successMsg() : this.errorHandler();
      });
    }
  }
  // cancel update process
  public cancelForm(): void {
    this.router.navigate(['/home/yogas']);
  }
  // updated successfull
  private successMsg(): void {
    this.common.sucessAlert(
      'This yoga updated successfully. You can update and delete it later.'
    );
    this.router.navigate(['/home/yogas']);
  }
  // err handler
  private errorHandler(): void {
    this.common.errorAlert(
      ['Please Check and try again. Something went wrong'],
      'danger'
    );
  }
}
