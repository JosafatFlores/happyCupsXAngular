import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { stockService } from '../Services/stock.service'
import { stockInterface } from '../Util/Interface/stockInterface';
import { expenseService } from '../Services/expense.service'
import { offerService } from '../Services/offer.service'
import { offerInterface } from '../Util/Interface/offerInterface';
import { element } from 'protractor';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockData: any = []
  stockDataSource: any;

  offerData: any = []

  columnsTable: string[] = [
    'ID',
    'Modelo ID',
    'Categoria',
    'Color',
    'Dimesiones',
    'Material',
    'Capacidad',
    'Cantidad',
    'Acciones'
  ];
  constructor(private stockServ: stockService,
    public dialog: MatDialog,
    private offerServ: offerService,
    private snackBar: MatSnackBar,
  ) {
    this.getStock()
    this.getOffer()
  }

  ngOnInit(): void {
  }

  getStock() {
    this.stockData = []
    this.stockServ.getAllStock().subscribe((res) => {
      var data: [stockInterface] = res.result

      data.forEach((element) => {
        const stockElement = {
          stockID: element.stockID,
          modelID: element.modelID,
          quantity: element.quantity,
          type: element.type,
          color: element.color,
          size: element.size,
          material: element.material,
          capacity: element.capacity
        }
        this.stockData.push(stockElement)
      })
      this.stockDataSource = new MatTableDataSource(this.stockData)
    })
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

    })
  }

  expense(stock: stockInterface) {

    var offer: any = {}
    for (var i = 0; i < this.offerData.length; i++) {
      
      if(stock.modelID == this.offerData[i].modelID){
        offer =  this.offerData[i]
        this.openSnackBar("LLevate " + this.offerData[i].minimum + " y te regalamos " + this.offerData[i].free, "OK")
      }
    }
    const dialogRef = this.dialog.open(newExpense, {
      width: '50%',
      data: {
        stock: stock,
        offer: offer
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.getStock()
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}


@Component({
  selector: 'newExpense',
  templateUrl: 'newExpense.dialog.html',
  styleUrls: ['./newExpense.dialog.css']
})
export class newExpense {
  modelID: any
  quantity: any
  minimum: any
  free: any
  constructor(
    private snackBar: MatSnackBar,
    private expenseServ: expenseService,
    public dialogRef: MatDialogRef<newExpense>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modelID = data.stock.modelID
    this.quantity = data.stock.quantity
    this.minimum = data.offer.minimum
    this.free = data.offer.free
  }

  newExpense(quantity: string) {
    if(Number(quantity) >= Number(this.minimum)){
      quantity = String(Number(quantity) + Number(this.free))
      this.openSnackBar("Felicidades te llevas " + quantity + "tazas", "OK")
    }
    if (this.quantity < quantity) {
      this.openSnackBar("No tenemos ese stock", "OK")
    } else {
      this.expenseServ.createExpense(quantity, this.modelID).subscribe((res) => {
        if (res.code == 1) {
          this.dialogRef.close();
        } else {
          this.openSnackBar("Cominiquese con el administrador", "OK")
        }
      })
    }

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