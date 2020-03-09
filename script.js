var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

function ClearButton(props) {
  var onClickClear = props.onClickClear;

  return React.createElement(
    "button",
    { id: "clear", className: "clear btn", onClick: onClickClear },
    React.createElement("i", { className: "fas fa-trash" }),
    " Clear Cards"
  );
}

function Header(props) {
  var onClickAddCardBtn = props.onClickAddCardBtn;

  return React.createElement(
    "h1",
    null,
    "Memory Cards",
    React.createElement(
      "button",
      { id: "show", className: "btn btn-small", onClick: onClickAddCardBtn },
      React.createElement("i", { className: "fas fa-plus" }),
      " Add New Card"
    )
  );
}

function Card(props) {
  var card = props.card,
      isShowAnswer = props.isShowAnswer,
      active = props.active,
      left = props.left,
      onClickCard = props.onClickCard;


  return React.createElement(
    "div",
    {
      className: "card" + (active ? ' active' : '') + (left ? ' left' : '') + (isShowAnswer ? ' show-answer' : ''),
      onClick: onClickCard
    },
    React.createElement(
      "div",
      { className: "inner-card" },
      React.createElement(
        "div",
        { className: "inner-card-front" },
        React.createElement(
          "p",
          null,
          card.question
        )
      ),
      React.createElement(
        "div",
        { className: "inner-card-back" },
        React.createElement(
          "p",
          null,
          card.answer
        )
      )
    )
  );
}

function DummyCard() {
  return React.createElement(
    "div",
    { className: "card active" },
    React.createElement("div", { className: "inner-card" })
  );
}

function CardList(props) {
  var cards = props.cards,
      currentCardIndex = props.currentCardIndex,
      isShowAnswer = props.isShowAnswer,
      onClickCard = props.onClickCard;


  return React.createElement(
    "div",
    { id: "cards-container", className: "cards" },
    cards.length > 0 ? cards.map(function (card, index) {
      return React.createElement(Card, {
        key: index,
        card: card,
        isShowAnswer: isShowAnswer,
        active: index === currentCardIndex,
        left: index < currentCardIndex,
        onClickCard: onClickCard
      });
    }) : React.createElement(DummyCard, null)
  );
}

function Navigation(props) {
  var currentCardNumber = props.currentCardNumber,
      totalCardsNumber = props.totalCardsNumber,
      onClickNext = props.onClickNext,
      onClickPrev = props.onClickPrev;

  return React.createElement(
    "div",
    { className: "navigation" },
    React.createElement(
      "button",
      { id: "prev", className: "nav-button", onClick: onClickPrev },
      React.createElement("i", { className: "fas fa-arrow-left" })
    ),
    React.createElement(
      "p",
      { id: "current" },
      totalCardsNumber && currentCardNumber + "/" + totalCardsNumber
    ),
    React.createElement(
      "button",
      { id: "next", className: "nav-button", onClick: onClickNext },
      React.createElement("i", { className: "fas fa-arrow-right" })
    )
  );
}

