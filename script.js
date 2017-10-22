// regexp nip
// nazwy bledow
//tooltip z nazwa bledu

class FormSaver {

    constructor(form) {
        this.form = form;
        this.fields = this.form.querySelectorAll('input[name]:not([type="submit"])');
        this.formID = this.form.getAttribute('id');
        this.fieldValues = {};
        
        // 1.zaladuj zapisane wartosci  z local storage
        this.loadSaveValues();
        
        // 2.nadsluchuje zmiany wartosci w polu
        this.addSavingToFields();
        this.form.onsubmit = this.clearLocalStorage.bind(this);
    }
    loadSaveValues() {

        var savedFields = window.localStorage[this.formID];
        if (savedFields) {

            savedFields = JSON.parse(savedFields);
            console.log(`---`);
            console.log(savedFields);
        }
        for (let key in savedFields) {

            this.form.querySelector('[name="' + key + '"]').value = savedFields[key];
        }

    }
    
    
        addSavingToFields() {

        for (let i = 0; i < this.fields.length; i++) {
            
            // 3. odpalasie przy zmiane war
            this.fields[i].onchange = function (e) {
                let that = e.target;
                
                //jesli wczesniej byl blad to usun
                that.classList.remove('error');
                
                // checkField
                this.checkField(e).then(
                    (el) => {
                        this.saveField(el);
                        el.classList.add('success');
                    },
                    ({element,desc}) => {
                        element.classList.add('error');
                        console.log(`Error:  ${desc} `);
                    });
            }.bind(this);

        }
    }
    
    // 4. sprawdza czy blad
     checkField(e) {

        var el = e.target;
        console.log(`-checkfield-`);
          console.log(`${el['name']}`);
        console.log(`${el}`);
         console.log(`${el.value}`);
         console.log(('-').repeat(5));
        let p = new Promise(function (resolve, reject) {
           
          
             let elError = new ErrorReg(el);
            console.log(elError);
            
            if (elError.isError) {
                
                reject({element:el,desc:elError.desc});

            } else {
                resolve(el);
            }
            
        }.bind(this));
       
        return p;
    }
    
    


    saveField(e) {
        let el = e;
        console.log(`-saveField-`);
        console.log(`that: ${el} ,that.value: ${el.value} , atrybut ${el.getAttribute('name')}`);
        this.fieldValues[el.getAttribute('name')] = el.value;
        this.saveToLocalStorage();

    }
    saveToLocalStorage() {

        window.localStorage.setItem(this.formID, JSON.stringify(this.fieldValues));
        console.log(this.fieldValues);
    }

   


    clearLocalStorage(e) {
        e.preventDefault();
        console.log(`wyslal`);
        window.localStorage.removeItem(this.formID);

    }

}



if ('localStorage' in window) {
    let formToSave1 = new FormSaver(document.querySelector('#form-1'));
  
}
