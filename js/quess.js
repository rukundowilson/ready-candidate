document.addEventListener("DOMContentLoaded",()=>{
    // grobal vars
    let displayAttempts=document.querySelector(".attempts");
    let DisplayCounter=document.querySelector(".counter");
    let Max_range=20
    let totalAttempts;
    let hidden;
    let maxTime=60;
    let sendmessage=document.getElementById("progress");
    let youTyped=document.getElementById("you-typed");
    //generated a random index
    function random_index(){
        let secret_number=Math.floor(Math.random()*Max_range+1)
        totalAttempts=Math.floor(Max_range/2+Max_range/5);
        hidden=secret_number;
    }
    random_index()
    function play(userNum){
        console.log(hidden)
        console.log(userNum)
        progress(hidden,userNum);
    }
    function progress(hidden,player){
        youTyped.innerHTML=player
        if (player===hidden-1 || player===hidden+1){
            totalAttempts--;
            console.log("too close");
            sendmessage.innerHTML="Too Close"
        }
        else if (player>hidden+hidden/3 || player<hidden-hidden/3){
            totalAttempts--;
            if(player<hidden+hidden/3 ){
                console.log("too low and far")
                sendmessage.textContent="too Low And Too Far"
            }
            else if (player>hidden-hidden/3){
                console.log("too High and to far");
                sendmessage.innerHTML="too High and too Far"
            }

        }
        else if (hidden===player){
            console.log("correct")
            sendmessage.textContent="Your guess Was correct";
        }
        else{
            console.log("close but not")
            sendmessage.innerHTML=`Close But Not`
        }

        console.log("left Attempts",totalAttempts);
        displayAttempts.innerHTML=`${totalAttempts}`
        
    }
    // timinng with count down
    function countDown(){
        if (maxTime>0){
            maxTime--;
            DisplayCounter.innerHTML=`${maxTime}S`;
        }

    }
    setInterval(countDown,1000)
    // form handling
    function handleForm(){
        // if ((document.getElementById("user-guess").value).length<1){
        //     document.getElementById('sbmt').disabled=true;
        // }
        // else if ((document.getElementById("user-guess").value).length>1){
        //     document.getElementById('sbmt').disabled=false;
        // }
        document.getElementById("fill-number").onsubmit=function(){
            let userNum=Number(document.getElementById("user-guess").value);
            play(userNum);
            userNum=Number(document.getElementById("user-guess").value="")
            return false;
        }
    }
    handleForm()
    // random_index(play)
})