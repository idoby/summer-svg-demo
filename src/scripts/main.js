'use strict';
import {Vector} from './engine/vector';
import {DisplacementLayer} from './engine/displacement-layer';
import {PathTweener} from './engine/path-tweener';
//import {ScrollHeightActivator} from './engine/scroll-height-activator';
import {ScrollHeightTweener} from './engine/scroll-height-tweener';
//import {MouseMoveEventHandler} from './engine/mouse-move-event-handler';

$(() => {
	$('#parallax-demo').load(() => {
		const svgRoot = $('object').contents().find('svg');
		
//		const island = svgRoot.find("#island");
//		const islandBBox = island[0].getBBox();
//		const islandMidpoint = new Vector(islandBBox.x + (islandBBox.width / 2), islandBBox.y + (islandBBox.height / 2));
//		
//		const islandDisplacement = new DisplacementLayer(island, new Vector(1, 1));
//		const islandMouseMover = new ScrollHeightActivator(4111, new MouseMoveEventHandler(island, event => {
//		  if (!event.pageX) {
//		    return;
//		  }
//		  
//		  const mouseVector = new Vector(event.pageX, event.pageY);
//		  const changeVector = islandMidpoint.sub(mouseVector);
//		  islandDisplacement.displaceBy(changeVector);
//		}));
		
		const bigClouds = new DisplacementLayer(svgRoot.find('#big_clouds'), new Vector(1, 0.5));
		const mediumClouds = new DisplacementLayer(svgRoot.find('#clouds_medium'), new Vector(1, 0.2));
		const smallClouds = new DisplacementLayer(svgRoot.find('#small_clouds'), new Vector(1, 0.1));

		const balloonPink = new DisplacementLayer(svgRoot.find('#ballon_pink'), new Vector(1, 0.15));
		const balloonYellow = new DisplacementLayer(svgRoot.find('#ballon_yellow'), new Vector(1, 0.3));
		const balloonBlue = new DisplacementLayer(svgRoot.find('#ballon_blue'), new Vector(1, 0.09));

		const sun = new PathTweener(svgRoot.find('#sun'), svgRoot.find('#sun_path'));
		const sunHeightTweener = new ScrollHeightTweener(sun, 537, 5103);

		const airplane = new PathTweener(svgRoot.find('#airplane'), svgRoot.find('#airplane_path'));
		const airplaneHeightTweener = new ScrollHeightTweener(airplane, 3254, 4111, false);

		const parallaxLayers = [bigClouds, mediumClouds, smallClouds, balloonPink, balloonYellow, balloonBlue];
		const scrollHeightElements = [sunHeightTweener, airplaneHeightTweener];
		let oldScrollVector = new Vector(0, 0);

		window.addEventListener('scroll', () => {
			requestAnimationFrame(() => {
				const scrollTop = window.scrollY;
				const scrollLeft = window.scrollX;
				const scrollVector = new Vector(scrollLeft, scrollTop);
				const changeVector = oldScrollVector.sub(scrollVector);
				oldScrollVector = scrollVector;

				parallaxLayers.forEach(layer => layer.displaceBy(changeVector));
				scrollHeightElements.forEach(tweener => tweener.setCurrentHeight(scrollTop));
			});
		});
	});
});
