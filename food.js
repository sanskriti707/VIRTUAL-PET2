class Food{
    constructor(){
        this.foofStock=0;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }

    getFedTime(lastFed) {
        this.lastFed=lastfed;
    }

     deductFood() {
         if (this.foodStock>0){
             this.foodStock=this.foodStock-1;
         }
     }
     getFoodStock(){
         return this.foodStock;
     }
     display(){
         var x=50;
         var y=100;
         imageMode (CENTER);
         image(this.image,720,220,50,50);
        if (lastFed>=12){
            text("lastFedTime"+lastFed%12,50,30)
        }
        else if(lastFed==0){
            text("last fed  time is 12am",50,30);
        }
        else{
            text("last fed"+ lastFed,50,30);
        }
        if(this.foodStock!=0) {
            for(var i=0; i<this.foodStock; i++){
                if(i%10 == 0) {
                    x=50;
                    y=y+50;
                }
                image(this.image,x,y,45,45);
                x=x+30;
            }
        }   
          
     }
     bedRoom(){
         background(bedRoom,550,500);
     }
     garden(){
        background(garden,550,500);
    }
    washRoom(){
        background(washRoom,550,500);
    }

}