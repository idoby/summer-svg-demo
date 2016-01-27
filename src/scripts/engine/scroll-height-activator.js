import _ from 'lodash';

export class ScrollHeightActivator {
	constructor (height, tweener) {
		_.extend(this, {height, tweener});
	}
	
	setCurrentHeight(currentHeight) {
		if (currentHeight >= this.height && !this.tweener.active) {
			this.tweener.activate();
		} else if (currentHeight < this.height && this.tweener.active) {
			this.tweener.deactivate();
		}
	}
}