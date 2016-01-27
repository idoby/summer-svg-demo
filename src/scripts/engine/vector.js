import _ from 'lodash';

export class Vector {
	constructor(left, top) {
		_.extend(this, {
			left,
			top
		});
	}
	
	add(rhs) {
		return new Vector(this.left + rhs.left, this.top + rhs.top);
	}
	
	sub(rhs) {
		return new Vector(this.left - rhs.left, this.top - rhs.top);
	}
	
	scale(factor) {
	  return new Vector(this.left * factor, this.top * factor);
	}
	
	vectorScale(rhs) {
		return new Vector(this.left * rhs.left, this.top * rhs.top);
	}
}