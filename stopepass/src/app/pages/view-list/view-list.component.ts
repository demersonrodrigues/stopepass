import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.css'
})
export class ViewListComponent {
  listUsers: Array<{ name: string, cpf: string, user_type: number, tel: string }> = [];
  
  constructor() {
    this.listUsers = [
      {
        name: 'Demerson Araújo Rodrigues', 
        cpf: '99922255599',
        user_type: 2,
        tel: '71997299030',
      },
      {
        name: 'Usuário Numéro Dois', 
        cpf: '11144422255', 
        user_type: 1, 
        tel: '75992384466',
      },
    ]
  }
}