

document.addEventListener("DOMContentLoaded", function () {
  const buttonNavbar = document.querySelector('[data-collapse-toggle="navbar-default"]');
  const menuNavbar = document.getElementById('navbar-default');

  buttonNavbar.addEventListener('click', function () {
    menuNavbar.classList.toggle('hidden');
  });

  const buttonFooter = document.querySelector('[data-collapse-toggle="navbar-default-footer"]');
  const menuFooter = document.getElementById('navbar-default-footer');

  buttonFooter.addEventListener('click', function () {
    menuFooter.classList.toggle('hidden');
  });
});


