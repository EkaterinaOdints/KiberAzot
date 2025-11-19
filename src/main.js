import "./styles/styles.scss";

const useMobileMenu = () => {
  const body = document.body;
  const header = body.querySelector("[data-js-header]");
  const menuButton = header.querySelector("[data-js-menu-button]");

  if (header && menuButton) {
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
  }
};

useMobileMenu();
