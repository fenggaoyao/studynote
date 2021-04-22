var name="aa",age=12

var obj={
    name:'小张',
    objAge:this.age,
    myfun:function(){
        console.log(this.name+this.age)
    }
}

console.log("objAge",obj.objAge)
obj.myfun()