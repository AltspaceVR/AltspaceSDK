import {Alt} from "../@types-altspace/index.d";
import Global = Alt.Global;
import User = Alt.User;
import Space = Alt.Space;
import Enclosure = Alt.Enclosure;
import TrackingSkeleton = Alt.TrackingSkeleton;
import TrackingJoint = Alt.TrackingJoint;

declare var altspace:Global;

export class Main{
    user:User;
    space:Space;
    enclosure:Enclosure;
    skeleton:TrackingSkeleton;
    joint:TrackingJoint;
    constructor(){
        if(altspace.inClient){
            this.getUser()
                .then(()=>this.getSpace())
                .then(()=>this.getEnclosure())
                .then(()=>{
                    console.log(this.user,this.space,this.enclosure);
                })
                .then(()=>this.getTrackingSkeleton())
                .then(()=>{
                    console.log(this.skeleton,this.joint);
                });
        }
    }

    getUser(){
        return altspace.getUser()
            .then(user=>this.user = user);
    }

    getSpace(){
        return altspace.getSpace()
            .then(space=>this.space = space);
    }

    getEnclosure(){
        return altspace.getEnclosure()
            .then(enclosure=>this.enclosure = enclosure);
    }

    getTrackingSkeleton(){
        return altspace.getThreeJSTrackingSkeleton()
            .then(skeleton=>this.skeleton = skeleton)
            .then(()=>this.skeleton.getJoint('hand','left'))
            .then(joint=>this.joint = joint);
    }
}
new Main();