import $ from "jquery";

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

export const handleImage = (e) => {
  const image = e.target.files[0];

  if (image?.type.split("/")[0] === "image") {
    if (image.size <= 10000 || image.size >= 2200000) {
      alert("이미지 파일이 아니거나 용량이 2MB 이상입니다.");
      $(".preview").css("background-image", "url()");
      return "";
    } else {
      getBase64(image, (result) => {
        if (result.length === 5) {
          // 결함 6, 이미지 아닌 것을 확장자만 바꿔서 올린 경우 예외처리
          alert("이미지 파일만 선택 가능합니다.");
          $(".preview").css("background-image", "url()");
          return "";
        }
        $(".preview").css("background-image", `url(${result})`);
      });

      return image;
    }
  } else if (!e.target.files.length) {
    return; //결함 22, 이미지 선택 취소 시에 아무런 이벤트 없게 함
  } else {
    alert("이미지 파일만 선택 가능합니다.");
    $(".preview").css("background-image", "url()");
    return "";
  }
};
