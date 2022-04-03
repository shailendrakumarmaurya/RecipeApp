import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { dropdownDirective } from "./dropdown.directive";
import { loadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
  declarations: [
    AlertComponent,
    loadingSpinnerComponent,
    PlaceholderDirective,
    dropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    loadingSpinnerComponent,
    PlaceholderDirective,
    dropdownDirective,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule { }
