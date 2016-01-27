import _ from 'lodash';

export class MouseMoveEventHandler {
	constructor (element, handler) {
		_.extend(this, {element, handler, active: false});
	}
	
	activate() {
		this.active = true;
		this.element.mousemove(this.handler);
	}
	
	deactivate() {
		this.active = false;
		this.element.mousemove();
	}
}