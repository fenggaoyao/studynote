class ElementWrapper{
    constructor(type){
        this.root=document.createElement(type);       
    }
    setAttribute(name,value){
        if (name.match(/^on([\s\S]+)$/)) {
            const eventName = RegExp.$1.replace(/^[\s\S]/, (s) => {
              return s.toLocaleLowerCase();
            });
            this.root.addEventListener(eventName, value);
          }
          if (name === 'className') {
            this.root.setAttribute('class', value);
          }
        this.root.setAttribute(name,value)
    }
    //vchild是一个虚拟元素
    appendChild(vchild){       
        //vchild.mountTo(this.root)
        let range=document.createRange();
        if(this.root.children.length){
            range.setStartAfter(this.root.lastChild);
            range.setEndAfter(this.root.lastChild);
        }else{
         range.setStart(this.root,0);
         range.setEnd(this.root,0);
        }
        vchild.mountTo(range)
    }
     //vchild是一个个真实元素
    mountTo(range){
        range.deleteContents();
        range.insertNode(this.root);
    }
}

class TextWrapper{
    constructor(content){
        this.root=document.createTextNode(content);       
    }
    mountTo(range){
        //parent.appendChild(this.root)
        range.deleteContents();
        range.insertNode(this.root);
    }
}

export class Component{

    constructor(){
        this.children=[];
        this.props=Object.create(null)
    }

    setState(state){ 
        let merge=(oldState,newState)=>{
            for(let p in newState){
                if(typeof newState[p]==='object'){
                    if(typeof oldState[p] !=='object' ){
                        oldState[p]={}
                    }
                    merge(oldState[p],newState[p]);
                }else{
                    oldState[p]=newState[p];
                }
            }
        }
        if(!this.state && state){
            this.state={}
        }
        merge(this.state,state)
        this.update();
   
    }

    setAttribute(name,value){
        this.props[name]=value
        this[name]=value;
    }

    mountTo(range){
          this.range=range;
          this.update()
    }
    update(){
       this.range.deleteContents();
       let vdom=this.render();
       vdom.mountTo(this.range);
    }
    appendChild(vchild){
        this.children.push(vchild)
    }

}

export let ToyReact={
    createElement(type,attributes,...children){     
        let element;
        if(typeof type ==='string'){
            element=new ElementWrapper(type)
        }
        else{
            element=new type;
        }
        for(let name in attributes){
            element.setAttribute(name,attributes[name]);
        }
        let insertchildren=(children)=>{
            for(let child of children){                 
                if(typeof child ==='object' && child instanceof Array)  
                    insertchildren(child)
                else{
                    if(!(child instanceof Component)
                     && !(child instanceof ElementWrapper)
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
    render(vdom,element){
       let range=document.createRange();
       if(element.children.length){
           range.setStartAfter(element.lastChild);
           range.setEndAfter(element.lastChild);
       }else{
        range.setStart(element,0);
        range.setEnd(element,0);
       }
        vdom.mountTo(range)
    }
}