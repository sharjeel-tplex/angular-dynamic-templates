import 'zone.js/dist/zone';
import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnInit,
  ViewContainerRef,
  ɵcompileComponent,
  ViewChild,
} from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { compileComponentFromMetadata } from '@angular/compiler';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div style="width:400px; float:left; ">
    <h1>Card Editor</h1>

    <form>
    
    <label for="template">Template: </label>
    <select (ngModelChange)="onDropdownChange()" name="cardDesign" [(ngModel)]="cardDesign">>
      <option value="Default">Default</option>
      <option value="Design1">Design 1</option>
      <option value="Design2">Design 2</option>
      <option value="Design3">Design 3</option>
    </select>
    <br />
      <label for="fullname">Full Name: </label>
      <input type="text" id="fullname" name="fullname" [(ngModel)]="contact.fullname"> <br />

      <label for="email">Email: </label>
      <input type="email" id="email" name="email" [(ngModel)]="contact.email"> <br />

      <label for="phone">Phone: </label>
      <input type="text" id="phone" name="phone" [(ngModel)]="contact.phone"> <br />

  </form>
</div>
<div style="width:400px; ; float:left;background-color:lightgray;">
  <h1>Design</h1>
  <ng-container #container></ng-container>
</div>
`,
})
export class App implements OnInit {
  cardDesign = 'Default';
  contact: Contact = new Contact();

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  ngOnInit(): void {
    setTimeout((_) => {
      this.onDropdownChange();
    });
  }

  onDropdownChange() {
    // Destroy the current component
    this.container.clear();

    setTimeout((_) => {
      const template = this.getDesignTemplate(this.cardDesign);
      // Create the new component with the ComponentFactoryResolver
      const component = getComponentFromTemplate(template);
      const childComponentRef = this.container.createComponent(component);

      // You can pass data to the child component using the component instance's properties or methods
      childComponentRef.setInput('contact', this.contact);
    }, 500);
  }

  getDesignTemplate(design) {
    let template = '';

    switch (design) {
      case 'Default': {
        template = `
        <div class="card" style="border: solid 2px;">
          <h2>${this.cardDesign}</h2>  
          <h3>{{ contact.fullname }}</h3>
          <h4 *ngIf="contact.phone">Cell: {{ contact.phone }}</h4>
          <h4 *ngIf="contact.email">Email: {{ contact.email }}</h4>
        </div>
        `;
        break;
      }
      case 'Design1': {
        template = `
        <div class="card" style="border: dotted 3px blue;">
          <h2>${this.cardDesign}</h2>  
          <h3>{{ contact.fullname }}</h3>
          <h4 *ngIf="contact.email">Email: {{ contact.email }}</h4>
          <h4 *ngIf="contact.phone">Cell: {{ contact.phone }}</h4>
        </div>
        `;
        break;
      }
      case 'Design2': {
        template = `
        <div class="card" tyle="order: dashed 2px; text-align:right; ">
          <h2>${this.cardDesign}</h2>  
          <h3>{{ contact.fullname }}</h3>
          <h4 *ngIf="contact.email">Email: {{ contact.email }}</h4>
          <h4 *ngIf="contact.phone">Cell: {{ contact.phone }}</h4>
        </div>
        `;
        break;
      }
      case 'Design3': {
        template = `
        <div class="card" style="border: solid 4px green;" >
          <h2>${this.cardDesign}</h2>  
          <h3>{{ contact.fullname }}</h3>
          <h4 *ngIf="contact.phone">Cell: {{ contact.phone }}</h4>
          <h4 *ngIf="contact.email">Email: {{ contact.email }}</h4>
        </div>
        `;
        break;
      }
    }

    return template;
  }
}

bootstrapApplication(App);

@Component({
  template: '',
})
class MyCarDesignTemplate {
  //@Input() items: string[] = [];
  @Input() contact: Contact = new Contact();
}

function getComponentFromTemplate(template: string) {
  ɵcompileComponent(MyCarDesignTemplate, {
    template,
    standalone: true,
    imports: [NgFor, NgIf],
  });

  return MyCarDesignTemplate;
}

export class Contact {
  public fullname: string = 'Abdul Rehman';
  public phone: string = '+92-25654654';
  public email: string = 'ar@gmail.com';
}
