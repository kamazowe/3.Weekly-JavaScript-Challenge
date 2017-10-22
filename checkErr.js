class ErrorReg{
    
    constructor(element,nameLib = null,regLib = null,descLib = null){
         this.value = element.value;
        this.nameField = element['name'];
        this.liblary = this.createLiblary(nameLib,regLib,descLib);
        this.isError = this.check();
    }
    createLiblary(nameLib,regLib,descLib){
 
    const arrName = nameLib || new Array ("k_imie",
                                          "k_nazwisko",
                                          "k_miasto",
                                          "k_kod",
                                          "k_ulica",
                                          "f_nazwa",
                                          "f_ulica",
                                          "f_miasto",
                                          "f_kod",
                                          "f_NIP",
                                          "z_kwota",
                                          "z_stan");
    // tablica regul
     
    const arrReg = regLib || new Array ('[A-Z]\\w{3,20}',  
                                        '[A-Z]\\w+(-\\w+)?',
                                        '[A-Z]\\D{3,30}',
                                        '\\d{2}-\\d{3}',
                                        '[A-Z].{4,40}',
                                        '.{3,30}',
                                        '[A-Z].{4,40}',
                                        '[A-Z]\\D{3,30}',
                                        '\\d{2}-\\d{3}',
                                        '\\d{10}',
                                        '\\d+.\\d{1,2}',
                                        '(w|d|o|s)');     
        

    const desc = descLib || new Array('Imie musi zaczynac sie z duzej litery',
                                      2,3,4,5,6,7,8,9,10,11,12);
        
    const map = new Map();
        for(let i = 0;i<arrName.length;i++){
            
        map.set(arrName[i],[arrReg[i],desc[i]]);
       
        }
       
            return map;
    }
    
    
    
    check(){
     
        function falseCheckNIP(value){
                const arrW = [6,5,7,2,3,4,5,6,7];
                let arrSum = 0;
                let tmp10;
                console.log(`-`.repeat(30));
                console.log(`${`-`.repeat(5)} NAZWA checkNIP ${`-`.repeat(5)}`);
                //body debug
            console.log(typeof value);
            for(let i = 0; i<value.length;i++ ){
                
                if(i === (value.length -1)){
                    console.log(`ostatnia petla`);
                    tmp10 = arrSum % 11;
                    
                    if(tmp10 == value[9]){
                         return false ;
                    }
                }else{
                    
                    arrSum += (value[i]*arrW[i]);
                    console.log(arrSum);
                }
                
             
            }
            
                console.log(`-`.repeat(30));
            
            
            
            return true;
            
           
        }
        
        
        const map = this.liblary;
        //()[0] <-- pod 0 indeksem wzor , pod 1 desc
        var pattern = (map.get(this.nameField))[0];
        let desc = (map.get(this.nameField))[1];
        console.log(`name: ${this.nameField}`);
        console.log(`value: ${this.value}`);
        console.log(`'${pattern}'`);
        console.log(`'${desc}'`);
        '-'.repeat(10);
        
       
        
       let regex = new RegExp(`${pattern}`);
        let err = this.value.search(regex);
        console.log(err);
        
        // dla NIP 
         if((err === 0) && this.nameField == 'f_NIP'){
            console.log(`w ifie jestesmy nip`);
             err = falseCheckNIP(this.value);
        }
        
        
        // 0 dla znalezionego stringu (nie ma bledu)
        // dla 
        if(err)
            {
                //error
                this.desc = desc;
            return true;     
            }
        else{
            
            return false;
        }
        
        
        
    }

}


   