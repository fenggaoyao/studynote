import {ToyReact,Component} from './ToyReact.js'

class MyComponent extends Component{
    render() {
        return <div style="color:red">
        <span>hello</span>
        <span>world</span>

           <div>
              {this.children}
              {true}
           </div>
        </div>
    }  

}

let a=<MyComponent name="a" id="ida">
 <div>123</div>
 <span>456</span>
</MyComponent>

let b=<div id="id">hello</div>

console.log(b)


ToyReact.render(a,document.body)
