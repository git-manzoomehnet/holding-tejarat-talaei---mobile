window.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  if (window.scrollY > 0) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

/////////////////////////////sidebar
// const sidebarMenu = document.getElementById("sidebar-container");
// function togglemenu() {
//   sidebarMenu.innerHTML = `<div class="sidebar">
//   <div class="sidebar-wrapper">
//       <img src="../assets/svg/close.svg" onclick="closebtn()" class="closebtn" id="close"/>

//   <div class="mobile-size-cont">
//   <div>
//       <img src="../assets/svg/close.svg" onclick="closebtn()" class="closebtn" />
//                 <img
//               src="../assets/svg/search2.svg"
//               onclick="toggleSearch()"
//               id="toggleSearch"
//             /></div>
//         <a href="http://127.0.0.1:5500/index.html">

//   <img src="../assets/image/GodenBusinessMagazine_LOGOOK (1) 1 (1).png" class="mobile-size-logo"/></a>
//     </div>

//     <div class="sidebar-items">
//     <a href="../index.html"><p>صفحه نخست</p></a>
//       <a href="../html/aboutus.html">
//         <p>درباره ما</p>
//       </a>
//       <p>ایران ریتیل شو</p>
//       <p>ایران ریتیل اواردز</p>
//       <p>پایگاه خبری</p>
//       <a href="../html/contactus.html">
//         <p>تماس با ما</p>
//       </a>
//       <p>ماهنامه تجارت طلایی</p>
//     </div>

//     <div class="sidebar-links">
//       <div class="sidebar-socialmedia">
//         <a href="tel:+982166399241">
//           <img src="../assets/svg/telephone.svg" class="social" />
//         <a href="https://www.instagram.com/goldenbusinessmagazine/">
//           <img src="../assets/svg/instagram.svg" class="social" />
//         </a>
//         <a
//           href="https://www.linkedin.com/company/goldenbusinessmagazine/?originalSubdomain=ir"
//           ><img src="../assets/svg/linkedin.svg" class="social" />
//         </a>
//       </div>
//       <a href="http://www.gbmnews.ir"> <p>www.gbmnews.ir</p></a>
//       <a href="http://www.goldenbusinessmagazine.com">
//         <p>www.goldenbusinessmagazine.com</p>
//       </a>
//       <a href="http://www.iranretailshow.com"> <p>www.iranretailshow.com</p> </a>
//     </div>
//   </div>
// </div>
// `;
// }

function closebtn() {
  sidebarMenu.innerHTML = "";
}


function myFunction() {
  var element = document.getElementById("sidebar-container");
  element.classList.toggle("sidebar-toggle");
}
/////////////////////////////poster
const poster = document.getElementById("poster");
const poster2 = document.getElementById("poster2");
const poster3 = document.getElementById("poster3");

function togglePoster1() {
  console.log("sf");
  poster.innerHTML = `
  <img src="file:///E:/work/طلایی/project/assets/image/2022 6.png" onclick="posterclick()"/>
`;
}
function togglePoster2() {
  poster2.innerHTML = `
  <img src="file:///E:/work/طلایی/project/assets/image/2022 6.png" onclick="posterclick2()"/>
`;
}
function togglePoster3() {
  poster3.innerHTML = `
  <img src="file:///E:/work/طلایی/project/assets/image/2022 6.png" onclick="posterclick3()"/>
`;
}
function posterclick() {
  poster.innerHTML = "";
}
function posterclick2() {
  poster2.innerHTML = "";
}
function posterclick3() {
  poster3.innerHTML = "";
}

////////////////////////////////////searchbtn
const searchWrapper = document.querySelector(".search");

function closebtn3() {
  searchWrapper.innerHTML = "";
}

function toggleSearch() {
  searchWrapper.innerHTML = `
    <div class="search-wrapper">
      <div class="search-container">
          <img
            src="../assets/svg/close.svg"
            onclick="closebtn3()"
            class="closeBtn"
          />
          <div class="search-input">
            <input type="text" id="searchInput" placeholder="جستجو کنید" />
            <img src="../assets/svg/search.svg" onclick="performSearch()" />
          </div>
        <div id="searchResults"></div>
      </div>
    </div>`;
}

function performSearch() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsContainer = document.getElementById("searchResults");

  if (query) {
    resultsContainer.innerHTML = ""; // Clear previous results
    let resultsFound = false;

    // Search the current page
    resultsFound =
      searchInDocument(document, query, resultsContainer) || resultsFound;

    // Search linked HTML files
    const linkedHtmlFiles = ["http://lpf114.undertest.ir/about-us.bc", "http://lpf114.undertest.ir"]; // Add your linked HTML files here
    linkedHtmlFiles.forEach((file) => {
      fetch(file)
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          resultsFound =
            searchInDocument(doc, query, resultsContainer, file) ||
            resultsFound;

          // If no results found after checking all documents, ensure resultsContainer remains empty
          if (!resultsFound && resultsContainer.innerHTML === "") {
            resultsContainer.innerHTML = `<p class="notfound">با عرض پوزش مطلبی پیدا نشد.<br />واژه دیگری را جستجو نمایید.</p>`; // No results to show
          }
        });
    });
  }
}

