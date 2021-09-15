function crossMenu() {
    var burguer = document.getElementById("burguer");
    burguer.classList.add("change-burguer-menu");
}
function burguerMenu() {
  var burguer = document.getElementById("burguer");
  burguer.classList.remove("change-burguer-menu");
}
function showNavBar() {
  //hide add more icon
  clearTimeout(navBarTimeOut);
  document.getElementById("navBar-show-more").classList.add("hide"); 
  var btns = document.getElementsByClassName("navBar-Btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].style.display = "inline-block";
    btns[i].classList.add("show-navbar");
    btns[i].classList.remove("hide-navbar");
  }
}
let navBarTimeOut;
function hideNavBar() {
  //unhide add more icon
  var btns = document.getElementsByClassName("navBar-Btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove("show-navbar");
    btns[i].classList.add("hide-navbar");
  } 
 navBarTimeOut = setTimeout(()=>{
    for (var i = 0; i < btns.length; i++) {
      btns[i].style.display = "none";
    }
    document.getElementById("navBar-show-more").classList.remove("hide");

  }, 300)
}
var tableOrder = false;
var tablePizzas = false;
function chooseSortTableOrder() {
  tableOrder = !tableOrder;
  sortTable(tableOrder,"OrderTable");
}
function chooseSortTablePizzas() {
  tablePizzas = !tablePizzas;
  sortTable(tablePizzas,"PizzasTable");
}
function sortTable(isAscending,tableName) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById(tableName);
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      // Check if the two rows should switch place:
      if(isAscending === true)
      {
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      else {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
     
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

var coll = document.getElementsByClassName("article-title");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].nextElementSibling.style.transform = "scaleY(1)";
  coll[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    var parent = this.parentNode;
    if (content.style.transform === "scaleY(1)") {
      content.style.height = "0";
      content.style.transform= "scaleY(0)";
    } else {
      content.style.transform= "scaleY(1)";
      content.style.height = "auto";

    }
  });
}

function showPage(pageNum) {
  var sections = document.getElementsByTagName("section");

  for(var i = 0; i < sections.length; i++) {
    sections[i].classList.add("hide");
  }
  
  document.getElementById(pageNum).classList.remove("hide");
  if(pageNum === 2 )
  {
    createCharts();
  }
  else {
    mostOrderedPizzas.destroy();
    last7DaysPizzas.destroy();
    last7DaysProfits.destroy();
    costPrice.destroy();
  }
}
showPage(1);

function deleteOrder(orderNo,tableName,needsNotification=false) {
  table = document.getElementById(tableName);
  rows = table.rows;
   
    for (i = 1; i < (rows.length); i++) {
      var row = rows[i].getElementsByTagName("TD")[0];
      if(orderNo == row.innerHTML)
      {
       table.deleteRow([i])
      }
    }
    if(needsNotification) {
      //show notification (Deleted!)
      document.getElementById("success").classList.remove("hide")
      document.getElementById("success").classList.add("animation")
    setTimeout(() => {
      document.getElementById("success").classList.remove("animation");
      document.getElementById("success").classList.add("hide")

      
    }, 4000);
    }
}

// Charts

var mostOrderedPizzas;
var last7DaysPizzas;
var last7DaysProfits;
var costPrice;
function createCharts() {
 
  var ctx = document.getElementById('mostOrdered').getContext('2d');
  var ctx1 = document.getElementById('pizzas7days').getContext('2d');
  var ctx2 = document.getElementById('profits7days').getContext('2d');
  var ctx3 = document.getElementById('costprice').getContext('2d');

mostOrderedPizzas = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Cheese', 'Veggie', 'Pepperoni', 'Meat', 'Margherita', 'Buffalo'],
        datasets: [{
            data: [1200, 1900, 300, 500, 200, 300],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Most Ordered Pizzas'
        }
      }
    }
});
last7DaysPizzas = new Chart(ctx1, {
  type: 'bar',
  data: {
      labels: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] ,
      datasets: [{
          label: '# of pizzas Sold',
          data: [48, 32, 180, 58, 100, 152,153],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Pizzas Ordered in the last 7 days'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 300,
      }
    }
  }

});
last7DaysProfits = new Chart(ctx2, {
  type: 'bar',
  data: {
      labels: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] ,
      datasets: [{
          label: 'Money made last 7 days',
          data: [672, 587, 1276, 788, 1365, 1922,1948],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Money made in the last 7 days'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 2000,
      }
    }
  }

});

costPrice = new Chart(ctx3,{
  type:"line",
  data: {
    labels: ['Cheese', 'Veggie', 'Pepperoni', 'Meat', 'Margherita', 'Buffalo'],
    datasets: [{
      label:"Cost",
      data: [3,5,4,4,4,4],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      stepped: 'middle'
    },
    {
      label:"Price",
      data: [28,36,32,32,34,32],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      stepped: 'middle'
    },
    {
      label:"Profit",
      data: [25,31,28,28,30,28],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      stepped: 'middle'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cost Price Relation'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 50,
      },
      y1: {
        min: 0,
        max: 50,
        display:false
      },
      y2: {
        min: 0,
        max: 50,
        display:false

      }
    }
  }
})
}
var isNavOpen = false;
function openNav() {
  document.getElementById("sidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "#111";
  crossMenu()
  isNavOpen = true;
  document.getElementsByClassName("mask")[0].classList.remove("hide");
}

function closeNav() {
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
  burguerMenu()
  isNavOpen = false;
  document.getElementsByClassName("mask")[0].classList.add("hide");


}
function toggleNav() {
  if (isNavOpen) {
    closeNav();
  }
  else {
    openNav();
  }
}
function displayError() {
  document.getElementById("error").classList.remove("hide")
  document.getElementById("error").classList.add("animation")
setTimeout(() => {
  document.getElementById("error").classList.remove("animation");
  document.getElementById("error").classList.add("hide")

  
}, 4000);
}
function addPizza() {
  document.getElementById("addPizzaForm").classList.remove("hide")
}

function dropHandler(ev) {
  console.log('File(s) dropped');

  // Impedir o comportamento padrão (impedir que o arquivo seja aberto)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use a interface DataTransferItemList para acessar o (s) arquivo (s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // Se os itens soltos não forem arquivos, rejeite-os
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        previewFile(file)
      }
    }
  } else {
    // Use a interface DataTransfer para acessar o (s) arquivo (s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  }
}

function dragOverHandler(ev) {
  // Impedir o comportamento padrão (impedir que o arquivo seja aberto)
  ev.preventDefault();
}
function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    let img = document.getElementById("gallery")
    img.src = reader.result;
  }
}
function handleFile(files) {
  files = [...files]
  files.forEach(previewFile)
  
}