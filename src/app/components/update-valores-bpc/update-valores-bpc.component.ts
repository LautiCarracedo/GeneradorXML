import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BpcIndices } from 'src/app/models/bpc-indices';
import { BPCServiceService } from 'src/app/services/bpcservice.service';

@Component({
  selector: 'app-update-valores-bpc',
  templateUrl: './update-valores-bpc.component.html',
  styleUrls: ['./update-valores-bpc.component.css']
})
export class UpdateValoresBpcComponent implements OnInit {
  updateValoresBPCForm: FormGroup;
  campo: string | null;
  origen: string;
  alert: boolean = false;


  constructor(private fb: FormBuilder,
              private router: Router,
              private aRouter: ActivatedRoute,
              private indicesBPCService: BPCServiceService) { 
                this.updateValoresBPCForm = this.fb.group({
                  campo: ['', Validators.required],
                  inicio: ['', Validators.required],
                  fin: ['', Validators.required]
                })
                this.campo = aRouter.snapshot.paramMap.get('campo');
               }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar(){
    if (this.campo != null){
      this.indicesBPCService.getCampoBPC("PSRM", this.campo).subscribe(data => {
        this.updateValoresBPCForm.setValue({
          campo: this.campo,
          inicio: data.inicio,
          fin: data.fin
        })
      })
    }
  }

  actualizarProducto(){
    const indicesCampos: BpcIndices = {
      inicio: this.updateValoresBPCForm.get('inicio')?.value,
      fin: this.updateValoresBPCForm.get('fin')?.value
    }
    this.indicesBPCService.editarIndicesValoresBPC("PSRM", this.campo, indicesCampos).subscribe(data => {
      console.log(data);
      
      this.alert = true;
      this.router.navigate(['update-bpc']);
    }, error => {
      console.log(error);
    })
  }

  closeAlert(){
    this.alert = false;
  }

}
