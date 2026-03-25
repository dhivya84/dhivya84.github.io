$(window).load(() => {
  windowLoaded();
});

const windowLoaded = () => {
  $('.preloader')
    .delay(400)
    .fadeOut('slow');

  const popUpElem = $('.popUp');
  const mainElem = $('main');
  let popUpState = false;
  const closePopUpBtn = $('#cancelBtn');

  const projectElem = $('.project-item');
  //   Hiding the popUp element for now. and show it only when a 'project' is clicked.
  $(popUpElem).hide(1);

  mainElem.on('click', e => {
    // If the clicked item is a dedicated project page link, let the browser handle it
    if ($(e.target).closest('.project-page-link').length > 0) {
      return;
    }

    if ($(e.target).closest('.project-item').length > 0) {
      // check if popUp is already 'up'
      if (popUpState === false) {
        // Now set popUp state to true so it can be taken the F out!
        popUpState = true;
        if ($(window).width() >= 768) {
          // blur the shiit outta the main element and make it unscrollable. ONLY ON TAB AND DESKTOPS
          $('.projects').css('filter', 'blur(7px)');
        } else {
          // if been viewed on mobile just take away all element except popUp.
          $('.projects').css('display', 'none');
          $('footer').css('display', 'none');
          $('.intro').css('display', 'none');
          $('.about').css('display', 'none');
          $('.education').css('display', 'none');
        }

        // now the scroll is only disabled for smaller-screen size devices
        if ($(window).width() > 768) {
          $('body').css('overflow', 'hidden');
        }

        // now display the popUp like it's a grammy!
        $(popUpElem).show(400);

        //   below is the data of the project clicked.
        const projectHeading = $(e.target)
          .closest('.project-figure')
          .find('h2')
          .first()
          .text();

        const projectDesc = $(e.target)
          .closest('.project-figure')
          .find('.popUpdesc')
          .first()
          .html();

        const projectImg = $(e.target)
          .closest('.project-figure')
          .find('img')
          .first()
          .attr('src');

        const projectVideo = $(e.target)
          .closest('.project-item')
          .attr('data-video');

        const projetGithubRepo = $(e.target)
          .closest('.project-figure')
          .children('figcaption')
          .children('#githubRepo')
          .attr('href');

        const projectLivePreview = $(e.target)
          .closest('.project-figure')
          .children('figcaption')
          .children('#livePreview')
          .attr('href');

        //  END OF data of the project clicked.
        // setting the CONTENT of the popUp to match that of the project clicked.
        $(popUpElem)
          .find('.projectDesc')
          .html(`${projectDesc}`);

        // setting the HEADING of the popUp to match that of the project clicked.
        $(popUpElem)
          .children('#popUpText')
          .children('h1')
          .text(`${projectHeading}`);

        // Handle Video vs Image
        const videoElement = $('#projectVideo');
        if (projectVideo && projectVideo !== '') {
          $(popUpElem).find('.popUpImg').css('backgroundImage', 'none');
          videoElement.attr('src', projectVideo);
          videoElement.show();
          videoElement[0].load();
          
          // Use a promise-based play to handle browser restrictions
          const playPromise = videoElement[0].play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Auto-play was prevented. Showing controls for manual play.");
              // If auto-play fails, the controls are already there for the user to click.
            });
          }
        } else {
          videoElement.hide();
          videoElement.attr('src', '');
          $(popUpElem)
            .children('.popUpImg')
            .css('backgroundImage', `url(${projectImg})`);
        }

        // setting up the github linking here
        $(popUpElem)
          .children('#popUpText')
          .children('div')
          .children('#githubLink')
          .attr('href', `${projetGithubRepo}`);

        // setting the preview link here.
        $(popUpElem)
          .children('#popUpText')
          .children('div')
          .children('#previewLink')
          .attr('href', `${projectLivePreview}`);
      }
    }
  });

  $(closePopUpBtn).on('click', () => {
    if (popUpState === true) {
      $(popUpElem).fadeOut(500);
      const videoElement = $('#projectVideo');
      videoElement[0].pause();
      videoElement.attr('src', '');
      videoElement[0].load();

      //   Unblur the main element and take off overflow: hidden
    }
    if ($(window).width() >= 768) {
      // blur the shiit outta the main element and make it unscrollable. ONLY ON TAB AND DESKTOPS
      $('.projects').css('filter', 'blur(0px)');
      $('body').css('overflow', 'scroll');
    } else {
      // if been viewed on mobile just take away all element except popUp.
      $('.projects').css('display', 'block');
      $('footer').css('display', 'block');
      $('.intro').css('display', 'block');
      $('.contact').css('display', 'block');
      $('.about').css('display', 'none');
      $('.education').css('display', 'none');
    }
    // set popUpState back to false so it could work accoridingly.
    popUpState = false;
  });
};
