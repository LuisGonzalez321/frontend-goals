import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Submeta} from "../models/subgoal.model";

@Injectable({
  providedIn: 'root'
})
export class SubgoalService {

  public baseUrl: string = 'http://localhost:5000/v1/';

  public subGoals: Submeta[] = [];

  public $subgoals = new BehaviorSubject<Submeta[]>(this.subGoals);
  public idGoal: any = 0;

  public http: HttpClient;

  constructor(
    httpClient: HttpClient
  ) {
    this.http = httpClient;
  }

  public getSubGoals(): void {
    this.http.post(this.baseUrl + 'submetas/', {id: this.idGoal}).subscribe((res: any) => {
      this.subGoals = res;
      this.$subgoals.next(this.subGoals);
    });
  }

  public addSubGoal(subGoal: Submeta): void {
    this.http.post(this.baseUrl + 'submetas/', subGoal).subscribe((res: any) => {
      this.subGoals = res;
      this.$subgoals.next(this.subGoals);
    });
  }

  public editSubGoal(subGoal: Submeta): void {
    this.http.put(this.baseUrl + 'submetas/', subGoal).subscribe((res: any) => {
      this.subGoals = res;
      this.$subgoals.next(this.subGoals);
    });
  }

  public deleteSubGoal(subGoal: Submeta): void {
    this.http.delete(this.baseUrl + 'metas/submetas/' + subGoal.id).subscribe((res: any) => {
      this.subGoals = res;
      this.$subgoals.next(this.subGoals);
    });
  }

  //getSubmetaByCode
  public getSubmetaByCode(id: string): Observable<Submeta> {
      return this.http.get(this.baseUrl + 'submetas/'+id, {}).pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
