let selectedFile = null;
const fileInput = document.getElementById("fileInput");
const output = document.getElementById("output");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", e => {
  selectedFile = e.target.files[0];
  preview.innerHTML = "";

  if(selectedFile){
    const url = URL.createObjectURL(selectedFile);
    if(selectedFile.type.startsWith("image/")){
      const img = document.createElement("img");
      img.src = url;
      preview.appendChild(img);
    } else if(selectedFile.type.startsWith("video/")){
      const vid = document.createElement("video");
      vid.src = url;
      vid.controls = true;
      preview.appendChild(vid);
    }
  }
});

function generateCode(){
  if(!selectedFile){
    alert("اختر صورة أو فيديو أولاً!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(){
    const base64 = reader.result;
    let tag;
    if(selectedFile.type.startsWith("image/")){
      tag = `<img src="${base64}" alt="Uploaded Image">`;
    } else if(selectedFile.type.startsWith("video/")){
      tag = `<video src="${base64}" controls></video>`;
    }
    output.value = tag;
  };
  reader.readAsDataURL(selectedFile);
}
