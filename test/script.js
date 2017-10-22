let ine = document.getElementById('ine');
//let fields = form.children('input');
//console.log(fields);
ine.addEventListener('change',function(e){
    let el = e.target;
    console.log(`nazwa: ${el['name']}`);
    console.log(`wartosc: ${el.value}`);
    
    sprawdzPoprawnosc(el);

    
    
},false);

function arrName(){
    let arr = ['firstName','lastName'];
    return arr;
}


 function arrRegExp(){
            let arr = ['[A-Z]\w+','[A-Z]\w+(-\w+)?'];
           return arr;
        }
function sprawdzPoprawnosc(el){
    let map = new Map (arrName(),arrRegExp()); 
    console.log(map[1]);
}