import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { COURSES,findLessonsForCourse } from "../../../../server/db-data";
import {Course} from "../model/course";

    describe('CoursesService',() => {
        let coursesService: CoursesService,
            httpController: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    CoursesService
                ]
            });
            coursesService = TestBed.get(CoursesService);
            httpController = TestBed.get(HttpTestingController);
        });


        it('it should retrive all courses', () => {

            coursesService.findAllCourses().subscribe(res => {
                expect(res).toBeTruthy('No courses returned');

                expect(res.length).toBe(12, 'Incorrect number of courses returned');

                const course = res.find(c => c.id === 12);
                expect(course.titles.description).toBe("Angular Testing Course");
            });

            const req = httpController.expectOne('/api/courses');

            expect(req.request.method).toEqual('GET');

            // The data which is given here is what is given as response in the subscribe
            req.flush({payload: Object.values(COURSES)});
        });

        it('retrive course by id', () => {

            coursesService.findCourseById(12).subscribe(res => {
                expect(res).toBeTruthy('Courses with id 12 is not returned');

                expect(res.id).toBe(12, 'Incorrect number of courses returned');

                // expect(res.titles.description).toBe("Angular Testing Course");
            });

            const req = httpController.expectOne('/api/courses/12');

            expect(req.request.method).toEqual('GET');

            // The data which is given here is what is given as response in the subscribe
            req.flush(COURSES[12]);
        });

        it('save course', () => {

            const change: Partial<Course> = {titles: {description: 'Angular Material'}}
            coursesService.saveCourse(12, change).subscribe(res => {

                expect(res.id).toBe(12, 'Incorrect course updated');

                expect(res.titles.description).toBe("Angular Material");
            });

            const req = httpController.expectOne('/api/courses/12');

            expect(req.request.method).toEqual('PUT');

            // The data which is given here is what is given as response in the subscribe
            expect(req.request.body.titles.description).toEqual(change.titles.description);

            req.flush({
                ...COURSES[12],
                ...change
            })
        });

        it('save course', () => {

            const change: Partial<Course> = {titles: {description: 'Angular Material'}}
            coursesService.saveCourse(12, change).subscribe(res => fail('Should have thrown an error'), e => {
                expect(e.status).toBe(500);
            });

            const req = httpController.expectOne('/api/courses/12');

            expect(req.request.method).toEqual('PUT');

            req.flush('Saving course failed', {status: 500, statusText: 'Internal Server Error'})
        });

        it('find lessons', () => {

            coursesService.findLessons(12).subscribe(res => {
              expect(res).toBeTruthy();

              expect(res.length).toBe(3);
            })

            const req = httpController.expectOne(req => req.url == '/api/lessons');

            expect(req.request.method).toEqual('GET');
            expect(req.request.params.get('filter')).toEqual('');
            expect(req.request.params.get('sortOrder')).toEqual('asc');
            expect(req.request.params.get('pageNumber')).toEqual('0');
            expect(req.request.params.get('pageSize')).toEqual('3');

            req.flush({payload: findLessonsForCourse(12).slice(0,3)})
        });

        afterEach(() => {
            httpController.verify();
        });
    });
