function FormSaver(form) {

    this.form = form;
    this.fields = this.form.querySelectorAll('input[name]:not([type="submit"])');
    this.formID = this.form.getAttribute('id');
    this.fieldValues = {};
    this.loadSaveValues();
    this.addSavingToFields();
    this.form.onsubmit = this.clearLocalStorage.bind(this);

}


FormSaver.prototype.clearLocalStorage = function (e) {
    e.preventDefault();
    console.log(`wyslal`);
    window.localStorage.removeItem(this.formID);

};

FormSaver.prototype.loadSaveValues = function () {

    var savedFields = window.localStorage[this.formID];

    if (savedFields) {

        savedFields = JSON.parse(savedFields);
        console.log(savedFields);
    }
    for (var key in savedFields) {

        this.form.querySelector('[name="' + key + '"]').value = savedFields[key];
    }

};


FormSaver.prototype.saveField = function (e) {
    var that = e.target;

    this.fieldValues[that.getAttribute('name')] = that.value;
    this.saveToLocalStorage();

};

FormSaver.prototype.saveToLocalStorage = function () {

    window.localStorage.setItem(this.formID, JSON.stringify(this.fieldValues));
    console.log(this.fieldValues);
};

FormSaver.prototype.addSavingToFields = function () {

    for (var i = 0; i < this.fields.length; i++) {



        this.fields[i].onchange = this.saveField.bind(this);
    }
};

if ('localStorage' in window) {
    let formToSave1 = new FormSaver(document.querySelector('#form-1'));
    let formToSave2 = new FormSaver(document.querySelector('#form-2'));
}
