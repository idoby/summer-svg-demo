import _ from 'lodash';

export class ScrollHeightTweener {
	constructor(tweener, activateAt, deactivateAt, reverse = false) {
	_.extend(this, {
		tweener,
		reverse,
		activateAt,
		deactivateAt,
		tweenLength: deactivateAt - activateAt
	});
}
	
	setCurrentHeight(currentHeight) {
		let percentage = 0;
		
		if (currentHeight < this.activateAt) {
			percentage = 0;
		} else if (currentHeight >= this.activateAt && currentHeight < this.deactivateAt) {
			percentage = (currentHeight - this.activateAt) / this.tweenLength;
		} else if (currentHeight >= this.deactivateAt) {
			percentage = 1;
		}
		
		if (this.reverse) {
			percentage = 1 - percentage;
		}
		
		this.update(percentage);
	}
	
	update (percentage) {
		this.tweener.update(percentage);
	}
}