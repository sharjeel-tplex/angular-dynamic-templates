import 'zone.js/dist/zone';
import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnInit,
  ViewContainerRef,
  ɵcompileComponent,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { compileComponentFromMetadata } from '@angular/compiler';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Card Properties</h1>

    <form>
      <label for="fullname">Full Name: </label>
      <input type="text" id="fullname" name="fullname" [(ngModel)]="contact.fullname"> <br />

      <label for="email">Email: </label>
      <input type="email" id="email" name="email" [(ngModel)]="contact.email"> <br />

      <label for="phone">Phone: </label>
      <input type="text" id="phone" name="phone" [(ngModel)]="contact.phone"> <br />

  </form>
`,
})
export class App implements OnInit {
  name = 'Angular';
  contact: Contact = new Contact();
  myValues = ['value1', 'value2'];

  onSubmit(form) {
    this.contact.fullname = form.value['fullname'];
    this.contact.email = form.value['email'];
    this.contact.phone = form.value['phone'];
  }

  viewRef = inject(ViewContainerRef);

  ngOnInit(): void {
    //const template = `<h3>Hello World!</h3><div *ngFor="let item of items">{{ item }}</div>`;
    const template = `
    <div>
      <h3>{{ contact.fullname }}</h3>
      <h4>Cell: {{ contact.phone }}</h4>
      <h4>Email: {{ contact.email }}</h4>
    </div>
    `;
    const component = getComponentFromTemplate(template);
    const componentRef = this.viewRef.createComponent(component);

    //componentRef.setInput('items', this.myValues);
    componentRef.setInput('contact', this.contact);
  }
}

bootstrapApplication(App);

@Component({
  template: '',
})
class MyCustomComponent {
  //@Input() items: string[] = [];
  @Input() contact: Contact = new Contact();
}

function getComponentFromTemplate(template: string) {
  ɵcompileComponent(MyCustomComponent, {
    template,
    standalone: true,
    imports: [NgFor],
  });

  return MyCustomComponent;
}

export class Contact {
  public fullname: string = '<full name>';
  public phone: string = '<phone>';
  public email: string = '<email>';
}
