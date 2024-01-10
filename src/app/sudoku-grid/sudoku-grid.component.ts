import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sudoku-grid',
  templateUrl: './sudoku-grid.component.html',
  styleUrls: ['./sudoku-grid.component.css']
})
export class SudokuGridComponent implements OnInit {
    gridSize : number[] = [1,2,3,4,5,6,7,8,9];
    data : Set<String> = new Set([]);
    defaultMap : Map<String,number> = new Map([]);

    ngOnInit(): void {
        this.defaultMap.set("1-2",1);
        this.defaultMap.set("1-5",8);
        this.defaultMap.set("1-6",9);
        this.defaultMap.set("1-7",2);
        this.defaultMap.set("2-2",8);
        this.defaultMap.set("2-6",5);
        this.defaultMap.set("2-8",3);
        this.defaultMap.set("3-2",9);
        this.defaultMap.set("3-8",7);
        this.defaultMap.set("4-3",6);
        this.defaultMap.set("4-6",2);
        this.defaultMap.set("4-8",4);
        this.defaultMap.set("5-3",5);
        this.defaultMap.set("5-4",4);
        this.defaultMap.set("5-7",7);
        this.defaultMap.set("6-4",9);
        this.defaultMap.set("6-5",7);
        this.defaultMap.set("8-3",3);
        this.defaultMap.set("8-6",8);
        this.defaultMap.set("8-8",2);
        this.defaultMap.set("9-2",5);
        this.defaultMap.set("9-6",4);
        this.defaultMap.set("9-9",1);
        this.defaultMap.forEach((value,key)=>{
          const event : any = {
              preventDefault : ()=>{},
              target : {
                value : value
              },
              key : value,
              keyCode : 49
          };
          this.sudokuValidate(event,Number(key[0]),Number(key[2]));
        });
        console.log(this.data);
    }
    
    reset(){
      this.data = new Set([]);
    }
    
    rowStringBuilder(event : any, row : number){
      return "value: "+event.target.value+" row: "+row;
    }
    
    colStringBuilder(event : any, col : number){
      return "value: "+event.target.value+" col: "+col;
    }
    
    sudokuValidate(event : any, row : number, col : number){
      event.preventDefault();
      if(event.keyCode == 8 || event.keyCode == 46){
        this.data.delete(this.rowStringBuilder(event,row));
        this.data.delete(this.colStringBuilder(event,col));
        event.target.value="";
        return;
      }
      if(!(event.keyCode >= 48 && event.keyCode <= 57))
      return;
      console.log(this.data);
      event.target.value = event.key;
      const enteredElementRowString = this.rowStringBuilder(event,row); 
      const enteredElementColString = this.colStringBuilder(event,col); 
      let enteredElementDiag1String = "";
      let enteredElementDiag2String = "";
      if(row==col){
         enteredElementDiag1String = "value: "+event.target.value+" Diag: "+"1"; 
      }
      if(row+col==this.gridSize.length+1){
         enteredElementDiag2String = "value: "+event.target.value+" Diag: "+"2"; 
      }
      if(!this.data.has(enteredElementRowString) && !this.data.has(enteredElementColString) && !this.data.has(enteredElementDiag1String) && !this.data.has(enteredElementDiag2String)){
        this.data.add(enteredElementRowString);
        this.data.add(enteredElementColString);
        if(enteredElementDiag1String!=="")
          this.data.add(enteredElementDiag1String);
        if(enteredElementDiag2String!=="")
          this.data.add(enteredElementDiag2String);
      }
      else {
        // if(event.target.value!=event.key)
          event.target.value="";
          // const innerhtml = document.getElementById(event.target.id) as HTMLInputElement;
          // innerhtml?.style.backgroundColor="red";
      }
    }
}
