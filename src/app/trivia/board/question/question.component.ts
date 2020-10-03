import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnswerStatus, Question} from '../../shared/models/question.model';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  AnswerStatus = AnswerStatus;
  // tslint:disable-next-line:variable-name
  question: Question;
  selectedElement: HTMLElement;
  isWorking = false;
  answerStatus: AnswerStatus = AnswerStatus.none;
  @Output() selectedAnswer = new EventEmitter();

  constructor() {
  }

  @Input() set data(q: Question) {
    this.question = q;
    this.reset();
  }

  ngOnInit(): void {
  }

  selectAnswer(element: HTMLElement): void {
    if (this.selectedElement) {
      return;
    }
    this.selectedElement = element;
  }

  submitAnswer(): void {
    this.isWorking = true;
    const answer = this.selectedElement.innerText;
    this.answerStatus = answer === this.question.correct_answer ? AnswerStatus.true : AnswerStatus.false;
    this.selectedAnswer.emit(answer);
  }

  private reset(): void {
    this.answerStatus = AnswerStatus.none;
    this.isWorking = false;
    this.selectedElement = null;
  }
}
