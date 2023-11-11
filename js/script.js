"use strict";

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
  console.log("clickedElement:", clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".posts article.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArtickle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArtickle.classList.add("active");
}

const optArticleSelector = ".post";
const optTitleSelector = ".post-title";
const optTitleListSelector = ".titles";

function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = "";

  /*  for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  let html = "";

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute("id");

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";

    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();

const optArticleTagsSelector = ".post-tags .list";

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* make html variable with empty string */
    let emptyHTML = "";

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagHtml = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";
      console.log(tagHtml);
      /* add generated code to html variable */
      emptyHTML = emptyHTML + tagHtml;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = emptyHTML;
  }
}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("clickedElement " + clickedElement);
  const href = clickedElement.getAttribute("href");
  console.log("href " + href);
  const tag = href.replace("#tag-", "");
  console.log("tag " + tag);
  const activeTagLinks = document.querySelectorAll(".tags a.active");
  console.log("activeTagLinks " + activeTagLinks);
  for (const activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove("active");
    console.log("activeTagLink " + activeTagLink);
  }
  const foundTagLinks = document.querySelectorAll(
    `.tags a[href="#tag-${tag}"]`
  );
  console.log("foundTagLinks " + foundTagLinks);
  for (const foundTagLink of foundTagLinks) {
    foundTagLink.classList.add("active");
    console.log("foundTagLink " + foundTagLink);
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll(".tags a");
  console.log("tagLinks " + tagLinks);
  for (const tagLink of tagLinks) {
    tagLink.addEventListener("click", tagClickHandler);
    console.log("tagLink " + tagLink);
  }
}

addClickListenersToTags();
