import _ from 'lodash';
import {Vector} from './vector';

export class PathTweener {
	constructor (element, path) {
		let pathElem = path[0];
		let pathStartVector = this.pointToVector(pathElem.getPointAtLength(0));
		
		_.extend(this, {
			element,
			path: pathElem,
			pathLength: pathElem.getTotalLength(),
			pathStartVector
		});
	}
	
	pointToVector(point) {
		return new Vector(point.x, point.y);
	}
	
	update (percentage) {
		let distance = percentage * this.pathLength;
		let pathDestVector = this.pointToVector(this.path.getPointAtLength(distance)).sub(this.pathStartVector);
		this.element.attr('transform', `translate (${pathDestVector.left} ${pathDestVector.top})`);
	}
}