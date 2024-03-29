import { CalculatorService } from "./calculator.service";
import {TestBed} from '@angular/core/testing';
import { LoggerService } from "./logger.service";


describe('Calculatore Service', () => {

    let calculator: CalculatorService, loggerSpy: any;

    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

        // spyOn(logger, 'log');

        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                {provide: LoggerService, useValue: loggerSpy}
            ]
        })

        calculator = TestBed.get(CalculatorService);
    });

    it('add two numbers', () => {

        const result = calculator.add(2,2);

        expect(result).toBe(4);

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it('subtract two numbers', () => {

        const result = calculator.subtract(2,2);

        expect(result).toBe(0);

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
})
