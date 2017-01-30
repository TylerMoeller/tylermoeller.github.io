$(document).ready(() => {

  // Bootstrap affix plugin: .affix class adjusts navbar height on initial scroll
  $('#topNav').affix({ offset: { top: 100 } });

  // smooth scrolling
  $('.page-scroll a').click((e) => {
      $('html, body').stop().animate({
          scrollTop: ($($(e.target).attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
      e.preventDefault();
    });

  // hide social icon containers when the icon is blocked by ad block
  if (!$('.fa-twitter').is(':visible')) {
    $('.fa-twitter').closest('li').css('display', 'none');
    $('.fa-linkedin').closest('li').css('display', 'none');
    $('#adblock-message').html(
      '** <a href="https://www.linkedin.com/in/tylermoeller/">LinkedIn</a> and ' +
      '<a href="https://twitter.com/tyler_moeller/">Twitter</a>' +
      ' buttons were blocked by your adblocker.<br><br>'
    );
  }

  buildRepoGrid();
});

// loop through repos.json to build the image grid
function buildRepoGrid() {
  $.getJSON('https://tylermoeller.github.io/repos.json').done((data) => {
    data.repoList.forEach((repo) => {
      var langHTML = '';
      repo.langs.forEach((lang) => {
        langHTML += '<span>' + lang + '</span>';
      });

      $('#repo-row').append(
        `<div class="col-sm-6 col-md-4 repo-item">
          <a href="#${repo.id}" class="repo-link" data-toggle="modal">
            <div class="caption">
              <div class="caption-content">
                <i class="fa fa-info-circle fa-3x"></i>
              </div>
            </div>
            <img src="${repo.screenshot}" class="img-responsive"
                 alt="${repo.altText}">
            <div class="carousel-caption">${repo.name}</div>
          </a>
        </div>
        <div class="repo-modal modal fade" id="${repo.id}"
             tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-content">
            <div class="container">
              <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                  <div class="modal-body">
                    <h2 class="repo-modal-title">${repo.name}</h2>
                    <hr class="gh-logo-primary">
                    <a href="${repo.url}">
                      <img src="${repo.screenshot}"
                           class="img-thumbnail img-responsive center-block"
                           alt="${repo.altText}">
                    </a>
                    <p>${repo.description}</p>
                    <div class="row">
                      <div class="col-xs-8 col-xs-offset-2">
                        <p><strong>Created</strong>:${repo.created}</p>
                      </div>
                    </div>
                    <ul class="list-inline pager">
                      <li>${langHTML}</li>
                    </ul>
                    <button type="button" class="btn btn-close" data-dismiss="modal">
                      <i class="fa fa-times"></i> Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );
    });
  }).always(() => {

    // Hide modal when user clicks 'back' button
    $('.modal').on('show.bs.modal', () => window.location.hash = 'modal');
    $(window).on('hashchange', (event) => {
      if (window.location.hash != '#modal') $('.modal').modal('hide');
    });

    // close modals on 'esc'
    $('body').keyup((e) => {
      var key = e.keyCode || e.which;
      if (key === 27) $('.modal').modal('hide');
    });
  });
}
