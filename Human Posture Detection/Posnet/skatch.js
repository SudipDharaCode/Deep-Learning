alert("Hello world") // it give a notification in web page when you open the page

function setup(){
    createCanvas(800,500) // it create canvas in webpage
}

function draw(){
    background(220)  

    stroke(255,0,0)  // it do color of border line of element
    strokeWeight(5) 
    
    point(200,200)
    line(200,200,300,300)
    triangle(100,200,300,400,150,450)
    rect(500,200,100,100)
    fill(0,255,0)
    ellipse(600,300,100,100)
}