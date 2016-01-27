import _ from 'lodash';
import {Vector} from './vector';

export class DisplacementLayer {
	constructor(element, attenuationVector = new Vector(1, 1)) {
		_.extend(this, {
			element,
			attenuationVector,
			displacement: new Vector(0, 0)
		});
	}
	
	displaceBy(changeVector) {
		this.displacement = changeVector.vectorScale(this.attenuationVector).add(this.displacement);
		this.element.attr('transform', `translate(${this.displacement.left} ${this.displacement.top})`);
		
		return this;
	}
}