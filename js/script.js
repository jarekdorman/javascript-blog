'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

const titleClickHandler = function (event) {
  event.preventDefault();

  const clickedElement = this;
  console.log(event);

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log(clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);
  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(customSelector);
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  const classValue = optCloudClassPrefix + classNumber;
  return classValue;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  console.log(allTags);
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    console.log(tagsWrapper);
    /* make html variable with empty string */
    let html = ' ';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */
      const tagLinkHTML =
        '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      // console.log(tagLinkHTML);
      /* add generated code to html variable */

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      html = html + tagLinkHTML;
      console.log(html);
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join('');

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    const tagLinkHTML =
      '<li><a class="' +
      calculateTagClass(allTags[tag], tagsParams) +
      '" href="#tag-' +
      tag +
      '">' +
      tag +
      '</a></li>';
    // const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    console.log('tagLinkHTML:', tagLinkHTML);
    /* [NEW] generate code of a link and add it to allTagsHTML */
    // allTagsHTML += tag + ' (' + allTags[tag] + ') ';
    allTagsHTML += tagLinkHTML;
  }
  tagList.insertAdjacentHTML('beforeend', allTagsHTML);
}

generateTags();

const links = document.querySelectorAll('.titles a');
console.log(links);
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log(targetTags);
  /* START LOOP: for each found tag link */
  for (let targetTag of targetTags) {
    /* add class active */
    targetTag.classList.add('active');
    console.log(targetTag);
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tag of tags) {
    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function calculateAuthorsParams(authors) {
  const params = {
    max: '0',
    min: '999999',
  };
  for (let author in authors) {
    console.log(author + ' is used ' + authors[author] + ' times ');
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }
  return params;
}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  const classValue = optCloudClassPrefix + classNumber;
  return classValue;
}

function generateAuthors() {
  let allAuthors = {};
  console.log(allAuthors);
  const authors = document.querySelectorAll(optArticleSelector);
  for (let author of authors) {
    const authorsWrapper = author.querySelector(optArticleAuthorSelector);
    let html = '';
    const articleAuthor = author.getAttribute('data-author');
    console.log(articleAuthor);
    const linkHTML =
      '<li><a href="#author-' +
      articleAuthor +
      '">' +
      articleAuthor +
      '</a></li>';
    console.log(linkHTML);
    html = html + linkHTML;
    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    authorsWrapper.insertAdjacentHTML('beforeend', html);
  }
  const authorList = document.querySelector('.authors');
  const authorParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams', authorParams);
  let allAuthorsHTML = '';
  for (let articleAuthor in allAuthors) {
    const authorLinkHTML =
      '<li><a class="' +
      calculateAuthorClass(allAuthors[articleAuthor], authorParams) +
      '" href="#author-' +
      articleAuthor +
      '">' +
      articleAuthor +
      '</a></li>';
    allAuthorsHTML += authorLinkHTML;
  }
  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  console.log(author);
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthors);
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let hrefAuthorLink of hrefAuthorLinks) {
    hrefAuthorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors() {
  const authorTags = document.querySelectorAll('a[href^="#author-"]');
  for (let authorTag of authorTags) {
    authorTag.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
