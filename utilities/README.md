Utility Documentation
====
There are two types of utilities, bundled utilities and unbundled utilities.  

This folder contains unbundled utilities that are under active development and may change independently of the SDK version number.  

## Bundled Utilities

###CodePen
`altspace.utilities.codePen`  

- `setName(name)`  
  Sets the name to be used by ensureInVR()  

- `ensureInVR()`  
  Will stop code exection and post a message informing the user to open the example in VR  

- `getAuthorId()`  
  Returns the pen author ID, useful for setting the sync authorId  

- `getPenId()`  
  Returns the pen ID, useful for setting the sync instanceId  

- `inTile`  
  If the pen is being executed as a preview in the tile grid view  

- `inVR`  
  If the pen is being executed in AltspaceVR  

###Sync
`altspace.utilities.sync`  

The Sync utility is currently based on Firebase. It provides a quick way to syncronize apps (even when they are running outside of AltspaceVR). During the SDK beta, please consider all data stored with the sync utility to be ephemeral (it may be cleared or clobbered at any time). You do not need a Firebase account to use the Sync utility  

Refer to the (Firebase API documentation)[https://www.firebase.com/docs/web/api/] when working with the sync instance.

- `getInstance`  
  returns a firebase, just as if you had called new Firebase()  

      ```
      var syncInstance = altspace.utilities.sync.getInstance({
      	instanceId: yourInstanceId, // All sync instances with the same instance id will share properties. 
      	authorId: yourAuthorId  // This helps to prevent collisions.
      });
      ```

## Unbundled Utilities

Documentation Coming Soon
