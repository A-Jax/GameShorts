import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'footer-component',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

    public email: string;
    public joinUsFormGroup: FormGroup;
    public currentDate = Date.now();
    private urlPath: string = '/joinUs';

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private flashMessages: FlashMessagesService) { }

    ngOnInit() {
        this.joinUsFormGroup = this.formBuilder.group({
            emailAddress: ['', Validators.required],
            category: ['', Validators.required]
        })
    }

    get f() { return this.joinUsFormGroup.controls };

    public joinUsForm(): void {

        const payload = {
            emailAddress: this.f.emailAddress.value,
            category: this.f.category.value
        }

        if (this.joinUsFormGroup.valid) {
            this.http.post(this.urlPath, payload)
                .subscribe()
            this.joinUsFormGroup.reset()
        } else {
            this.flashMessages.grayOut(true)
            this.flashMessages.show('Please complete all fields', { 
                cssClass: 'alert-danger', 
                timeout: 2000 
            });

            console.log('error, please refresh and try again.')
        }


    }
}
