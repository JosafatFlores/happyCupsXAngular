import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { modelService } from '../Services/model.service'
import { modelInterface } from '../Util/Interface/modelInterface';
import { incomeService } from '../Services/income.service'
import { incomeInterface } from '../Util/Interface/incomeInterface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  incomeData: any = []
  incomeDataSource: any;

  columnsTable: string[] = [
    'ID',
    'modelo ID',
    'Color',
    'Dimesiones',
    'Material',
    'Capacidad',
    'Cantidad',
    'Acciones'
  ];

  constructor(public dialog: MatDialog,
    private incomeServ: incomeService) {
    this.getIncome()
  }

  ngOnInit(): void {
  }

  getIncome() {
    this.incomeData = []
    this.incomeServ.getAllincomes().subscribe((res) => {
      var data: [incomeInterface] = res.result

      data.forEach((element) => {
        const incomeElement = {
          incomeID: element.incomeID,
          quantity: element.quantity,
          modelID: element.modelID,
          type: element.type,
          color: element.color,
          size: element.size,
          material: element.material,
          capacity: element.capacity
        }
        this.incomeData.push(incomeElement)
      })
      this.incomeDataSource = new MatTableDataSource(this.incomeData)

    })
  }

  newIncome() {
    const dialogRef = this.dialog.open(newIncome, {
      width: '50%',

    })

    dialogRef.afterClosed().subscribe(result => {
      this.getIncome()
    });
  }

  deleteIncome(income: incomeInterface) {
    const dialogRef = this.dialog.open(confirmDeleteIncome, {
      width: '50%',
      data: {
        income: income
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.getIncome()
    });
  }
}


@Component({
  selector: 'newIncome',
  templateUrl: 'newIncome.dialog.html',
  styleUrls: ['./newIncome.dialog.css']
})
export class newIncome {
  modelSelect: any = []
  constructor(
    private snackBar: MatSnackBar,
    private incomeServ: incomeService,
    private modelServ: modelService,
    public dialogRef: MatDialogRef<newIncome>,
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

  newIncome(modelID: string, quantity: string) {
    this.incomeServ.createincome(modelID, quantity).subscribe((res) => {
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
  selector: 'confirmDeleteIncome',
  templateUrl: 'confirmDeleteIncome.dialog.html',
  styleUrls: ['./confirmDeleteIncome.dialog.css']
})
export class confirmDeleteIncome {
  incomeID: any

  constructor(
    private snackBar: MatSnackBar,
    private incomeServ: incomeService,
    public dialogRef: MatDialogRef<confirmDeleteIncome>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.incomeID = data.income.incomeID
  }

  confirm() {
    this.incomeServ.destroyincome(this.incomeID).subscribe((res) => {
      if (res.code == 1) {
        this.openSnackBar("Ingreso eliminado", "OK")
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