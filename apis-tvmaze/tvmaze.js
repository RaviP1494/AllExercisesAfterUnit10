/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */

async function searchShows(query) {
  // DONE: Make an ajax request to the searchShows api.

  const data = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
  const shows = extractShowInfo(data.data);

  return shows;
}

//extracts and returns show API data in necessary format with required information
function extractShowInfo(data) {
  const showsArr = [];
  let show;
  for (let showData of data) {
    if (showData.show.image === null) {
      show = {
        id: showData.show.id,
        name: showData.show.name,
        summary: showData.show.summary,
        image: 'https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300'
      };
    }
    else {
      show = {
        id: showData.show.id,
        name: showData.show.name,
        summary: showData.show.summary,
        image: showData.show.image.medium
      };
    }
    showsArr.push(show);
  }
  return showsArr;
}


/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(

      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
        <img class="card-img-top" src="${show.image}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-secondary">Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  const episodeData = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  const episodeInfo = extractEpisodeInfo(episodeData.data);
  // TODO: return array-of-episode-info, as described in docstring above
  return episodeInfo;
}

//extracts and returns episode API data in necessary format with required information
function extractEpisodeInfo(episodeData) {
  const episodeInfo = [];
  for (let epData of episodeData) {
    const epInfo = {
      id: epData.id,
      name: epData.name,
      season: epData.season,
      number: epData.number
    };
    episodeInfo.push(epInfo);
  }

  return episodeInfo;
}

//Populates #episodes-list and shows containing section #episodes-area
function populateEpisodes(episodes) {
  for (let ep of episodes) {
    $('#episodes-list').append(`<li>${ep.name} - Season ${ep.season}, Episode ${ep.number}</li>`);
  }
  $('#episodes-area').show();
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

//Episodes button event handler delegated to #shows-list div
//Clears and repopulates #episodes-list
$('#shows-list').on('click', async function (e) {
  if (e.target.tagName === 'BUTTON') {
    const showID = e.target.parentElement.parentElement.parentElement.getAttribute('data-show-id');
    $('#episodes-list').html('');
    const episodes = await getEpisodes(showID);
    populateEpisodes(episodes);
  }
});
