document.getElementById("formFeedback").addEventListener("submit", function(e) {
e.preventDefault();
    var local = document.getElementById("local").value;
    var mensagem = document.getElementById("feedback").value;
    const nota = document.querySelector('input[name="nota"]:checked')?.value;

    var documento = 
    {
        "local": local,
        "feedback": mensagem,
        "nota" : Number(nota)
    }
            
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json"

    xhr.onreadystatechange = function (){
        if (xhr.readyState == 4){
            if(xhr.status == 200 || xhr.status == 201){
                documento = xhr.response;
                alert("Obrigada pelo seu feedback!💕")
            }else{
                alert("Infelizmente houve um problema. Tente novamente mais tarde!💔")
            }
        }
    }
    xhr.open("POST", "/feedback");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(documento));

    document.getElementById("formFeedback").reset();
});
        
