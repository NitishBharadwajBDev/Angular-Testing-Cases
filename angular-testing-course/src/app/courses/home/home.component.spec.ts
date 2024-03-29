import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourse = setupCourses().filter(data => data.category === 'BEGINNER')

  beforeEach(async (() => {

    let courseServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])


    TestBed.configureTestingModule({
      imports: [CoursesModule, NoopAnimationsModule],
      providers: [{provide: CoursesService, useValue: courseServiceSpy}]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);

      component = fixture.componentInstance;

      el = fixture.debugElement;

      coursesService = TestBed.get(CoursesService);
    });
  }));

  it("should create the component", () => {

   expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {

    // console.log('BEGINNER COURSE', beginnerCourse.length);
    coursesService.findAllCourses.and.returnValue(of(beginnerCourse));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    // console.log('TABS CONSOLE', tabs);
    expect(tabs.length).toBe(0, 'Unable to find right no of tabs')

  });


  it("should display only advanced courses", () => {

      pending();

  });


  it("should display both tabs", () => {

    pending();

  });


  it("should display advanced courses when tab clicked", () => {

    pending();

  });

});


