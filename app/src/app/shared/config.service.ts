import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  requiredGroup: (string | undefined) = undefined;
  constructor() { }
}
