import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { offerService } from '../Services/offer.service'
import { offerInterface } from '../Util/Interface/offerInterface';
import { modelService } from '../Services/model.service'
import { modelInterface } from '../Util/Interface/modelInterface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offerData: any = []
  offerDataSource: any;

  modelSelect: any = []

  columnsTable: string[] = [
    'ID',
    'Modelo ID',
    'Piezas minimas',
    'Piezas gratis',
    'Acciones'
  ];


  constructor(
    private offerServ: offerService,
    public dialog: MatDialog
  ) {
    this.getOffer()
  }

  ngOnInit(): void {
  }

  getOffer() {
    this.offerData = []
    this.offerServ.getAllOffers().subscribe((res) => {
      var data: [offerInterface] = res.result
      data.forEach((element) => {
        const offerElement = {
          offerID: element.offerID,
          modelID: element.modelID,
          minimum: element.minimum,
          free: element.free
        }
        this.offerData.push(offerElement)
      })
      this.offerDataSource = new MatTableDataSource(this.offerData)

    })
  }


  newOffer() {
    const dialogRef = this.dialog.open(newOffer, {
      width: '50%',

    })

    dialogRef.afterClosed().subscribe(result => {
      this.getOffer()
    });
  }

  deleteOffer(offer: offerInterface) {
    const dialogRef = this.dialog.open(confirmDeleteOffer, {
      width: '50%',
      data: {
        offer: offer
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.getOffer()
    });
  
  }
}

@Component({
  selector: 'newOffer',
  templateUrl: 'newOffer.dialog.html',
  styleUrls: ['./newOffer.dialog.css']
})
export class newOffer {
  modelSelect: any = []
  constructor(
    private snackBar: MatSnackBar,
    private modelServ: modelService,
    private offerServ: offerService,
    public dialogRef: MatDialogRef<newOffer>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getModel()
  }

  getModel() {
    this.modelSelect = []
    this.modelServ.getAllModels().subscribe((res) => {
      var data: [modelInterface] = res.result

      data.forEach((element) => {
        const modelElement = {
          modelID: element.modelID,
          type: element.type,
          color: element.color,
          size: element.size,
          material: element.material,
          capacity: element.capacity
        }
        this.modelSelect.push(modelElement)
      })

    })
  }

  newOffer(modelID: string, minimum: string, free: string) {
    this.offerServ.createOffer(modelID, minimum, free).subscribe((res) => {
      if (res.code == 1) {
        this.openSnackBar("Ingreso registrado", "OK")
        this.dialogRef.close();
      } else {
        this.openSnackBar("Cominiquese con el administrador", "OK")
      }
    })
  }



  close(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}


@Component({
  selector: 'confirmDeleteOffer',
  templateUrl: 'confirmDeleteOffer.dialog.html',
  styleUrls: ['./confirmDeleteOffer.dialog.css']
})
export class confirmDeleteOffer {
  offerID: any

  constructor(
    private snackBar: MatSnackBar,
    private offerServ: offerService,
    public dialogRef: MatDialogRef<confirmDeleteOffer>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.offerID = data.offer.offerID
  }

  confirm() {
    this.offerServ.destroyOffer(this.offerID).subscribe((res) => {
      if (res.code == 1) {
        this.openSnackBar("oferta eliminado", "OK")
        this.dialogRef.close();
      } else {
        this.openSnackBar("Cominiquese con el administrador", "OK")
      }
    })
  }
  close(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}