let cap;
let posenet;
let singlePose;
let noseX,noseY;



function setup() {

    createCanvas(800,500)

    cap = createCapture(VIDEO)
    cap.hide()


    posenet = ml5.poseNet(cap,modelLoaded)
    posenet.on('pose',receivedPoses)

}

function modelLoaded() {

    console.log('model has loaded')
}

function receivedPoses(poses) {

    console.log(poses)

    if(poses.length > 0){
        
        singlePose = poses[0].pose
        skeleton = poses[0].skeleton
    }
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


function draw(){
    
    r = getRandomArbitrary(0, 255);
    g = getRandomArbitrary(0, 255);
    b = getRandomArbitrary(0, 255);

    image(cap,0,0)
    fill(r,g,b)

    if(singlePose){

        for(let i=0; i<singlePose.keypoints.length; i++){

            ellipse(singlePose.keypoints[i].position.x,singlePose.keypoints[i].position.y,20)
    }


        stroke(r,g,b)
        for(let j=0; j<skeleton.length; j++){

            line(skeleton[j][0].position.x,skeleton[j][0].position.y,skeleton[j][1].position.x,skeleton[j][1].position.y)
        }
}

}