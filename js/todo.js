var fb = new Firebase("https://javahaxxor-todo.firebaseio.com/");
var fb_todos = fb.child("todos");
//fb.remove();

var todos =
        [
            {"todo":"Learn firebase basics", "done":false, "priority":10},
            {"todo":"Learn looping", "done":false, "priority":10},
            {"todo":"Learn looping", "done":false, "priority":10}
        ]
    ;

document.getElementById("left").innerHTML = JSON.stringify(todos);
document.getElementById("right").innerHTML = todos[0];

/*var elem1 = {name:"Learn firebase basics"};
 var elem2 = {name:"Learn looping"};
 fb_todos.push(elem1);
 fb_todos.push(elem2);*/

todos.forEach(function(element) {
    console.log('element:',element);
    //fb_todos.push(element);
});

fb_todos.on("value", function(snapshot) {
    var tmp = snapshot.val();
    console.log("Snapshot" + JSON.stringify(snapshot.val()));
    console.log("KEYS" + Object.keys(tmp));
    for (var key in tmp) {
        console.log("K"+JSON.stringify(tmp[key]));
    }
});

fb_todos.on("child_added", function(data) {
    var name = data.val() ? data.val().todo : "XX";
    addToList(name)
});


function addToList(listElement) {
    var log = document.getElementById("log") ;
    log.innerHTML = log.innerHTML + "&#10;" + "Log: " + listElement;
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(listElement));
    //li.setAttribute("id",listElement.);
    ul.appendChild(li);
}

