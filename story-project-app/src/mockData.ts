export interface Story {
  id: string;
  title: string;
  chapters: Chapter[];
  url: string;
  visible: boolean;
  dateCreated: Date;
}
export interface Chapter {
  title: string;
  text: string;
}

export const stories: Story[] = [
  {
    id: "9aac3dca-e0a0-48c8-bd74-1802c8343ba6",
    title: "A Night in the Woods",
    chapters: [
      {
        title: "Nightfall",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget justo eget leo ultricies facilisis. Cras semper vel erat tincidunt egestas. Phasellus dictum urna nec eros vulputate iaculis. Fusce felis dui, sodales gravida iaculis id, tristique luctus dolor. Nam ut sapien enim. Etiam ut ex quis libero vulputate ultrices sed sed magna. Mauris dolor nibh, suscipit eu gravida eu, rhoncus efficitur nulla. Pellentesque blandit elit lorem. Duis hendrerit eget magna at ultricies.`,
      },
      {
        title: "Midnight",
        text: `Praesent massa velit, accumsan at dui at, auctor malesuada tellus. Morbi malesuada nulla et tellus egestas, sit amet cursus dui scelerisque. Proin et maximus erat, sed pellentesque augue. Integer ante ex, venenatis vitae nunc eu, tempor molestie turpis. Nullam blandit metus nisi, sit amet placerat risus finibus ut. Praesent vitae condimentum felis. Aliquam vel vehicula diam. Aliquam laoreet nisl et lacus sodales, eget accumsan ex pulvinar. Cras venenatis varius erat. Aenean quis pellentesque justo. Praesent non convallis est. Duis semper mollis cursus. Curabitur arcu justo, tempus sit amet orci sed, venenatis hendrerit lacus. Curabitur nec urna vel nunc sagittis interdum. Duis bibendum diam sit amet ante tincidunt condimentum.`,
      },
      {
        title: "The Darkest Hour",
        text: `Etiam varius nibh ut metus tempor, sed hendrerit nibh ultrices. Phasellus et mi sed elit volutpat tristique. Maecenas vitae pulvinar ex, nec efficitur nulla. Pellentesque tellus sem, vulputate a quam eget, vestibulum sagittis dolor. Aliquam lacinia eros massa, eu ultricies metus tincidunt vel. Fusce et tortor ex. Suspendisse a dictum nisl. Vestibulum ipsum risus, scelerisque eu volutpat nec, auctor eu tortor. Proin posuere eu augue ac dapibus. Quisque non consectetur nulla.`,
      },
      {
        title: "Dawn's Light",
        text: `Nam ultrices blandit efficitur. Aliquam erat volutpat. Sed consectetur vel magna ut aliquam. Ut imperdiet velit sit amet leo varius ultricies. Pellentesque sodales aliquam nunc vitae viverra. Aliquam vulputate quis neque non varius. Aliquam pulvinar mollis ultricies. Morbi tempor in quam vitae dignissim. Pellentesque id tortor et sapien ultricies lacinia nec et lectus. Nunc interdum risus a ligula lobortis fringilla. Morbi diam nisl, scelerisque ut odio id, tincidunt commodo augue. Suspendisse eu congue nunc, at sollicitudin massa. Suspendisse lacinia nisl molestie risus tempus rutrum. Maecenas volutpat non justo malesuada interdum. Nulla vitae libero a leo auctor bibendum.`,
      },
    ],
    url: "a-night-in-the-woods",
    visible: true,
    dateCreated: new Date(),
  },
  {
    id: "40697844-edce-46cb-96c7-ccae49de3896",
    title: "Forever Lost",
    chapters: [
      {
        title: "A Perilous Journey",
        text: `We landed upon unforseen shores at the break of dawn.`,
      },
      {
        title: "In the Jungle",
        text: `We found a native village deep in the jungle by a riverbed. We stayed there for the night.`,
      },
      {
        title: "Adventure Bekons",
        text: `The natives guided us on our journey to reach the volcano. We begun to climb the slopes first thing in the morning.`,
      },
      {
        title: "The Beast Awakens",
        text: `We reached the crater when suddenly the volcano awoke from it's centuries long sleep. It blasted us out of the core of the mountain with enormous force.`,
      },
      {
        title: "The Escape",
        text: `Once we came to our senses, we ran toward the shore as quickly as possible. The mountain was spewing fire and brimstone.`,
      },
      {
        title: "Last Goodbye",
        text: `We saw panicked natives on the shore performing some kind of ritual. They saw us and cried because of our sudden departure. We took to our rowboats.`,
      },
      {
        title: "Hope Fading",
        text: `We reached our ship in the nick of time. The sails were raised, but the wind was not in our favor. The hull was struck by a falling lava stone.`,
      },
      {
        title: "Forever Lost",
        text: `As the ship was sinking and the island burning, we saw our time was at an end. We grabbed pieces of the ship to hold on to. Soon the sun set on us as we were stranded on open seas. THE END`,
      },
    ],
    url: "forever-lost",
    visible: true,
    dateCreated: new Date(),
  },
  {
    id: "89aec177-ca77-44d5-830c-8a42a3ac19a5",
    title: "The Crimson Lady",
    chapters: [
      {
        title: "The Lady",
        text: `I arrived at the ball in the evening, hoping to talk to some old friends from the navy. I saw a beautiful lady descending down the stairs of the main hall.`,
      },
      {
        title: "Dressed in Crimson",
        text: `She was dressed in Crimson. I didn't like crimson. :(`,
      },
    ],
    url: "the-crimson-lady",
    visible: true,
    dateCreated: new Date(),
  },
  {
    id: "52ebb8be-2765-487d-809e-1b54fd63451b",
    title: "Hidden Tales",
    chapters: [
      {
        title: "The Story So Far",
        text: `This happened when we were talking to our teacher in the library. We were looking for a certain book.`,
      },
      {
        title: "The Book",
        text: `She told us that the book was in a hidden section of the library. This was because the book contained...`,
      },
      {
        title: "Work In Progress",
        text: `What happens next? Who knows.`,
      },
    ],
    url: "hidden-tales",
    visible: false,
    dateCreated: new Date(),
  },
];

export interface Page {
  title: string;
  text: string;
}

export const pages: Page[] = [
  {
    title: "Home",
    text: "This is the home page for the Story Project website. Welcome!",
  },
  {
    title: "About",
    text: "This is the about page. Here you will (eventually) learn more about Story Project.",
  },
  {
    title: "Settings",
    text: "On this special page you can adjust settings once I get around to implementing them.",
  },
];
