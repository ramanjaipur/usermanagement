import { Component } from '@angular/core';
declare const myTest: any;
import * as $ from "jquery";
	
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  title = 'user-module';
  /* ngOnInit()
   {
	  alert('clicked on click123');
   }
  onClick() 
  {
	 $(function()
	 {
       alert('clicked by jquwyewr');
	 }); 
	  //console.log("clciked");
      myTest();
  }*/
  
}
