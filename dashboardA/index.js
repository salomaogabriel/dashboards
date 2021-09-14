function animateBurguerMenu(burguer) {
    burguer.classList.toggle("change-burguer-menu");
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

function sortTable(isAscending) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("OrderTable");
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
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.transform === "scaleY(1)") {
      content.style.transform= "scaleY(0)";
    } else {
      content.style.transform= "scaleY(1)";

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
  }
}
showPage(1);



// Charts
var mostOrderedPizzas;
function createCharts() {
 
  var ctx = document.getElementById('mostOrdered').getContext('2d');

mostOrderedPizzas = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Cheese', 'Veggie', 'Pepperoni', 'Meat', 'Margherita', 'Buffalo'],
        datasets: [{
            label: '# of Votes',
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
    }
});
}
