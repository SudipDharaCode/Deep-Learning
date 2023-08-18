let cap;
let posenet;
let multiplePose;
let poses = [];




function setup() {

    createCanvas(1500,1500)

    cap = createCapture(VIDEO)
    cap.hide()


    posenet = ml5.poseNet(cap,modelLoaded)
    posenet.on('pose',receivedPoses)

}

function modelLoaded() {

    console.log('model has loaded')
}

function receivedPoses(newposes) {

    console.log(newposes);

    poses = newposes;

    
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


function draw(){
    

    background(255);
    image(cap,0,0);

    if(poses.length > 0){
        for(let k=0; k<poses.length; k++){
            multiplePose = poses[k].pose
            skeleton = poses[k].skeleton

            r = getRandomArbitrary(0, 255);
            g = getRandomArbitrary(0, 255);
            b = getRandomArbitrary(0, 255);

            fill(r,g,b)

            if(multiplePose){

                for(let i=0; i<multiplePose.keypoints.length; i++){

                    ellipse(multiplePose.keypoints[i].position.x,multiplePose.keypoints[i].position.y,10)
                }

                strokeWeight(10)
                for(let j=0; j<skeleton.length; j++){

                    line(skeleton[j][0].position.x,skeleton[j][0].position.y,skeleton[j][1].position.x,skeleton[j][1].position.y)
                }    
            }   
        }
    }

}