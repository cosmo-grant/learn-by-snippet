class Quiz {
  constructor() {
    this.getElements();
    this.populateQuizChoices();
    this.setupEventListeners();
    this.restartFromSplash();
  }

  getElements() {
    this.mainContent = document.getElementById("main-content");
    this.splashScreen = document.getElementById("splash-screen");
    this.quizChoices = document.getElementById("quiz-choices");
    this.finalScoreSection = document.getElementById("final-score-section");
    this.finalScoreValue = document.getElementById("final-score-value");
    this.finalScoreMax = document.getElementById("final-score-max");
    this.finalScoreMessage = document.getElementById("final-score-message");
    this.moreQuizzesButton = document.getElementById("more-quizzes-button");

    this.snippetCode = document.getElementById("snippet-code");
    this.prefaceText = document.getElementById("preface-text");
    this.revealButton = document.getElementById("reveal-button");
    this.outputPre = document.getElementById("output-pre");
    this.outputSamp = document.getElementById("output-samp");
    this.explanation = document.getElementById("explanation");
    this.gradingSection = document.getElementById("grading-section");
    this.correctButton = document.getElementById("correct-button");
    this.incorrectButton = document.getElementById("incorrect-button");
    this.nextButton = document.getElementById("next-button");
    this.navBar = document.getElementById("nav-bar");

    this.continueDialog = document.getElementById("continue-dialog");
    this.savedTitleDialog = document.getElementById("saved-title-dialog");
    this.savedQuestionDialog = document.getElementById("saved-question-dialog");
    this.totalQuestionsDialog = document.getElementById(
      "total-questions-dialog",
    );
    this.continueFromSavedButton = document.getElementById(
      "continue-from-saved-button",
    );
    this.restartButton = document.getElementById("restart-button");
  }

  populateNavBar() {
    // clear any existing buttons
    this.navBar.innerHTML = "";

    // add a button per question
    for (let i = 0; i < this.questions.length; i++) {
      const button = document.createElement("button");
      button.textContent = i + 1;
      this.navBar.appendChild(button);
    }
    this.navButtons = [...this.navBar.children];
  }

  populateQuizChoices() {
    Object.keys(QUESTIONS_PER_QUIZ).forEach((key) => {
      // The key is derived from the quiz directory name.
      // It's internal-facing (quiz identifier, storage key).
      // Changing it will nullify users' local storage.
      //
      // The title is from the quiz's title.txt.
      // It's user-facing, and can change freely.
      const quiz = QUESTIONS_PER_QUIZ[key];

      const button = document.createElement("button");
      button.dataset.quiz = key;

      const logo = document.createElement("img");
      logo.src = `logos/${quiz.extension}.svg`;
      logo.alt = quiz.extension;

      const title = document.createElement("span");
      title.className = "quiz-title";
      title.textContent = quiz.title;

      const preamble = document.createElement("span");
      preamble.className = "quiz-preamble";
      preamble.textContent = quiz.preamble;

      const text = document.createElement("span");
      text.className = "quiz-text";
      text.append(title, preamble);

      button.append(logo, text);
      this.quizChoices.appendChild(button);
    });
    this.quizButtons = [...this.quizChoices.children];
  }

  showContinueDialog() {
    this.splashScreen.hidden = true;
    this.continueDialog.hidden = false;
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = true;
    this.navBar.hidden = true;
  }

  showSplashScreen() {
    this.splashScreen.hidden = false;
    this.continueDialog.hidden = true;
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = true;
    this.navBar.hidden = true;
  }

  showMainContent() {
    this.splashScreen.hidden = true;
    this.continueDialog.hidden = true;
    this.mainContent.hidden = false;
    this.finalScoreSection.hidden = true;
    this.navBar.hidden = false;
  }

  showFinalScoreSection() {
    this.splashScreen.hidden = true;
    this.continueDialog.hidden = true;
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = false;
    this.navBar.hidden = true;
  }

  setupEventListeners() {
    // Handle some keyboard interaction.
    // The approach is to translate keyboard events into click events.
    // So the direct cause of behaviour is always clicks.
    // We need guards though, e.g. to prevent clicking disabled or hidden buttons.
    document.addEventListener("keydown", (event) => {
      // Enter or space to advance where possible (reveal answer, next question).
      // Use `else if` even when the conditions are statically incompatible to prevent races.
      if (event.key === "Enter" || event.key === " ") {
        if (!this.mainContent.hidden && !this.revealButton.disabled) {
          event.preventDefault();
          this.revealButton.click();
        } else if (!this.mainContent.hidden && !this.nextButton.disabled) {
          event.preventDefault();
          this.nextButton.click();
        } else if (!this.finalScoreSection.hidden) {
          event.preventDefault();
          this.moreQuizzesButton.click();
        }
      }

      // Arrow keys to move between viewable questions.
      if (
        event.key === "ArrowLeft" &&
        !this.mainContent.hidden &&
        this.viewedQuestion - 1 >= 0
      ) {
        event.preventDefault();
        const navButton = this.navButtons[this.viewedQuestion - 1];
        navButton.click();
      }

      if (
        event.key === "ArrowRight" &&
        !this.mainContent.hidden &&
        this.viewedQuestion + 1 <= this.currentQuestion
      ) {
        event.preventDefault();
        const navButton = this.navButtons[this.viewedQuestion + 1];
        navButton.click();
      }

      // Number keys to grade answer.
      if (event.key === "0" && !this.incorrectButton.disabled) {
        event.preventDefault();
        this.incorrectButton.click();
      }

      if (event.key === "1" && !this.correctButton.disabled) {
        event.preventDefault();
        this.correctButton.click();
      }
    });

    this.quizButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.currentQuiz = button.dataset.quiz;
        this.questions = QUESTIONS_PER_QUIZ[this.currentQuiz].questions;
        this.startOrContinueQuiz();
      });
    });

    this.revealButton.addEventListener("click", () => {
      this.hasRevealedAnswer = true;
      this.saveState();

      this.outputPre.hidden = false;
      this.explanation.hidden = false;
      this.gradingSection.hidden = false;
      this.nextButton.hidden = false;

      this.revealButton.disabled = true;
      this.correctButton.disabled = false;
      this.incorrectButton.disabled = false;
      this.nextButton.disabled = true;
    });

    this.correctButton.addEventListener("click", () => this.grade(true));
    this.incorrectButton.addEventListener("click", () => this.grade(false));

    this.nextButton.addEventListener("click", () => {
      if (this.currentQuestion === this.questions.length - 1) {
        this.finishQuiz();
      } else {
        this.nextQuestion();
      }
    });
    this.moreQuizzesButton.addEventListener("click", () =>
      this.restartFromSplash(),
    );
  }

  startOrContinueQuiz() {
    // Check if this quiz is in progress.
    // We've already set this.currentQuiz and this.questions correctly.
    const savedQuizState = this.loadState()?.[this.currentQuiz];
    if (savedQuizState) {
      // Offer user choice to continue or start afresh.
      this.showContinueDialog();
      this.savedTitleDialog.textContent =
        QUESTIONS_PER_QUIZ[this.currentQuiz].title;
      this.savedQuestionDialog.textContent = savedQuizState.currentQuestion + 1;
      this.totalQuestionsDialog.textContent = this.questions.length;

      this.continueFromSavedButton.addEventListener("click", () => {
        this.currentQuestion = savedQuizState.currentQuestion;
        this.grades = savedQuizState.grades;
        this.hasRevealedAnswer = savedQuizState.hasRevealedAnswer;
        this.startQuiz();
      });

      this.restartButton.addEventListener("click", () => {
        this.clearState(this.currentQuiz);
        this.currentQuestion = 0;
        this.grades = Array(this.questions.length).fill(null);
        this.hasRevealedAnswer = false;
        this.startQuiz();
      });
    } else {
      // No saved state for this quiz.
      this.currentQuestion = 0;
      this.grades = Array(this.questions.length).fill(null);
      this.hasRevealedAnswer = false;
      this.startQuiz();
    }
  }

  startQuiz() {
    // Assumes quiz state (current question etc.) has been initialized or loaded already.
    this.populateNavBar();
    this.navButtons.forEach((button, index) =>
      button.addEventListener("click", () => this.loadQuestion(index)),
    );
    this.showMainContent();
    for (let i = 0; i <= this.currentQuestion; i++) {
      this.navButtons[i].disabled = false;
    }
    for (let i = this.currentQuestion + 1; i < this.questions.length; i++) {
      this.navButtons[i].disabled = true;
    }
    // Restore nav button classes for previously answered questions
    for (let i = 0; i < this.grades.length; i++) {
      const navBtn = this.navButtons[i];
      navBtn.classList.remove("viewing", "correct", "incorrect");
      if (this.grades[i]) {
        navBtn.classList.add("correct");
      } else if (this.grades[i] === false) {
        navBtn.classList.add("incorrect");
      }
    }
    this.loadQuestion(this.currentQuestion);
  }

  computeScore() {
    return this.grades.filter(Boolean).length;
  }

  restartFromSplash() {
    this.currentQuestion = 0;
    this.hasRevealedAnswer = false;
    this.showSplashScreen();
  }

  hasGradedCurrentQuestion() {
    return this.grades[this.currentQuestion] !== null;
  }

  loadQuestion(index) {
    const question = this.questions[index];
    this.viewedQuestion = index;
    this.snippetCode.textContent = question.code;
    this.snippetCode.classList.add(`lang-${question.highlightjsAlias}`);
    this.snippetCode.removeAttribute("data-highlighted"); // else highlightjs skips re-highlighting
    hljs.highlightElement(this.snippetCode);
    this.prefaceText.innerHTML = question.preface;
    this.outputSamp.textContent = question.output;
    this.explanation.innerHTML = question.explanation;

    this.nextButton.textContent =
      index === this.questions.length - 1 ? ">>" : ">";

    // Update grading button classes.
    // Maybe we'll hide the buttons but clearest to reset the classes in any case.
    if (this.grades[index] === true) {
      this.correctButton.classList.add("selected");
      this.incorrectButton.classList.remove("selected");
    } else if (this.grades[index] === false) {
      this.correctButton.classList.remove("selected");
      this.incorrectButton.classList.add("selected");
    } else {
      // not yet answered
      this.correctButton.classList.remove("selected");
      this.incorrectButton.classList.remove("selected");
    }

    // Update nav bar: mark which question is being viewed
    this.navButtons.forEach((btn) => btn.classList.remove("viewing"));
    this.navButtons[index].classList.add("viewing");

    if (index < this.currentQuestion) {
      // reviewing a previous question
      this.outputPre.hidden = false;
      this.explanation.hidden = false;
      this.gradingSection.hidden = true;
      this.nextButton.hidden = true;

      this.revealButton.disabled = true;
      this.correctButton.disabled = true;
      this.incorrectButton.disabled = true;
      this.nextButton.disabled = true;
    } else if (index === this.currentQuestion && !this.hasRevealedAnswer) {
      // not yet revealed answer to the current question
      this.outputPre.hidden = true;
      this.explanation.hidden = true;
      this.gradingSection.hidden = true;
      this.nextButton.hidden = true;

      this.revealButton.disabled = false;
      this.correctButton.disabled = true;
      this.incorrectButton.disabled = true;
      this.nextButton.disabled = true;
    } else if (
      index === this.currentQuestion &&
      this.hasRevealedAnswer &&
      !this.hasGradedCurrentQuestion()
    ) {
      // revealed answer but not yet graded the current question
      this.outputPre.hidden = false;
      this.explanation.hidden = false;
      this.gradingSection.hidden = false;
      this.nextButton.hidden = false;

      this.revealButton.disabled = true;
      this.correctButton.disabled = false;
      this.incorrectButton.disabled = false;
      this.nextButton.disabled = true;
    } else if (
      index === this.currentQuestion &&
      this.hasRevealedAnswer &&
      this.hasGradedCurrentQuestion()
    ) {
      // answered and graded the current question
      this.outputPre.hidden = false;
      this.explanation.hidden = false;
      this.gradingSection.hidden = false;
      this.nextButton.hidden = false;

      this.revealButton.disabled = true;
      this.correctButton.disabled = true;
      this.incorrectButton.disabled = true;
      this.nextButton.disabled = false;
    }
  }

  grade(correct) {
    this.correctButton.disabled = true;
    this.incorrectButton.disabled = true;
    this.nextButton.disabled = false;

    if (correct) {
      this.correctButton.classList.add("selected");
    } else {
      this.incorrectButton.classList.add("selected");
    }

    this.grades[this.currentQuestion] = correct;
    this.saveState();

    // Update nav bar: mark this question as correct
    const navBtn = this.navButtons[this.currentQuestion];
    navBtn.classList.add(correct ? "correct" : "incorrect");
  }

  nextQuestion() {
    this.currentQuestion++;
    this.hasRevealedAnswer = false;
    this.saveState();
    this.navButtons[this.currentQuestion].disabled = false;
    this.loadQuestion(this.currentQuestion);
  }

  finishQuiz() {
    this.clearState(this.currentQuiz);
    this.showFinalScoreSection();
    this.finalScoreValue.textContent = this.computeScore();
    this.finalScoreMax.textContent = this.questions.length;

    let message = "";
    const percentage = (this.computeScore() / this.questions.length) * 100; // use % in case question count changes

    if (percentage === 100) {
      message = "&#x1f92f;";
    } else if (percentage >= 80) {
      message = "&#x1f60e;";
    } else if (percentage >= 60) {
      message = "&#x1f642;";
    } else if (percentage >= 40) {
      message = "&#x1f62c;";
    } else {
      message = "&#x1f648;";
    }

    this.finalScoreMessage.innerHTML = message;
  }

  // We save the user's progress, if any, on each quiz.
  // When the user picks a quiz, if they've made progress on it,
  // they can either continue or start afresh (which clears just that quiz's saved state).
  // saveState() should be called after any state-changing action.
  saveState() {
    let savedState = this.loadState() ?? {};
    savedState[this.currentQuiz] = {
      currentQuestion: this.currentQuestion,
      grades: this.grades,
      hasRevealedAnswer: this.hasRevealedAnswer,
    };
    localStorage.setItem("learn-by-snippet", JSON.stringify(savedState));
  }

  loadState() {
    try {
      const savedState = localStorage.getItem("learn-by-snippet");
      if (savedState) {
        // TODO: add some check here that the quiz questions haven't changed in the meantime?
        return JSON.parse(savedState);
      }
    } catch (e) {
      console.warn("Failed to load saved quiz state:", e);
    }
    return null;
  }

  clearState(title) {
    let savedState = this.loadState();
    delete savedState[title];
    localStorage.setItem("learn-by-snippet", JSON.stringify(savedState));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Quiz();
});