function searchInDocument(doc, query, resultsContainer, fileUrl = "") {
  const paragraphs = doc.querySelectorAll("p");
  let resultsFound = false;
  let count = 0; // To limit the number of results

  for (const paragraph of paragraphs) {
    if (count >= 3) break; // Limit to 3 results

    if (paragraph.textContent.toLowerCase().includes(query)) {
      count++;
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("result");

      let snippetText = paragraph.textContent.substring(0, 100);
      if (paragraph.textContent.length > 100) {
        snippetText += "...";
      }

      const snippet = snippetText.replace(
        new RegExp(query, "gi"),
        (match) => `<span class="highlight">${match}</span>`
      );

      resultDiv.innerHTML = `<p>${snippet}</p>`;

      const showMoreLink = document.createElement("a");
      showMoreLink.classList.add("showMoreLink");
      showMoreLink.innerHTML = `
          <div class="more">
            <p>مشاهده</p>
            <div class="circle">
              <div class="dot"></div>
            </div>`;
      showMoreLink.href = "#";
      showMoreLink.addEventListener("click", () => {
        if (fileUrl) {
          window.location.href = `${fileUrl}#${paragraph.id}`;
        } else {
          paragraph.scrollIntoView({ behavior: "smooth" });
        }
      });
      resultDiv.appendChild(showMoreLink);

      resultsContainer.appendChild(resultDiv);
      resultsFound = true;
    }
  }

  return resultsFound;
}

///////////////////////////slider-section3
// const images = [
//   { id: 1, img: "../assets/image/سکشن دوم صفحه نخست-1.jpg" },
//   { id: 2, img: "../assets/image/سکشن دوم صفحه نخست-2.jpg" },
//   { id: 3, img: "../assets/image/سکشن دوم صفحه نخست-3.jpg" },
//   { id: 4, img: "../assets/image/سکشن دوم صفحه نخست-4.jpg" },
//   { id: 5, img: "../assets/image/سکشن دوم صفحه نخست-5.jpg" },
// ];
// const slides = document.querySelector(".swiper-wrapper");
// const imagesHTML = images.map((item) => {
//   return `<img src="./assets/image/${item.img}" />`;
// });

// slides.innerHTML = imagesHTML;

////////////////////////////////aboutus swiper
const swiper = new Swiper(".mySwiper", {
  rewind: true,
  spaceBetween: 20,

  navigation: {
    nextEl: ".about-next",
    prevEl: ".about-prev",
  },

  breakpoints: {
  
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    1500: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  }
});
function aboutusenext() {
  mySwiper.slideNext();
}
function aboutuseprev() {
  mySwiper.slidePrev();
}
////////////////////////////////awardsswiper
$('.retail-awards').imagesLoaded( function() {
  
  const swiper2 = new Swiper(".mySwiper2", {
    rewind: true,
    navigation: {
      nextEl: ".awards-next",
      prevEl: ".awards-prev",
    },
  });
  

});
const swiper3 = new Swiper(".swiper3", {
  rewind: true,
  navigation: {
    nextEl: ".awards-next",
    prevEl: ".awards-prev",
  },
});
function awardsNext() {
  swiper2.slideNext();
}
function prev() {
  swiper2.slidePrev();
}

//////////////////////////////////
// const swiper5 = new Swiper(".mySwiper5", {
//   slidesPerView: 3,
//   centeredSlides: true,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   breakpoints: {
//     // When the viewport width is >= 0px
//     0: {
//       slidesPerView: 1,
//     },
//     // When the viewport width is >= 680px
//     680: {
//       slidesPerView: 3,
//     },
//   },
// });

var swiper5 = new Swiper(".mySwiper5", {
  cssMode: true,
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
});
/////////////////////////////////mahnameh
const mySwiper = new Swiper(".swiper-container", {
  loop: false,
  speed: 1000,
   effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 5.2,
  centeredSlides: true,
  spaceBetween: 30,
  coverflowEffect: {
    rotate: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".mahnameh-pagination",
  },
  navigation: {
    nextEl: ".mahnameh-next",
    prevEl: ".mahnameh-prev",
  },
  breakpoints: {
  
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1500: {
      slidesPerView: 4.2,
      spaceBetween: 40
    }
  }
});

/////////////////////scroll
/*------------------------------
Register plugins
------------------------------*/
gsap.registerPlugin(ScrollTrigger);

/*------------------------------
Init ScrollSmoother
------------------------------*/

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".accordions",
    pin: true,
    start: "top top",
    end: "bottom top",
    scrub: 1,
    ease: "linear",
  },
});

tl.to(".accordion .text", {
  height: 0,
  paddingBottom: 0,
  opacity: 0,
  stagger: 0.5,
});
tl.to(
  ".accordion",
  {
    marginBottom: -430,
    stagger: 0.5,
  },
  "<"
);

