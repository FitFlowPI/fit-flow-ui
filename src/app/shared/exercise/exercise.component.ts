import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Exercise} from "../../models/exercise.model";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {buttonRipple} from "../button/buttonEffects";

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    NgOptimizedImage,
    NgStyle,
    NgIf
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent implements OnInit {

  @ViewChild('exerciseContainer') exerciseContainer!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  @Input({required: true}) exercise!: Exercise;
  @Input() showBorder: boolean = true;
  @Input() nameSize: string = '1rem';
  @Input() showMuscles: boolean = true;
  @Input() clickable: boolean = true;
  @Output() navigateToExercise = new EventEmitter<string>(); // Emits the exercise ID

  onPlay(exerciseId: string) {
    this.navigateToExercise.emit(exerciseId); // Emit to the parent component
  }

  protected readonly faClock = faClock;

  thumbnailUrl: string = ''; // To store the computed YouTube thumbnail URL

  ngOnInit(): void {
    if(this.exercise.media)
    this.thumbnailUrl = this.getYoutubeThumbnail(this.exercise.media);
  }

  getYoutubeThumbnail(url: string | null): string {
    if (!url) {
      return 'default-thumbnail.png'; // Fallback image
    }

    const videoIdMatch = url.match(/(?:\?v=|\/embed\/|youtu\.be\/|\/v\/|\/watch\?v=|\/watch\?.+&v=)([^#\&\?]{11})/);
    return videoIdMatch ? `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg` : 'default-thumbnail.png';
  }

  OnClick(event: MouseEvent) {
    if (this.exerciseContainer) {
      buttonRipple('exercise', event, this.renderer, this.exerciseContainer.nativeElement);
    }
  }
}
