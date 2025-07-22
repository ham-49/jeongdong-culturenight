let linkTitle = document.querySelector(".link_title")
console.log(linkTitle)

linkTitle.classList.add("hidden");
linkTitle.addEventListener("click", ()=>{
  linkTitle.classList.toggle("hidden");
})