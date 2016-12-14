// this file is just for good measure. didn't want native-components getting too cluttered.

/**
* This namespace describes strings that are valid inputs to the various native
* components. Some components can only take certain types of resources, i.e.
* {@link n.n-spawner} can only accept `interactables`.
* @namespace resources
* @example <a-entity n-object='architecture/ceiling-2w-2l'></a-entity>
*/

/**
* Generic modular building pieces. All pieces are aligned to one corner, such that
* the piece extends out toward -X and +Z.
* @name architecture
* @enum architecture
* @memberof resources
*
* @prop ceiling-2w-2l
* @prop ceiling-4w-4l
* @prop ceiling-4w-4l
* @prop ceiling-skylight-4w-4l
* @prop ceiling-skylight-corner-2w-2l
* @prop ceiling-skylight-edge-2w
* @prop ceiling-skylight-edge-4w
* @prop ceiling-skylight-filler-4w-4l-2
* @prop ceiling-skylight-filler-4w-4l
* @prop ceiling-slice-concave-2r
* @prop ceiling-slice-concave-4r
* @prop ceiling-slice-convex-2r
* @prop ceiling-slice-convex-4r
* @prop door-4w-4h
* @prop floor-2w-2l
* @prop floor-2w-4l
* @prop floor-4w-2l
* @prop floor-4w-4l
* @prop floor-slice-concave-2r
* @prop floor-slice-concave-4r
* @prop floor-slice-convex-2r
* @prop floor-slice-convex-4r
* @prop railing-2l
* @prop railing-4l
* @prop railing-curve-concave-2r
* @prop wall-2w-4h
* @prop wall-4w-4h
* @prop wall-base-2w
* @prop wall-base-4w
* @prop wall-base-curve-concave-2r
* @prop wall-base-curve-concave-4r
* @prop wall-base-curve-convex-2r
* @prop wall-base-curve-convex-4r
* @prop wall-bulkhead-2w
* @prop wall-bulkhead-4w
* @prop wall-bulkhead-curve-concave-2r
* @prop wall-bulkhead-curve-concave-4r
* @prop wall-bulkhead-curve-convex-2r
* @prop wall-bulkhead-curve-convex-4r
* @prop wall-curve-concave-2r-4h
* @prop wall-curve-concave-4r-4h
* @prop wall-curve-convex-2r-4h
* @prop wall-curve-convex-4r-4h
* @prop wall-curve-window-concave-4r-4h
* @prop wall-curve-window-concave-filler-4r-4h
* @prop wall-curve-window-gap-concave-4r-4h
* @prop wall-curve-window-gap-end-l-concave-4r-4h
* @prop wall-curve-window-gap-end-r-concave-4r-4h
* @prop wall-filler-corner-inner-4h
* @prop wall-filler-corner-outer-4h
* @prop wall-window-4w-4h
* @prop wall-window-filler-2
* @prop wall-window-gap-2w-4h
* @prop wall-window-gap-4w-4h
* @prop wall-window-gap-end-l-2w-4h
* @prop wall-window-gap-end-l-4w-4h
* @prop wall-window-gap-end-r-2w-4h
* @prop wall-window-gap-end-r-4w-4h
*/

/**
* Particle systems and other native effects
* @name effects
* @enum effects
* @memberof resources
*
* @prop explosion - A particle system with a central flash, then debris flying outward.
* This is a non-looping effect.
* @prop fire - An animated fire particle, suitable for a torch.
* @prop fire-trail - Fire that trails the entity through space as it moves. Only is visible while an object is in motion
* @prop fireworks - A compound particle system that shoots up from the entity,
* explodes into colored sparks, then transitions to gold streamers.
* @prop smoke - Billowing smoke particle system.
* @prop sparkler - Emits sparks in all directions
* @prop steam - Small white steam rising upwards
*/

/**
* Objects that can be picked up, thrown, and otherwise interacted with.
* @name interactables
* @enum interactables
* @memberof resources
*
* @prop box
* @prop basketball
* @prop soccerball
* @prop bowling-pin
* @prop gem
*/

/**
* Static models that you can place in your scene.
* @name objects
* @enum objects
* @memberof resources
*
* @prop basketball-net
* @prop target-archery
* @prop gem
*/
