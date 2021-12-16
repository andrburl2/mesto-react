import Profile from '../Profile/Profile';
import Card from '../Card/Card';

function Main(props) {
  return (
    <main>
      <Profile
        onOpenPopup={props.onOpenPopup}
      />

      <div className='card__container section'>
        {props.cards.map(el => {
          return <Card card={el} onCardClick={props.onCardClick} key={el.name}/>
        })}
      </div>

      
    </main>
  )
}

export default Main;
