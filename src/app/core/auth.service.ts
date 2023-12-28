import { Injectable } from '@angular/core';
import { User, SignBuddy, SignStudent, EditBuddy, EditStudent, EditStudentArrival } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Session } from '@core/session-store/session.interface';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_ID: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.USER_ID = cookieService.get('user-id');
  }

  // Запрос на вход в систему
  login(user: User) {
    return firstValueFrom(this.http.post<Session>('api/auth/signin', user));
  }

  // Запрос на регистрацию в системе бадди
  signUpBuddy(user: SignBuddy) {
    return firstValueFrom(this.http.post('/api/auth/signup', user));
  }

  // Запрос на регистрацию в системе иностранный студент
  signUpStudent(user: SignStudent) {
    return firstValueFrom(this.http.post('/api/auth/signup', user));
  }

  // Подтягивание информации по личному id
  getById(id): Promise<any> {
    return firstValueFrom(this.http.get(`/api/user/${id}`));
  }

  // Изменение своего профиля бадди по личному id
  editBuddy(user: EditBuddy) {
    return firstValueFrom(this.http.put(`/api/user/${this.USER_ID}`, user));
  }

  addBuddyToArchive(user: EditBuddy) {
    return firstValueFrom(this.http.put(`/api/user/${user.id}`, user));
  }

  addStudentToArchive(user: EditStudent) {
    return firstValueFrom(this.http.put(`/api/user/${user.id}`, user));
  }

  // Изменение своего профиля ИС по личному id
  editStudent(user: EditStudent) {
    return firstValueFrom(this.http.put(`/api/user/${this.USER_ID}`, user));
  }

  // Изменение своей информации о прибытии ИС по личному id
  editStudentArrival(user: EditStudentArrival) {
    return firstValueFrom(this.http.put(`/api/foreignStudent/edit/arrival`, user));
  }

  // Встреча студента бадди
  meetStudent(studentID: number) {
    return firstValueFrom(this.http.put(`/api/match/meet/${studentID}`, null));
  }

  // Отображение студентов в статусе поиск
  getListSearching(): Promise<any> {
    return firstValueFrom(this.http.get('/api/user/searching'));
  }

  // Отображение моих студентов по личному id
  getListMine(): Promise<any> {
    return firstValueFrom(this.http.get('/api/user/mystudents'));
  }

  // Отображение всех бадди у Админа
  getAllBuddy(): Promise<any> {
    return firstValueFrom(this.http.get('/api/admin/view/all_buddies'));
  }

  // Отображение всех ИС у Админа
  getAllStudent(): Promise<any> {
    return firstValueFrom(this.http.get('/api/admin/view/all_students'));
  }

  // Отображение всех пар у Админа
  getAllMatches(): Promise<any> {
    return firstValueFrom(this.http.get('/api/admin/view/all_matches'));
  }

  // Отображение всех действий у Админа
  getAllLogs(): Promise<any> {
    return firstValueFrom(this.http.get(`/api/logs/view`));
  }


  deleteMatch(studentID: number, buddyID: number) {
    return firstValueFrom(this.http.delete(`/api/admin/match?studentId=${studentID}&buddyId=${buddyID}`));
  }

  // Запрос на формирование пары по id студента
  matchWith(id) {
    return firstValueFrom(this.http.post(`/api/match/${id}`, null));
  }

  // Создание пары у Админа
  matchBuddyStudent(studentID: number, buddyID: number){
    return firstValueFrom(this.http.post(`/api/admin/match?studentId=${studentID}&buddyId=${buddyID}`, null));
  }

  // Запрос на изменение статуса -> поиск
  startSearching() {
    return firstValueFrom(this.http.put('api/foreignStudent/search', null));
  }

  // Запрос на изменение статуса -> ожидание
  stopSearching() {
    return firstValueFrom(this.http.put('api/foreignStudent/stop', null));
  }

  // Запрос на информацию о моем бадди
  getMyBuddy(): Promise<any> {
    return firstValueFrom(this.http.get('/api/match/buddy'));
  }

  deleteUser(id: number) {
    return firstValueFrom(this.http.delete(`/api/user/${id}`));
  }


}
