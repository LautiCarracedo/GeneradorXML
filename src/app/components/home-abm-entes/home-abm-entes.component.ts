import { Component, OnInit } from '@angular/core';
import { AddEntes } from 'src/app/models/add-entes';
import { EntesVariosService } from 'src/app/services/entes-varios.service';

@Component({
  selector: 'app-home-abm-entes',
  templateUrl: './home-abm-entes.component.html',
  styleUrls: ['./home-abm-entes.component.css']
})
export class HomeAbmEntesComponent implements OnInit {
  listEntesCargados: AddEntes[] = [];

  constructor(private _entesService: EntesVariosService) { }

  ngOnInit(): void {
    this.obtenerEntesCargados();
  }

  obtenerEntesCargados(){
    this._entesService.getEntesCargados().subscribe(data => {
      console.log(data);
      this.listEntesCargados = data;

    }, error => {
      console.log(error);
    })
  }

}
