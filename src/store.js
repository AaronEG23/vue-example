import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)


var globals = {
    CR_PHONE_CODE: "+506",
    MX_PHONE_CODE: "+52",
    LENGTH_CR_PHONE_CODE: 8,
    MIN_LENGTH_MX_PHONE_CODE: 9,
    MAX_LENGTH_MX_PHONE_CODE: 11,
    CR_ID_DIGITS: 9
}

var functions = {
    isValidNumber: function(pNumber) {
        let n = parseInt(pNumber);
        var i;
        for (i = 1; 10 <= n; i++) {
            n = Math.trunc(n / 10);
        }
        return (i === pNumber.length) ? true : false;
    },
    validateEmail                    : function (pEmail) {
        try {
            var str = pEmail.split("@");
            if (str[0].length > 0){
                str = str[1].split(".");
                if (str[0].length > 0 && str[1].length > 0){
                    return true;
                }
            }
            return false;
        }
        catch(err) {
            return false;
        }
    },
}

export default new Vuex.Store({
    state: {
        name        : {
            value : "",
            class : {
                'md-invalid': false
            }
        },

        lastName    : "",
            
        gender      : null,
        
        clientid    : null,
        idNumber    : {
            value : "",
            class : {
                'md-invalid': false
            }
        },
        
        bloodid     : null,

        phoneNumbers : [{countryCode:null, phoneNumber:"", id:"selectphonecode0", class:{'md-invalid': false}}],

        email       : {
            value : "",
            class : {
                'md-invalid': false
            }
        },
    },
  
    mutations: {
        addPhoneNumber () {
            let element = {countryCode:null, phoneNumber:"", id:"selectphonecode"+this.state.phoneNumbers.length, class:{'md-invalid': false}}
            this.state.phoneNumbers.push(element);
        },
        verifyPhoneNumber (state, { pIndex }){
            let value = this.state.phoneNumbers[pIndex].phoneNumber;
            let code = this.state.phoneNumbers[pIndex].countryCode;
            if (functions.isValidNumber(value)){
                if (code == globals.CR_PHONE_CODE){
                    this.state.phoneNumbers[pIndex].class['md-invalid'] = 
                        (value.length == globals.LENGTH_CR_PHONE_CODE) ? false : true;
                }
                else if (code == globals.MX_PHONE_CODE){
                    this.state.phoneNumbers[pIndex].class['md-invalid'] = 
                        (value.length >= globals.MIN_LENGTH_MX_PHONE_CODE && value.length <= globals.MAX_LENGTH_MX_PHONE_CODE) ? false : true;
                }
            }
            else{
                this.state.phoneNumbers[pIndex].class['md-invalid'] = true;
            }
        },
        hidePhoneNumberErrors (state, { pIndex }){
            this.state.phoneNumbers[pIndex].class['md-invalid'] = false;
        },
        validateId(){
            let value = this.state.idNumber.value;
            this.state.idNumber.class['md-invalid'] = 
                (value.length == globals.CR_ID_DIGITS) ? false : true;
        },
        hideIdError(){
            this.state.idNumber.class['md-invalid'] = false;
        },
        validateName(){
            let value = this.state.name.value;
            this.state.name.class['md-invalid'] = 
                (value.length > 0) ? false : true;
        },
        hideNameError(){
            this.state.name.class['md-invalid'] = false;
        },
        validateEmail(){
            let value = this.state.email.value;
            this.state.email.class['md-invalid'] = 
                (functions.validateEmail(value)) ? false : true;
        },
        hideEmailError(){
            this.state.email.class['md-invalid'] = false;
        },
        initialiseStore(state) {
            // Check if the ID exists
            if(localStorage.getItem('store')) {
                let store = JSON.parse(localStorage.getItem('store'));
                localStorage.removeItem('store');
                this.replaceState(
                    Object.assign(state, store)
                );
            }
        }
        
    },
  
    actions: {
        save(){
            localStorage.setItem('store', JSON.stringify(this.state));
            let store = JSON.parse(localStorage.getItem('store'));
            console.log(store)
        }

    }
});