import './App.css'

const testStories = [
  { name: "A Night in the Woods", selected: true },
  { name: "Forever Lost", selected: false },
  { name: "The Crimson Lady", selected: false },
  { name: "Where Water Tastes Like Wine", selected: false },
  { name: "Spacebase D7A", selected: false }
];
const testChapters = [
  { num: 1, selected: true },
  { num: 2, selected: false },
  { num: 3, selected: false },
  { num: 4, selected: false },
  { num: 5, selected: false },
  { num: 6, selected: false },
  { num: 7, selected: false },
  { num: 8, selected: false }
];

function App() {

  return (
    <div className='app'>
      <div className='header'>
        <h1>Story Project</h1>  
      </div>
      <div className='main'>
        <div className='sidebar'>
          <div className='menu'>
            <div className='box box-button'>
              <p>Home</p>
            </div>
            <div className='box box-button'>
              <p>About</p>
            </div>
            <div className='box box-button'>
              <p>Settings</p>
            </div>
          </div>
          <div className='library'>
            {testStories.map(story => {
              return <div key={story.name} className={story.selected ? 'story story-selected box-button' : "story box-button"}><p>{story.name}</p></div>
            })}
          </div>
        </div>
        <div className='content'>
          <div className='content-title'>
            <h2>A Night in the Woods</h2>
          </div>
          <div className='chapter-select'>
            {testChapters.map(chapter => {
              return <div key={chapter.num} className={chapter.selected ? 'chapter-button selected-chapter' : 'chapter-button'}>{chapter.num}</div>
            })}
          </div>
          <div className='content-body'>
            <h3>Chapter 1 – Nightfall</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget justo eget leo ultricies facilisis. Cras semper vel erat tincidunt egestas. Phasellus dictum urna nec eros vulputate iaculis. Fusce felis dui, sodales gravida iaculis id, tristique luctus dolor. Nam ut sapien enim. Etiam ut ex quis libero vulputate ultrices sed sed magna. Mauris dolor nibh, suscipit eu gravida eu, rhoncus efficitur nulla. Pellentesque blandit elit lorem. Duis hendrerit eget magna at ultricies.</p>  
            <p>Praesent massa velit, accumsan at dui at, auctor malesuada tellus. Morbi malesuada nulla et tellus egestas, sit amet cursus dui scelerisque. Proin et maximus erat, sed pellentesque augue. Integer ante ex, venenatis vitae nunc eu, tempor molestie turpis. Nullam blandit metus nisi, sit amet placerat risus finibus ut. Praesent vitae condimentum felis. Aliquam vel vehicula diam. Aliquam laoreet nisl et lacus sodales, eget accumsan ex pulvinar. Cras venenatis varius erat. Aenean quis pellentesque justo. Praesent non convallis est. Duis semper mollis cursus. Curabitur arcu justo, tempus sit amet orci sed, venenatis hendrerit lacus. Curabitur nec urna vel nunc sagittis interdum. Duis bibendum diam sit amet ante tincidunt condimentum.</p>
            <p>Etiam varius nibh ut metus tempor, sed hendrerit nibh ultrices. Phasellus et mi sed elit volutpat tristique. Maecenas vitae pulvinar ex, nec efficitur nulla. Pellentesque tellus sem, vulputate a quam eget, vestibulum sagittis dolor. Aliquam lacinia eros massa, eu ultricies metus tincidunt vel. Fusce et tortor ex. Suspendisse a dictum nisl. Vestibulum ipsum risus, scelerisque eu volutpat nec, auctor eu tortor. Proin posuere eu augue ac dapibus. Quisque non consectetur nulla.</p>
            <p>Nam ultrices blandit efficitur. Aliquam erat volutpat. Sed consectetur vel magna ut aliquam. Ut imperdiet velit sit amet leo varius ultricies. Pellentesque sodales aliquam nunc vitae viverra. Aliquam vulputate quis neque non varius. Aliquam pulvinar mollis ultricies. Morbi tempor in quam vitae dignissim. Pellentesque id tortor et sapien ultricies lacinia nec et lectus. Nunc interdum risus a ligula lobortis fringilla. Morbi diam nisl, scelerisque ut odio id, tincidunt commodo augue. Suspendisse eu congue nunc, at sollicitudin massa. Suspendisse lacinia nisl molestie risus tempus rutrum. Maecenas volutpat non justo malesuada interdum. Nulla vitae libero a leo auctor bibendum.</p>
          </div>
          <div className='chapter-select' style={{gap: "3em"}}>
            <div className='chapter-button'>⭠</div>
            <div className='chapter-button'>⭢</div>
          </div>
        </div>
      </div>
      <div className='footer'>
        <p>© 2023 Tero Salmela</p>
      </div>
    </div>
  )
}

export default App
