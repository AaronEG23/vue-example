<template>
	<div class="margin-app">
	  	<md-card>
			<md-card-content>
				<p class="p-margin">Datos Personales</p>
				<div class="md-layout" align="center">
					<div class="md-layout-item md-size-15 separed-item">
			            <md-avatar class="md-avatar-icon md-large">
			                <md-icon>account_circle</md-icon>
			            </md-avatar>
					</div>	
					<div class="md-layout-item separed-item">
						<md-field :class="name.class">
							<label>Nombre*</label>
							<md-input v-on:blur="validateName()" v-on:focus="hideNameError()" v-model="name.value" ></md-input>
							<span class="md-error">Requerido</span>
						</md-field>
					</div>
					<div class="md-layout-item separed-item">
						<md-field>
							<label>Apellidos</label>
							<md-input v-model="lastName" v-on:blur="save" v-on:focus="save"></md-input>
						</md-field>
					</div>
			  	</div>
			  	<div class="md-layout" align="center" v-on:click="save">
					<div class="md-layout-item md-size-15 separed-item"></div>
				    <md-radio v-model="gender" value="male">Hombre</md-radio>
				    <md-radio v-model="gender" value="female">Mujer</md-radio>
				</div>
				<div class="md-layout" align="center">
					<div class="md-layout-item separed-item">
						<md-field>
							<label for="clientid">Tipo de identificación</label>
							<md-select v-model="clientid" name="clientid" id="clientid" md-dense v-on:blur="save()" v-on:focus="save()">
								<md-option value="id">Cédula</md-option>
							</md-select>
						</md-field>
					</div>
					<div class="md-layout-item separed-item">
						<md-field :class="idNumber.class">
							<label>Número de identificación</label>
							<md-input 	v-model="idNumber.value" 
										:disabled="!clientid" 
										v-on:blur="validateId()"
										v-on:focus="hideIdError()"
										type="number">
									</md-input>
							<span class="md-error">Número de identificación inválido</span>
						</md-field>
					</div>
			  	</div>
				
				<p class="p-margin" >Tipo de sangre</p>
				<div class="md-layout" align="center">
					<div class="md-layout-item md-size-100" v-on:click="save">
					    <md-radio v-model="bloodid" value="O+">O+</md-radio>
					    <md-radio v-model="bloodid" value="O-">O-</md-radio>
					    <md-radio v-model="bloodid" value="A+">A+</md-radio>
					    <md-radio v-model="bloodid" value="A-">A-</md-radio>
					    <md-radio v-model="bloodid" value="B+">B+</md-radio>
					    <md-radio v-model="bloodid" value="B-">B-</md-radio>
					    <md-radio v-model="bloodid" value="AB+">AB+</md-radio>
					    <md-radio v-model="bloodid" value="AB-">AB-</md-radio>
					    <md-radio v-model="bloodid" value="uknown">Desconocido</md-radio>
					</div>
				</div>

				<p class="p-margin">Datos de Contacto</p>
				<div class="md-layout" align="left">
					<div class="md-layout-item md-size-50">
						<div class="md-layout" align="center" v-for="(item, index) in phoneNumbers">
							<div class="md-layout-item md-size-35">
								<md-field>
						          <label :for="item.id">Código País</label>
						          <md-select v-on:blur="validatePhoneText(index)" v-on:focus="validatePhoneText(index)" v-model="item.countryCode" :name="item.id" :id="item.id">
						            <md-option value="+506">+506 (CR)</md-option>
						            <md-option value="+52">+52 (MX)</md-option>
						          </md-select>
						        </md-field>
							</div>
							<div class="md-layout-item md-size-60 separed-item-left">
								<md-field :class="item.class">
									<label>Teléfono</label>
									<md-input 
										v-model="item.phoneNumber" 
										:disabled="!item.countryCode" 
										v-on:blur="validatePhone(index)"
										v-on:focus="hideErrors(index)"
										type="number">
									</md-input>
									<span class="md-error">Número inválido</span>
								</md-field>
							</div>
						</div>
						<md-button class="md-primary" v-on:click="addPhone">AGREGAR OTRO TELÉFONO</md-button>
						<a href=""></a>
					</div>

					<div class="md-layout-item md-size-50">
						<md-field :class="email.class">
							<label>Correo electrónico</label>
							<md-input v-on:blur="validateEmail()" v-on:focus="hideEmailError()" v-model="email.value"></md-input>
							<span class="md-error">Correo electrónico inválido</span>
						</md-field>
					</div>
				</div>

	    	</md-card-content>
		</md-card>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'app',
		computed: {
			name: {
		    	get: function () {
		    		return this.$store.state.name;
		    	},
		    	set: function (newValue) {
		    		this.$store.state.name = newValue;
		    	}
	 	 	},
	 	 	lastName: {
		    	get: function () {
		    		return this.$store.state.lastName;
		    	},
		    	set: function (newValue) {
		    		this.$store.state.lastName = newValue;
		    	}
	 	 	},
	 	 	gender: {
		    	get: function () {
		    		return this.$store.state.gender;
		    	},
		    	set: function (newValue) {
		    		this.$store.state.gender = newValue;
		    	}
	 	 	},
	 	 	clientid: {
		    	get: function () {
		    		return this.$store.state.clientid;
		    	},
		    	set: function (newValue) {
		    		this.$store.state.clientid = newValue;
		    	}
	 	 	},
	 	 	idNumber: {
		    	get: function () {
		    		return this.$store.state.idNumber;
		    	},
		    	set: function (newValue) {
		    		this.$store.state.idNumber = newValue;
		    	}
	 	 	},
	 	 	bloodid: {
		    	get: function () {
		    		return this.$store.state.bloodid;
		    	},
		    	set: function (newValue) {
		    		this.$store.state.bloodid = newValue;
		    	}
	 	 	},
	 	 	contactid: {
		    	get: function () {
		    		return this.$store.state.contactid;
		    	},
		    	set: function (newValue) {
		    		this.$store.state.contactid = newValue;
		    	}
	 	 	},
	 	 	phoneNumbers: {
		    	get: function () {
		    		return this.$store.state.phoneNumbers;
		    	},
		    	set: function (newValue) {
		    		this.$store.state.phoneNumbers = newValue;
		    	}
	 	 	},
	 	 	email: {
		    	get: function () {
		    		return this.$store.state.email;
		    	},
		    	set: function (newValue) {
		    		this.$store.state.email = newValue;
		    	}
	 	 	},

		},

		methods: {
		    addPhone() {
		      	this.$store.commit('addPhoneNumber');
		      	this.$store.dispatch('save');
		    },
		    validatePhone(pIndex){
		      	this.$store.commit('verifyPhoneNumber', {pIndex});
		      	this.$store.dispatch('save');
		    },
		    validatePhoneText(pIndex){
		    	if (this.$store.state.phoneNumbers[pIndex].phoneNumber.length>0){
		      		this.$store.commit('verifyPhoneNumber', {pIndex});
		      	}
		      	this.$store.dispatch('save');
		    },
		    hideErrors(pIndex){
		      	this.$store.commit('hidePhoneNumberErrors', {pIndex});
		      	this.$store.dispatch('save');
		    },
		    validateId(){
		      	this.$store.commit('validateId');
		      	this.$store.dispatch('save');
		    },
		    hideIdError(pIndex){
		      	this.$store.commit('hideIdError');
		      	this.$store.dispatch('save');
		    },
		    validateName(){
		      	this.$store.commit('validateName');
		      	this.$store.dispatch('save');
		    },
		    hideNameError(pIndex){
		      	this.$store.commit('hideNameError');
		      	this.$store.dispatch('save');
		    },
		    validateEmail(){
		      	this.$store.commit('validateEmail');
		      	this.$store.dispatch('save');
		    },
		    hideEmailError(pIndex){
		      	this.$store.commit('hideEmailError');
		      	this.$store.dispatch('save');
		    },
		    save(){
		      	this.$store.dispatch('save');
		    },
		}
	}
</script>

<style>
	.separed-item {
		margin-left: 10px;
		margin-right: 10px;
	}

	.separed-item-left {
		margin-left: 10px;
	}

	.separed-item-right {
		margin-right: 10px;
	}

	.margin-app {
		margin: 5% 10% 20px 10%; 
  	}
  	.p-margin {
  		margin-top: 0px;
  		font-style: 34px;
	}
  	
  	h1,h2,h3,h4,h5,h6,p  {
  		font-family: Verdana, Geneva, sans-serif;
  	}


</style>