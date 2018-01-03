// Type definitions for Altspace 2.7.1
// Project: https://altvr.com/
// Definitions by: Shane Harris <https://github.com/shaneharris>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6

/// <reference types="three" />

import {Mesh, Quaternion, Renderer, Scene, Vector3} from "three";

declare namespace Alt {

    interface Global{
        getThreeJSRenderer():Promise<AltRenderer>;
        getThreeJSDebugInfo():Promise<DebugInfo[]>;
        getDocument():Promise<Document>;
        getEnclosure():Promise<Enclosure>;
        getGamepads():Promise<GamePad[]>;
        getThreeJSTrackingSkeleton():Promise<TrackingSkeleton>;
        open(url:string,target:string,options:PopupOptions):Promise<Popup>;
        getSpace():Promise<Space>;
        getUser():Promise<User>;
        inClient:boolean;
        utilities:Utilities;
    }

    interface Utilities{
        Simulation:Simulation;
    }
    interface Simulation{
        new (): Simulation;
        scene:Scene;
        renderer:Renderer;
    }

    interface AltRenderer{
        render(scene:Scene):void;
    }

    interface DebugInfo {
        uuid:string;
        vertexCount:number;
        isVisible:boolean;
        isMaterialVisible:boolean;
        isCulled:boolean;
        position:Vector3;
        quaternion:Quaternion;
    }

    interface Document extends Mesh{
        reset():void;
        inputEnabled:boolean;
    }

    interface Enclosure{
        innerWidth:number;
        innerHeight:number;
        innerDepth:number;
        pixelsPerMeter:number;
        hasFocus:boolean;
        fullspace:boolean;
        requestFullspace():Promise<void>;
        exitFullspace():Promise<void>;
    }

    interface GamePad{
        connected:boolean;
        mapping:string;
        hand:string;
        buttons:GamePadButton[];
        position:Vector3;
        rotation:Quaternion;
        preventDefault(axes?:boolean[],buttons?:boolean[]):void;

    }

    interface GamePadButton{
        pressed:boolean;
        touched:boolean;
        nearlyTouched:boolean;
        value:boolean;
    }

    interface PopupOptions{
        icon:string;
        hidden:boolean;
    }

    interface Popup{
        show():void;
        hide():void;
    }

    interface TrackingSkeleton{
        getJoint(bodyPart:string,side:string,subIndex?:number):Promise<TrackingJoint>;
    }

    interface TrackingJoint{
        confidence:number;
        name:string;
    }

    interface Space{
        sid:string;
        name:string;
        templateSid:string;
    }

    interface User{
        userId:string;
        displayName:string;
        isModerator:boolean;
    }

    // enum ViveButtons{
    //     Trigger = 0,
    //     Grip = 1,
    //     Touchpad = 2,
    //     TouchpadUp = 4,
    //     TouchpadRight = 5,
    //     TouchpadDown = 6,
    //     TouchpadLeft = 7
    // }
    //
    // enum ViveAxis{
    //     TouchpadX = 0,
    //     TouchpadY = 1
    // }
    //
    // enum TouchButtons{
    //     IndexTrigger = 0,
    //     HandTrigger = 1,
    //     Thumbstick = 2,
    //     ButtonOneAX = 3,
    //     ButtonTwoBY = 4,
    //     Thumbrest = 5
    // }
    //
    // enum TouchAxis{
    //     ThumbstickX = 0,
    //     ThumbstickY = 1
    // }
}