import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderData} from './header-data.model'
import { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {


  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'Teste',
    icon: 'home',
    routerUrl: ''
  })
  constructor() { }

  get headerData(): HeaderData{
    return this._headerData.value
  }

  set headerData(headerData: HeaderData) {
    this._headerData.next(headerData)
  }
}
