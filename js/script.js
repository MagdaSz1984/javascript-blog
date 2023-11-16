"use strict";

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author",
  optAuthorsListSelector = ".authors";

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */
  clickedElement.classList.add("active");

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".posts article.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add("active");
}

function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";

  const newLinks = document.querySelectorAll(".titles a");
  for (let link of newLinks) {
    link.removeEventListener("click", titleClickHandler); // Remove existing to prevent duplicates
    link.addEventListener("click", titleClickHandler);
  }

  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  let html = "";

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute("id");

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";

    /* insert link into html variable */
    html += linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let emptyHTML = "";

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");

    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagHtml = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";

      /* add generated code to html variable */
      emptyHTML = emptyHTML + tagHtml;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = emptyHTML;
  }
}

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log(clickedElement);

  const href = clickedElement.getAttribute("href");
  console.log(href);

  const tag = href.replace("#tag-", "");

  const activeTagLinks = document.querySelectorAll(".tags a.active");

  for (const activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove("active");
  }
  const foundTagLinks = document.querySelectorAll(
    `.tags a[href="#tag-${tag}"]`
  );

  for (const foundTagLink of foundTagLinks) {
    foundTagLink.classList.add("active");
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll(".tags a");
  for (const tagLink of tagLinks) {
    tagLink.addEventListener("click", tagClickHandler);
  }
}

function addClickListenersToTagsInPost() {
  const tagLinks = document.querySelectorAll(".list a");
  for (const tagLink of tagLinks) {
    tagLink.addEventListener("click", tagClickHandler);
  }
}

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const authorName = article.getAttribute("data-author");

    const linkHTML = `<a href="#author-${authorName
      .replace(/ /g, "-")
      .toLowerCase()}">${authorName}</a>`;
    authorWrapper.innerHTML = linkHTML;
  }

  // Add click listeners to newly created author links within articles
  const authorLinks = document.querySelectorAll(
    `${optArticleAuthorSelector} a`
  );
  for (let link of authorLinks) {
    link.addEventListener("click", authorClickHandler);
  }
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  const author = href.replace("#author-", "").replace(/-/g, " ");

  generateTitleLinks(`[data-author="${author}"]`);
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll(`${optAuthorsListSelector} a`);
  for (let link of authorLinks) {
    link.addEventListener("click", authorClickHandler);
  }
}

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
