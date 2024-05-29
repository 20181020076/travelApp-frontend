import { Component, inject, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../../app.component';

@Component({
	selector: 'ngbd-offcanvas-basic',
	standalone: true,
	imports: [NgbDatepickerModule, RouterLink],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css'
})
export class NgbdOffcanvasBasic {
	private offcanvasService = inject(NgbOffcanvas);
	closeResult = '';
	isDarkTheme = AppComponent.isDarkTheme
	handleDarkTheme () {
		AppComponent.handleDarkTheme()	
	} 

	open(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case OffcanvasDismissReasons.ESC:
				return 'by pressing ESC';
			case OffcanvasDismissReasons.BACKDROP_CLICK:
				return 'by clicking on the backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}