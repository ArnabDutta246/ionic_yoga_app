import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { calculateErrors } from 'src/app/form-validators/validators';
import { CommonComponentService } from 'src/app/shared/common-component/common-component.service';

@Component({
  selector: 'app-create-yoga',
  templateUrl: './create-yoga.page.html',
  styleUrls: ['./create-yoga.page.scss'],
})
export class CreateYogaPage implements OnInit {
  createYoga: FormGroup;
  constructor(private fb: FormBuilder, private common: CommonComponentService) {
    this.createYoga = this.fb.group({
      name: ['', Validators.required],

      details: ['', Validators.required],
      pose: ['', Validators.required],
      benifit: ['', Validators.required],

      minutes: [0, Validators.required],
      repeatation: [0, Validators.required],
      recomandedTime: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }
  // get reactive form error
  get f() {
    return this.createYoga.controls;
  }
  get nested() {
    return this.createYoga.controls.child;
  }
  // oninit
  ngOnInit() {}
  // submit
  public submit(): void {
    console.log(this.createYoga.value);
    console.log(this.createYoga.valid);
    if (this.createYoga.invalid) {
      let error = calculateErrors(this.createYoga);
      this.common.errorAlert(error, 'danger');
    }
  }

  //reset form
  public resetForm(): void {
    this.createYoga.reset;
  }
}
