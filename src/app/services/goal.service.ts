import { Injectable } from '@angular/core';
import {GoalModel} from "../models/goal.model";
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GoalService {

  public baseUrl: string = 'http://localhost:5000/v1/';

  public goals: GoalModel[] = [];

  public $goals = new Subject<GoalModel[]>();

  public codeEditGoal: string = '';

  public http: HttpClient;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  public getGoals(): Observable<GoalModel[]>{
    return this.http.post(this.baseUrl + 'metas/metasAll/', {}).pipe(
      map((res: any) => {
        console.log('res', res);
        // filter if status is null
        this.goals = res.filter((goal: GoalModel) => goal.estado !== null);
        this.$goals.next(this.goals);
        return this.goals;
      }),
    );
  }

  public addGoal(goal: GoalModel):Observable<GoalModel[]> {
    return this.http.post(this.baseUrl + 'metas/', goal).pipe(
      map((res: any) => {
        console.log('res', res);
        this.goals = res;
        this.$goals.next(this.goals);
        return res;
      })
    );
  }

  public editGoal(codigo:string, goal: GoalModel) {
    // add http
    this.http.put(this.baseUrl + 'metas/'+codigo, goal).subscribe((res: any) => {
      this.goals = res;
      this.$goals.next(this.goals);
    });
  }

  public deleteGoal(goal: GoalModel) {
    // add http
    this.http.delete(this.baseUrl + 'metas/' + goal.codigo).subscribe(()=>{
      this.goals = this.goals.filter((g: GoalModel) => g.codigo !== goal.codigo);
      this.$goals.next(this.goals);
    });
  }

  public updateStatus(codigo:string, goal: GoalModel) {
    // add http
    this.http.put(this.baseUrl + 'metas/'+codigo, goal).subscribe((res: any) => {
      this.goals = res;
      this.$goals.next(this.goals);
    });
  }

  public getGoalByCode(codigo: string): Observable<GoalModel> {
    return this.http.get(this.baseUrl + 'metas/'+codigo).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
