import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { stockInterface } from '../Util/Interface/stockInterface';
import {expenseService} from '../Services/expense.service'

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenseData: any = []
  expenseDataSource: any;

  columnsTable: string[] = [
    'ID',
    'Modelo ID',
    'Categoria',
    'Color',
    'Dimesiones',
    'Material',
    'Capacidad',
    'Cantidad'
  ];
  constructor(private expenseServ: expenseService) {
    this.getExpense()
   }

  ngOnInit(): void {
  }

  getExpense() {
    this.expenseData = []
    this.expenseServ.getAllExpenses().subscribe((res) => {
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
        this.expenseData.push(stockElement)
      })
      this.expenseDataSource = new MatTableDataSource(this.expenseData)
    })
  }
}
