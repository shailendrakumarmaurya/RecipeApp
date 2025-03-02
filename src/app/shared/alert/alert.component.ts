import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AlertComponent {
  @Input({ required: true }) message!: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
