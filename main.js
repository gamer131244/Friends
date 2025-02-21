var searchText = document.querySelector(".content .search-input input");
var searchBtn = document.querySelector(".btn-wrapper button");
var label = document.querySelector(".content .search-input label");
var loader = document.querySelector(".loader div");
var resultForm = document.querySelector(".result-form");
var formInput = document.getElementById("form-input");
var linkTitles = document.querySelector(".link-titles");
var founds = document.getElementById("founds");

const GetData = async () => {
  var data = await fetch("https://web-hosting-82d22.web.app/users.json").catch(e => {
    document.querySelector(".responsed-failed-wrapper").style.display = "block";
  });
  var response = await data.json();
  response.forEach((data) => {
    var parent = document.createElement("div");
    var liSuggTitle = document.createElement("li");
    var SuggTitle = document.createTextNode(data.Title);
    liSuggTitle.appendChild(SuggTitle);
    document.querySelector(".suggestions-content ul").appendChild(liSuggTitle);
    
    var liSuggPub = document.createElement("li");
    var SuggPub = document.createTextNode(data.Publisher);
    liSuggPub.appendChild(SuggPub);
    document.querySelector(".suggestions-content ul").appendChild(liSuggPub);
    
    
    
    parent.className = "link-main";
    
    let result = '';
    var length = 5;
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    parent.id = result;
    var codeBox = `                  <div class="title-link">
                    <ul>
                      <li><a href="${data.Link}">${data.Title}</a></li>
                    </ul>
                  </div>
                  <div class="link-des">
                    <ul>
                      <li>${data.Description}</li>
                    </ul>
                  </div>
                  <div class="publisher-info">
                    <div class="img-publisher">
                      <img src="${data.PublisherAvatar}" alt="remove" />
                    </div>
                    <div class="name-publisher">
                      <span>${data.Publisher}</span>
                    </div>
                  </div>
                  <div class="img-wrapper">
                    <div class="img-class">
                      <img src="${data.SiteImg}" />
                    </div>
                  </div>`;
    var codeSet = document.createTextNode(codeBox);
    parent.innerHTML = codeSet.wholeText;
    document.querySelector(".link-titles").appendChild(parent);
    
    var script = document.createElement("script");
    var scriptSet = document.createTextNode(`
  
  document.querySelectorAll(".link-titles .link-main").forEach((links)=>{
  var img = document.querySelectorAll("#"+links.id +" img");
  
  img.forEach((showImg)=>{
  

   
    if (showImg){
      //showImg.style.opacity = "0";
    } else {
      showImg.style.opacity = "1";
    }
    showImg.onload = function(){
     this.style.opacity = "1";
    }
   showImg.onerror = function(){
   var divUnset = document.createElement("div");
   var label = document.createTextNode("?");
   divUnset.appendChild(label);
   showImg.replaceWith(divUnset);
   
   }
   
   
  });
  
  
});


  
  `);
    
    script.appendChild(scriptSet);
    var desSugg = data.Description;
    document.body.appendChild(script);
  });
}


searchText.addEventListener("focus", () => {
  label.style.marginTop = "-30px"
  label.style.marginLeft = "10px";
});

searchText.addEventListener("blur", () => {
  var prevText = localStorage.getItem("prevText");
  if (searchText.value !== "") {
    if (prevText !== null) {
      if (searchText.value === prevText) {
        
      }
    }
  } else {
    label.style.marginTop = "0px";
    label.style.marginLeft = "0px";
  }
});

var found = [];
var unfound = 0;

