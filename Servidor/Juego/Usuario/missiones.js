module.exports = class missiones{
	constructor(){
		this.individual = null; //If is a individual task			(Only for the survivor)
		this.communes 	= null; //If everyone can have this task	(Only for the survivor)
		this.sabotajesTareas = null; //The task for "sabotajes" the map (only the impostor can use this)
	}
	//-------------getters--------------
	getIndividual(){
		return this.individual;
	}

	getCommunes(){
		return this.communes;
	}

	getSabotajesTareas(){
		return this.sabotajesTareas;
	}
}