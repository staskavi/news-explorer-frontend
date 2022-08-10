import moment from "moment";
const d = new Date();
const date = moment(d).format('LL');
const defaultCards = [
    {
      description: "Ever since I read Richard Louv's influential book, Last Child in the Woods, the idea of having a special sit spot has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...",
      publishedAt: date,
      source: "treehugger",
      title: "Everyone Needs a Special 'Sit Spot' in Nature",
      keyword: "Nature",
      link: "images/card1.jpg" 


    },
    {
        description: "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.",
        publishedAt: date,
        source: "national geographic",
        title: "Nature makes you better",
        keyword: "Nature",
        link: "images/card2.jpg"
      },
      {
        description: "“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...",
        publishedAt: date,
        source: "National parks traveler",
        title: "Grand Teton Renews Historic Crest Trail",
        keyword: "Nature",
        link: "images/card3.jpg"
      }  
]

export {
    defaultCards
}