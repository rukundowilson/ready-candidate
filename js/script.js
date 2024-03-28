document.addEventListener('DOMContentLoaded',()=>{
    let barsEl=document.querySelector('.hamburg');
    barsEl.onclick=function(){
        let navLinks=document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    }
    var points=0,score=0;
    function question(){
        let response1=document.getElementById('answer1');
        let response2=document.getElementById('answer2');
        let response3=document.getElementById('answer3');
        if(response3.checked){
            points=3;
            return score+points;
        }
        else if(response1.checked||response2.checked){
            return score;
        }
        

    }
    function question2(){
        let response1=document.getElementById('q2-answer1');
        let response2=document.getElementById('q2-answer2');
        if(response2.checked){
            return score+2;
        }else if(response1.checked){
            return score;
        }
    }
    document.getElementById('sbmt-btn').onclick=function(){
        document.getElementById('final-score').textContent="your marks="+(question2()+question());
    }
})