import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BpcUpdate } from 'src/app/models/bpc-update';
import { BPCServiceService } from 'src/app/services/bpcservice.service';

@Component({
  selector: 'app-update-bpc',
  templateUrl: './update-bpc.component.html',
  styleUrls: ['./update-bpc.component.css']
})
export class UpdateBPCComponent implements OnInit {
  listIndicesValoresBPC: BpcUpdate[] = [];
  items: any[] = [];
  keys: string[];

  mostrarInputsPSRM: boolean = false;
  mostrarInputsOTAX: boolean = false;
  mostrarInputsGANT: boolean = false;

  updateBPCForm: FormGroup;

  tipo: string = "";

  constructor(private _indicesValoresBPCService : BPCServiceService,
              private fb: FormBuilder) { 
                this.updateBPCForm = this.fb.group({
                  origen: ['', Validators.required]
                })
               }

  ngOnInit(): void {
    this.obtenerIndicesValoresBPC();
  }


  touchButtonPSRM(){
    this.mostrarInputsPSRM =! this.mostrarInputsPSRM;
  }

  touchButtonOTAX(){
    this.mostrarInputsOTAX =! this.mostrarInputsOTAX;
  }

  touchButtonGANT(){
    this.mostrarInputsGANT =! this.mostrarInputsGANT;
  }

  // Buscar segun los filtros de origen
  Buscar() {
    //console.log(this.updateBPCForm.value.origen);
    let origen = this.updateBPCForm.value.origen;
    
    this._indicesValoresBPCService
      .get(
        this.updateBPCForm.value.origen
      )
      .subscribe((res: any) => {
        for (let i = 0; i < res.length; i++){
          if (res[i].origen === origen){
            this.listIndicesValoresBPC = res[i].valores;
            this.keys = Object.keys(this.listIndicesValoresBPC);
            this.items = Object.values(this.listIndicesValoresBPC);
          }
        }
        
      });
  }

  obtenerIndicesValoresBPC(){
    this._indicesValoresBPCService.getIndicesValoresBPC().subscribe(data => {
      //console.log(data);
      this.listIndicesValoresBPC = data;

    }, error => {
      console.log(error);
    })
  }
}
