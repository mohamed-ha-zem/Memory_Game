// صفحة البدايه
let span = document.querySelector(".button span")
let span2 = document.querySelector(".name span")
// لما نضغط علي زر البدايه هيطلب مني اسمي ولو مكتبتش اسم هيعمله غير معرف
span.addEventListener("click" , () => {
    let name = prompt("What is Your Name")
    if(name == "" || name == null || name == " "){
        span2.innerHTML = "Unknown"
    }else{
        span2.innerHTML = name
    }
    document.querySelector(".button").remove() // حذف زر البدايه
})
// صفحة البدايه

let duration = 1000; 
let counterBox = document.querySelector(".counter-boxs")
let boxs = Array.from(counterBox.children)
let indexs = [...Array(boxs.length).keys()] // ==========================> بيجيب الاندكس بتاع كل بوكس [0 , 1 , 2 , 3 , ... , 19]

mix(indexs) // هنا  اللرقام اللي في المصفوفه اتخلطت

boxs.forEach((box , index) => {
    // اللي بيخلي ال بطاقات عشوائيه
    box.style.order = indexs[index]
    // لما بضغط علي اي بطاقة بتتقلب
    box.addEventListener("click" , () => {
        flip(box) // قلب البطاقات 
    })
})

window.onload = function() {
    let result = document.getElementById("result");
    // استرجاع البيانات المخزنة من sessionStorage
    let results = JSON.parse(sessionStorage.getItem("results")) || []
    // إذا كانت هناك بيانات مخزنة، يتم عرضها
    updateResults(results , result)
    function updateResults(arreyresults , resultElement){
        resultElement.innerHTML = ''
        arreyresults.forEach(result1 => {
            resultElement.innerHTML += `<p>${result1.user}: ${result1.wrong}</p>`
        })
    }

};
// كود flip لتحديث النتيجة عند انتهاء الجولة
function flip(select){
    select.classList.add("is-flibbed") // بتحطه الكلاس ده علشان يدور 180 درجه

    let allFlippedBlocks = boxs.filter(e => e.classList.contains("is-flibbed")) // بتعدي علي كل البطاقات وبتبقي اللي مدور 180 درجه

    if(allFlippedBlocks.length === 2){ // لو البطاقات المدوره 180 درجه كانو 2 
        stopClick() // امنع الضغط علي اي بطاقة تانيه
        same(allFlippedBlocks[0] , allFlippedBlocks[1]) // بنشوف البطاقتين متشابهين ولا لا
    }
    setTimeout(()=> {
        if(document.getElementsByTagName("body")[0].children[3] !== undefined){
            let result = document.getElementById("result")
            let user = document.getElementById("user").innerHTML
            let wrong = document.getElementById("numper").innerHTML
            let results = JSON.parse(sessionStorage.getItem("results")) || []
            results.push({"user": user , "wrong": wrong})
            sessionStorage.setItem("results" , JSON.stringify(results))
            updateResults(results , result)
            result.innerHTML += `<p>${sessionStorage.getItem("user")}: ${sessionStorage.getItem("wrong")}</p>`
        }else{
            console.log("wrong")
        }
    } , 1100)
}
function stopClick(){
    counterBox.classList.add("no-clicking") // بتوقف الضغط علي اي بطاقه تانيه
    // اول ما يعدي ثانيه ينفع يضغط علي اي بطاقه عادي
    setTimeout(() => {
        counterBox.classList.remove("no-clicking")
    } , duration) 
}
//  فانكشن لخلط الارقام الموجوده في اي مصفوفه بطريقه عشوائيه
function mix(arrey){
    let current = arrey.length // 20
    // لازم طول المصفوفه يكون اكبر من الصفر
    while(current > 0){
        let random = Math.floor(Math.random() * current) // 17 بنجيب اي رقم عشوائي من المصفوفه
        current-- // بنقص اخر رقم في المصفوفه
        let temp = arrey[current] // temp حفظ العنصر الحالي في متغير مؤقت 
        arrey[current] = arrey[random] // وضع العنصر العشوائي في مكان العنصر الحالي
        arrey[random] = temp // اعادة العنصر اللي في كان في مكان العنصر الحالي (كرانت) الي مكان العنصر العشوائي    
    }
return arrey // بنرجع المصفوفه
}
// فانكشن بتشوف هل البطاقتين متشابهين ولا لا 
function same(one , two){
    let wrong = document.getElementById("numper") // مكان الاخطاء
    if (one.dataset.technology === two.dataset.technology) { // لو البطاقتين متشابهين
        setTimeout(() => {
            one.classList.remove("is-flibbed"); // هيلفو 180 درجه تاني فبالتالي هيكونو زي ما كانو في الاول
            two.classList.remove("is-flibbed");
            one.classList.add("moved"); // هنخفيهم
            two.classList.add("moved");
            // التحقق من الفوز
            if (document.querySelectorAll(".moved").length === boxs.length) {
                let div = document.createElement("div");
                let textDiv = document.createTextNode(`Congratulations, You Won! The Wrong Count is ${wrong.innerHTML} wrong(s).`);
                div.appendChild(textDiv);
                div.classList.add("win");
                document.body.appendChild(div);
            }
        }, duration);
    }else{ // لو مش متشابهين
        wrong.innerHTML = parseInt(wrong.innerHTML) + 1
        setTimeout(() => {
            one.classList.remove("is-flibbed") // هيلفو 180 درجه تاني فبالتالي هيكونو زي ما كانو في الاول
            two.classList.remove("is-flibbed")
        } , duration);
        if(parseInt(wrong.innerHTML) >= 25){ // لو كان عدد الاخطاء اكتر من او يساوي 25  // التحقق من الخساره
            setTimeout(() => {
                let div = document.createElement("div")
                let textDiv = document.createTextNode(`Sorry, The Wrong is ${wrong.innerHTML} wrong`)
                div.appendChild(textDiv)
                div.classList.add("lose")
                document.body.appendChild(div)
                counterBox.classList.add("no-clicking")
            }, duration);
        }
    }
}