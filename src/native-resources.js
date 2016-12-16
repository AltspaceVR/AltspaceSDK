// this file is just for good measure. didn't want native-components getting too cluttered.

/**
* This namespace describes strings that are valid inputs to the various native
* components. Some components can only take certain types of resources, i.e.
* {@link n.n-spawner} can only accept `interactables`.
* @namespace resources
* @example <a-entity n-object='res: architecture/ceiling-2w-2l'></a-entity>
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
* @prop basketball
* @prop bowlingball
* @prop bowling-pin
* @prop box
* @prop coin
* @prop gem
* @prop ring
* @prop soccerball
*/

/**
* Static models that you can place in your scene.
* @name objects
* @enum objects
* @memberof resources
*
* @prop basketball-hoop
* @prop coin
* @prop cup
* @prop gem
* @prop hoop
* @prop ring
* @prop target-archery
*/

/**
* A selection of pipes/chutes/etc.
* @name pipes
* @enum pipes
* @memberof resources
*
* @prop pipe-full-cap-1d
* @prop pipe-full-cross-1d
* @prop pipe-full-elbow-1d
* @prop pipe-full-fork-1d
* @prop pipe-full-straight-1d-1l
* @prop pipe-full-straight-1d-2l
* @prop pipe-full-straight-1d-4l
* @prop pipe-full-tee-1d
* @prop pipe-half-cap-1d
* @prop pipe-half-cross-1d
* @prop pipe-half-elbow-1d
* @prop pipe-half-fork-1d
* @prop pipe-half-straight-1d-1l
* @prop pipe-half-straight-1d-2l
* @prop pipe-half-straight-1d-4l
* @prop pipe-half-tee-1d
*/

/**
* Common UI sounds can be used for a consistent UI experience.
* @name sounds-ui
* @enum sounds-ui
* @memberof resources
*
* @prop ui/select
* @prop ui/toggle
* @prop ui/notify
* @prop ui/error
* @prop ui/complete
* @prop ui/succeed
* @prop ui/over
* @prop ui/join
* @prop ui/click
*/

/**
* Foley sounds are real sounds designed for tangible, touchable objects as they are heard in the real world.
* @name sounds-foley
* @enum sounds-foley
* @memberof resources
*
* @prop foley/metal-scrape
* @prop foley/metal-clack
* @prop foley/metal-rattle
* @prop foley/coin-jingle
* @prop foley/paper-shuffle
* @prop foley/explode
*/

/**
* Effect sounds for a variety of use cases.
* @name sounds-effects
* @enum sounds-effects
* @memberof resources
*
* @prop effects/fanfare-succeed - The "success!" sound from Holograms Against Humanity.
* @prop effects/fanfare-start - The "Game has started!" sound from HaH.
* @prop effects/fanfare-fail
* @prop effects/timer-10s - a 10 second timer that triggers a bell at exactly 10 seconds.
* The bell lasts for 2 seconds. This allows for timer length changes.
* @prop effects/gain-coin
*/