function AddCard(props) {
  var isShowAddCard = props.isShowAddCard,
      onClickCloseAddCard = props.onClickCloseAddCard,
      onSubmitCard = props.onSubmitCard;

  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      question = _React$useState2[0],
      setQuestion = _React$useState2[1];

  var _React$useState3 = React.useState(''),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      answer = _React$useState4[0],
      setAnswer = _React$useState4[1];

  var onChangeText = function onChangeText(e) {
    if (e.target.id === 'question') {
      setQuestion(e.target.value);
    } else if (e.target.id === 'answer') {
      setAnswer(e.target.value);
    } else {}
  };

  return React.createElement(
    "div",
    {
      id: "add-container",
      className: "add-container" + (isShowAddCard ? ' show' : '')
    },
    React.createElement(
      "h1",
      null,
      "Add New Card",
      React.createElement(
        "button",
        {
          id: "hide",
          className: "btn btn-small btn-ghost",
          onClick: onClickCloseAddCard
        },
        React.createElement("i", { className: "fas fa-times" })
      )
    ),
    React.createElement(
      "div",
      { className: "form-group" },
      React.createElement(
        "label",
        { htmlFor: "question" },
        "Question"
      ),
      React.createElement("textarea", {
        id: "question",
        placeholder: "Enter question...",
        value: question,
        onChange: onChangeText
      })
    ),
    React.createElement(
      "div",
      { className: "form-group" },
      React.createElement(
        "label",
        { htmlFor: "answer" },
        "Answer"
      ),
      React.createElement("textarea", {
        id: "answer",
        placeholder: "Enter Answer...",
        value: answer,
        onChange: onChangeText
      })
    ),
    React.createElement(
      "button",
      {
        id: "add-card",
        className: "btn",
        onClick: function onClick() {
          if (question.trim() !== '' && answer.trim() !== '') {
            onSubmitCard({ question: question, answer: answer });
            setQuestion('');
            setAnswer('');
          }
        }
      },
      React.createElement("i", { className: "fas fa-plus" }),
      " Add Card"
    )
  );
}

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      cards: [],
      currentCardIndex: 0,
      isShowAnswer: false,
      isShowAddCard: false
    };
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var cards = JSON.parse(localStorage.getItem('cards'));
      this.setState({
        cards: cards === null ? [] : cards
      });
    }
  }, {
    key: "onClickNext",
    value: function onClickNext() {
      if (this.state.currentCardIndex + 1 < this.state.cards.length) {
        this.setState(function (prevState) {
          return {
            currentCardIndex: prevState.currentCardIndex + 1,
            isShowAnswer: false
          };
        });
      }
    }
  }, {
    key: "onClickPrev",
    value: function onClickPrev() {
      if (this.state.currentCardIndex - 1 >= 0) {
        this.setState(function (prevState) {
          return {
            currentCardIndex: prevState.currentCardIndex - 1,
            isShowAnswer: false
          };
        });
      }
    }
  }, {
    key: "onClickCard",
    value: function onClickCard() {
      this.setState(function (prevState) {
        return {
          isShowAnswer: !prevState.isShowAnswer
        };
      });
    }
  }, {
    key: "onClickAddCardBtn",
    value: function onClickAddCardBtn() {
      this.setState({
        isShowAddCard: true
      });
    }
  }, {
    key: "onClickCloseAddCard",
    value: function onClickCloseAddCard() {
      this.setState({
        isShowAddCard: false
      });
    }
  }, {
    key: "onSubmitCard",
    value: function onSubmitCard(card) {
      var _this2 = this;

      this.setState(function (prevState) {
        return {
          cards: [].concat(_toConsumableArray(prevState.cards), [card]),
          currentCardIndex: prevState.cards.length,
          isShowAnswer: false,
          isShowAddCard: false
        };
      }, function () {
        localStorage.setItem('cards', JSON.stringify(_this2.state.cards));
      });
    }
  }, {
    key: "onClickClear",
    value: function onClickClear() {
      if (window.confirm('Remove all cards?')) {
        this.setState({
          cards: [],
          currentCardIndex: 0,
          isShowAnswer: false,
          isShowAddCard: false
        }, function () {
          localStorage.removeItem('cards');
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(ClearButton, { onClickClear: this.onClickClear.bind(this) }),
        React.createElement(Header, { onClickAddCardBtn: this.onClickAddCardBtn.bind(this) }),
        React.createElement(CardList, {
          cards: this.state.cards,
          currentCardIndex: this.state.currentCardIndex,
          isShowAnswer: this.state.isShowAnswer,
          onClickCard: this.onClickCard.bind(this)
        }),
        React.createElement(Navigation, {
          currentCardNumber: this.state.currentCardIndex + 1,
          totalCardsNumber: this.state.cards.length,
          onClickNext: this.onClickNext.bind(this),
          onClickPrev: this.onClickPrev.bind(this)
        }),
        React.createElement(AddCard, {
          isShowAddCard: this.state.isShowAddCard,
          onClickCloseAddCard: this.onClickCloseAddCard.bind(this),
          onSubmitCard: this.onSubmitCard.bind(this)
        })
      );
    }
  }]);

  return App;
}(React.Component);

var domContainer = document.querySelector('#app');
ReactDOM.render(e(App), domContainer);

// npx babel --watch src --out-dir . --presets react-app/prod