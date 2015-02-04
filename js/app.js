var fb = new Firebase("https://javahaxxor-todo.firebaseio.com/");
var fb_todos = fb.child("todos");
//fb.remove();

var todos =
        [
            {"todo": "Learn firebase basics", "done": false, "priority": 10},
            {"todo": "Learn looping", "done": false, "priority": 10},
            {"todo": "Learn looping", "done": false, "priority": 10}
        ];

document.getElementById("left").innerHTML = JSON.stringify(todos);
document.getElementById("right").innerHTML = todos[0];

/*var elem1 = {name:"Learn firebase basics"};
 var elem2 = {name:"Learn looping"};
 fb_todos.push(elem1);
 fb_todos.push(elem2);*/

todos.forEach(function (element) {
    console.log('element:', element);
    //fb_todos.push(element);
});

fb_todos.on("value", function (snapshot) {
    var tmp = snapshot.val();
    //console.log("Snapshot" + JSON.stringify(snapshot.val()));
    //console.log("KEYS" + Object.keys(tmp));
    var key;
    for (key in tmp) {
        console.log("K" + JSON.stringify(tmp[key]));
    }
});

fb_todos.on("child_added", function (data) {
    var todoObj = data.val() ? data.val() : "XX" ;
    var key = data.key();
    addToList(todoObj, key)
});

//fb_todos.orderByChild("priority").limitToLast(10).on("child_added", function (data) {
//    var todoObj = data.val() ? data.val() : "XX" ;
//    addToList(todoObj)
//});

fb_todos.on("child_changed", function(data) {
    var todoObj = data.val();
    console.log(todoObj + " changed");
});

fb_todos.on("child_removed", function(data) {
    var deletedTodo = data.val();
    removeElement(deletedTodo.key());
    console.log("The blog post titled '" + deletedTodo.title + "' has been deleted");
});

function addToList(todoObj, key) {
    var log = document.getElementById("log") ;
    log.innerHTML = log.innerHTML + "&#10;" + "Log: " + todoObj.todo;
    var ul = document.getElementById("list");
    var input = document.createElement("input");
    input.id = key;
    input.type = "checkbox";
    input.value = todoObj.todo;
    var checked = todoObj.done ? true : false;
    if (checked) {
        input.setAttribute("checked", "checked");
    }

    input.onclick = function () {
        var todoRef = fb_todos.child(key);

        if (!checked) {
            todoObj.done = true;
        } else {
            todoObj.done = false;
        }
        todoRef.update(todoObj, onComplete);
    }

    //input.appendChild(document.createTextNode(listElement));
    //li.setAttribute("id",listElement.);
    ul.appendChild(input);
    if (checked) {
        var strike = document.createElement("s");
        strike.appendChild(document.createTextNode(todoObj.todo));
        ul.appendChild(strike);
    } else {
        ul.appendChild(document.createTextNode(todoObj.todo));
    }

    ul.appendChild(document.createElement("br"));
};

function addTodo() {
    var text = document.getElementById("xxxx").value;

    //alternative object creation
    var mytodo = Object.create(ToDo, {
        todo: { writable: true, configurable: true, enumerable:true, value: text },
        done: { configurable: false, enumerable:true,  writable: true, configurable: true, enumerable:true, value: false },
        priority: {writable: true, configurable: true, enumerable:true,  value: 10 }
    });
    //var elem2 = Object.create(ToDo);
    //console.log("STRINGIFIED: " + JSON.stringify(elem));
    //console.log("STRINGIFIED: " + JSON.stringify(elem.prototype));
    var ref = fb_todos.push(mytodo);
};

var onComplete = function(error) {
    if (error) {
        console.log('Synchronization failed');
    } else {
        console.log('Synchronization succeeded');
    }
    //console.log(input)
};

function removeElement(elemID) {
    var elem = document.getElementById(elemID);
    if (elem.parentNode) {
        elem.parentNode.removeChild(elem);
    }
};
//lägg till id-s, från .ref() ?
//skapa updatelist