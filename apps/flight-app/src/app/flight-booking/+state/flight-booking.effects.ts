import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';
import * as FlightBookingActions from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-lib';

@Injectable()
export class FlightBookingEffects {
  loadFlightBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FlightBookingActions.loadFlights),
      switchMap((a) => this.flightService.find(a.from, a.to, a.urgent)),
      map((flights) => FlightBookingActions.flightsLoaded({ flights }))
    );
  });

  constructor(
    private flightService: FlightService,
    private actions$: Actions
  ) {}
}
