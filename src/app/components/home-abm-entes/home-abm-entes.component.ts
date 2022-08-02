import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddEntes } from 'src/app/models/add-entes';
import { EntesVariosService } from 'src/app/services/entes-varios.service';

@Component({
  selector: 'app-home-abm-entes',
  templateUrl: './home-abm-entes.component.html',
  styleUrls: ['./home-abm-entes.component.css']
})
export class HomeAbmEntesComponent implements OnInit {
  listEntesCargados: AddEntes[] = [];
  formBuscador: FormGroup;

  tipo: string = "";

  constructor(private _entesService: EntesVariosService,
              private fb: FormBuilder) { 
    this.formBuscador = this.fb.group({
      origen: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.obtenerEntesCargados();
  }

  buscarEntesPorOrigen() {
    const dataOrigenSeleccionado: AddEntes[] = [];
    this._entesService.getEntesCargados().subscribe(data => {
      for (let i = 0; i < data.length; i++){
        if (data[i].origen === this.formBuscador.value.origen){
          dataOrigenSeleccionado.push(data[i]);
        }
      }
      
      //console.log(dataOrigenSeleccionado);
      this.listEntesCargados = dataOrigenSeleccionado;
    }, error => {
      console.log(error);
    })
  }

  obtenerEntesCargados(){
    this._entesService.getEntesCargados().subscribe(data => {
      //console.log(data);
      this.listEntesCargados = data;

    }, error => {
      console.log(error);
    })
  }

}
