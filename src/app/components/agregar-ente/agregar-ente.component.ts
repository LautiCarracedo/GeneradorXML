import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEntes } from 'src/app/models/add-entes';
import { EntesVariosService } from 'src/app/services/entes-varios.service';

@Component({
  selector: 'app-agregar-ente',
  templateUrl: './agregar-ente.component.html',
  styleUrls: ['./agregar-ente.component.css']
})
export class AgregarEnteComponent implements OnInit {

  addEnteForm: FormGroup;
  camposTagGeneral: camposTagGeneral[] = [];
  camposTagSucursal: camposTagSucursal[] = [];
  camposTagPagos: camposTagPagos[] = [];
  camposTagDP: camposTagDP[] = [];

  origen: string | null;
  nroEnte: string | null;


  /*camposTagSucursal: {
    id: number,
    campo: string,
    seleccionado: boolean;
  }

  camposTagPagos: {
    id: number,
    campo: string,
    seleccionado: boolean;
  }

  camposTagDP: {
    id: number,
    campo: string,
    seleccionado: boolean;
  }*/


  constructor(private fb: FormBuilder,
    private router: Router,
    private _entesService: EntesVariosService,
    private aRouter: ActivatedRoute) {
    this.addEnteForm = this.fb.group({
      origen: ['', Validators.required],
      nroBanco: ['', Validators.required],
      nombreBanco: ['', Validators.required],
      comisionDeb: ['', Validators.required],
      comisionCred: ['', Validators.required],
      lote: ['', Validators.required],
      nroComercio: ['', Validators.required],
      tagGeneral: this.obtenerCamposTagGeneralSelect(),
      tagSucursal: this.obtenerCamposTagSucursalSelect(),
      tagPagos: this.obtenerCamposTagPagosSelect(),
      tagDP: this.obtenerCamposTagDPSelect(),
    })

    this.origen = this.aRouter.snapshot.paramMap.get('origen');
    this.nroEnte = this.aRouter.snapshot.paramMap.get('nroEnte');

  }

  ngOnInit(): void {
    this.obtenerCamposTagGeneral();
    this.obtenerCamposTagSucursal();
    this.obtenerCamposTagPagos();
    this.obtenerCamposTagDP();
    //console.log(this.camposTagGeneral)
    this.esEditar();
  }

  esEditar() {
    if (this.origen != null && this.nroEnte != null) {
      this._entesService.getEnteSeleccionado(this.origen, this.nroEnte).subscribe(data => {
        this.addEnteForm.setValue({
          origen: data.origen,
          nroBanco: data.nroEnte,
          nombreBanco: data.nombreEnte,
          comisionDeb: data.comisionDebito,
          comisionCred: data.comisionCredito,
          lote: data.lote,
          nroComercio: data.nroComercio,
          tagGeneral: data.tagGeneral,
          tagSucursal: data.tagGeneral,
          tagPagos: data.tagGeneral,
          tagDP: data.tagGeneral,
        })
      })
    }
  }

  onchange() {
    //console.log(this.camposTagGeneral);


  }

  obtenerCamposTagGeneral() {

    this.camposTagGeneral = [
      { id: 1, campo: 'banco', seleccionado: false },
      { id: 2, campo: 'nroTransaccion', seleccionado: false },
      { id: 3, campo: 'nroRendicion', seleccionado: false },
      { id: 4, campo: 'fechaRendicion', seleccionado: false },
      { id: 5, campo: 'cbuOrigen', seleccionado: false },
      { id: 6, campo: 'cuitOrigen', seleccionado: false },
      { id: 7, campo: 'cbuDestino', seleccionado: false },
      { id: 8, campo: 'cuitDestino', seleccionado: false },
      { id: 9, campo: 'registros', seleccionado: false },
      { id: 10, campo: 'totalImpDeterminado', seleccionado: false },
      { id: 11, campo: 'totalImpPagado', seleccionado: false },
      { id: 12, campo: 'totalImpRecaudado', seleccionado: false },
      { id: 13, campo: 'totalImpDepositado', seleccionado: false },
      { id: 14, campo: 'totalImpADepositar', seleccionado: false },
      { id: 15, campo: 'totalImpAnulacionTimbradoras', seleccionado: false },
      { id: 16, campo: 'totalImpComision', seleccionado: false },
      { id: 17, campo: 'totalImpIVA', seleccionado: false },
    ]

    return this.camposTagGeneral;

  }

  obtenerCamposTagGeneralSelect() {
    let arrTagGeneral = this.camposTagGeneral;
    let arrTagGeneralCamposSelect = [];
    for (let i = 0; i < arrTagGeneral.length; i++) {
      if (arrTagGeneral[i].seleccionado === true) {
        arrTagGeneralCamposSelect.push(arrTagGeneral[i].campo);
      }
    }

    return arrTagGeneralCamposSelect;
  }

  obtenerCamposTagSucursal() {

    this.camposTagSucursal = [
      { id: 1, campo: 'sucursal', seleccionado: false },
      { id: 2, campo: 'registros', seleccionado: false },
      { id: 3, campo: 'totalImpDeterminado', seleccionado: false },
      { id: 4, campo: 'totalImpPagado', seleccionado: false },
      { id: 5, campo: 'totalImpRecaudado', seleccionado: false },
      { id: 6, campo: 'totalImpDepositado', seleccionado: false },
      { id: 7, campo: 'totalImpADepositar', seleccionado: false },
      { id: 8, campo: 'totalImpAnulacionTimbradoras', seleccionado: false },
      { id: 9, campo: 'totalImpComision', seleccionado: false },
      { id: 10, campo: 'totalImpIVA', seleccionado: false }
    ]

    return this.camposTagSucursal;

  }

