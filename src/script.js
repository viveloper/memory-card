const e = React.createElement;

function ClearButton(props) {
  const { onClickClear } = props;
  return (
    <button id="clear" className="clear btn" onClick={onClickClear}>
      <i className="fas fa-trash"></i> Clear Cards
    </button>
  );
}

function Header(props) {
  const { onClickAddCardBtn } = props;
  return (
    <h1>
      Memory Cards
      <button id="show" className="btn btn-small" onClick={onClickAddCardBtn}>
        <i className="fas fa-plus"></i> Add New Card
      </button>
    </h1>
  );
}

function Card(props) {
  const { card, isShowAnswer, active, left, onClickCard } = props;

  return (
    <div
      className={`card${active ? ' active' : ''}${left ? ' left' : ''}${
        isShowAnswer ? ' show-answer' : ''
      }`}
      onClick={onClickCard}
    >
      <div className="inner-card">
        <div className="inner-card-front">
          <p>{card.question}</p>
        </div>
        <div className="inner-card-back">
          <p>{card.answer}</p>
        </div>
      </div>
    </div>
  );
}

function DummyCard() {
  return (
    <div className="card active">
      <div className="inner-card"></div>
    </div>
  );
}

function CardList(props) {
  const { cards, currentCardIndex, isShowAnswer, onClickCard } = props;

  return (
    <div id="cards-container" className="cards">
      {cards.length > 0 ? (
        cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              isShowAnswer={isShowAnswer}
              active={index === currentCardIndex}
              left={index < currentCardIndex}
              onClickCard={onClickCard}
            />
          );
        })
      ) : (
        <DummyCard />
      )}
    </div>
  );
}

function Navigation(props) {
  const {
    currentCardNumber,
    totalCardsNumber,
    onClickNext,
    onClickPrev
  } = props;
  return (
    <div className="navigation">
      <button id="prev" className="nav-button" onClick={onClickPrev}>
        <i className="fas fa-arrow-left"></i>
      </button>

      <p id="current">
        {totalCardsNumber && `${currentCardNumber}/${totalCardsNumber}`}
      </p>

      <button id="next" className="nav-button" onClick={onClickNext}>
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
}

function AddCard(props) {
  const { isShowAddCard, onClickCloseAddCard, onSubmitCard } = props;

  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  const onChangeText = e => {
    if (e.target.id === 'question') {
      setQuestion(e.target.value);
    } else if (e.target.id === 'answer') {
      setAnswer(e.target.value);
    } else {
    }
  };

  return (
    <div
      id="add-container"
      className={`add-container${isShowAddCard ? ' show' : ''}`}
    >
      <h1>
        Add New Card
        <button
          id="hide"
          className="btn btn-small btn-ghost"
          onClick={onClickCloseAddCard}
        >
          <i className="fas fa-times"></i>
        </button>
      </h1>

      <div className="form-group">
        <label htmlFor="question">Question</label>
        <textarea
          id="question"
          placeholder="Enter question..."
          value={question}
          onChange={onChangeText}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="answer">Answer</label>
        <textarea
          id="answer"
          placeholder="Enter Answer..."
          value={answer}
          onChange={onChangeText}
        ></textarea>
      </div>

      <button
        id="add-card"
        className="btn"
        onClick={() => {
          if (question.trim() !== '' && answer.trim() !== '') {
            onSubmitCard({ question, answer });
            setQuestion('');
            setAnswer('');
          }
        }}
      >
        <i className="fas fa-plus"></i> Add Card
      </button>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      currentCardIndex: 0,
      isShowAnswer: false,
      isShowAddCard: false
    };
  }

  componentDidMount() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    this.setState({
      cards: cards === null ? [] : cards
    });
  }

  onClickNext() {
    if (this.state.currentCardIndex + 1 < this.state.cards.length) {
      this.setState(prevState => {
        return {
          currentCardIndex: prevState.currentCardIndex + 1,
          isShowAnswer: false
        };
      });
    }
  }

  onClickPrev() {
    if (this.state.currentCardIndex - 1 >= 0) {
      this.setState(prevState => {
        return {
          currentCardIndex: prevState.currentCardIndex - 1,
          isShowAnswer: false
        };
      });
    }
  }

  onClickCard() {
    this.setState(prevState => {
      return {
        isShowAnswer: !prevState.isShowAnswer
      };
    });
  }

  onClickAddCardBtn() {
    this.setState({
      isShowAddCard: true
    });
  }

  onClickCloseAddCard() {
    this.setState({
      isShowAddCard: false
    });
  }

  onSubmitCard(card) {
    this.setState(
      prevState => {
        return {
          cards: [...prevState.cards, card],
          currentCardIndex: prevState.cards.length,
          isShowAnswer: false,
          isShowAddCard: false
        };
      },
      () => {
        localStorage.setItem('cards', JSON.stringify(this.state.cards));
      }
    );
  }

  onClickClear() {
    if (window.confirm('Remove all cards?')) {
      this.setState(
        {
          cards: [],
          currentCardIndex: 0,
          isShowAnswer: false,
          isShowAddCard: false
        },
        () => {
          localStorage.removeItem('cards');
        }
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <ClearButton onClickClear={this.onClickClear.bind(this)} />
        <Header onClickAddCardBtn={this.onClickAddCardBtn.bind(this)} />
        <CardList
          cards={this.state.cards}
          currentCardIndex={this.state.currentCardIndex}
          isShowAnswer={this.state.isShowAnswer}
          onClickCard={this.onClickCard.bind(this)}
        />
        <Navigation
          currentCardNumber={this.state.currentCardIndex + 1}
          totalCardsNumber={this.state.cards.length}
          onClickNext={this.onClickNext.bind(this)}
          onClickPrev={this.onClickPrev.bind(this)}
        />
        <AddCard
          isShowAddCard={this.state.isShowAddCard}
          onClickCloseAddCard={this.onClickCloseAddCard.bind(this)}
          onSubmitCard={this.onSubmitCard.bind(this)}
        />
      </React.Fragment>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(e(App), domContainer);

// npx babel --watch src --out-dir . --presets react-app/prod
