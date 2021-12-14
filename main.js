song = "";
song2 = "";
song_status = "";
song2_status = "";
function preload()
{
	song = loadSound("music.mp3");
    song2 = loadSound("Peter Pan - Groove Delight ! English.mp3")
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 450);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);
song_status = song.isPlaying();
song2_status = song2.isPlaying();
	fill("#FF0000");
	stroke("#FF0000");

	if(scoreLeftWrist > 0.1)
	{
		circle(leftWristX,leftWristY,20);
		song.stop();
		if(song2_status == false){
			song2.play();
			document.getElementById("volume").innerHTML= "Peter Pan - Groove Delight ! English.mp3";
		}
	}

}
if(scoreRightWrist > 0.1)
	{
		circle(rightWristX,rightWristY,20);
		song.stop();
		if(song1_status == false){
			song1.play();
			document.getElementById("volume").innerHTML= "music.mp3";
		}
	}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}
