class ElementWrapper{
    constructor(type){
       this.root= document.createElement(type);
    }
    setAttribute(name,value){
        this.root.setAttribute(name,value);
    }
    appendChild(child){
        child.mountTo(this.root)
    }
    addEventListener() {
        this.root.addEventListener(...arguments);
      }

      mountTo(parent) {
        parent.appendChild(this.root)
        // for (let child of this.children) {
        //   child.mountTo(this.root);
        // }
      }

}

class TextWrapper{
    constructor(type){
        this.root=document.createTextNode(type);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
      }
}



export let ToyReact={
    createElement(type,attributes,...children){
        let element;
        if(typeof type==='string'){
            element=new ElementWrapper(type);
        }
        else{
            element=new type;
        }
        for(let name in attributes){
            element.setAttribute(name,attributes[name])
        }
        let insertchildren=(children)=>{
            for(let child of children){                 
                if(typeof child ==='object' && child instanceof Array)  
                    insertchildren(child)
                else{
                    if(child ===null || child===void 0){
                        child=''
                    }                
                    if(
                        !(child instanceof ElementWrapper)
                      && !(child instanceof TextWrapper)
                      ){
                        child =String(child)
                      }
                      
                    if(typeof child ==='string'){
                        child=new TextWrapper(child) 
                    }
                        
                    element.appendChild(child)
                }
            }
        }
        insertchildren(children);       
        return element;      
    },
    render(element,parent){
        element.mountTo(parent)
    }

} 


