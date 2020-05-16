const EOF=Symbol("EOF") //enf of file

function data(){

}

function tagOpen(){}
function endTagOpen(){}
function tagName(){}
function beforeAttributeName(){}
function selfClosingStartTag(){}


module.exports.parserHtml=function parserHtml(html){
    let state=data;
    for(let c of html){
        state=state(c)
    }
    state=state(EOF)
}