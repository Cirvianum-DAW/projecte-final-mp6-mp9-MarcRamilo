document.addEventListener('DOMContentLoaded', function () {
  const splide = new Splide('#default-carousel', {
      type       : 'fade',
      heightRatio: 0.5,
      pagination : false,
      arrows     : true,
  }).mount();

});
