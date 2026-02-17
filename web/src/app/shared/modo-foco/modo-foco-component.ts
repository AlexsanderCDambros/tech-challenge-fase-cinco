import { Component } from "@angular/core";
import { ModoFocoService } from "./modo-foco.service";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-modo-foco',
  template: `
    <mat-slide-toggle
        (change)="toggleModoFoco()"
        >
    </mat-slide-toggle>
  `,
  imports: [
    MatSlideToggleModule,
    CommonModule
  ],
  styles: ''
})
export class ModoFocoComponent {

  constructor(
    private modoFocoService: ModoFocoService
  ) { }

  toggleModoFoco() {
    this.modoFocoService.toggleModoFoco();
  }
}
