"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
let stories;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  stories = storyList.stories;
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  //console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

//adds favorite functionality to all stories on all stories for home page
function addFavoritesToList() {
  console.debug('addFavoritesToList');
  stories.forEach(
    function (story) {
      if (currentUser.favorites.some(fav => fav.storyId === story.storyId)) {
        $(`#${story.storyId}`).prepend(`<i class="fas fa-star"</i>`).on('click', 'i.fa-star', favoriteToggle);
      }
      else {
        $(`#${story.storyId}`).prepend(`<i class="far fa-star"</i>`).on('click', 'i.fa-star', favoriteToggle);
      }
    }
  )
}
/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}

// submits and adds story to list and page
async function submitStory() {
  console.debug('submitStory');
  const $newStoryTitle = $("#new-story-title").val();
  const $newStoryAuthor = $("#new-story-author").val();
  const $newStoryUrl = $("#new-story-url").val();
  $storyCreationForm.trigger("reset");

  const response = await storyList.addStory(currentUser, { title: $newStoryTitle, author: $newStoryAuthor, url: $newStoryUrl });

  if (response) {
    stories.unshift(response);
  }

  hidePageComponents();
  $navFavorites.show();
  putStoriesOnPage();
  addFavoritesToList();
}

$storyCreationForm.on("submit", submitStory);

//event function for clicking on favorite button
async function favoriteToggle(el) {
  console.debug('favoriteToggle');
  if (currentUser.favorites.some(fav => fav.storyId === el.target.parentElement.id)) {
    await currentUser.deleteFavorite(stories.find(s => s.storyId === el.target.parentElement.id));
  }
  else {
    await currentUser.addFavorite(stories.find(s => s.storyId === el.target.parentElement.id));
  }
  putStoriesOnPage();
  addFavoritesToList();
}

// event function for deleting story
async function deleteStoryClick(el) {
  console.debug('deleteStory');
  const response = await storyList.deleteStory(currentUser, el.target.parentElement.id);
  if (response.status === 200) {
    storyList = await StoryList.getStories();
    stories = storyList.stories;
    putStoriesOnPage();
    addFavoritesToList();
  }
}

// event function to open up stories posted by currentUser, along with trash icon to delete post
function showCurrentUserStories() {
  $allStoriesList.empty();
  for (let story of stories) {
    if (currentUser.username === story.username) {
      const $story = generateStoryMarkup(story);
      $story.prepend('<i class = "fas fa-trash"></i>').on('click', 'i.fa-trash', deleteStoryClick);
      $allStoriesList.append($story);
    }
  }
  $allStoriesList.show();
}

