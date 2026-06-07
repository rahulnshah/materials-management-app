import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialLotEditor } from '../material-lot-editor/material-lot-editor';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('materials-management-app');
}
