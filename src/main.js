import "./styles/styles.scss";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";

const initMobileMenu = () => {
  const body = document.body;
  const header = body.querySelector("[data-js-header]");
  const menuButton = header.querySelector("[data-js-menu-button]");

  if (!header || !menuButton) {
    return;
  }

  let isMenuOpened = false;

  const openMenu = () => {
    header.classList.add("is-menu-opened");
    body.classList.add("overlay");
    isMenuOpened = true;
  };

  const closeMenu = () => {
    header.classList.remove("is-menu-opened");
    body.classList.remove("overlay");
    isMenuOpened = false;
  };

  menuButton.addEventListener("click", () => {
    if (isMenuOpened) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (isMenuOpened) {
      closeMenu();
    }
  });
};

const initAllTabs = () => {
  const removeActiveClass = (collection) => {
    collection.forEach((item) => {
      item.classList.remove("is-active");
    });
  };

  const initTabs = (buttonCollection, contentCollectionArray) => {
    buttonCollection.forEach((button) => {
      const id = button.getAttribute("data-js-tab-button");

      button.addEventListener("click", () => {
        removeActiveClass(buttonCollection);

        contentCollectionArray.forEach((collection) => {
          removeActiveClass(collection);
          collection.forEach((item) => {
            if (item.getAttribute("data-js-tab-content") === id) {
              item.classList.add("is-active");
            }
          });
        });

        button.classList.add("is-active");
      });
    });
  };

  const initCatalogPreview = () => {
    const catalog = document.body.querySelector("[data-js-tab-container]");

    const tabButtonCollection = catalog.querySelectorAll("[data-js-tab-button-wrapper] > [data-js-tab-button]");
    const tabContentCollection = catalog.querySelectorAll("[data-js-tab-content-price]");
    const tabProductCollection = catalog.querySelectorAll("[data-js-tab-content-product]");

    if (!tabButtonCollection || !tabContentCollection || !tabProductCollection) {
      return;
    }

    initTabs(tabButtonCollection, [tabContentCollection, tabProductCollection]);

    tabProductCollection.forEach((product) => {
      if (product.hasAttribute("data-js-tab-product-typed")) {
        const typeButtonCollection = product.querySelectorAll("[data-js-tab-button-type]");
        const typeProductCollection = product.querySelectorAll("[data-js-tab-product-type]");

        initTabs(typeButtonCollection, [typeProductCollection]);
      }
    });
  };

  initCatalogPreview();
};

const initAccordions = () => {
  const accordionCollection = document.body.querySelectorAll("[data-js-accordion]");

  accordionCollection.forEach((accordion) => {
    const accordionItemCollection = accordion.querySelectorAll("[data-js-accordion-item]");

    accordionItemCollection.forEach((item) => {
      const button = item.querySelector("[data-js-accordion-item-button]");
      const text = item.querySelector("[data-js-accordion-item-text]");

      button.addEventListener("click", () => {
        text.classList.toggle("is-active");
        button.classList.toggle("is-active");
      });
    });
  });
};

const initSalesBannerSliders = () => {
  const salesSliderCollection = document.body.querySelectorAll("[data-js-sales-banner-swiper]");

  salesSliderCollection.forEach((slider) => {
    const buttonPrev = slider.querySelector("[data-js-sales-banner-swiper-button-prev]");
    const buttonNext = slider.querySelector("[data-js-sales-banner-swiper-button-next]");

    const swiper = new Swiper(slider, {
      loop: true,
      spaceBetween: 5,

      navigation: {
        nextEl: buttonNext,
        prevEl: buttonPrev,
      },

      breakpoints: {
        769: {
          spaceBetween: 15,
        },
      },
    });
  });
};

const initShortReviewsSliders = () => {
  const reviewsSliderContainerCollection = document.body.querySelectorAll("[data-js-short-reviews-swiper-container]");

  reviewsSliderContainerCollection.forEach((sliderContainer) => {
    const slider = document.body.querySelector("[data-js-short-reviews-swiper]");
    const buttonPrev = sliderContainer.querySelector("[data-js-short-reviews-swiper-button-prev]");
    const buttonNext = sliderContainer.querySelector("[data-js-short-reviews-swiper-button-next]");

    const swiper = new Swiper(slider, {
      spaceBetween: 30,
      slidesPerView: 1,
      slidesOffsetBefore: 10,
      slidesOffsetAfter: 10,

      navigation: {
        nextEl: buttonNext,
        prevEl: buttonPrev,
      },

      breakpoints: {
        769: {
          spaceBetween: 30,
          slidesPerView: 1.5,
          slidesOffsetBefore: 40,
          slidesOffsetAfter: 40,
        },

        1241: {
          spaceBetween: 30,
          slidesPerView: 2,
          slidesOffsetBefore: 120,
          slidesOffsetAfter: 120,
        },

        1440: {
          spaceBetween: 30,
          slidesPerView: 2,
          slidesOffsetBefore: 195,
          slidesOffsetAfter: 195,
        },

        1441: {
          spaceBetween: 30,
          slidesPerView: 2,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
      },
    });
  });
};

const initTextCrop = () => {
  const textContainerCollection = document.body.querySelectorAll("[data-js-text-crop-container]");

  textContainerCollection.forEach((textContainer) => {
    const wrapper = textContainer.querySelector("[data-js-text-crop]");
    const textWrapper = wrapper.querySelector("p");
    const button = textContainer.querySelector("[data-js-text-crop-button]");
    const fullText = textWrapper.textContent;

    const cropText = () => {
      let symbolNumber = innerWidth <= 768 ? 188 : 436;
      return `${fullText.slice(0, symbolNumber)}...`;
    };

    let croppedText = cropText();
    let isSwownFull = false;

    const hideFullText = () => {
      textWrapper.textContent = croppedText;
      button.textContent = "Просмотреть полностью";
      isSwownFull = false;
    };

    const showFullText = () => {
      textWrapper.textContent = fullText;
      button.textContent = "Скрыть";
      isSwownFull = true;
    };

    button.addEventListener("click", () => {
      if (!isSwownFull) {
        showFullText();
      } else {
        hideFullText();
      }
    });

    hideFullText();

    window.addEventListener("resize", () => {
      croppedText = cropText();
      hideFullText();
    });
  });
};

initMobileMenu();
initAllTabs();
initAccordions();
initSalesBannerSliders();
initShortReviewsSliders();
initTextCrop();
