"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  if (currentUser) {
    $navStoryCreate.show();
    $navFavorites.show();
    addFavoritesToList();
  }
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

function navPostClick(evt) {
  console.debug("navPostClick", evt);
  hidePageComponents();
  if (currentUser) $navFavorites.show();
  $storyCreationForm.show();
}

$navStoryCreate.on("click", navPostClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navFavorites.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navFavoritesClick() {
  console.debug('putFavoritesOnPage');
  $allStoriesList.empty();

  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  hidePageComponents();
  $allStoriesList.show();
  addFavoritesToList();
}

$navFavorites.on('click', navFavoritesClick);

function navUserClick() {
  hidePageComponents();
  showCurrentUserStories();

}
$navUserProfile.on('click', navUserClick);