searchBtn.addEventListener("click", () => {
  document.querySelector(".suggestions-box-wrapper").style.display = "none";
  formInput.innerText = searchText.value;
  searchText.blur();
  setTimeout(() => {
    if (searchText.value !== "") {
      sessionStorage.setItem("prevText", searchText.value);
      document.querySelector(".loader-class-setup").style.display = "block";
      setTimeout(() => {
        loader.style.width = "10%";
      }, 500);
      setTimeout(() => {
        if (navigator.onLine) {
          loader.style.width = "85%";
          document.querySelectorAll(".link-titles .link-main").forEach((data) => {
            var filterData = data.textContent.toUpperCase().replace("\?", "");
            filterData = filterData.replace("\?", "");
            var search = searchText.value.toUpperCase();
            data.style.display = filterData.includes(search) ? "block" : "none";
            resultForm.style.display = "block";
            loader.style.width = "100%";
            setTimeout(() => {
              document.querySelector(".loader-class-setup").style.display = "none";
              loader.style.width = "0%";
              
            }, 1500);
          });
        } else {
          document.querySelector(".responsed-failed-wrapper").style.display = "block";
          document.querySelector(".link-titles").style.display = "none";
        }
      }, 2000);
      
    }
  }, 300);
  setTimeout(() => {
    document.querySelectorAll(".link-main").forEach((links) => {
      unfound++;
      if (window.getComputedStyle(links).display === "none") {
        found.push("Unfound");
        if (found.length === unfound) {
          document.querySelector(".found-warpper-class").style.display = "block";
          unfound = 0;
          found = [];
        } else {
          document.querySelector(".found-warpper-class").style.display = "none";
          setTimeout(()=>{
            unfound = 0;
          found = [];
          }, 500);
        }
      }
    });
  }, 2500);
});


document.addEventListener("keypress", () => {
  searchBtn.click();
  searchText.blur();
});


label.addEventListener("click", () => {
  searchText.focus();
});


document.querySelector(".link-titles").style.width = window.innerWidth - 24 + "px";

document.querySelector(".responsed-failed-wrapper").style.width = window.innerWidth - 24 + "px";



if (!navigator.onLine) {
  document.querySelector(".responsed-failed-wrapper").style.display = "block";
  document.querySelector(".link-titles").style.display = "none";
} else {
  document.querySelector(".responsed-failed-wrapper").style.display = "none";
  document.querySelector(".link-titles").style.display = "block";
 // GetData();
}



setInterval(() => {
  if (!navigator.onLine) {
    document.querySelector(".responsed-failed-wrapper").style.display = "block";
    //  document.querySelector(".link-titles").style.display = "none";
  } else {
    document.querySelector(".responsed-failed-wrapper").style.display = "none";
    document.querySelector(".link-titles").style.display = "block";
    
  }
  
}, 1000);


document.querySelector(".btn-try-class button").addEventListener("click", () => {
  if (!navigator.onLine) {
    document.querySelector(".responsed-failed-wrapper").style.display = "block";
    //  document.querySelector(".link-titles").style.display = "none";
  } else {
    document.querySelector(".responsed-failed-wrapper").style.display = "none";
    document.querySelector(".link-titles").style.display = "block";
  }
});


searchText.addEventListener("dragenter", (e) => {
  searchText.focus();
});


searchText.addEventListener("dragleave", () => {
  searchText.blur();
});


linkTitles.style.maxHeight = window.innerHeight - 150 + 'px';



setInterval(() => {
  if (linkTitles.innerHTML.includes(`div`)) {
    document.querySelector(".loader-data-wrapper").style.display = "none";
  } else {
    document.querySelector(".loader-data-wrapper").style.display = "flex";
  }
});


document.querySelector(".suggestions-box-wrapper").style.width = window.getComputedStyle(searchText).width;



searchText.addEventListener("input", () => {
  if (searchText.value !== "") {
    document.querySelector(".suggestions-box-wrapper").style.display = "block";
    
    document.querySelectorAll(".suggestions-content ul li").forEach((data) => {
      var filter = data.innerText.toUpperCase().replace("\?", "");
      filter = filter.replace("\?", "");
      var searchTxt = searchText.value.toUpperCase();
      data.style.display = filter.includes(searchTxt) ? "block" : "none";
      
      
      
      data.addEventListener("click", () => {
        searchText.value = data.innerText;
        document.querySelector(".suggestions-box-wrapper").style.display = "none";
        searchText.focus();
      });
      
      
      
    });
    
  } else {
    document.querySelector(".suggestions-box-wrapper").style.display = "none";
  }
});

searchText.addEventListener("blur", () => {
  // document.querySelector(".suggestions-box-wrapper").style.display = "none";
});


window.addEventListener("dblclick", () => {
  document.querySelector(".suggestions-box-wrapper").style.display = "none";
});