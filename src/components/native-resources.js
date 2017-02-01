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
* @prop architecture/ceiling-2w-2l
* @prop architecture/ceiling-4w-4l
* @prop architecture/ceiling-4w-4l
* @prop architecture/ceiling-skylight-4w-4l
* @prop architecture/ceiling-skylight-corner-2w-2l
* @prop architecture/ceiling-skylight-edge-2w
* @prop architecture/ceiling-skylight-edge-4w
* @prop architecture/ceiling-skylight-filler-4w-4l-2
* @prop architecture/ceiling-skylight-filler-4w-4l
* @prop architecture/ceiling-slice-concave-2r
* @prop architecture/ceiling-slice-concave-4r
* @prop architecture/ceiling-slice-convex-2r
* @prop architecture/ceiling-slice-convex-4r
* @prop architecture/door-4w-4h
* @prop architecture/floor-2w-2l
* @prop architecture/floor-2w-4l
* @prop architecture/floor-4w-2l
* @prop architecture/floor-4w-4l
* @prop architecture/floor-slice-concave-2r
* @prop architecture/floor-slice-concave-4r
* @prop architecture/floor-slice-convex-2r
* @prop architecture/floor-slice-convex-4r
* @prop architecture/railing-2l
* @prop architecture/railing-4l
* @prop architecture/railing-curve-concave-2r
* @prop architecture/wall-2w-4h
* @prop architecture/wall-4w-4h
* @prop architecture/wall-base-2w
* @prop architecture/wall-base-4w
* @prop architecture/wall-base-curve-concave-2r
* @prop architecture/wall-base-curve-concave-4r
* @prop architecture/wall-base-curve-convex-2r
* @prop architecture/wall-base-curve-convex-4r
* @prop architecture/wall-bulkhead-2w
* @prop architecture/wall-bulkhead-4w
* @prop architecture/wall-bulkhead-curve-concave-2r
* @prop architecture/wall-bulkhead-curve-concave-4r
* @prop architecture/wall-bulkhead-curve-convex-2r
* @prop architecture/wall-bulkhead-curve-convex-4r
* @prop architecture/wall-curve-concave-2r-4h
* @prop architecture/wall-curve-concave-4r-4h
* @prop architecture/wall-curve-convex-2r-4h
* @prop architecture/wall-curve-convex-4r-4h
* @prop architecture/wall-curve-window-concave-4r-4h
* @prop architecture/wall-curve-window-concave-filler-4r-4h
* @prop architecture/wall-curve-window-gap-concave-4r-4h
* @prop architecture/wall-curve-window-gap-end-l-concave-4r-4h
* @prop architecture/wall-curve-window-gap-end-r-concave-4r-4h
* @prop architecture/wall-filler-corner-inner-4h
* @prop architecture/wall-filler-corner-outer-4h
* @prop architecture/wall-window-4w-4h
* @prop architecture/wall-window-filler-2
* @prop architecture/wall-window-gap-2w-4h
* @prop architecture/wall-window-gap-4w-4h
* @prop architecture/wall-window-gap-end-l-2w-4h
* @prop architecture/wall-window-gap-end-l-4w-4h
* @prop architecture/wall-window-gap-end-r-2w-4h
* @prop architecture/wall-window-gap-end-r-4w-4h
*/

/**
* Particle systems and other native effects
* @name effects
* @enum effects
* @memberof resources
*
* @prop effects/explosion - A particle system with a central flash, then debris flying outward.
* This is a non-looping effect.
* @prop effects/fire - An animated fire particle, suitable for a torch.
* @prop effects/fire-trail - Fire that trails the entity through space as it moves. Only is visible while an object is in motion
* @prop effects/fireworks - A compound particle system that shoots up from the entity,
* explodes into colored sparks, then transitions to gold streamers.
* @prop effects/smoke - Billowing smoke particle system.
* @prop effects/sparkler - Emits sparks in all directions
* @prop effects/steam - Small white steam rising upwards
*/

/**
* Objects that can be picked up, thrown, and otherwise interacted with.
* @name interactables
* @enum interactables
* @memberof resources
*
* @prop interactables/basketball
* @prop interactables/bowlingball
* @prop interactables/bowling-pin
* @prop interactables/box
* @prop interactables/coin
* @prop interactables/gem
* @prop interactables/ring
* @prop interactables/soccerball
*/

/**
* Static models that you can place in your scene.
* @name objects
* @enum objects
* @memberof resources
*
* @prop objects/basketball-hoop
* @prop objects/coin
* @prop objects/cup
* @prop objects/gem
* @prop objects/hoop
* @prop objects/ring
* @prop objects/target-archery
*/

/**
* A selection of pipes/chutes/etc.
* @name pipes
* @enum pipes
* @memberof resources
*
* @prop pipes/pipe-full-cap-1d
* @prop pipes/pipe-full-cross-1d
* @prop pipes/pipe-full-elbow-1d
* @prop pipes/pipe-full-fork-1d
* @prop pipes/pipe-full-straight-1d-1l
* @prop pipes/pipe-full-straight-1d-2l
* @prop pipes/pipe-full-straight-1d-4l
* @prop pipes/pipe-full-tee-1d
* @prop pipes/pipe-half-cap-1d
* @prop pipes/pipe-half-cross-1d
* @prop pipes/pipe-half-elbow-1d
* @prop pipes/pipe-half-fork-1d
* @prop pipes/pipe-half-straight-1d-1l
* @prop pipes/pipe-half-straight-1d-2l
* @prop pipes/pipe-half-straight-1d-4l
* @prop pipes/pipe-half-tee-1d
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
