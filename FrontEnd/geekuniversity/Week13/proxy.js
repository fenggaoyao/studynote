var handles=new Map();
var proxyMap=new Map();
var usedReactives=[];


function reactive(obj){
  if(proxyMap.has(obj))
    return proxyMap.get(obj)

    let proxy= new Proxy(obj,{
        get(obj,props){
            usedReactives.push([obj,props])  
            if (typeof obj[props] === 'object') {
                  return reactive(obj[prop]);
            }         
            return obj[props];
        },
        set(obj,props,val){   
            obj[props]=val;
            if(handles.has(obj)){
                if(handles.get(obj).has(props)) {
                    for(let handle of handles.get(obj).get(props)){
                        handle();

                }            
            }}
         return obj[props];           
        }
    })
    proxyMap.set(obj,proxy)
   return proxy;

}


function effect(handler){
    usedReactives=[]
    handler() //执行get方法
  //获取到依赖
    for(let usedReactivity of usedReactives){
        let [obj,props]=usedReactivity;
        if(!handles.has(obj)){
            handles.set(obj,new Map())
        }
        if(!handles.get(obj).has(props)){
            handles.get(obj).set(props,[])
        }
        handles.get(obj).get(props).push(handler)
    } 
}

  
let p= reactive({r:255,g:0,b:0});    
let i=0;
effect(()=>{
    console.log('1----')
    effect(()=>{
       // console.log('2----')
        effect(()=>{ 
            
           // console.log(i)
            document.getElementById("r").value=p.r
            document.getElementById("dr").innerText=p.r
        })
     
    })
    
})
effect(()=>{
    document.getElementById("g").value=p.g
    document.getElementById("dg").innerText=p.g
})
effect(()=>{
    document.getElementById("b").value=p.b
    document.getElementById("db").innerText=p.b
})
effect(()=>{
    document.getElementById("color").style.backgroundColor=`rgb(${p.r},${p.g},${p.b})`
})


document.getElementById("r").addEventListener("input",(event)=>{
    p.r=event.target.value;
    i++
})
document.getElementById("g").addEventListener("input",(event)=>{
    p.g=event.target.value;
})
document.getElementById("b").addEventListener("input",(event)=>{
    p.b=event.target.value;
})