  obtenerCamposTagSucursalSelect() {
    let arrTagSucursal = this.camposTagSucursal;
    let arrTagSucursalCamposSelect = [];
    for (let i = 0; i < arrTagSucursal.length; i++) {
      if (arrTagSucursal[i].seleccionado === true) {
        arrTagSucursalCamposSelect.push(arrTagSucursal[i].campo);
      }
    }

    return arrTagSucursalCamposSelect;
  }

  obtenerCamposTagPagos() {

    this.camposTagPagos = [
      { id: 1, campo: 'codigoRegistro', seleccionado: false },
      { id: 2, campo: 'caja', seleccionado: false },
      { id: 3, campo: 'cajero', seleccionado: false },
      { id: 4, campo: 'lote', seleccionado: false },
      { id: 5, campo: 'registros', seleccionado: false },
      { id: 6, campo: 'totalImpDeterminado', seleccionado: false },
      { id: 7, campo: 'totalImpPagado', seleccionado: false },
      { id: 8, campo: 'totalImpComision', seleccionado: false },
      { id: 9, campo: 'totalImpIVA', seleccionado: false }
    ]

    return this.camposTagPagos;
  }

  obtenerCamposTagPagosSelect() {
    let arrTagPagos = this.camposTagPagos;
    let arrTagPagosCamposSelect = [];
    for (let i = 0; i < arrTagPagos.length; i++) {
      if (arrTagPagos[i].seleccionado === true) {
        arrTagPagosCamposSelect.push(arrTagPagos[i].campo);
      }
    }

    return arrTagPagosCamposSelect;
  }

  obtenerCamposTagDP() {

    this.camposTagDP = [
      { id: 1, campo: 'codigoRegistro', seleccionado: false },
      { id: 2, campo: 'nroRegistro', seleccionado: false },
      { id: 3, campo: 'impuesto', seleccionado: false },
      { id: 4, campo: 'fechaVencimiento', seleccionado: false },
      { id: 5, campo: 'nroControl', seleccionado: false },
      { id: 6, campo: 'marcaMovimiento', seleccionado: false },
      { id: 7, campo: 'tipoOperacion', seleccionado: false },
      { id: 8, campo: 'tipoRendicion', seleccionado: false },
      { id: 9, campo: 'moneda', seleccionado: false },
      { id: 10, campo: 'nroLiquidacionOriginal', seleccionado: false },
      { id: 11, campo: 'nroLiquidacionActualizado', seleccionado: false },
      { id: 12, campo: 'fechaPago', seleccionado: false },
      { id: 13, campo: 'impDeterminado', seleccionado: false },
      { id: 14, campo: 'impPagado', seleccionado: false },
      { id: 15, campo: 'impComision', seleccionado: false },
      { id: 16, campo: 'impIVA', seleccionado: false },
      { id: 17, campo: 'nroComercio', seleccionado: false },
      { id: 18, campo: 'cantCuotas', seleccionado: false },
      { id: 19, campo: 'idObjetoImponible', seleccionado: false },
      { id: 20, campo: 'barra1', seleccionado: false },
      { id: 21, campo: 'barra2', seleccionado: false },
      { id: 22, campo: 'obligacion', seleccionado: false },
    ]

    return this.camposTagDP;

  }

  obtenerCamposTagDPSelect() {
    let arrTagDP = this.camposTagDP;
    let arrTagDPCamposSelect = [];
    for (let i = 0; i < arrTagDP.length; i++) {
      if (arrTagDP[i].seleccionado === true) {
        arrTagDPCamposSelect.push(arrTagDP[i].campo);
      }
    }

    return arrTagDPCamposSelect;
  }


  agregarEnte() {
    let codBarrasPresOK = true //this.codBarrasOK(formatoXML);

    if (codBarrasPresOK) {
      const ENTEAAGREGAR: AddEntes = {
        origen: this.addEnteForm.get('origen')?.value,
        nroEnte: this.addEnteForm.get('nroBanco')?.value,
        nombreEnte: this.addEnteForm.get('nombreBanco')?.value,
        comisionDebito: this.addEnteForm.get('comisionDeb')?.value,
        comisionCredito: this.addEnteForm.get('comisionCred')?.value,
        lote: this.addEnteForm.get('lote')?.value,
        nroComercio: this.addEnteForm.get('nroComercio')?.value,
        tagGeneral: this.obtenerCamposTagGeneralSelect(),
        tagSucursal: this.obtenerCamposTagSucursalSelect(),
        tagPagos: this.obtenerCamposTagPagosSelect(),
        tagDetallePago: this.obtenerCamposTagDPSelect(),

      }
      console.log(ENTEAAGREGAR);
      this._entesService.guardarEnte(ENTEAAGREGAR).subscribe(data => {
        console.log(data);

        alert('Ente añadido con exito');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      })
    }
  }
}

class camposTagGeneral {
  id: number;
  campo: string;
  seleccionado: boolean;
}

class camposTagSucursal {
  id: number;
  campo: string;
  seleccionado: boolean;
}

class camposTagPagos {
  id: number;
  campo: string;
  seleccionado: boolean;
}

class camposTagDP {
  id: number;
  campo: string;
  seleccionado: boolean;
}
